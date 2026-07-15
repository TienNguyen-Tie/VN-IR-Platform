import { useMemo, useState } from 'react'
import { BookOpen, FileText, Search, Users, Video, type LucideIcon } from 'lucide-react'
import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { navigate } from '../components/ui'

type Audience = 'IR Professionals' | 'Investors'

interface Resource {
  title: string
  description?: string
  type: string
  duration: string
  level?: string
  lessons?: string
  category: string
  audience: Audience
  icon: LucideIcon
}

const resources: Resource[] = [
  /* IR-professional resources (from the Learning Hub) */
  { title: 'IR Academy: Complete Certification Program', description: '12-week comprehensive course covering IR fundamentals, ESG reporting, and stakeholder engagement', type: 'Course', duration: '12 weeks', level: 'All Levels', category: 'IR Training', audience: 'IR Professionals', icon: BookOpen },
  { title: 'Quarterly Earnings Template Kit', description: 'Professional templates for earnings presentations, press releases, and investor materials', type: 'Template', duration: 'Download', level: 'Premium', category: 'IR Tools', audience: 'IR Professionals', icon: FileText },
  { title: 'ESG Reporting Masterclass', description: 'Learn best practices for sustainability reporting and stakeholder communication', type: 'Webinar', duration: '90 min', level: 'Intermediate', category: 'IR Training', audience: 'IR Professionals', icon: Video },
  { title: 'Vietnam IR Handbook 2026', description: 'Complete guide to regulatory requirements, disclosure rules, and market practices', type: 'Guide', duration: '145 pages', level: 'All Levels', category: 'IR Tools', audience: 'IR Professionals', icon: BookOpen },
  { title: 'Crisis Communication Workshop', description: 'Navigate challenging situations with effective investor communication strategies', type: 'Workshop', duration: '4 hours', level: 'Advanced', category: 'IR Training', audience: 'IR Professionals', icon: Video },
  { title: 'Investor Presentation Best Practices', description: 'Design compelling presentations that resonate with institutional investors', type: 'Course', duration: '6 weeks', level: 'Intermediate', category: 'IR Training', audience: 'IR Professionals', icon: BookOpen },
  /* Investor resources (from the Learning Hub) */
  { title: "Vietnam Market 101: Beginner's Guide", type: 'Course', category: 'Getting Started', lessons: '12 lessons', duration: '3 hours', audience: 'Investors', icon: BookOpen },
  { title: "Understanding Vietnam's Stock Exchanges", type: 'Video', category: 'Market Structure', lessons: '5 videos', duration: '45 min', audience: 'Investors', icon: Video },
  { title: 'Investment Regulations & Tax Guide', type: 'Guide', category: 'Regulations', lessons: 'Complete guide', duration: '62 pages', audience: 'Investors', icon: FileText },
  { title: 'Foreign Ownership Rules Explained', type: 'Article', category: 'Regulations', lessons: 'In-depth analysis', duration: '15 min read', audience: 'Investors', icon: BookOpen },
  { title: 'Portfolio Construction Strategies', type: 'Workshop', category: 'Investment Strategy', lessons: 'Live session', duration: '2 hours', audience: 'Investors', icon: Users },
  { title: 'Quarterly Market Update Series', type: 'Video Series', category: 'Market Insights', lessons: '4 episodes', duration: '120 min', audience: 'Investors', icon: Video },
  { title: 'ESG Investment Framework for Vietnam', type: 'Guide', category: 'Sustainable Investing', lessons: 'Comprehensive guide', duration: '48 pages', audience: 'Investors', icon: FileText },
  { title: 'Due Diligence Checklist for VN Companies', type: 'Template', category: 'Investment Tools', lessons: 'Downloadable template', duration: '25 pages', audience: 'Investors', icon: FileText },
  /* New for the Resource Center */
  { title: 'FTSE Inclusion Playbook for Listed Companies', description: 'Prepare your company for FTSE EM inclusion: eligibility criteria, foreign-ownership disclosure, and index-fund investor targeting', type: 'Guide', duration: '36 pages', level: 'Intermediate', category: 'IR Tools', audience: 'IR Professionals', icon: FileText },
  { title: 'Navigating the CCP Transition 2027', description: 'What central counterparty clearing means for settlement cycles, prefunding requirements, and foreign investor access', type: 'Webinar', duration: '60 min', level: 'All Levels', category: 'Market Structure', audience: 'Investors', icon: Video },
]

