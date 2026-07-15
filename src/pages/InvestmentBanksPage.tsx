import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { Building, Globe, Mail, MapPin, Phone, Search, TrendingUp } from 'lucide-react'
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

interface InvestmentBank {
  id: string
  name: string
  shortName: string
  type: string
  established: string
  dealVolume: string
  services: string[]
  sectors: string[]
  headquarters: string
  phone: string
  email: string
  website: string
  tier: 'bulge' | 'mid-market' | 'boutique'
}

const investmentBanks: InvestmentBank[] = [
  {
    id: '1',
    name: 'SSI Investment Banking',
    shortName: 'SSIB',
    type: 'Local',
    established: '2005',
    dealVolume: '$2.4B+ (2025)',
    services: ['M&A Advisory', 'ECM', 'DCM', 'Privatization', 'Restructuring', 'Valuation'],
    sectors: ['Technology', 'Real Estate', 'Financial Services', 'Manufacturing', 'Consumer'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3824 8888',
    email: 'ib@ssi.com.vn',
    website: 'https://www.ssi.com.vn',
    tier: 'bulge',
  },
  {
    id: '2',
    name: 'HSBC Vietnam',
    shortName: 'HSBC',
    type: 'Global',
    established: '1995',
    dealVolume: '$1.8B+ (2025)',
    services: ['M&A Advisory', 'ECM', 'DCM', 'Syndicated Loans', 'Trade Finance'],
    sectors: ['Financial Services', 'Infrastructure', 'Energy', 'Real Estate'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3829 2288',
    email: 'vietnam@hsbc.com',
    website: 'https://www.hsbc.com.vn',
    tier: 'bulge',
  },
  {
    id: '3',
    name: 'Credit Suisse Vietnam',
    shortName: 'CS',
    type: 'Global',
    established: '2009',
    dealVolume: '$1.5B+ (2025)',
    services: ['M&A Advisory', 'ECM', 'Debt Capital Markets', 'Private Placements'],
    sectors: ['Consumer', 'Technology', 'Healthcare', 'Industrials'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3827 3600',
    email: 'vietnam@credit-suisse.com',
    website: 'https://www.credit-suisse.com',
    tier: 'bulge',
  },
  {
    id: '4',
    name: 'Viet Capital Securities Investment Banking',
    shortName: 'VCSC IB',
    type: 'Local',
    established: '2003',
    dealVolume: '$980M+ (2025)',
    services: ['M&A Advisory', 'ECM', 'DCM', 'Corporate Finance', 'Fairness Opinions'],
    sectors: ['Real Estate', 'Consumer', 'Financial Services', 'Infrastructure'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3930 3456',
    email: 'ib@vcsc.com.vn',
    website: 'https://www.vcsc.com.vn',
    tier: 'mid-market',
  },
  {
    id: '5',
    name: 'Dragon Capital Markets',
    shortName: 'DCM',
    type: 'Regional',
    established: '2001',
    dealVolume: '$850M+ (2025)',
    services: ['M&A Advisory', 'Private Equity', 'Corporate Finance', 'IPO Advisory'],
    sectors: ['Consumer', 'Real Estate', 'Financial Services', 'Manufacturing'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3910 9800',
    email: 'ib@dragoncapital.com',
    website: 'https://www.dragoncapital.com',
    tier: 'mid-market',
  },
  {
    id: '6',
    name: 'Standard Chartered Bank Vietnam',
    shortName: 'SCB',
    type: 'Global',
    established: '1990',
    dealVolume: '$720M+ (2025)',
    services: ['Trade Finance', 'Syndicated Loans', 'Project Finance', 'DCM'],
    sectors: ['Infrastructure', 'Energy', 'Manufacturing', 'Trade'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3911 0000',
    email: 'vietnam@sc.com',
    website: 'https://www.sc.com/vn',
    tier: 'bulge',
  },
  {
    id: '7',
    name: 'KB Securities Vietnam',
    shortName: 'KBSV IB',
    type: 'Regional',
    established: '2012',
    dealVolume: '$650M+ (2025)',
    services: ['M&A Advisory', 'ECM', 'Corporate Finance', 'Cross-border Transactions'],
    sectors: ['Technology', 'Financial Services', 'Consumer', 'Healthcare'],
    headquarters: 'Hanoi',
    phone: '+84 24 3776 5929',
    email: 'ib@kbsec.com.vn',
    website: 'https://www.kbsec.com.vn',
    tier: 'mid-market',
  },
  {
    id: '8',
    name: 'VinaCapital Investment Banking',
    shortName: 'VCIB',
    type: 'Regional',
    established: '2003',
    dealVolume: '$580M+ (2025)',
    services: ['M&A Advisory', 'Private Equity', 'Fund Raising', 'Corporate Finance'],
    sectors: ['Real Estate', 'Infrastructure', 'Financial Services', 'Consumer'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3821 9930',
    email: 'ib@vinacapital.com',
    website: 'https://www.vinacapital.com',
    tier: 'mid-market',
  },
  {
    id: '9',
    name: 'Maybank Investment Banking Vietnam',
    shortName: 'Maybank IB',
    type: 'Regional',
    established: '2008',
    dealVolume: '$420M+ (2025)',
    services: ['M&A Advisory', 'ECM', 'Syndicated Loans', 'Corporate Finance'],
    sectors: ['Financial Services', 'Consumer', 'Manufacturing'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3829 9299',
    email: 'vietnam.ib@maybank.com',
    website: 'https://www.maybank-ib.com',
    tier: 'mid-market',
  },
  {
    id: '10',
    name: 'Asia Commercial Bank Investment Banking',
    shortName: 'ACB IB',
    type: 'Local',
    established: '2010',
    dealVolume: '$350M+ (2025)',
    services: ['M&A Advisory', 'Corporate Finance', 'Debt Advisory', 'Restructuring'],
    sectors: ['Real Estate', 'Manufacturing', 'Consumer', 'Agriculture'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3911 8888',
    email: 'ib@acb.com.vn',
    website: 'https://www.acb.com.vn',
    tier: 'boutique',
  },
]

/* ---------------------------------- Helpers ---------------------------------- */

const bankTypes = ['All', 'Global', 'Regional', 'Local']

function getTierColor(tier: string): string {
  switch (tier) {
    case 'bulge':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'mid-market':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'boutique':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

function getTierLabel(tier: string): string {
  switch (tier) {
    case 'bulge':
      return 'Bulge Bracket'
    case 'mid-market':
      return 'Mid-Market'
    default:
      return 'Boutique'
  }
}

/* ---------------------------------- Page ---------------------------------- */

export function InvestmentBanksPage(props: NavigationHandlers) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  const filteredBanks = investmentBanks.filter((bank) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      bank.name.toLowerCase().includes(query) ||
      bank.shortName.toLowerCase().includes(query) ||
      bank.services.some((service) => service.toLowerCase().includes(query))
    const matchesType = selectedType === 'All' || bank.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <Header {...props} />

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl text-slate-900 mb-2">Investment Banks</h1>
              <p className="text-sm text-slate-600">
                M&A advisory and capital markets services in Vietnam
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building className="w-5 h-5 text-orange-600" />
              <span className="text-slate-900">{filteredBanks.length} Banks</span>
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
                placeholder="Search by name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Type:</span>
              <div className="flex gap-2">
                {bankTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3 py-1.5 text-sm border transition-colors whitespace-nowrap ${
                      selectedType === type
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banks list */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {filteredBanks.map((bank) => (
              <div key={bank.id} className="bg-white border p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-slate-900">{bank.name}</h3>
                      <Badge className={`text-xs border ${getTierColor(bank.tier)}`}>
                        {getTierLabel(bank.tier)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <span className="text-orange-600">{bank.shortName}</span>
                      <span>•</span>
                      <span>{bank.type}</span>
                      <span>•</span>
                      <span>Est. {bank.established}</span>
                    </div>

                    <div className="mb-4 p-3 bg-orange-50 border border-orange-100">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <span className="text-slate-600">Total Deal Volume:</span>
                        <span className="text-orange-600">{bank.dealVolume}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Services</div>
                      <div className="flex flex-wrap gap-2">
                        {bank.services.map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Sector Expertise</div>
                      <div className="flex flex-wrap gap-2">
                        {bank.sectors.map((sector) => (
                          <span
                            key={sector}
                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200"
                          >
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{bank.headquarters}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{bank.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{bank.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <a
                          href={bank.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700"
                        >
                          Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredBanks.length === 0 && (
              <div className="text-center py-12 bg-white border">
                <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">
                  No investment banks found matching your criteria
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
