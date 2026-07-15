import { TrendingUp, TrendingDown } from 'lucide-react'
import { SectionHeader, SponsoredBy, navigate } from '../ui'

const fundStats = [
  { label: 'Total AUM', value: '$12.5B' },
  { label: 'Active Funds', value: '48' },
  { label: 'ETFs', value: '12' },
  { label: 'PE/VC Firms', value: '35' },
]

const funds: {
  name: string
  type: string
  nav: string
  change: string
  positive: boolean | null
  focus: string
  inception: string
}[] = [
  { name: 'VinaCapital Vietnam Opportunity Fund (VOF)', type: 'Closed-End Fund', nav: '$1.85B', change: '+3.2%', positive: true, focus: 'Listed Equities & Real Estate', inception: '2003' },
  { name: 'Dragon Capital Vietnam Enterprise Fund', type: 'Open-End Fund', nav: '$2.1B', change: '+2.8%', positive: true, focus: 'Public Equities', inception: '1994' },
  { name: 'Vietnam Enterprise Investments (VEIL)', type: 'Closed-End Fund', nav: '$876M', change: '+1.9%', positive: true, focus: 'Mid-Large Cap Stocks', inception: '1995' },
  { name: 'Mekong Capital', type: 'Private Equity', nav: '$450M', change: 'N/A', positive: null, focus: 'Growth Companies', inception: '2001' },
  { name: 'VN30 ETF', type: 'Exchange-Traded Fund', nav: '$450M', change: '+2.1%', positive: true, focus: 'Top 30 Stocks', inception: '2018' },
  { name: 'SSIAM VNFinLead ETF', type: 'Exchange-Traded Fund', nav: '$120M', change: '+3.5%', positive: true, focus: 'Financial Sector', inception: '2019' },
]

export function FundsSection() {
  return (
    <section className="bg-slate-50 border-b">
      <div className="container mx-auto px-4 py-6">
        <SectionHeader
          title="Funds & Capital Providers"
          subtitle="Investment funds, ETFs, and institutional capital managers"
          linkText="Fund Directory"
          onLinkClick={() => navigate('#/funds')}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {fundStats.map((stat, i) => (
            <div key={i} className="p-4 border bg-white">
              <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
              <div className="text-2xl text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
          {funds.map((fund, i) => (
            <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:border-orange-600 transition-colors p-4 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm mb-1 text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{fund.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-orange-50 text-orange-700">{fund.type}</span>
                </div>
              </div>
              <div className="flex items-end justify-between mb-3 pb-3 border-b">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">NAV / AUM</div>
                  <div className="text-lg text-slate-900">{fund.nav}</div>
                </div>
                {fund.positive !== null && (
                  <div className={`flex items-center gap-1 text-sm ${fund.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {fund.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>{fund.change}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Focus:</span><span className="text-slate-900">{fund.focus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Inception:</span><span className="text-slate-900">{fund.inception}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="Dragon Capital" website="https://www.dragon-capital.com" />
        </div>
      </div>
    </section>
  )
}
