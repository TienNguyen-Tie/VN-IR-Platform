import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Area,
} from 'recharts'
import {
  SponsoredBy,
  ImageWithFallback,
  RangeSelector,
  AIInsightTooltip,
  type AITooltipPayloadItem,
  type ChartRange,
} from '../ui'

/* VN-Index/VN30 paths through July 2026 (VN-Index ~1,806, June record ~1,937) */
const chartData: Record<ChartRange, { month: string; vnIndex: number; vn30: number; volume: number }[]> = {
  '1M': [
    { month: 'Jun 15', vnIndex: 1905, vn30: 1978, volume: 950 },
    { month: 'Jun 17', vnIndex: 1937, vn30: 2010, volume: 1080 },
    { month: 'Jun 19', vnIndex: 1912, vn30: 1985, volume: 890 },
    { month: 'Jun 22', vnIndex: 1888, vn30: 1962, volume: 760 },
    { month: 'Jun 24', vnIndex: 1902, vn30: 1975, volume: 820 },
    { month: 'Jun 26', vnIndex: 1875, vn30: 1948, volume: 700 },
    { month: 'Jun 29', vnIndex: 1890, vn30: 1960, volume: 780 },
    { month: 'Jul 1', vnIndex: 1858, vn30: 1930, volume: 720 },
    { month: 'Jul 3', vnIndex: 1872, vn30: 1945, volume: 810 },
    { month: 'Jul 6', vnIndex: 1845, vn30: 1918, volume: 690 },
    { month: 'Jul 8', vnIndex: 1820, vn30: 1895, volume: 640 },
    { month: 'Jul 9', vnIndex: 1840, vn30: 1912, volume: 710 },
    { month: 'Jul 10', vnIndex: 1815, vn30: 1888, volume: 620 },
    { month: 'Jul 13', vnIndex: 1800, vn30: 1874, volume: 650 },
    { month: 'Jul 14', vnIndex: 1807, vn30: 1880, volume: 680 },
  ],
  '3M': [
    { month: 'Apr', vnIndex: 1520, vn30: 1590, volume: 720 },
    { month: 'May', vnIndex: 1680, vn30: 1755, volume: 850 },
    { month: 'Jun', vnIndex: 1900, vn30: 1972, volume: 1050 },
    { month: 'Jul', vnIndex: 1807, vn30: 1880, volume: 680 },
  ],
  '6M': [
    { month: 'Feb', vnIndex: 1410, vn30: 1478, volume: 640 },
    { month: 'Mar', vnIndex: 1380, vn30: 1442, volume: 590 },
    { month: 'Apr', vnIndex: 1520, vn30: 1590, volume: 720 },
    { month: 'May', vnIndex: 1680, vn30: 1755, volume: 850 },
    { month: 'Jun', vnIndex: 1900, vn30: 1972, volume: 1050 },
    { month: 'Jul', vnIndex: 1807, vn30: 1880, volume: 680 },
  ],
  YTD: [
    { month: 'Jan', vnIndex: 1320, vn30: 1385, volume: 900 },
    { month: 'Feb', vnIndex: 1410, vn30: 1478, volume: 640 },
    { month: 'Mar', vnIndex: 1380, vn30: 1442, volume: 590 },
    { month: 'Apr', vnIndex: 1520, vn30: 1590, volume: 720 },
    { month: 'May', vnIndex: 1680, vn30: 1755, volume: 850 },
    { month: 'Jun', vnIndex: 1900, vn30: 1972, volume: 1050 },
    { month: 'Jul', vnIndex: 1807, vn30: 1880, volume: 680 },
  ],
  '1Y': [
    { month: 'Jul 25', vnIndex: 1232, vn30: 1290, volume: 620 },
    { month: 'Oct 25', vnIndex: 1450, vn30: 1515, volume: 780 },
    { month: 'Jan 26', vnIndex: 1320, vn30: 1385, volume: 900 },
    { month: 'Apr 26', vnIndex: 1520, vn30: 1590, volume: 720 },
    { month: 'Jul 26', vnIndex: 1807, vn30: 1880, volume: 680 },
  ],
  '3Y': [
    { month: '2023', vnIndex: 1130, vn30: 1135, volume: 420 },
    { month: '2024', vnIndex: 1267, vn30: 1320, volume: 550 },
    { month: '2025', vnIndex: 1466, vn30: 1530, volume: 700 },
    { month: '2026', vnIndex: 1807, vn30: 1880, volume: 680 },
  ],
}