const audiences = ['All', 'IR Professionals', 'Investors'] as const
const typeOptions = ['All', ...Array.from(new Set(resources.map((r) => r.type)))]

const stats = [
  { label: 'Resources', value: String(resources.length) },
  { label: 'Courses', value: String(resources.filter((r) => r.type === 'Course').length) },
  { label: 'Guides & Templates', value: String(resources.filter((r) => r.type === 'Guide' || r.type === 'Template').length) },
  { label: 'Audiences', value: String(new Set(resources.map((r) => r.audience)).size) },
]

export function ResourceCenterPage(nav: NavigationHandlers) {
  const [query, setQuery] = useState('')
  const [audience, setAudience] = useState<(typeof audiences)[number]>('All')
  const [type, setType] = useState('All')

  const filtered = useMemo(
    () =>
      resources.filter((r) => {
        const matchesQuery = r.title.toLowerCase().includes(query.trim().toLowerCase())
        const matchesAudience = audience === 'All' || r.audience === audience
        const matchesType = type === 'All' || r.type === type
        return matchesQuery && matchesAudience && matchesType
      }),
    [query, audience, type],
  )

  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2">RESOURCE CENTER</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">IR Academy &amp; Resource Center</h1>
            <p className="text-slate-600 max-w-2xl mb-6">
              Courses, guides, templates, and webinars for IR professionals and investors navigating Vietnam's capital
              markets.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="p-4 bg-white border">
                  <div className="text-2xl text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search + filters */}
        <section className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search resources by title..."
                  className="w-full border border-slate-300 bg-white pl-10 pr-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-600 transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {audiences.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAudience(a)}
                    className={`px-4 py-1.5 text-sm border transition-colors ${
                      audience === a
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-orange-600'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <div className="md:ml-auto flex items-center text-sm text-slate-600">
                {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">Type:</span>
              {typeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1 text-xs border transition-colors ${
                    type === t
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-orange-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resource grid */}
        <section className="bg-slate-50">
          <div className="container mx-auto px-4 py-6">
            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((r) => (
                  <a
                    key={r.title}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="border bg-white hover:border-orange-600 transition-colors p-4 cursor-pointer group flex flex-col"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-orange-50 group-hover:bg-orange-100 transition-colors">
                        <r.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600">{r.type}</span>
                          <span className="text-xs text-slate-500">{r.duration}</span>
                        </div>
                        <div className="text-xs text-slate-500">{r.category}</div>
                      </div>
                    </div>
                    <h3 className="text-sm mb-2 text-slate-900 group-hover:text-orange-600 transition-colors">{r.title}</h3>
                    {r.description && <p className="text-xs text-slate-600 mb-3 line-clamp-2">{r.description}</p>}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                      <div className="text-xs text-orange-600">{r.level ?? r.lessons ?? r.category}</div>
                      <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 flex-shrink-0">{r.audience}</span>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white border">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">
                  No resources found matching your search. Try a different keyword or clear the filters.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-2">Want expert help with your IR program?</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
              Connect with Vietnam's leading IR advisory firms, or dive into our latest research on the market events
              shaping your investor base.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('#/ir-services')}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm transition-colors"
              >
                Explore IR Services
              </button>
              <button
                onClick={() => navigate('#/insights')}
                className="px-6 py-2.5 border border-slate-600 hover:border-white text-white text-sm transition-colors"
              >
                Read our research
              </button>
            </div>
          </div>
        </section>
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
