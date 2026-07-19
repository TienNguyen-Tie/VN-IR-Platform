# VietnamIR — Static → Real Platform

Plan of record. Researched 2026-07-17. **Updated: project confirmed NON-COMMERCIAL.**

---

## 0. vnstock: usable, with one caveat

**Non-commercial changes the verdict.** The licence explicitly permits your use, in the affirmative:

> "The use of Vnstock for commercial purposes by any organization is prohibited... **However, the use of Vnstock for personal purposes, including research and editing, is still permitted free of charge.**"
> — LICENSE.md §I.2

The ban's subject is *"bất kỳ tổ chức nào"* / *"any organization"*. An individual with no company and no revenue is not the target. PyPI metadata agrees: *"Custom: Personal, research, non-commercial"*. **You're clear.**

### The one caveat worth knowing

The licence bans building *"data services that directly compete with data-owning partners or securities companies"* — and unlike the adjacent clause, this one has **no commercial qualifier**. The drafter attached "for profit" to one prohibition and deliberately omitted it here. A public site serving VN market data is arguably "providing a data service" even with zero revenue.

Separately, the licence **deliberately does not govern the data at all**:

> "Vnstock **không** sở hữu, **không** kinh doanh, và **không** hoạt động dưới tư cách là một nhà cung cấp dịch vụ dữ liệu."
> ("Vnstock does not own, does not trade, and does not operate as a data service provider.")

Data rights belong to VCI/HOSE, and the user *"bears sole legal responsibility"* for their ToS. So "may I publish this publicly?" isn't answerable from the vnstock licence — it's a VCI question, and broker ToS generally prohibit redistribution.

**Practical read:** running this for yourself is unambiguously fine. A *public* site is a grey area — not a licence breach, but not blessed either. For a hobby project this is a normal risk to accept knowingly. If it ever earns money, revisit immediately.

### Still true regardless: it's Python, so you need a server-side job

The licence clears, but the **architecture constraint does not move**:

### Blocker — Architectural: it is a Python library, not an API

- `pip install -U vnstock`, Python **>=3.10** (you have 3.9). No official npm package. No hosted REST endpoint.
- The only REST wrapper (`vnstock-hq/vnstock-api`) is a self-hosted FastAPI MVP you'd run yourself. No public URL exists.
- The vnstocks.com "API key" tiers (Guest 20 req/min, Community 60, Sponsor 180–600) gate rate limits **inside the Python library**. They are not a JSON data endpoint you can call.

**And the upstream is CORS-blocked** — verified live, not assumed:

| Request | Result |
|---|---|
| Preflight from a third-party origin | HTTP 200, but **no** `access-control-allow-origin` header → browser rejects |
| Preflight from `https://trading.vietcap.com.vn` | `access-control-allow-origin: https://trading.vietcap.com.vn` |

Vietcap runs an Origin **allowlist**, and sets `access-control-allow-credentials: true`, which makes a wildcard `*` spec-prohibited. They can never open this to arbitrary browsers.

The root cause is the important part: **vnstock only works by spoofing headers.** Its `user_agent.py` sets `"Origin": "https://trading.vietcap.com.vn/"` to impersonate Vietcap's own web app. `Origin` and `Referer` are *forbidden header names* — browser JS physically cannot set them. The library's core technique is structurally unavailable to your SPA.

**Reliability, for completeness:** built on undocumented broker endpoints that break monthly-to-quarterly (VCI address change, GraphQL→REST migration, KRX migration). TCBS was deleted wholesale in v3.5.0 — its endpoint now 404s. Your ingest **will** break at some point; design so a broken run is harmless (see §7).

### Complementary free sources

