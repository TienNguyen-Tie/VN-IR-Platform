import { Users, Target, TrendingUp, TrendingDown } from 'lucide-react'
import { SectionHeader, SponsoredBy, navigate } from '../ui'

/* Questions updated for the July 2026 market context */
const predictions = [
  { question: 'Will VN-Index reach 2,000 by end of 2026?', probability: 64, yesVotes: 1840, noVotes: 1030, volume: '$62K', change: '+7%', positive: true },
  { question: 'Smooth FTSE EM inclusion on September 21, 2026?', probability: 81, yesVotes: 2650, noVotes: 620, volume: '$104K', change: '+9%', positive: true },
  { question: 'MSCI watchlist inclusion at the 2027 review?', probability: 58, yesVotes: 1420, noVotes: 1030, volume: '$47K', change: '+4%', positive: true },
  { question: 'VND depreciation > 3% against USD in 2026?', probability: 34, yesVotes: 720, noVotes: 1400, volume: '$31K', change: '-6%', positive: false },
]

export function PredictionsSection() {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <SectionHeader
          title="Market Predictions"
          subtitle="Community-driven forecasts on Vietnam's economic and market events"
          linkText="All Predictions"
          onLinkClick={() => navigate('#/predictions')}
        />

        <div className="grid md:grid-cols-2 gap-4 mb-3">
          {predictions.map((p, i) => (
            <div key={i} className="border bg-white hover:border-orange-600 transition-colors cursor-pointer">
              <div className="p-4">
                <h3 className="text-sm mb-3 text-slate-900 leading-tight">{p.question}</h3>
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-green-600">YES {p.probability}%</span>
                    <span className="text-red-600">NO {100 - p.probability}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 relative">
                    <div className="h-full bg-green-600 absolute left-0 top-0" style={{ width: `${p.probability}%` }} />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" /><span>{p.yesVotes + p.noVotes} votes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" /><span>{p.volume}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${p.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {p.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{p.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="FPT Securities" website="https://www.fpts.com.vn" />
        </div>
      </div>
    </section>
  )
}
