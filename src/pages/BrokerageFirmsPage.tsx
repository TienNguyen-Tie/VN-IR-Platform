import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { Building2, ExternalLink, Globe, Mail, MapPin, Phone, Search } from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import type { NavigationHandlers } from '../types'

/* ---------------------------------- Local UI primitives ---------------------------------- */

function Input({ className = '', type, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${className}`}
      {...props}
    />
  )
}

function Badge({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <span
      data-slot="badge"
      className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden ${className}`}
    >
      {children}
    </span>
  )
}

/* ---------------------------------- Data ---------------------------------- */

interface SecuritiesFirm {
  id: string
  name: string
  shortName: string
  type: string
  established: string
  marketShare: string
  totalAssets: string
  activeAccounts: string
  services: string[]
  headquarters: string
  branches: string
  phone: string
  email: string
  website: string
  license: string
  tier: 'top' | 'large' | 'medium'
}

const securitiesFirms: SecuritiesFirm[] = [
  {
    id: '1',
    name: 'SSI Securities Corporation',
    shortName: 'SSI',
    type: 'Full Service Brokerage',
    established: '1999',
    marketShare: '12.5%',
    totalAssets: '$1.2B',
    activeAccounts: '180,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending', 'Investment Banking', 'Asset Management', 'Research'],
    headquarters: 'Ho Chi Minh City',
    branches: '40+',
    phone: '+84 28 3824 8888',
    email: 'info@ssi.com.vn',
    website: 'https://www.ssi.com.vn',
    license: '01/UBCK-GP',
    tier: 'top',
  },
  {
    id: '2',
    name: 'VNDIRECT Securities Corporation',
    shortName: 'VND',
    type: 'Full Service Brokerage',
    established: '2006',
    marketShare: '9.8%',
    totalAssets: '$980M',
    activeAccounts: '150,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending', 'Investment Advisory', 'Research'],
    headquarters: 'Hanoi',
    branches: '35+',
    phone: '+84 24 3972 4568',
    email: 'info@vndirect.com.vn',
    website: 'https://www.vndirect.com.vn',
    license: '42/UBCK-GP',
    tier: 'top',
  },
  {
    id: '3',
    name: 'HSC Securities Corporation',
    shortName: 'HSC',
    type: 'Full Service Brokerage',
    established: '2002',
    marketShare: '8.2%',
    totalAssets: '$850M',
    activeAccounts: '120,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending', 'Investment Banking', 'Corporate Finance'],
    headquarters: 'Ho Chi Minh City',
    branches: '30+',
    phone: '+84 28 3823 3299',
    email: 'info@hsc.com.vn',
    website: 'https://www.hsc.com.vn',
    license: '15/UBCK-GP',
    tier: 'top',
  },
  {
    id: '4',
    name: 'VPS Securities Corporation',
    shortName: 'VPS',
    type: 'Full Service Brokerage',
    established: '2000',
    marketShare: '7.5%',
    totalAssets: '$780M',
    activeAccounts: '110,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending', 'Wealth Management', 'Research'],
    headquarters: 'Ho Chi Minh City',
    branches: '28+',
    phone: '+84 28 3930 1818',
    email: 'info@vps.com.vn',
    website: 'https://www.vps.com.vn',
    license: '03/UBCK-GP',
    tier: 'top',
  },
  {
    id: '5',
    name: 'MB Securities Corporation',
    shortName: 'MBS',
    type: 'Full Service Brokerage',
    established: '2007',
    marketShare: '6.8%',
    totalAssets: '$720M',
    activeAccounts: '95,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending', 'Investment Banking'],
    headquarters: 'Hanoi',
    branches: '32+',
    phone: '+84 24 3726 2600',
    email: 'info@mbs.com.vn',
    website: 'https://www.mbs.com.vn',
    license: '55/UBCK-GP',
    tier: 'large',
  },
  {
    id: '6',
    name: 'ACB Securities Corporation',
    shortName: 'ACBS',
    type: 'Full Service Brokerage',
    established: '2006',
    marketShare: '5.9%',
    totalAssets: '$650M',
    activeAccounts: '85,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending', 'Investment Advisory'],
    headquarters: 'Ho Chi Minh City',
    branches: '25+',
    phone: '+84 28 3914 3588',
    email: 'info@acbs.com.vn',
    website: 'https://www.acbs.com.vn',
    license: '42/UBCK-GP',
    tier: 'large',
  },
  {
    id: '7',
    name: 'Mirae Asset Securities Vietnam',
    shortName: 'MAS',
    type: 'Full Service Brokerage',
    established: '2008',
    marketShare: '5.2%',
    totalAssets: '$580M',
    activeAccounts: '75,000+',
    services: ['Stock Trading', 'Derivatives', 'Research', 'Investment Banking'],
    headquarters: 'Ho Chi Minh City',
    branches: '20+',
    phone: '+84 28 3911 2688',
    email: 'info@miraeasset.vn',
    website: 'https://www.miraeasset.vn',
    license: '72/UBCK-GP',
    tier: 'large',
  },
  {
    id: '8',
    name: 'Saigon Securities Inc.',
    shortName: 'SSI',
    type: 'Full Service Brokerage',
    established: '2007',
    marketShare: '4.8%',
    totalAssets: '$520M',
    activeAccounts: '68,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending'],
    headquarters: 'Ho Chi Minh City',
    branches: '22+',
    phone: '+84 28 3914 8888',
    email: 'info@ssi.com.vn',
    website: 'https://www.ssi.com.vn',
    license: '65/UBCK-GP',
    tier: 'large',
  },
  {
    id: '9',
    name: 'KIS Vietnam Securities Corporation',
    shortName: 'KIS',
    type: 'Retail Brokerage',
    established: '2013',
    marketShare: '4.1%',
    totalAssets: '$450M',
    activeAccounts: '62,000+',
    services: ['Stock Trading', 'Derivatives', 'Research'],
    headquarters: 'Ho Chi Minh City',
    branches: '18+',
    phone: '+84 28 3911 8888',
    email: 'info@kisvn.vn',
    website: 'https://www.kisvn.vn',
    license: '98/UBCK-GP',
    tier: 'medium',
  },
  {
    id: '10',
    name: 'Techcombank Securities Corporation',
    shortName: 'TCBS',
    type: 'Full Service Brokerage',
    established: '2006',
    marketShare: '3.9%',
    totalAssets: '$430M',
    activeAccounts: '58,000+',
    services: ['Stock Trading', 'Derivatives', 'Margin Lending', 'Wealth Management'],
    headquarters: 'Hanoi',
    branches: '24+',
    phone: '+84 24 3928 8080',
    email: 'info@tcbs.com.vn',
    website: 'https://www.tcbs.com.vn',
    license: '87/UBCK-GP',
    tier: 'medium',
  },
  {
    id: '11',
    name: 'Viet Capital Securities Corporation',
    shortName: 'VCSC',
    type: 'Full Service Brokerage',
    established: '2003',
    marketShare: '3.5%',
    totalAssets: '$380M',
    activeAccounts: '52,000+',
    services: ['Stock Trading', 'Investment Banking', 'Asset Management', 'Research'],
    headquarters: 'Ho Chi Minh City',
    branches: '16+',
    phone: '+84 28 3930 3456',
    email: 'info@vcsc.com.vn',
    website: 'https://www.vcsc.com.vn',
    license: '18/UBCK-GP',
    tier: 'medium',
  },
  {
    id: '12',
    name: 'VietinBank Securities Corporation',
    shortName: 'CTS',
    type: 'Full Service Brokerage',
    established: '2006',
    marketShare: '3.2%',
    totalAssets: '$350M',
    activeAccounts: '48,000+',
    services: ['Stock Trading', 'Derivatives', 'Investment Advisory'],
    headquarters: 'Hanoi',
    branches: '20+',
    phone: '+84 24 3972 6688',
    email: 'info@ctsvn.vn',
    website: 'https://www.ctsvn.vn',
    license: '51/UBCK-GP',
    tier: 'medium',
  },
]