| Source | Free? | Browser-callable? | Use for | Verdict |
|---|---|---|---|---|
| **DNSE** (`api.dnse.com.vn`) | yes, no key | **yes** — reflects any Origin | VN-Index / VN30 | Phase 0. Best-effort, undocumented |
| **World Bank API** | yes | yes (`ACAO: *`) | Annual GDP/FDI/trade tiles | Annual only |
| **SSI FastConnect** | free after registration | no (server-side) | Securities, licensed | The commercial path |
| **FiinPro / Vietstock / LSEG** | paid | no | Licensed redistribution | If this becomes a real business |
| GSO / nso.gov.vn | — | no API (401) | CPI/GDP/FDI headline | **Hand-curate** |

DNSE data was cross-checked identical against VCI (VN-Index closes 1853.7, 1840.7, 1828.34, 1800.54, 1806.63), so it's trustworthy — but it's an undocumented endpoint with no ToS and permissive-by-reflection CORS. It can tighten without notice, exactly as VCI already did. Cache the last good response; never let a chart hard-fail on it.

**The honest truth about your macro numbers:** there is **no** free, browser-callable, current source for your actual headline figures. GDP 8.39% (Q2 26), CPI 4.69% (Jun), FDI $34.65B (H1) come from GSO/MPI press releases. Every free mirror is silently stale — World Bank GEM monthly stops May 2024; IMF IFS quarterly stops 2023-Q3; Trading Economics' `guest:guest` key is discontinued (HTTP 410). **Do not build a scraper.** ~8 figures a month, hand-edited in the Supabase table editor, is less work and less fragile than scraping a site that already rebranded gso.gov.vn → nso.gov.vn.

---

## 1. What you actually have

142 hardcoded datasets across ~10,400 lines:

| Origin | Count | Fate |
|---|---|---|
| editorial | 64 | **Stay in TypeScript.** Not a database problem |
| market-data | 37 | → `instrument` + `bar` |
| macro | 18 | → `series_point` (hand-curated) |
| design-placeholder | 17 | Delete or replace |
| user-generated | 6 | Only `lead` ships now |

Plus ~80 stateless interactions (dead `href="#"` links, client-side filters, a fake AI chat, a watchlist star with no auth).

**Three real bugs the schema must not inherit:**
1. All 20 companies render the *same* price series (`generateWalk`).
2. Sorting parses formatted strings — `parseFloat('$15.4B')`. Already broken on `'N/A'` fund rows.
3. Nothing carries an `as_of` date. An undated 8.39% on an IR site is a credibility problem, not a cosmetic one.

---

## 2. Connect Supabase

**Do this first — your `.gitignore` does not exclude `.env`:**

```
.env
.env.local
```

Then:

```bash
npm i @supabase/supabase-js
```

`.env.local`:
```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Key rules (2026 format):
- `sb_publishable_*` — **designed to ship in the browser bundle.** Replaces the legacy `anon` JWT.
- `sb_secret_*` — replaces `service_role`, bypasses RLS, **never** in a `VITE_` var. Anything `VITE_`-prefixed is inlined into the bundle. It self-defends: returns 401 when called from a browser (User-Agent matched).
- New-format keys go in the `apikey` header, **not** `Authorization: Bearer`. supabase-js handles this; raw curl doesn't.
- Legacy and new keys work simultaneously — migrate incrementally.

`src/lib/db.ts` — one client, auth persistence off (no login exists):
```ts
createClient<Database>(url, key, { auth: { persistSession: false } })
```

Types: `supabase gen types typescript --project-id <ref> > src/lib/database.types.ts`

### RLS — non-negotiable

Supabase auto-exposes the `public` schema over PostgREST and grants the `anon` role table privileges. **RLS OFF = the internet can write your tables.** On even for public read-only data.

```sql
alter table instrument enable row level security;
create policy "public read" on instrument for select to anon, authenticated using (true);
```

Writes are blocked implicitly — RLS default-denies anything without a matching policy. No INSERT policy = no inserts. Python writes with `sb_secret_*`, which bypasses RLS entirely. Scope `TO anon, authenticated` rather than leaving it unscoped.

### Free tier — real constraints

- **500MB database size** (counts indexes; disk is 1GB but the quota is DB size). Exceeding it → **read-only mode**, reversible.
- **Pauses after ~1 week of low activity.** Silently kills a data platform. It's an activity threshold, not a strict timer — a few requests/day prevents it.
- 2 active projects.

Naive 1,600 tickers × 10y ≈ 4M rows ≈ **400MB** (290MB heap + 109MB PK index) — one secondary index blows the cap. **Track ~60 symbols × 5y instead** (~a few MB). `tracked boolean` is your storage governor. Validate with `pg_total_relation_size` after loading one year before committing.

---

## 3. Schema

Four tables, two views. Every table has a caller in the shipped UI **today**.

### `instrument`
```
id           smallint generated always as identity primary key
symbol       text not null unique
name         text not null
kind         text not null check (kind in ('stock','index','etf','commodity','fx'))
exchange     text          -- HOSE/HNX/UPCOM
sector       text
currency     char(3) not null
unit         text not null
tracked      boolean not null default false
```
Currency/unit live **here**, not on every bar. An index is just a row with `kind='index'` — no separate `indices` table. Gold splits into two rows (VND/tael, USD/oz); the current `global` field holds `'$4,018/oz'` OR `'Global'` — two facts in one column.

### `bar`
```
instrument_id  smallint not null references instrument(id)
trade_date     date not null
open,high,low,close  numeric not null
volume         bigint not null
primary key (instrument_id, trade_date)

