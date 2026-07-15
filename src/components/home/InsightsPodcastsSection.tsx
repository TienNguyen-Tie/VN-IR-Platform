import { useState } from 'react'
import { ArrowRight, Headphones, BookOpen, Play, Pause, Clock } from 'lucide-react'
import { SponsoredBy, ImageWithFallback, TabButtons } from '../ui'
import { slugify } from '../../data/articles'

interface Podcast {
  title: string
  subtitle: string
  episode: string
  duration: string
  date: string
  host: string
  description?: string
  image: string
  featured?: boolean
}

const podcasts: Podcast[] = [
  {
    title: 'The Vietnam Investor',
    subtitle: 'FTSE Emerging Market Inclusion: The Final Countdown',
    episode: 'Episode 24',
    duration: '42 min',
    date: 'Jul 10, 2026',
    host: 'John Nguyen',
    description:
      "With Vietnam's FTSE emerging-market inclusion effective September 21, 2026, we discuss the phased index entry, expected passive flows, and what foreign investors should do before the switch.",
    image: 'https://images.unsplash.com/photo-1681569685386-b7bda397672e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJ1c2luZXNzJTIwZXhlY3V0aXZlcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYwNzc2NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    title: 'IR Leaders Roundtable',
    subtitle: 'Technology Sector Insights',
    episode: 'Episode 23',
    duration: '38 min',
    date: 'Jul 3, 2026',
    host: 'Dr. Pham Thu',
    image: 'https://images.unsplash.com/photo-1558949623-35b2e2649754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG9mZmljZSUyMHdvcmtlcnN8ZW58MXx8fHwxNzYwNzc2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Capital Markets Update',
    subtitle: 'Banking Sector Performance',
    episode: 'Episode 22',
    duration: '35 min',
    date: 'Jun 26, 2026',
    host: 'Linda Hoang',
    image: 'https://images.unsplash.com/photo-1584954490709-3c000d2ec110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc2MDc3NjU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Vietnam Market Pulse',
    subtitle: 'ESG Investing in Southeast Asia',
    episode: 'Episode 21',
    duration: '45 min',
    date: 'Jun 19, 2026',
    host: 'David Tran',
    image: 'https://images.unsplash.com/photo-1712704341675-d75096a6666c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lcnMlMjBwb3J0fGVufDF8fHx8MTc2MDc3MDI3OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'The IR Show',
    subtitle: 'Quarterly Earnings Best Practices',
    episode: 'Episode 20',
    duration: '29 min',
    date: 'Jun 12, 2026',
    host: 'Anna Nguyen',
    image: 'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZmFjdG9yeSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzYwNzc2NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Fintech Vietnam',
    subtitle: 'Digital Banking Revolution',
    episode: 'Episode 19',
    duration: '52 min',
    date: 'Jun 5, 2026',
    host: 'Mark Chen',
    image: 'https://images.unsplash.com/photo-1611250396725-294c6af32fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbnVmYWN0dXJpbmclMjB3b3JrZXJzfGVufDF8fHx8MTc2MDc3NjU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

const insights = [
  {
    title: "Vietnam's FTSE Emerging Market Entry: What September 21 Means for Investors",
    category: 'Market Analysis',
    date: 'Jul 8, 2026',
    readTime: '8 min',
    author: 'Dr. Nguyen Minh',
    image: 'https://images.unsplash.com/photo-1681569685386-b7bda397672e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJ1c2luZXNzJTIwZXhlY3V0aXZlcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYwNzc2NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'ESG Integration: Best Practices for Vietnamese IR Teams',
    category: 'IR Best Practices',
    date: 'Jul 2, 2026',
    readTime: '6 min',
    author: 'Sarah Chen',
    image: 'https://images.unsplash.com/photo-1758691737278-3af15b37af48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGNvcnBvcmF0ZSUyMHRlYW18ZW58MXx8fHwxNzYwNzc2NTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'H1 2026 Foreign Investment Trends: FDI Up 61% — Sector Deep Dive',
    category: 'Sector Focus',
    date: 'Jun 28, 2026',
    readTime: '10 min',
    author: 'Michael Tran',
    image: 'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZmFjdG9yeSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzYwNzc2NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: "The Future of Vietnam's Technology Sector",
    category: 'Tech Focus',
    date: 'Jun 22, 2026',
    readTime: '7 min',
    author: 'Jennifer Le',
    image: 'https://images.unsplash.com/photo-1719845788637-57ff1e230578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwdGVjaG5vbG9neSUyMG9mZmljZXxlbnwxfHx8fDE3NjA3NzY1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

export function InsightsPodcastsSection() {
  const [tab, setTab] = useState('podcasts')
  const [playing, setPlaying] = useState<string | null>(null)

  const featured = podcasts.find((p) => p.featured)
  const recent = podcasts.filter((p) => !p.featured)

  return (
    <section className="bg-slate-50 border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Insights & Podcasts</h2>
            <p className="text-sm text-slate-600">Expert analysis, research reports, and audio content</p>
          </div>
          <a href="#/insights" className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <TabButtons
          className="mb-6 bg-white border p-0 h-auto"
          tabs={[
            {
              value: 'podcasts',
              label: (
                <span className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />Podcasts
                </span>
              ),
            },
            {
              value: 'insights',
              label: (
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />Insights
                </span>
              ),
            },
          ]}
          active={tab}
          onChange={setTab}
        />

        {tab === 'podcasts' && (
          <div className="grid lg:grid-cols-2 gap-6 mb-3">
            {featured && (
              <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border flex flex-col">
                <div className="text-xs text-orange-400 mb-3">FEATURED EPISODE</div>
                <div className="h-64 relative overflow-hidden bg-slate-700 group mb-4">
                  <ImageWithFallback src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setPlaying(playing === featured.episode ? null : featured.episode)}
                      className="w-16 h-16 bg-orange-600 hover:bg-orange-700 transition-colors flex items-center justify-center"
                    >
                      {playing === featured.episode ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </button>
                  </div>
                </div>
                <h3 className="text-lg mb-2">{featured.title}</h3>
                <p className="text-sm text-slate-300 mb-3">{featured.subtitle}</p>
                {featured.description && (
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{featured.description}</p>
                )}
                <div className="flex flex-col gap-1 text-sm text-slate-400 mb-4">
                  <span>{featured.episode}</span>
                  <span>
                    {featured.duration} &bull; {featured.host}
                  </span>
                </div>
                <button className="w-full px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center justify-center gap-2 mt-auto">
                  <Play className="w-4 h-4" />
                  <span>Play Episode</span>
                </button>
              </div>
            )}

            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Episodes</h3>
              <div className="space-y-3 flex-1">
                {recent.map((ep, i) => (
                  <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:bg-slate-50 hover:border-orange-600 transition-colors p-3 group cursor-pointer flex gap-3">
                    <div className="w-20 h-20 relative overflow-hidden bg-slate-100 flex-shrink-0">
                      <ImageWithFallback src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setPlaying(playing === ep.episode ? null : ep.episode)
                          }}
                          className="w-8 h-8 bg-orange-600 hover:bg-orange-700 transition-colors flex items-center justify-center text-white"
                        >
                          {playing === ep.episode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-orange-600 mb-1">{ep.episode}</div>
                      <h4 className="text-sm mb-0.5 text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">{ep.title}</h4>
                      <p className="text-xs text-slate-500 mb-2 line-clamp-1">{ep.subtitle}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{ep.duration}</span>
                        <span>&bull;</span>
                        <span>{ep.host}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'insights' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
            {insights.map((n, i) => (
              <a key={i} href={`#/article/${slugify(n.title)}`} className="border bg-white hover:border-orange-600 transition-all overflow-hidden group">
                <div className="aspect-square relative overflow-hidden bg-slate-100">
                  <ImageWithFallback src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 bg-orange-600 text-white text-[10px] px-2 py-1">{n.category}</div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm mb-2 leading-tight line-clamp-2 text-slate-900 group-hover:text-orange-600 transition-colors">{n.title}</h3>
                  <div className="text-xs text-slate-500 mb-2">{n.author}</div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>{n.date}</span>
                    <span>&bull;</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{n.readTime}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <SponsoredBy companyName="VietnamIR Media" website="https://www.vietnamir.com" />
        </div>
      </div>
    </section>
  )
}
