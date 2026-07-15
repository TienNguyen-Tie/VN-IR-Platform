import { useState } from 'react'
import { ArrowRight, BookOpen, FileText, Video, Users, MessageSquare, type LucideIcon } from 'lucide-react'
import { SponsoredBy } from '../ui'

const irResources: {
  title: string
  description: string
  type: string
  duration: string
  level: string
  category: string
  icon: LucideIcon
}[] = [
  { title: 'IR Academy: Complete Certification Program', description: '12-week comprehensive course covering IR fundamentals, ESG reporting, and stakeholder engagement', type: 'Course', duration: '12 weeks', level: 'All Levels', category: 'IR Training', icon: BookOpen },
  { title: 'Quarterly Earnings Template Kit', description: 'Professional templates for earnings presentations, press releases, and investor materials', type: 'Template', duration: 'Download', level: 'Premium', category: 'IR Tools', icon: FileText },
  { title: 'ESG Reporting Masterclass', description: 'Learn best practices for sustainability reporting and stakeholder communication', type: 'Webinar', duration: '90 min', level: 'Intermediate', category: 'IR Training', icon: Video },
  { title: 'Vietnam IR Handbook 2026', description: 'Complete guide to regulatory requirements, disclosure rules, and market practices', type: 'Guide', duration: '145 pages', level: 'All Levels', category: 'IR Tools', icon: BookOpen },
  { title: 'Crisis Communication Workshop', description: 'Navigate challenging situations with effective investor communication strategies', type: 'Workshop', duration: '4 hours', level: 'Advanced', category: 'IR Training', icon: Video },
  { title: 'Investor Presentation Best Practices', description: 'Design compelling presentations that resonate with institutional investors', type: 'Course', duration: '6 weeks', level: 'Intermediate', category: 'IR Training', icon: BookOpen },
]

const investorResources: {
  title: string
  type: string
  category: string
  lessons: string
  duration: string
  icon: LucideIcon
}[] = [
  { title: "Vietnam Market 101: Beginner's Guide", type: 'Course', category: 'Getting Started', lessons: '12 lessons', duration: '3 hours', icon: BookOpen },
  { title: "Understanding Vietnam's Stock Exchanges", type: 'Video', category: 'Market Structure', lessons: '5 videos', duration: '45 min', icon: Video },
  { title: 'Investment Regulations & Tax Guide', type: 'Guide', category: 'Regulations', lessons: 'Complete guide', duration: '62 pages', icon: FileText },
  { title: 'Foreign Ownership Rules Explained', type: 'Article', category: 'Regulations', lessons: 'In-depth analysis', duration: '15 min read', icon: BookOpen },
  { title: 'Portfolio Construction Strategies', type: 'Workshop', category: 'Investment Strategy', lessons: 'Live session', duration: '2 hours', icon: Users },
  { title: 'Quarterly Market Update Series', type: 'Video Series', category: 'Market Insights', lessons: '4 episodes', duration: '120 min', icon: Video },
  { title: 'ESG Investment Framework for Vietnam', type: 'Guide', category: 'Sustainable Investing', lessons: 'Comprehensive guide', duration: '48 pages', icon: FileText },
  { title: 'Due Diligence Checklist for VN Companies', type: 'Template', category: 'Investment Tools', lessons: 'Downloadable template', duration: '25 pages', icon: FileText },
]

const discussions = [
  { title: 'Best sectors for long-term growth in Vietnam?', author: 'Michael Chen', replies: 24, time: '2 hours ago', category: 'Investment Strategy' },
  { title: 'FTSE inclusion on Sep 21 - portfolio positioning ideas?', author: 'Sarah Nguyen', replies: 18, time: '5 hours ago', category: 'Market Discussion' },
  { title: 'Recommended brokers for foreign investors', author: 'David Park', replies: 31, time: '1 day ago', category: 'Getting Started' },
  { title: 'Tax implications for dividend income', author: 'Emma Tran', replies: 15, time: '1 day ago', category: 'Regulations' },
]

const tabs = [
  { value: 'ir-professionals', label: 'IR Professionals' },
  { value: 'investors', label: 'Investors' },
  { value: 'community', label: 'Community' },
]

export function LearningHubSection() {
  const [tab, setTab] = useState('ir-professionals')

  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">IR & Learning Hub</h2>
            <p className="text-sm text-slate-600">Professional training, educational resources, and community insights</p>
          </div>
          <a href="#/resources" className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
            Resource Center <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mb-3">
          {/* Default shadcn-style tabs (muted pill list) */}
          <div className="mb-6 bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px]">
            {tabs.map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={`inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] ${
                  tab === t.value ? 'bg-card text-foreground shadow-sm' : 'text-foreground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'ir-professionals' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {irResources.map((r, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:border-orange-600 transition-colors p-4 cursor-pointer group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-orange-50 group-hover:bg-orange-100 transition-colors">
                      <r.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600">{r.type}</span>
                        <span className="text-xs text-slate-500">{r.duration}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm mb-2 text-slate-900 group-hover:text-orange-600 transition-colors">{r.title}</h3>
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">{r.description}</p>
                  <div className="text-xs text-orange-600">{r.level}</div>
                </a>
              ))}
            </div>
          )}

          {tab === 'investors' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {investorResources.map((r, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:border-orange-600 transition-colors p-4 cursor-pointer group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-orange-50 group-hover:bg-orange-100 transition-colors">
                      <r.icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-orange-600 mb-1">{r.category}</div>
                      <h4 className="text-sm text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{r.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2 py-0.5 bg-slate-100">{r.type}</span>
                    <div className="flex items-center gap-2">
                      <span>{r.lessons}</span>
                      <span>&bull;</span>
                      <span>{r.duration}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {tab === 'community' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Trending Discussions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {discussions.map((d, i) => (
                    <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white p-4 hover:border-orange-600 cursor-pointer group">
                      <div className="text-xs text-orange-600 mb-2">{d.category}</div>
                      <h4 className="text-sm text-slate-900 mb-3 leading-tight group-hover:text-orange-600 transition-colors">{d.title}</h4>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{d.author}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{d.replies}</span>
                          </div>
                          <span>{d.time}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h3>
                <div className="border bg-slate-50 divide-y">
                  {discussions.slice(0, 6).map((d, i) => (
                    <a key={i} href="#" onClick={(e) => e.preventDefault()} className="p-3 hover:bg-white cursor-pointer block group">
                      <h4 className="text-xs text-slate-900 mb-1 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">{d.title}</h4>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{d.replies}</span>
                        </div>
                        <span>{d.time}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="IR Global Network" website="https://www.irglobal.net" />
        </div>
      </div>
    </section>
  )
}
