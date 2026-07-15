import { useState } from 'react'
import { Building2, TrendingUp, DollarSign, type LucideIcon } from 'lucide-react'
import { SectionHeader, SponsoredBy, TabButtons, navigate } from '../ui'

const privateMarketStats: { label: string; value: string; icon: LucideIcon }[] = [
  { label: 'Private Companies', value: '850K+', icon: Building2 },
  { label: 'Unicorns', value: '4', icon: TrendingUp },
  { label: 'VC Investment 2026 YTD', value: '$0.8B', icon: TrendingUp },
  { label: 'Jobs Created', value: '450K', icon: DollarSign },
]

const highGrowthCompanies = [
  { name: 'Thaco Auto', sector: 'Automotive', valuation: '$2.1B', funding: 'Series C', employees: '15,000', founded: '1997', headquarters: 'Quang Nam' },
  { name: 'VNG Corporation', sector: 'Technology', valuation: '$1.8B', funding: 'Series D', employees: '3,200', founded: '2004', headquarters: 'Ho Chi Minh City' },
  { name: 'Highlands Coffee', sector: 'F&B', valuation: '$850M', funding: 'PE Backed', employees: '8,500', founded: '1998', headquarters: 'Ho Chi Minh City' },
  { name: 'MoMo', sector: 'Fintech', valuation: '$2.0B', funding: 'Series E', employees: '1,800', founded: '2007', headquarters: 'Ho Chi Minh City' },
  { name: 'Tiki', sector: 'E-commerce', valuation: '$800M', funding: 'Series D', employees: '2,400', founded: '2010', headquarters: 'Ho Chi Minh City' },
  { name: 'Sendo', sector: 'E-commerce', valuation: '$420M', funding: 'Series C', employees: '950', founded: '2012', headquarters: 'Hanoi' },
]

const earlyStageVCs = [
  { name: 'IDG Ventures Vietnam', focus: 'Early Stage Tech', deals: '12', ticket: '$2-5M', portfolio: '35+' },
  { name: 'Vertex Ventures', focus: 'Series A/B', deals: '8', ticket: '$5-15M', portfolio: '28' },
  { name: '500 Startups Vietnam', focus: 'Pre-seed/Seed', deals: '22', ticket: '$100K-1M', portfolio: '60+' },
  { name: 'Nextrans', focus: 'Seed Stage', deals: '15', ticket: '$500K-3M', portfolio: '42' },
]

const growthVCs = [
  { name: 'Openspace Ventures', focus: 'Growth Stage', deals: '6', ticket: '$10-30M', portfolio: '18' },
  { name: 'Jungle Ventures', focus: 'Series B+', deals: '5', ticket: '$15-50M', portfolio: '22' },
  { name: 'Dragon Capital', focus: 'Late Stage', deals: '4', ticket: '$20-100M', portfolio: '15' },
  { name: 'VinaCapital Ventures', focus: 'Growth Equity', deals: '7', ticket: '$10-50M', portfolio: '25' },
]

const peFirms = [
  { name: 'Warburg Pincus', focus: 'Growth Equity', deals: '3', ticket: '$50M+', portfolio: '8' },
  { name: 'TPG Capital', focus: 'Buyout/PE', deals: '2', ticket: '$100M+', portfolio: '5' },
  { name: 'Mekong Capital', focus: 'Mid-market PE', deals: '4', ticket: '$30-80M', portfolio: '12' },
  { name: 'Navis Capital', focus: 'Buyout', deals: '3', ticket: '$50-150M', portfolio: '7' },
]

const vcTabs = {
  early: earlyStageVCs,
  growth: growthVCs,
  pe: peFirms,
} as const

export function PrivateCompaniesSection() {
  const [tab, setTab] = useState<keyof typeof vcTabs>('early')

  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <SectionHeader
          title="Private Companies & Startups"
          subtitle="Vietnam's emerging private market and venture capital landscape"
          linkText="Private Market Hub"
          onLinkClick={() => navigate('#/private-market')}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {privateMarketStats.map((stat, i) => (
            <div key={i} className="p-4 border-l-4 border-orange-600 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className="w-4 h-4 text-orange-600" />
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
              <div className="text-2xl text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="border bg-white overflow-hidden mb-6">
          <div className="p-4 bg-slate-50 border-b">
            <h3 className="text-sm">High-Growth Companies</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left text-xs text-slate-600 px-4 py-3">Company</th>
                  <th className="text-left text-xs text-slate-600 px-4 py-3">Sector</th>
                  <th className="text-right text-xs text-slate-600 px-4 py-3">Valuation</th>
                  <th className="text-right text-xs text-slate-600 px-4 py-3">Funding Stage</th>
                  <th className="text-right text-xs text-slate-600 px-4 py-3">Founded</th>
                  <th className="text-right text-xs text-slate-600 px-4 py-3">Headquarters</th>
                  <th className="text-right text-xs text-slate-600 px-4 py-3">Employees</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {highGrowthCompanies.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50 cursor-pointer">
                    <td className="px-4 py-3"><div className="text-sm text-slate-900">{c.name}</div></td>
                    <td className="px-4 py-3"><span className="text-sm text-slate-600">{c.sector}</span></td>
                    <td className="px-4 py-3 text-right text-sm">{c.valuation}</td>
                    <td className="px-4 py-3 text-right"><span className="text-xs px-2 py-1 bg-orange-50 text-orange-700">{c.funding}</span></td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600">{c.founded}</td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600">{c.headquarters}</td>
                    <td className="px-4 py-3 text-right text-sm">{c.employees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <TabButtons
            tabs={[
              { value: 'early', label: 'Early Stage VCs' },
              { value: 'growth', label: 'Growth VCs' },
              { value: 'pe', label: 'Private Equity' },
            ]}
            active={tab}
            onChange={(v) => setTab(v as keyof typeof vcTabs)}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vcTabs[tab].map((vc, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="p-4 border bg-white hover:border-orange-600 transition-colors cursor-pointer">
                <h4 className="text-sm text-slate-900 mb-2">{vc.name}</h4>
                <div className="text-xs text-slate-600 mb-3">{vc.focus}</div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Ticket Size:</span><span className="text-slate-900">{vc.ticket}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Deals 2026:</span><span className="text-slate-900">{vc.deals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Portfolio:</span><span className="text-slate-900">{vc.portfolio}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="VinaCapital Ventures" website="https://www.vinacapital.com" />
        </div>
      </div>
    </section>
  )
}
