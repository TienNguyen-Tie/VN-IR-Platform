import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'
import {
  SectionHeader,
  SponsoredBy,
  ImageWithFallback,
  RangeSelector,
  AIInsightTooltip,
  navigate,
  type ChartRange,
} from '../ui'

/* Data updated July 2026 — sources: GSO/NSO, SBV, MoIT (see project README) */

const indicators = [
  { label: 'GDP Growth', value: '8.39%', change: 'Q2 2026 YoY', positive: true },
  { label: 'USD/VND', value: '26,400', change: '+0.4% YTD', positive: false },
  { label: 'Inflation', value: '4.69%', change: 'Jun, easing', positive: true },
  { label: 'Unemployment', value: '2.2%', change: 'Near historic low', positive: true },
  { label: 'Exports (H1)', value: '$266.5B', change: '+21.0%', positive: true },
  { label: 'Imports (H1)', value: '$283.2B', change: '+33.4%', positive: true },
  { label: 'Trade Balance', value: '-$16.7B', change: 'H1 deficit', positive: false },
  { label: 'Policy Rate', value: '4.50%', change: 'Unchanged', positive: true },
]

/* USD/VND market (interbank) rate — approximate path to July 2026 (~26,400) */
const fxData: Record<ChartRange, { month: string; rate: number }[]> = {
  '1M': [
    { month: 'Jun 16', rate: 26310 }, { month: 'Jun 18', rate: 26340 }, { month: 'Jun 20', rate: 26320 },
    { month: 'Jun 23', rate: 26360 }, { month: 'Jun 25', rate: 26390 }, { month: 'Jun 27', rate: 26350 },
    { month: 'Jun 30', rate: 26370 }, { month: 'Jul 2', rate: 26400 }, { month: 'Jul 4', rate: 26430 },
    { month: 'Jul 7', rate: 26410 }, { month: 'Jul 9', rate: 26380 }, { month: 'Jul 11', rate: 26420 },
    { month: 'Jul 14', rate: 26400 },
  ],
  '3M': [
    { month: 'Apr', rate: 26250 }, { month: 'May', rate: 26300 }, { month: 'Jun', rate: 26350 }, { month: 'Jul', rate: 26400 },
  ],
  '6M': [
    { month: 'Feb', rate: 26120 }, { month: 'Mar', rate: 26180 }, { month: 'Apr', rate: 26250 },
    { month: 'May', rate: 26300 }, { month: 'Jun', rate: 26350 }, { month: 'Jul', rate: 26400 },
  ],
  YTD: [
    { month: 'Jan', rate: 26050 }, { month: 'Feb', rate: 26120 }, { month: 'Mar', rate: 26180 },
    { month: 'Apr', rate: 26250 }, { month: 'May', rate: 26300 }, { month: 'Jun', rate: 26350 },
    { month: 'Jul', rate: 26400 },
  ],
  '1Y': [
    { month: 'Jul 25', rate: 26150 }, { month: 'Oct 25', rate: 26280 }, { month: 'Jan 26', rate: 26050 },
    { month: 'Apr 26', rate: 26250 }, { month: 'Jul 26', rate: 26400 },
  ],
  '3Y': [
    { month: '2023', rate: 24270 }, { month: '2024', rate: 25350 }, { month: '2025', rate: 26300 }, { month: '2026', rate: 26400 },
  ],
}

/* Quarterly GDP growth, % YoY — GSO/NSO actuals through Q2 2026 */
const gdpData: Record<ChartRange, { quarter: string; growth: number }[]> = {
  '1M': [
    { quarter: 'Q1 26', growth: 7.94 }, { quarter: 'Q2 26', growth: 8.39 },
  ],
  '3M': [
    { quarter: 'Q4 25', growth: 8.46 }, { quarter: 'Q1 26', growth: 7.94 }, { quarter: 'Q2 26', growth: 8.39 },
  ],
  '6M': [
    { quarter: 'Q1 26', growth: 7.94 }, { quarter: 'Q2 26', growth: 8.39 },
  ],
  YTD: [
    { quarter: 'Q1 26', growth: 7.94 }, { quarter: 'Q2 26', growth: 8.39 },
  ],
  '1Y': [
    { quarter: 'Q2 25', growth: 8.16 }, { quarter: 'Q3 25', growth: 8.25 }, { quarter: 'Q4 25', growth: 8.46 },
    { quarter: 'Q1 26', growth: 7.94 }, { quarter: 'Q2 26', growth: 8.39 },
  ],
  '3Y': [
    { quarter: '2023', growth: 5.05 }, { quarter: '2024', growth: 7.09 }, { quarter: '2025', growth: 8.02 },
    { quarter: '2026 H1', growth: 8.18 },
  ],
}

