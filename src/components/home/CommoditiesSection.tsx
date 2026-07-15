import { useState } from 'react'
import { Sparkles, TrendingUp } from 'lucide-react'
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
  RangeSelector,
  AIInsightTooltip,
  type AITooltipPayloadItem,
  type ChartRange,
} from '../ui'

/* World gold price $/oz — approximate path to July 2026 (~$4,018/oz spot) */
const goldData: Record<ChartRange, { month: string; price: number }[]> = {
  '1M': [
    { month: 'Jun 16', price: 3905 }, { month: 'Jun 18', price: 3940 }, { month: 'Jun 20', price: 3910 },
    { month: 'Jun 23', price: 3960 }, { month: 'Jun 25', price: 3990 }, { month: 'Jun 27', price: 3950 },
    { month: 'Jun 30', price: 3975 }, { month: 'Jul 2', price: 4010 }, { month: 'Jul 4', price: 4040 },
    { month: 'Jul 7', price: 4005 }, { month: 'Jul 9', price: 3980 }, { month: 'Jul 11', price: 4034 },
    { month: 'Jul 14', price: 4018 },
  ],
  '3M': [
    { month: 'Apr', price: 3650 }, { month: 'May', price: 3780 }, { month: 'Jun', price: 3900 }, { month: 'Jul', price: 4018 },
  ],
  '6M': [
    { month: 'Feb', price: 3520 }, { month: 'Mar', price: 3480 }, { month: 'Apr', price: 3650 },
    { month: 'May', price: 3780 }, { month: 'Jun', price: 3900 }, { month: 'Jul', price: 4018 },
  ],
  YTD: [
    { month: 'Jan', price: 3400 }, { month: 'Feb', price: 3520 }, { month: 'Mar', price: 3480 },
    { month: 'Apr', price: 3650 }, { month: 'May', price: 3780 }, { month: 'Jun', price: 3900 },
    { month: 'Jul', price: 4018 },
  ],
  '1Y': [
    { month: 'Jul 25', price: 3350 }, { month: 'Oct 25', price: 3520 }, { month: 'Jan 26', price: 3400 },
    { month: 'Apr 26', price: 3650 }, { month: 'Jul 26', price: 4018 },
  ],
  '3Y': [
    { month: '2023', price: 2080 }, { month: '2024', price: 2620 }, { month: '2025', price: 3350 }, { month: '2026', price: 4018 },
  ],
}

/* Per-datapoint insights — world gold context; SJC premium ~19M VND/tael in July 2026 */
const goldInsights: Record<string, string> = {
  '2023': 'Closed 2023 near $2,080/oz as central-bank buying set the stage for the bull run.',
  '2024': 'Closed 2024 near $2,620/oz — rate-cut bets and reserve accumulation drove gains.',
  '2025': '2025 close ~$3,350/oz — safe-haven demand through trade and currency tensions.',
  '2026': 'July 2026: spot $4,018/oz. SJC bars at 147.5M VND/tael — a ~19M premium over world price.',
  Jul: 'July 2026: spot $4,018/oz (Jul 14). SJC premium holds near 19M VND/tael.',
  'Jul 26': 'July 2026: spot $4,018/oz; domestic SJC price hit new highs on July 10.',
  Jun: 'June 2026: ~$3,900/oz — gold pushes to fresh records amid global uncertainty.',
  May: 'May 2026: ~$3,780/oz — momentum builds; domestic demand keeps the SJC premium wide.',
  Apr: 'April 2026: ~$3,650/oz — breakout resumes after a Q1 consolidation.',
  'Apr 26': 'April 2026: ~$3,650/oz — breakout resumes after a Q1 consolidation.',
  Mar: 'March 2026: ~$3,480/oz — brief pullback; SJC premium stays elevated.',
  Feb: 'February 2026: ~$3,520/oz — Lunar New Year gold-buying season supports prices.',
  Jan: 'January 2026: ~$3,400/oz — year opens with gold consolidating 2025’s surge.',
  'Jan 26': 'January 2026: ~$3,400/oz — consolidation after 2025’s surge.',
  'Oct 25': 'October 2025: ~$3,520/oz — safe-haven bid strengthens into year-end.',
  'Jul 25': 'July 2025: ~$3,350/oz — the starting point of a 20% twelve-month advance.',
}

const goldFallback = (_label: string, payload: AITooltipPayloadItem[]) => {
  const v = payload[0]?.value
  return typeof v === 'number'
    ? `World spot ≈ $${v.toLocaleString()}/oz — SJC bars trade at a wide premium domestically.`
    : null
}

/* Prices as of mid-July 2026 */
const commodities = [
  { name: 'Gold (SJC)', price: '147.5M VND', unit: '/tael', change: '+2.4%', positive: true, global: '$4,018/oz' },
  { name: 'Crude Oil (Brent)', price: '$77.20', unit: '/barrel', change: '+1.6%', positive: true, global: 'Global' },
  { name: 'Rice (5% broken)', price: '$448', unit: '/ton', change: '+0.7%', positive: true, global: 'Export' },
  { name: 'Coffee (Robusta)', price: '$3,990', unit: '/ton', change: '-2.1%', positive: false, global: 'Export' },
  { name: 'Rubber', price: '$1,680', unit: '/ton', change: '-0.8%', positive: false, global: 'Export' },
  { name: 'Steel', price: '$580', unit: '/ton', change: '+1.2%', positive: true, global: 'Domestic' },
]

export function CommoditiesSection() {
  const [range, setRange] = useState<ChartRange>('YTD')

  return (
    <section className="bg-slate-50 border-b">
      <div className="container mx-auto px-4 py-6">
        <SectionHeader
          title="Commodities & Precious Metals"
          subtitle="Key commodity prices and Vietnam's export products"
          linkText="View All"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border bg-white p-4 relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Gold (SJC)</h3>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-600">AI Insight</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl text-slate-900">147.5M VND</div>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" /><span>+2.4%</span>
              </div>
              <div className="text-xs text-slate-500 ml-2">per tael &bull; Global: $4,018/oz</div>
            </div>
            <RangeSelector value={range} onChange={setRange} />
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={goldData[range]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical horizontal />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip
                  content={
                    <AIInsightTooltip
                      getInsight={(label, payload) => goldInsights[label] ?? goldFallback(label, payload)}
                    />
                  }
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
                <Line type="linear" dataKey="price" name="Gold Price ($/oz)" stroke="#7c3612" strokeWidth={2.5} dot={{ fill: '#7c3612', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="border bg-white">
            <div className="p-4 bg-slate-50 border-b"><h3 className="text-sm">Other Commodities</h3></div>
            <div className="divide-y max-h-[320px] overflow-y-auto">
              {commodities.slice(1).map((c, i) => (
                <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-900">{c.name}</span>
                    <span className={`text-xs ${c.positive ? 'text-green-600' : 'text-red-600'}`}>{c.change}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-900">{c.price} <span className="text-slate-500">{c.unit}</span></span>
                    <span className="text-slate-500">{c.global}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="Sacombank" website="https://www.sacombank.com.vn" />
        </div>
      </div>
    </section>
  )
}
