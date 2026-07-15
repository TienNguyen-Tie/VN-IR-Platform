import { useMemo, useState } from 'react'
import { Target, TrendingDown, TrendingUp, Users } from 'lucide-react'
import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { SponsoredBy } from '../components/ui'

interface Prediction {
  id: string
  question: string
  category: string
  yesVotes: number
  noVotes: number
  volume: string
  change: string
  positive: boolean
}

/* Community forecasts grounded in the July 2026 market context */
const predictions: Prediction[] = [
  { id: 'vnindex-2000', question: 'Will VN-Index reach 2,000 by end of 2026?', category: 'Market', yesVotes: 1840, noVotes: 1030, volume: '$62K', change: '+7%', positive: true },
  { id: 'ftse-smooth', question: 'Smooth FTSE EM inclusion on September 21, 2026?', category: 'Policy', yesVotes: 2650, noVotes: 620, volume: '$104K', change: '+9%', positive: true },
  { id: 'msci-2027', question: 'MSCI watchlist inclusion at the 2027 review?', category: 'Policy', yesVotes: 1420, noVotes: 1030, volume: '$47K', change: '+4%', positive: true },
  { id: 'vnd-depr', question: 'VND depreciation > 3% against USD in 2026?', category: 'Currency', yesVotes: 720, noVotes: 1400, volume: '$31K', change: '-6%', positive: false },
  { id: 'gdp-85', question: 'Full-year 2026 GDP growth ≥ 8.5%?', category: 'Economy', yesVotes: 1980, noVotes: 940, volume: '$58K', change: '+6%', positive: true },
  { id: 'foreign-buyers', question: 'Foreign investors turn net buyers in H2 2026?', category: 'Market', yesVotes: 1610, noVotes: 1120, volume: '$44K', change: '+5%', positive: true },
  { id: 'sbv-hold', question: 'SBV holds policy rate at 4.5% through 2026?', category: 'Economy', yesVotes: 2210, noVotes: 480, volume: '$39K', change: '+3%', positive: true },
  { id: 'fdi-45', question: 'Full-year 2026 registered FDI above $45B?', category: 'Economy', yesVotes: 1450, noVotes: 1010, volume: '$35K', change: '+4%', positive: true },
  { id: 'hnx-migration', question: 'Nearly 300 stocks complete HNX→HOSE migration by end-2026?', category: 'Policy', yesVotes: 1730, noVotes: 690, volume: '$29K', change: '+5%', positive: true },
]

const categories = ['All', 'Market', 'Economy', 'Policy', 'Currency']

interface Vote {
  yes: number
  no: number
  choice: 'yes' | 'no'
}

export function PredictionsPage(nav: NavigationHandlers) {
  const [category, setCategory] = useState('All')
  const [votes, setVotes] = useState<Record<string, Vote>>({})

  const filtered = useMemo(
    () => (category === 'All' ? predictions : predictions.filter((p) => p.category === category)),
    [category],
  )

  const castVote = (p: Prediction, choice: 'yes' | 'no') => {
    if (votes[p.id]) return
    setVotes((prev) => ({
      ...prev,
      [p.id]: {
        yes: p.yesVotes + (choice === 'yes' ? 1 : 0),
        no: p.noVotes + (choice === 'no' ? 1 : 0),
        choice,
      },
    }))
  }

  const totalVolume = '$449K'

  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2">MARKET PREDICTIONS</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">Prediction Markets</h1>
            <p className="text-slate-600 max-w-2xl mb-6">
              Community-driven forecasts on Vietnam's economic and market events. Cast your view and see where the
              crowd stands.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              <div className="p-3 bg-white border">
                <div className="text-2xl text-slate-900">{predictions.length}</div>
                <div className="text-xs text-slate-500">Open Markets</div>
              </div>
              <div className="p-3 bg-white border">
                <div className="text-2xl text-slate-900">{totalVolume}</div>
                <div className="text-xs text-slate-500">Total Volume</div>
              </div>
              <div className="p-3 bg-white border">
                <div className="text-2xl text-slate-900">14.5K</div>
                <div className="text-xs text-slate-500">Participants</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category filter */}
        <section className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 text-sm border transition-colors ${
                    category === c
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-orange-600'
                  }`}
                >
                  {c}
                </button>
              ))}
              <div className="ml-auto flex items-center text-sm text-slate-600">
                {filtered.length} {filtered.length === 1 ? 'market' : 'markets'}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="container mx-auto px-4 py-6">
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((p) => {
                const vote = votes[p.id]
                const yes = vote ? vote.yes : p.yesVotes
                const no = vote ? vote.no : p.noVotes
                const probability = Math.round((yes / (yes + no)) * 100)
                return (
                  <div key={p.id} className="border bg-white transition-colors">
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-sm text-slate-900 leading-tight">{p.question}</h3>
                        <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 flex-shrink-0">{p.category}</span>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1 text-xs">
                          <span className="text-green-600">YES {probability}%</span>
                          <span className="text-red-600">NO {100 - probability}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 relative">
                          <div className="h-full bg-green-600 absolute left-0 top-0" style={{ width: `${probability}%` }} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <button
                          onClick={() => castVote(p, 'yes')}
                          disabled={!!vote}
                          className={`py-1.5 text-xs border transition-colors ${
                            vote?.choice === 'yes'
                              ? 'bg-green-600 text-white border-green-600'
                              : 'border-slate-300 text-slate-700 hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:hover:border-slate-300 disabled:hover:text-slate-700'
                          }`}
                        >
                          Vote YES
                        </button>
                        <button
                          onClick={() => castVote(p, 'no')}
                          disabled={!!vote}
                          className={`py-1.5 text-xs border transition-colors ${
                            vote?.choice === 'no'
                              ? 'bg-red-600 text-white border-red-600'
                              : 'border-slate-300 text-slate-700 hover:border-red-600 hover:text-red-600 disabled:opacity-50 disabled:hover:border-slate-300 disabled:hover:text-slate-700'
                          }`}
                        >
                          Vote NO
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{yes + no} votes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            <span>{p.volume}</span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${p.positive ? 'text-green-600' : 'text-red-600'}`}>
                          {p.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          <span>{p.change}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-end">
              <SponsoredBy companyName="FPT Securities" website="https://www.fpts.com.vn" />
            </div>
          </div>
        </section>
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