/* Per-datapoint insights — real SBV/GSO context for each label on the charts */
const fxInsights: Record<string, string> = {
  '2023': 'VND closed 2023 near 24,270/USD after the SBV cut its policy rate to 4.5% in June.',
  '2024': 'VND weakened ~4% through 2024 to ~25,350 amid a strong dollar and record FX demand.',
  '2025': 'VND ended 2025 near 26,300 — a managed slide inside the ±5% trading band.',
  '2026': 'Mid-2026: market rate ~26,400 vs central rate 25,220; band ceiling 26,481.',
  'Jul 26': 'July 2026: bank rate ~26,400. SBV signals continued stability with the policy rate at 4.50%.',
  Jul: 'July 2026: bank rate ~26,400. SBV holds the refinancing rate at 4.50%, unchanged since June 2023.',
  Jun: 'June 2026: ~26,350. Reserves and remittance inflows cushion seasonal USD demand.',
  May: 'May 2026: ~26,300. Depreciation pressure moderates as the Fed holds and exports surge.',
  Apr: 'April 2026: ~26,250. FTSE-related inflow expectations begin to support the currency.',
  'Apr 26': 'April 2026: ~26,250. FTSE confirmation (Apr 8) lifts foreign-inflow expectations.',
  Mar: 'March 2026: ~26,180. Trade-deficit months put mild pressure on the dong.',
  Feb: 'February 2026: ~26,120. Post-Tet import demand widens the trade gap.',
  Jan: 'January 2026: ~26,050. Year opens with the central rate on a gentle upward crawl.',
  'Jan 26': 'January 2026: ~26,050. Central rate crawl continues; band unchanged at ±5%.',
  'Oct 25': 'October 2025: ~26,280. Dong under pressure as imports for factory expansion accelerate.',
  'Jul 25': 'July 2025: ~26,150. SBV leans on the central-rate crawl rather than rate hikes.',
}

const fxFallback = (label: string, payload: { value?: number | string }[]) => {
  const v = payload[0]?.value
  return typeof v === 'number'
    ? `Market rate ${v.toLocaleString()} VND/USD — inside the SBV's ±5% band (central rate 25,220).`
    : null
}

const gdpInsights: Record<string, string> = {
  'Q2 26': 'Q2 2026 GDP +8.39% YoY — industry & construction +10.51%, services +7.87%, agriculture +4.06%.',
  'Q1 26': 'Q1 2026 +7.94% YoY (revised) — strongest first quarter on record; manufacturing +9.73%.',
  'Q4 25': 'Q4 2025 +8.46% — the fastest quarter of 2025, lifting full-year growth to 8.02%.',
  'Q3 25': 'Q3 2025 +8.25% YoY as exports and manufacturing output accelerated into year-end.',
  'Q2 25': 'Q2 2025 +8.16% YoY — the recovery broadened across industry and services.',
  '2023': '2023 full year +5.05% — a soft patch as global demand for exports slumped.',
  '2024': '2024 full year +7.09% — trade rebound and record FDI disbursement of $25.35B.',
  '2025': '2025 full year +8.02% — GDP reached $514B; per-capita income passed $5,000.',
  '2026 H1': 'H1 2026 +8.18% YoY — tracking the National Assembly’s ≥10% full-year target.',
}

