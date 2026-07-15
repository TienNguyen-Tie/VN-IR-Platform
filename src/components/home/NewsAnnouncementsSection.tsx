import { useState } from 'react'
import { FileText, TrendingUp, DollarSign, Calendar, Clock, type LucideIcon } from 'lucide-react'
import { SectionHeader, SponsoredBy, ImageWithFallback, TabButtons, navigate } from '../ui'

/* Headlines aligned with the May–July 2026 news cycle */
const regulatoryNews = [
  { title: 'FTSE Russell confirms Vietnam emerging-market upgrade, effective September 21', source: 'SSC', time: '2 hours ago', category: 'Regulatory', image: 'https://images.unsplash.com/photo-1659869764315-dc3d188141fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50JTIwcmVndWxhdGlvbnxlbnwxfHx8fDE3NjA3NTc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Politburo Resolution 10 pivots FDI strategy toward higher-quality investment', source: 'Government Portal', time: '6 hours ago', category: 'Policy', image: 'https://images.unsplash.com/photo-1592114716576-0e4a1c6ba02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjB2aWV0bmFtfGVufDF8fHx8MTc2MDc1NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'SBV maintains policy rate at 4.5%, signals stability focus', source: 'State Bank of Vietnam', time: '1 day ago', category: 'Monetary Policy', image: 'https://images.unsplash.com/photo-1593789198777-f29bc259780e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzJTIwbWVkaWElMjBhcnRpY2xlfGVufDF8fHx8MTc2MDc1NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Nearly 300 stocks to migrate from HNX to HOSE under market restructuring plan', source: 'Ministry of Finance', time: '1 day ago', category: 'Market Infrastructure', image: 'https://images.unsplash.com/photo-1659869764315-dc3d188141fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50JTIwcmVndWxhdGlvbnxlbnwxfHx8fDE3NjA3NTc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Central counterparty (CCP) clearing on track for early-2027 rollout', source: 'HOSE', time: '2 days ago', category: 'Market Infrastructure', image: 'https://images.unsplash.com/photo-1593789198777-f29bc259780e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXdzJTIwbWVkaWElMjBhcnRpY2xlfGVufDF8fHx8MTc2MDc1NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { title: 'Tax incentives extended for foreign investors in priority sectors', source: 'Ministry of Finance', time: '3 days ago', category: 'Policy', image: 'https://images.unsplash.com/photo-1592114716576-0e4a1c6ba02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjB2aWV0bmFtfGVufDF8fHx8MTc2MDc1NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080' },
]

const announcements = [
  { company: 'VIC', companyName: 'Vingroup', type: 'Earnings', title: 'Q2 2026 Earnings Beat Estimates', date: 'Jul 14, 2026', time: '9:00 AM', details: 'Revenue: $3.6B (+14% YoY) • EPS: $0.51 (Est. $0.44)' },
  { company: 'VCB', companyName: 'Vietcombank', type: 'Dividend', title: 'Cash Dividend Announcement', date: 'Jul 11, 2026', time: '2:30 PM', details: 'Dividend: 2,500 VND/share • Ex-date: Aug 5, 2026' },
  { company: 'HPG', companyName: 'Hoa Phat Group', type: 'Earnings', title: 'Q2 2026 Financial Results', date: 'Jul 10, 2026', time: '4:00 PM', details: 'Revenue: $2.0B (+18% YoY) • Net Profit: $320M' },
  { company: 'FPT', companyName: 'FPT Corporation', type: 'Corporate Action', title: 'Share Buyback Program Initiated', date: 'Jul 9, 2026', time: '10:30 AM', details: 'Program Size: $100M • Duration: 6 months' },
  { company: 'MSN', companyName: 'Masan Group', type: 'Earnings', title: 'Q2 2026 Earnings Report', date: 'Jul 8, 2026', time: '3:00 PM', details: 'Revenue: $960M (+9% YoY) • EPS: $0.35' },
  { company: 'GAS', companyName: 'PetroVietnam Gas', type: 'Dividend', title: 'Special Dividend Declared', date: 'Jul 6, 2026', time: '11:00 AM', details: 'Dividend: 3,000 VND/share • Payment date: Aug 20' },
]

const getAnnouncementIcon = (type: string): LucideIcon => {
  switch (type) {
    case 'Earnings':
      return TrendingUp
    case 'Dividend':
      return DollarSign
    case 'Corporate Action':
      return FileText
    default:
      return Calendar
  }
}

export function NewsAnnouncementsSection() {
  const [tab, setTab] = useState('news')

  return (
    <section className="bg-slate-50 border-b">
      <div className="container mx-auto px-4 py-6">
        <SectionHeader
          title="News & Company Announcements"
          subtitle="Latest regulatory updates, policy changes, earnings reports, and corporate actions"
          linkText="View All"
          onLinkClick={() => navigate('#/news')}
        />

        <TabButtons
          className="mb-6 bg-white border p-0 h-auto"
          tabs={[
            {
              value: 'news',
              label: (
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />Regulatory News
                </span>
              ),
            },
            {
              value: 'announcements',
              label: (
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />Company Announcements
                </span>
              ),
            },
          ]}
          active={tab}
          onChange={setTab}
        />

        {tab === 'news' && (
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            {regulatoryNews.map((news, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:border-orange-600 transition-colors p-4 cursor-pointer group flex gap-3">
                <div className="w-16 h-16 flex-shrink-0 bg-slate-100 overflow-hidden">
                  <ImageWithFallback src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-2 text-slate-900 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">{news.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="text-orange-600">{news.category}</span>
                    <span>&bull;</span>
                    <span>{news.source}</span>
                    <span>&bull;</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /><span>{news.time}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {tab === 'announcements' && (
          <div className="border bg-white mb-3">
            <div className="divide-y">
              {announcements.map((a, i) => {
                const Icon = getAnnouncementIcon(a.type)
                return (
                  <a key={i} href="#" onClick={(e) => e.preventDefault()} className="p-4 hover:bg-slate-50 cursor-pointer flex items-start gap-4 group">
                    <div className="p-2 bg-orange-50 mt-0.5">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{a.company}</span>
                            <span className="text-xs text-slate-500">{a.companyName}</span>
                            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600">{a.type}</span>
                          </div>
                          <h3 className="text-sm text-slate-900 group-hover:text-orange-600 transition-colors">{a.title}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-500">{a.date}</div>
                          <div className="text-xs text-slate-400">{a.time}</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600">{a.details}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <SponsoredBy companyName="Vietnam Business Forum & SSI Securities" website="https://www.vbf.org.vn" />
        </div>
      </div>
    </section>
  )
}