/* Per-datapoint insights — VN-Index context around the 2026 rally and FTSE inclusion */
const RECORD_HIGH = 1937

const indexInsights: Record<string, string> = {
  'Jun 17': 'All-time high ~1,937 on June 17 — capping a 46% rally over twelve months.',
  'Jul 14': 'Closed at 1,806.63 (+0.34%) — ~7% below the June record ahead of Sep 21 FTSE inclusion.',
  Jan: 'January 2026: 1,320 — consolidation after the strong 2025 finish.',
  Feb: 'February 2026: 1,410 — foreign selling persists but domestic flows absorb supply.',
  Mar: 'March 2026: 1,380 — pullback on global risk-off; turnover stays near VND 30T/session.',
  Apr: 'April 2026: 1,520 — FTSE confirmation on April 8 ignites the spring leg higher.',
  May: 'May 2026: 1,680 — banks and brokers lead; liquidity ~VND 28-35T per session.',
  Jun: 'June 2026: record month — intraday peak near 1,937, up 46.6% year-on-year.',
  Jul: 'July 2026: 1,806 — pre-inclusion consolidation; foreign outflows ($2.9B YTD) expected to ease.',
  '2023': 'Ended 2023 near 1,130 — recovery year after the 2022 corporate-bond squeeze.',
  '2024': 'Ended 2024 near 1,267 — earnings recovery and record FDI underpin the market.',
  '2025': 'Ended 2025 near 1,466 — the FTSE-upgrade rally begins in earnest.',
  '2026': 'Mid-2026: 1,806 after a June record of ~1,937; FTSE EM inclusion lands Sep 21.',
  'Jul 25': 'July 2025: ~1,232 — the starting point of a 46.6% twelve-month advance.',
  'Oct 25': 'October 2025: ~1,450 — markets re-rate after FTSE announces the upgrade decision.',
  'Jan 26': 'January 2026: 1,320 — consolidation; migration of ~300 HNX stocks to HOSE begins.',
  'Apr 26': 'April 2026: 1,520 — upgrade confirmed for Sep 21; passive-flow estimates firm up.',
  'Jul 26': 'July 2026: 1,806 — ~7% below record as the market awaits index inclusion.',
}

const indexFallback = (_label: string, payload: AITooltipPayloadItem[]) => {
  const point = payload.find((p) => p.name === 'VN-Index')
  if (typeof point?.value !== 'number') return null
  const belowRecord = (((RECORD_HIGH - point.value) / RECORD_HIGH) * 100).toFixed(1)
  return `VN-Index ${point.value.toLocaleString()} — ${belowRecord}% below June's 1,937 record.`
}

const sectors = [
  { sector: 'Banking', change: '+3.2%', positive: true },
  { sector: 'Real Estate', change: '+2.8%', positive: true },
  { sector: 'Technology', change: '+4.5%', positive: true },
  { sector: 'Energy', change: '+1.2%', positive: true },
  { sector: 'Consumer', change: '-0.5%', positive: false },
  { sector: 'Manufacturing', change: '+2.1%', positive: true },
]