const macroNews = [
  { title: "Vietnam's Q2 GDP rises 8.39% amid broad-based economic growth", time: '2h ago', image: 'https://images.unsplash.com/photo-1710702418104-6bf5419ab03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZWNvbm9taWMlMjBncm93dGglMjBjaGFydHxlbnwxfHx8fDE3NjA3ODA1MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'State Bank maintains policy rate at 4.5%, signals stability', time: '5h ago', image: 'https://images.unsplash.com/photo-1751376626564-5009d4c11291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwY2VudHJhbCUyMGJhbmt8ZW58MXx8fHwxNzYwNzgwNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'FDI inflows surge 61% in H1 to $34.65B, disbursement at 18-year high', time: '8h ago', image: 'https://images.unsplash.com/photo-1731834452954-bef04f4d3342?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZWxlY3Ryb25pY3MlMjBleHBvcnR8ZW58MXx8fHwxNzYwNzgwNTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'H1 trade deficit hits $16.65B as import boom feeds factory expansion', time: '1d ago', image: 'https://images.unsplash.com/photo-1759140968517-504546274b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwdHJhZGUlMjBjb21tZXJjZXxlbnwxfHx8fDE3NjA3ODA1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: "Moody's upgrades Vietnam's credit outlook to Positive, affirms Ba2", time: '1d ago', image: 'https://images.unsplash.com/photo-1617061607308-6b493e7c3f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwY3VycmVuY3klMjBtb25leXxlbnwxfHx8fDE3NjA3ODA1MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'June CPI eases to 4.69%, lowest since February 2025', time: '2d ago', image: 'https://images.unsplash.com/photo-1701398690557-5f51adfbbc1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwc3RvY2slMjBtYXJrZXR8ZW58MXx8fHwxNzYwNzgwNTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'Manufacturing leads H1 growth as electronics exports jump 20%', time: '2d ago', image: 'https://images.unsplash.com/photo-1684259499227-e9844ab79747?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZmFjdG9yeSUyMHdvcmtlcnN8ZW58MXx8fHwxNzYwNzgwNTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'VND steady near 26,400 as SBV holds course on policy stability', time: '3d ago', image: 'https://images.unsplash.com/photo-1758295124286-9169f061a30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZmluYW5jaWFsJTIwZGlzdHJpY3R8ZW58MXx8fHwxNzYwNzgwNTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
]

export function MacroSection() {
  const [fxRange, setFxRange] = useState<ChartRange>('6M')
  const [gdpRange, setGdpRange] = useState<ChartRange>('1Y')

  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <SectionHeader
          title="Macroeconomics"
          subtitle="Key economic indicators, exchange rates, and trade data"
          linkText="Economic Dashboard"
          onLinkClick={() => navigate('#/dashboard')}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {indicators.map((ind, i) => (
            <div key={i} className="p-3 bg-slate-50 border">
              <div className="text-xs text-slate-500 mb-1">{ind.label}</div>
              <div className="text-xl text-slate-900 mb-1">{ind.value}</div>
              <div className={`text-xs ${ind.positive ? 'text-green-600' : 'text-slate-600'}`}>{ind.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* VND/USD chart */}
          <div className="border p-4 bg-white relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">VND/USD Exchange Rate</h3>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-600">AI Insight</span>
              </div>
            </div>
            <RangeSelector value={fxRange} onChange={setFxRange} />
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={fxData[fxRange]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical horizontal />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} domain={[24000, 27000]} />
                <Tooltip
                  content={
                    <AIInsightTooltip
                      getInsight={(label, payload) => fxInsights[label] ?? fxFallback(label, payload)}
                    />
                  }
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
                <Line type="linear" dataKey="rate" name="USD/VND" stroke="#64748b" strokeWidth={2.5} dot={{ fill: '#64748b', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* GDP growth chart */}
          <div className="border p-4 bg-white relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">GDP Growth Rate (%)</h3>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-600">AI Insight</span>
              </div>
            </div>
            <RangeSelector value={gdpRange} onChange={setGdpRange} />
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={gdpData[gdpRange]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical horizontal />
                <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip
                  content={<AIInsightTooltip getInsight={(label) => gdpInsights[label] ?? null} />}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
                <Line type="linear" dataKey="growth" name="GDP Growth (%)" stroke="#ea580c" strokeWidth={2.5} dot={{ fill: '#ea580c', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {macroNews.map((news, i) => (
            <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-slate-50 hover:border-orange-600 transition-colors cursor-pointer flex gap-3 overflow-hidden h-24">
              <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                <p className="text-xs text-slate-900 leading-tight line-clamp-3">{news.title}</p>
                <span className="text-[10px] text-slate-500">{news.time}</span>
              </div>
              <div className="w-24 h-24 flex-shrink-0 bg-slate-100 overflow-hidden">
                <ImageWithFallback src={news.image} alt="" className="w-full h-full object-cover" />
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="State Bank of Vietnam" website="https://www.sbv.gov.vn" />
        </div>
      </div>
    </section>
  )
}