check (high >= low)
check (close between low and high)
check (open between low and high)
check (volume >= 0)
```
- `numeric`, **not** `real`. float4 gives ~7 significant digits — USD/VND at 26,400.1234 does not survive a round trip, and SUM/AVG drifts.
- The PK **is** the covering index. No secondary index (that's ~110MB you don't have). No partitioning until ~100M rows.
- **Do not use TimescaleDB** — deprecated on Postgres 17, dropped from new projects. A plain btree at 4M rows is a small table for Postgres.
- `trade_date` is a `date`, and the **ICT→date conversion must be asserted, not assumed**. Vietnam is UTC+7, no DST. A 00:00 ICT bar parsed as UTC is off by one day, silently, for the entire series.
- Four CHECK constraints are free and turn a silently-bad ingest into a loud failure.

### `series_point` — every non-equity number
```
code          text not null        -- 'gdp.growth', 'cpi.yoy', 'fdi.registered'
period_type   text not null check (period_type in ('D','W','M','Q','H','Y'))
period_start  date not null
value         numeric not null
unit          text not null
currency      char(3)
source_name   text not null
source_url    text not null
as_of         date not null
is_estimate   boolean not null default false
note          text
primary key (code, period_type, period_start)
```
This one table retires ~15 datasets. Two things matter:

- **`period_type` MUST be in the primary key.** Your `gdpData` mixes `'Q2 26'` with `'2026 H1'`; `fdiData` mixes weeks and months. `PK (code, period_start)` is a **data-loss bug** — the half-year row silently overwrites the quarter.
- **`as_of` + `source_url` NOT NULL on every row**, rendered next to every figure in the UI.

A scalar tile is just a series with one row — no separate `metric` table.

### `lead`
```
id          uuid primary key default gen_random_uuid()
name        text not null check (length(name) between 1 and 200)
email       text not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')
company     text
message     text check (length(message) <= 5000)
source      text not null        -- 'contact' | 'irm-demo' | ...
created_at  timestamptz not null default now()
```
```sql
create policy "anon submit" on lead for insert to anon with check (true);
-- deliberately NO select policy
```
The only revenue path in the app, and it depends on nothing. Constraints at the DB, not just the form. Add Turnstile or a per-IP limit **before** it goes public — this is an unauthenticated public write.

### Views, not tables
```sql
create view v_quote_latest as
  select distinct on (instrument_id) * from bar order by instrument_id, trade_date desc;

