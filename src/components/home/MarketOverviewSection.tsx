import { useId } from 'react'

function generateWalk(positive: boolean): number[] {
  const points = [100]
  for (let i = 1; i < 20; i++) {
    const delta = positive ? Math.random() * 3 - 1 : Math.random() * 3 - 2
    points.push(points[i - 1] + delta)
  }
  return points
}

function Sparkline({
  data,
  positive,
  width = 100,
  height = 40,
}: {
  data: number[]
  positive: boolean
  width?: number
  height?: number
}) {
  const gid = useId()
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  })
  const linePath = `M ${points.join(' L ')}`
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`
  const color = positive ? '#16a34a' : '#dc2626'

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gid})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/* Index levels as of July 14, 2026 */
const indices = [
  { label: 'VN-Index', value: '1,806.63', change: '+0.34%', changeValue: '+6.14', positive: true },
  { label: 'VN30', value: '1,880.24', change: '+0.5%', changeValue: '+9.36', positive: true },
  { label: 'HNX-Index', value: '306.67', change: '+0.4%', changeValue: '+1.22', positive: true },
  { label: 'UPCOM', value: '112.45', change: '-0.3%', changeValue: '-0.34', positive: false },
  { label: 'USD/VND', value: '26,400', change: '+0.1%', changeValue: '+26', positive: true },
  { label: 'Gold (SJC)', value: '147.5M', change: '+2.4%', changeValue: '+3.5M', positive: true },
].map((item) => ({ ...item, data: generateWalk(item.positive) }))

export function MarketOverviewSection() {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Market Overview</h2>
            <p className="text-sm text-slate-600">Real-time trading data across major indices</p>
          </div>
          <span className="text-xs text-slate-400">Last updated: Jul 14, 2026 3:45 PM ICT</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {indices.map((idx, i) => (
            <div key={i} className="flex flex-col">
              <div className="text-xs text-slate-600 mb-2">{idx.label}</div>
              <div className="mb-2 w-full">
                <Sparkline data={idx.data} positive={idx.positive} width={100} height={40} />
              </div>
              <div className="text-slate-900 mb-1">{idx.value}</div>
              <div className={`text-xs ${idx.positive ? 'text-green-600' : 'text-red-600'}`}>
                {idx.changeValue} ({idx.change})
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