const news = [
  { title: 'VN-Index hit all-time high near 1,937 in June, up 46% over 12 months', time: '2h ago', image: 'https://images.unsplash.com/photo-1746037870491-b2e415517d0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0cmFkaW5nJTIwZmxvb3J8ZW58MXx8fHwxNzYwNjkwNTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Foreign outflows expected to ease ahead of September 21 FTSE inclusion', time: '4h ago', image: 'https://images.unsplash.com/photo-1711637397406-0c5fe8165dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMGV4Y2hhbmdlJTIwYm9hcmR8ZW58MXx8fHwxNzYwNzU5MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Nearly 300 stocks to migrate from HNX to HOSE by end of 2026', time: '6h ago', image: 'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzYwNzU5MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Technology stocks lead market rally with 4.5% gain', time: '1d ago', image: 'https://images.unsplash.com/photo-1760555960699-dc19c4104301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZmluYW5jZSUyMG1vZGVybnxlbnwxfHx8fDE3NjA2NjA2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Q2 2026 earnings season shows 15% average growth YoY', time: '1d ago', image: 'https://images.unsplash.com/photo-1631856952982-7db18c2bdca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwYW5hbHlzaXMlMjBncmFwaHxlbnwxfHx8fDE3NjA3NTkyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Market liquidity averages $1.1B per session in 2026', time: '2d ago', image: 'https://images.unsplash.com/photo-1733503747506-773e56e4078f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MDY5NjQxM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'VN30 index outperforms with 3.2% weekly gain', time: '2d ago', image: 'https://images.unsplash.com/photo-1746037870491-b2e415517d0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0cmFkaW5nJTIwZmxvb3J8ZW58MXx8fHwxNzYwNjkwNTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'CCP clearing rollout on track for early 2027, SSC confirms', time: '3d ago', image: 'https://images.unsplash.com/photo-1711637397406-0c5fe8165dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMGV4Y2hhbmdlJTIwYm9hcmR8ZW58MXx8fHwxNzYwNzU5MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
]

export function CapitalMarketSection() {
  const [timeframe, setTimeframe] = useState<ChartRange>('1M')
  const [showVolume, setShowVolume] = useState(false)

  const data = chartData[timeframe]

  const gradients = (
    <defs>
      <linearGradient id="colorVnIndex" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#ea580c" stopOpacity={0.2} />
        <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorVn30" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#fb7d3c" stopOpacity={0.2} />
        <stop offset="95%" stopColor="#fb7d3c" stopOpacity={0} />
      </linearGradient>
    </defs>
  )

  return (
    <section className="bg-slate-50 border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Capital Market Performance</h2>
            <p className="text-sm text-slate-600">Listed equity markets performance and trading activity</p>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
            View Details <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white border p-4 relative lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">VN-Index & VN30 Performance</h3>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-600">AI Insight</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-2 py-1 border border-slate-300 rounded">
                <input
                  type="checkbox"
                  id="volumeToggle"
                  checked={showVolume}
                  onChange={(e) => setShowVolume(e.target.checked)}
                  className="w-3 h-3 accent-orange-600 cursor-pointer"
                />
                <label htmlFor="volumeToggle" className="text-[10px] text-slate-600 cursor-pointer">
                  Trading Volume
                </label>
              </div>
              <RangeSelector value={timeframe} onChange={setTimeframe} />
            </div>

            <ResponsiveContainer width="100%" height={280}>
              {showVolume ? (
                <ComposedChart data={data}>
                  {gradients}
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical horizontal />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                  <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                  <Tooltip
                    content={
                      <AIInsightTooltip
                        getInsight={(label, payload) => indexInsights[label] ?? indexFallback(label, payload)}
                      />
                    }
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
                  <Bar yAxisId="right" dataKey="volume" name="Volume (M)" fill="#431407" barSize={8} />
                  <Area yAxisId="left" type="linear" dataKey="vnIndex" name="VN-Index" stroke="#ea580c" strokeWidth={2.5} fill="url(#colorVnIndex)" />
                  <Area yAxisId="left" type="linear" dataKey="vn30" name="VN30" stroke="#fb7d3c" strokeWidth={2.5} fill="url(#colorVn30)" />
                </ComposedChart>
              ) : (
                <AreaChart data={data}>
                  {gradients}
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical horizontal />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                  <Tooltip
                    content={
                      <AIInsightTooltip
                        getInsight={(label, payload) => indexInsights[label] ?? indexFallback(label, payload)}
                      />
                    }
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} iconType="line" />
                  <Area type="linear" dataKey="vnIndex" name="VN-Index" stroke="#ea580c" strokeWidth={2.5} fill="url(#colorVnIndex)" />
                  <Area type="linear" dataKey="vn30" name="VN30" stroke="#fb7d3c" strokeWidth={2.5} fill="url(#colorVn30)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="border bg-white lg:col-span-1">
            <div className="p-4 bg-slate-50 border-b">
              <h3 className="text-sm font-semibold">Sector Performance</h3>
            </div>
            <div className="divide-y">
              {sectors.map((s, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-900">{s.sector}</span>
                    <span className={`text-sm ${s.positive ? 'text-green-600' : 'text-red-600'}`}>{s.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 mb-3">
          {news.map((item, i) => (
            <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:border-orange-600 transition-colors cursor-pointer flex gap-3 overflow-hidden h-24">
              <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                <p className="text-xs text-slate-900 leading-tight line-clamp-3">{item.title}</p>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
              <div className="w-24 h-24 flex-shrink-0 bg-slate-100 overflow-hidden">
                <ImageWithFallback src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="Vietcombank Securities" website="https://www.vcbs.com.vn" />
        </div>
      </div>
    </section>
  )
}