/* ---------------------------------- Helpers ---------------------------------- */

function getTierColor(tier: string): string {
  switch (tier) {
    case 'top':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'large':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

function getTierLabel(tier: string): string {
  switch (tier) {
    case 'top':
      return 'Top Tier'
    case 'large':
      return 'Large'
    default:
      return 'Medium'
  }
}

const tierFilters = [
  { value: 'all', label: 'All' },
  { value: 'top', label: 'Top Tier' },
  { value: 'large', label: 'Large' },
  { value: 'medium', label: 'Medium' },
]

/* ---------------------------------- Page ---------------------------------- */

export function BrokerageFirmsPage(props: NavigationHandlers) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState('all')

  const filteredFirms = securitiesFirms.filter((firm) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      firm.name.toLowerCase().includes(query) || firm.shortName.toLowerCase().includes(query)
    const matchesTier = selectedTier === 'all' || firm.tier === selectedTier
    return matchesSearch && matchesTier
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <Header {...props} />

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl text-slate-900 mb-2">Securities Firms</h1>
              <p className="text-sm text-slate-600">
                Licensed brokerage firms and securities corporations in Vietnam
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="w-5 h-5 text-orange-600" />
              <span className="text-slate-900">{filteredFirms.length} Firms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name or ticker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Filter:</span>
              <div className="flex gap-2">
                {tierFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedTier(filter.value)}
                    className={`px-3 py-1.5 text-sm border transition-colors ${
                      selectedTier === filter.value
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Firms list */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {filteredFirms.map((firm) => (
              <div key={firm.id} className="bg-white border p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-slate-900">{firm.name}</h3>
                          <Badge className={`text-xs border ${getTierColor(firm.tier)}`}>
                            {getTierLabel(firm.tier)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <span className="text-orange-600">{firm.shortName}</span>
                          <span>•</span>
                          <span>{firm.type}</span>
                          <span>•</span>
                          <span>Est. {firm.established}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {firm.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Market Share</div>
                        <div className="text-sm text-slate-900">{firm.marketShare}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Total Assets</div>
                        <div className="text-sm text-slate-900">{firm.totalAssets}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Active Accounts</div>
                        <div className="text-sm text-slate-900">{firm.activeAccounts}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Branches</div>
                        <div className="text-sm text-slate-900">{firm.branches}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{firm.headquarters}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{firm.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{firm.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <a
                          href={firm.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
                        >
                          Website
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredFirms.length === 0 && (
              <div className="text-center py-12 bg-white border">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">
                  No securities firms found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <AIAssistant />
      <Footer />
    </div>
  )
}