create view v_sector_perf as select ... group by sector;
```
No `quote_latest` table, no `sector_performance` table. Derive them.

### Rules that apply everywhere

1. **Numbers are stored as numbers, exactly once.** No `value text`. No `value_num` beside it. No stored `positive boolean` — derive from the sign (it's *already wrong* on your `'N/A'` fund rows). Formatting is client-side. Storing `'8.39%'` is your `parseFloat('$15.4B')` sorting bug promoted into the schema.
2. **Explicit `unit` column** on every numeric fact. Not encoded in the code string, not implied by the table name. `$15.4B` vs `15.4` vs `15,400,000,000` is a real inventory failure.
3. **A yield is not a price.** Bond yields → `series_point`, not `bar.close` with `unit='pct'`.

### The cut list

| Cut | Why |
|---|---|
| All 64 editorial datasets — articles, events, podcasts, resources, funds, brokerages, investment banks, IR providers, VC/PE, cities, sponsors | TypeScript files. Move one when a non-dev needs to publish, or it passes ~200 rows |
| `directory_entry` | 70 editorial rows buying nothing. The real fix is `ytdReturn: '+18.5%'` → `ytd_return_pct: 18.5` in the TS file — a one-line diff that makes sorting work |
| `news` | No id, no slug, no URL — every card is `href='#'`. Nothing to store. Fix the links first |
| `prediction_vote` | Nobody has voted. Its "voter" would be a localStorage uuid — zero integrity |
| Auth, profile, org_member, watchlist, notifications, threads/posts, entitlements | Nothing on the site requires an identity |
| `ingest_job` / `ingest_run` / `ingest_watermark` | One Python file, one cron, Actions failure notifications. The watermark is `max(trade_date)` |
| Partitioning, TimescaleDB, materialized views, pgvector, any secondary index on `bar` | Add when a query plan shows a scan that matters |
| `fundamental` | Phase 4. Serves 8 hand-typed company pages today. When it lands: **one table, jsonb** — not an EAV `financial_line` + a 450-row dictionary |

If a table's justification contains "later", "portal", or "so the migration is cheap" — it is not a table.

---

## 4. Ingestion

**Python in GitHub Actions cron.** You already have the repo (`TienNguyen-Tie/VN-IR-Platform`).

Why not the alternatives:
- **Edge Functions**: Deno/TS only. (Pedantically they also run WASM, and Pyodide-in-WASM is real — but it can't carry pandas/psutil, and the 2s CPU limit is below Pyodide's init cost.)
- **pg_cron/pg_net**: runs SQL or fires HTTP. Still needs a Python host somewhere.

Notes:
- `sb_secret_*` in Actions secrets. Bypasses RLS.
- `.upsert(rows, on_conflict='instrument_id,trade_date', returning='minimal')` — the default `'representation'` sends every row back over the wire, wasting metered egress (5GB free) on a job that ignores the response.
- Batch ~500–1000 rows. No hard row cap; the limit is PostgREST timeout and payload size.
- **Initial backfill: use `COPY` over a direct connection, not REST.** REST at 500-row batches = ~8,000 round trips. This is the maintainer's explicit recommendation.

### Corporate actions — the gap every design has

This is the one that **silently corrupts data you already shipped**. VCI returns split- and dividend-adjusted series: every corporate action **retroactively restates every prior bar**. An incremental ingest that only fetches `max(trade_date) + 1` never notices, and your chart is quietly wrong forever.

Lazy fix, ~5 lines: each run, re-fetch one reference bar per ticker (say the close 250 sessions back). If it differs from stored, the series was restated → full re-fetch for that ticker. Cheap, catches every adjustment.

### Staleness will kill you silently

Three failure modes compound into a dark site with nobody noticing:
- GitHub disables workflows after 60 days with no commits.
- Supabase pauses free projects after ~7 days of low activity.
- Every free macro mirror returns stale data rather than erroring — WB GEM returns `'NA'`, IMF just stops at 2023-Q3.

So: **turn on Actions failure notifications day one**, assert on *observation recency* not just HTTP 200, and surface `as_of` in the UI.

---

## 5. Sequence

Phase 1 must be ≤5 days. Everything in it is visible on a page a visitor loads.

### Day 1 — no database at all
Fetch VN-Index/VN30 from **DNSE** directly in the browser. Delete `generateWalk` and the hardcoded "Last updated" literal. Real data on the homepage before a Supabase project exists. Zero infra.

### Day 2 — one table: `lead`
RLS on, insert-only for anon, no select policy, CHECK constraints, captcha before public. Wire `ContactPage` (which currently apologises twice for doing nothing) + the two IRM CTAs. This is the revenue path.

### Days 3–7 — `instrument`, `bar`, `series_point`, `src/lib/db.ts`
Hand-seed `series_point` with your ~30 macro figures via the Supabase table editor, each with `as_of` + `source_url`. Ingest bars for ~60 tracked symbols.

**Migration pattern — mandatory.** Rename each literal to `FALLBACK`, add one line:
```ts
const data = useData(FALLBACK, () => sb.from('bar').select())
```
`useData` is a ~40-line `useState`/`useEffect` hook. **No react-query, no SWR, no store** — add a cache when duplicate requests show up in the network tab. An empty table renders today's site. The migration is interruptible at any point; the site never breaks. Delete each `FALLBACK` in its own commit once its table is proven.

### Later
Phase 2: fix dead links (news/events/funds need slugs). Phase 3: search (tsvector/pg_trgm). Phase 4: `fundamental` as one jsonb table. Phase 5: auth — only when a feature needs an identity.

**AI Assistant**: the canned `getResponse` needs an Edge Function proxying the Anthropic API. The key must never reach the browser — that's a trust boundary, not a preference.

---

## 6. Open questions for you

1. ~~Is this commercial?~~ **Answered: no.** vnstock is cleared; see §0 for the residual grey area.
2. **Pro plan ($25/mo)?** Not needed at hobby scale. Free tier's 7-day pause is handled by the cron itself (§7).
3. **Python 3.9 → 3.10+** — required. vnstock needs >=3.10.

---

# 7. The live pipeline (semi-realtime + daily auto-update)

Target: refresh every ~2h during trading hours, everything auto-updates daily.

## 7.1 The single most useful finding

**`Trading().price_board(symbols)` returns the ENTIRE market in ONE request.** Verified live: all **1,545 symbols** (HOSE+HNX+UPCOM) in a single POST, **0.54s**. Includes last price, change, volume, **and foreign buy/sell volume + value**.

So your 2-hour refresh is *one HTTP request*. Not 60. Not rate-limited. The whole "semi-realtime" requirement costs one call.

Two gotchas, both verified:
- **`gap-chart` (OHLCV) does NOT batch.** Its payload takes a `symbols` array, but any list longer than 1 returns HTTP 200 with an **empty array** — tested across all timeframes and orderings. History is strictly one request per symbol.
- **Indices are a zeroed shell in `price_board`.** VNINDEX/VN30 must come from `ohlcv`. So the 2h job is `price_board` (1 call) + `ohlcv` × 2 indices = **3 requests**.

## 7.2 Schedule

Trading hours are **09:00–15:00 ICT**, unchanged by the KRX migration (live 5 May 2025). Vietnam has **never** observed DST — permanent UTC+7, confirmed against IANA tzdata. The window is fixed year-round at **02:00–08:00 UTC** and never crosses a UTC date boundary, so UTC cron maps cleanly with no date shift.

| Job | Cron (UTC) | ICT | Requests | Does |
|---|---|---|---|---|
| Intraday | `7 3,5,7 * * 1-5` | 10:07, 12:07, 14:07 | 3 | `price_board` + 2 indices → upsert today |
| EOD | `7 9 * * 1-5` | 16:07 | ~60 | `ohlcv` trailing 30 sessions per tracked symbol |
| Weekly | `7 9 * * 6` | Sat 16:07 | ~60 | Full 5y re-fetch — the corporate-action fix |

- **EOD at 16:00 ICT** — verified empirically: at T+54min after close, VCI and DNSE returned **byte-identical** OHLCV for VNM, and a re-poll was stable. Data is final by then.
- **Offset to `:07`, not `:00`.** GitHub's docs say load spikes at "the start of every hour". Don't queue into the stampede.
- Register the free **Community tier** (Google sign-in): 20→60 req/min. The 60-request EOD job goes from 3 min to 1. Not required — guest works — but free.

## 7.3 Three design rules that do all the work

### Rule 1: Take `trade_date` from the payload, never the clock

This single rule **deletes the entire holiday-calendar requirement.** If the cron fires on Tết, the API returns the last real session; you upsert that row again; it's a no-op. If you derived the date from `date.today()` instead, you'd write a **phantom bar** with stale prices.

vnstock ships no trading-calendar function anyway (just a hardcoded `MARKET_EVENTS` dict with a live bug in its `event_type` filter). You don't need one.

### Rule 2: Upsert a trailing window, not just today

I initially designed this as "upsert today's partial bar; it converges to the EOD value." **That's wrong**, and it was refuted against the live API.

Fetch the last **30 sessions** every run, not 1. `countBack=30` is the *same single request* as `countBack=1` — zero extra cost — and it fixes:
- post-close put-through revisions (15:00–15:15 ICT)
- **dropped cron runs** (see 7.4) — the next run backfills the gap automatically

This makes every run **idempotent and self-healing**. That property is what neutralizes GitHub Actions' unreliability, and it's why you don't need a better scheduler.

### Rule 3: Re-fetch full history weekly — corporate actions rewrite the past

**VCI serves back-adjusted prices.** Verified on HPG (1,200 sessions): **1,162 of 1,200 closes fall off the legal VN tick grid** (<10k → 10 VND, 10k–49.95k → 50, ≥50k → 100). Values like `26051.64`, `24591.16` are arithmetically *impossible* as traded prices. Only recent bars are round numbers. The boundary was exact and clean at 2026-05-22 — consistent with a 5% stock dividend restating every prior bar by 1/1.05.

**Every corporate action retroactively rewrites the entire history.** A trailing window does not catch this; an incremental ingest never notices, and your 5-year chart is quietly wrong forever.

The lazy fix is brute force: **re-fetch all 5 years, weekly.** 60 symbols × 1 request = 60 requests, ~2 min, once a week. Idempotent upsert. No detection logic, no reference-bar diffing, no corporate-actions table. Correct by construction.

## 7.4 GitHub Actions cron is unreliable — and that's fine

Do not skip this. GitHub's own docs admit it:

> "The schedule event can be delayed during periods of high loads... **If the load is sufficiently high enough, some queued jobs may be dropped.**"

2026 reality is *worse* than the docs. Community discussion #196910 documents a 00:40 UTC nightly drifting to **05:08 UTC** (4+ hours), and a 15-min cron firing every ~90 min — with a **GitHub Actions staff member confirming** "the drift on the start of our scheduled jobs has got worse" and "scheduled drops have grown **>30% in 2ish months**".

**Why you can ignore it:** Rules 1–3 make every run idempotent and self-healing. A dropped 12:07 run means the 14:07 run picks it up — it re-fetches 30 sessions regardless. A 40-minute drift means data is ~2.7h stale instead of 2h. For "semi-realtime", that's within tolerance.

Two things you must still do:
- **`concurrency:` group** — mandatory, not optional. Runs overlap by default and multi-hour drift makes overlap likely.
- **Cache pip** — otherwise `pip install vnstock` (pandas!) dominates runtime.

Cost: public repo = **free and unmetered**. Even 12 runs/day ≈ 1,100 min/mo would fit the private free tier.

## 7.5 The 60-day disable — your repo is public, so this applies

`TienNguyen-Tie/VN-IR-Platform` returns HTTP 200 → **public**. GitHub:

> "In a public repository, scheduled workflows are automatically disabled when **no repository activity has occurred in 60 days**."

A scheduled run does **not** self-sustain. Your site would silently go dark ~2 months after your last commit.

**⚠️ Do NOT use `gautamkrishnar/keepalive-workflow`** — the action every blog still recommends. It was **taken down by GitHub Staff for a ToS violation**, specifically for circumventing this policy. The dummy-commit keepalive is now an explicitly sanctioned-against pattern.

Legitimate options, laziest first:

1. **Make the repo private.** The rule is documented for public repos only. Zero work, zero risk. Do this if you don't need the repo public.
2. **Have the EOD job commit a real data snapshot.** A commit carrying genuine content isn't circumvention — it's a real artifact. Resets the timer *and* gives you free CDN reads (§7.6).
3. API-based re-enable (`liskin/gh-workflow-keepalive`) — works, but it implements the same behaviour GitHub sanctioned. I wouldn't.

## 7.6 Supabase specifics

**The pause solves itself.** Free projects pause after ~1 week of low activity; the docs say *"typically a few user requests to the database each day"* suffices, and name external API calls as qualifying. Your cron writes ~84×/week via PostgREST. Comfortably clear.

Two warnings:
- **Never use `pg_cron` as the keepalive.** It runs *inside* the database — a paused DB cannot run cron to un-pause itself. The heartbeat must come from outside. (This also kills the "pg_cron fires workflow_dispatch via pg_net" idea, which additionally puts a GitHub PAT in Postgres. Keep the arrow pointing GitHub → Supabase.)
- Don't lean on it as a guarantee. Supabase publishes no numeric threshold and hedges: *"even if you're actively using a project, it's possible that usage is not enough."*

**Skip Realtime.** Confirmed by adversarial review. Realtime only shortens the DB→client leg — the smallest term in your staleness budget (≤2h ingest + cron drift + delivery). Sub-second delivery of a possibly-40-minutes-late write is incoherent as a goal. Your data changes ~12×/day, so a held-open WebSocket almost never fires for a given visitor. **Fetch on page load.** If a left-open tab must self-update, add a `visibilitychange` listener that refetches on tab focus — one line, no WebSocket per tab.

**Egress — the one sharp edge.** Free tier is 5GB/mo, and **PostgREST responses are NOT CDN-cached** (cached egress applies only to Supabase Storage). Every chart fetch burns uncached quota: ~26k page loads/month at a 200KB payload. Fine for a hobby site — **don't optimize yet.** If it ever binds, that's when option 2 in §7.5 pays double: the cron commits a JSON snapshot, your static host serves it from CDN, and Supabase egress drops to zero.

## 7.7 Schema delta: almost none

The §3 schema already handles this. `PRIMARY KEY (instrument_id, trade_date)` + upsert *is* the refresh mechanism — the 2h job overwrites today's row in place. **No intraday table, no tick table, no schema change.**

One column, so the UI can be honest about freshness:
```
alter table bar add column updated_at timestamptz not null default now();
```
Render it: *"as of 14:07 ICT"*. Select `max(trade_date)`/`updated_at` alongside the data — staleness is dominated by cron drift, so show the real number rather than implying live.

Foreign buy/sell comes free in `price_board` — add two nullable columns when a page actually shows it. Not before.

## 7.8 Build order

1. **Register** vnstock Community tier (free, 60 req/min).
2. **Python 3.10+** locally.
3. `instrument` table, seed ~60 symbols, `tracked = true`.
4. One Python script, three modes: `intraday` / `eod` / `weekly`. Same upsert path — only the fetch differs.
5. Run all three **manually** until each is right. No cron yet.
6. Add the workflow: 3 crons, `concurrency:` group, pip cache, **failure notifications on**.
7. Decide §7.5 — private repo, or snapshot commit.
8. `useData(FALLBACK, ...)` per §5 to read it.

**Never derive `trade_date` from the clock. Always the payload.** If you take one thing from §7, that's it.
