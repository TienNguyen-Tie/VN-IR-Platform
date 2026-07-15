import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { Globe, Mail, MapPin, Phone, Presentation, Search } from 'lucide-react'
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

interface IRProvider {
  id: string
  name: string
  type: string
  established: string
  clients: string
  services: string[]
  specialization: string[]
  headquarters: string
  phone: string
  email: string
  website: string
  tier: 'premier' | 'established' | 'boutique'
}

const irProviders: IRProvider[] = [
  {
    id: '1',
    name: 'Brunswick Group Vietnam',
    type: 'Full Service IR',
    established: '2015',
    clients: '25+ Listed Companies',
    services: ['Investor Relations', 'Financial Communications', 'Crisis Management', 'M&A Communications', 'ESG Strategy'],
    specialization: ['Large Cap', 'Cross-border Transactions', 'IPO Advisory'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3827 3600',
    email: 'vietnam@brunswickgroup.com',
    website: 'https://www.brunswickgroup.com',
    tier: 'premier',
  },
  {
    id: '2',
    name: 'FTI Consulting Vietnam',
    type: 'Full Service IR',
    established: '2018',
    clients: '18+ Public Companies',
    services: ['Strategic Communications', 'Investor Relations', 'Corporate Reputation', 'Stakeholder Engagement'],
    specialization: ['Technology Sector', 'Financial Services', 'Real Estate'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3910 9200',
    email: 'vietnam@fticonsulting.com',
    website: 'https://www.fticonsulting.com',
    tier: 'premier',
  },
  {
    id: '3',
    name: 'Edelman Vietnam',
    type: 'Financial PR',
    established: '2012',
    clients: '30+ Corporates',
    services: ['Corporate Communications', 'Financial PR', 'Reputation Management', 'Digital Strategy'],
    specialization: ['Consumer Brands', 'Technology', 'Healthcare'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3520 4140',
    email: 'vietnam@edelman.com',
    website: 'https://www.edelman.com',
    tier: 'premier',
  },
  {
    id: '4',
    name: 'VietnamIR Advisory',
    type: 'IR Consulting',
    established: '2020',
    clients: '15+ Listed Companies',
    services: ['IR Strategy', 'Investor Targeting', 'Perception Studies', 'IR Website Development', 'Virtual Events'],
    specialization: ['Mid-cap Companies', 'IPO Preparation', 'Domestic Investors'],
    headquarters: 'Hanoi',
    phone: '+84 24 3974 8500',
    email: 'info@vietnamir.com',
    website: 'https://www.vietnamir.com',
    tier: 'established',
  },
  {
    id: '5',
    name: 'IR Asia Partners',
    type: 'Full Service IR',
    established: '2016',
    clients: '22+ Regional Clients',
    services: ['IR Programs', 'Roadshows', 'Earnings Communications', 'Shareholder Analysis', 'IR Training'],
    specialization: ['ASEAN Coverage', 'Retail Investors', 'Family Businesses'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3910 7500',
    email: 'vietnam@irasiapartners.com',
    website: 'https://www.irasiapartners.com',
    tier: 'established',
  },
  {
    id: '6',
    name: 'Minh Communications',
    type: 'Financial PR',
    established: '2008',
    clients: '40+ Clients',
    services: ['Media Relations', 'Financial PR', 'Content Creation', 'Event Management'],
    specialization: ['Local Media', 'Vietnamese Language', 'SME Sector'],
    headquarters: 'Hanoi',
    phone: '+84 24 3936 4200',
    email: 'info@minhcommunications.com',
    website: 'https://www.minhcommunications.com',
    tier: 'established',
  },
  {
    id: '7',
    name: 'ESG Solutions Vietnam',
    type: 'ESG Advisory',
    established: '2019',
    clients: '12+ Corporates',
    services: ['ESG Strategy', 'Sustainability Reporting', 'Climate Disclosure', 'Stakeholder Engagement'],
    specialization: ['ESG Integration', 'Impact Measurement', 'Green Finance'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3822 5600',
    email: 'info@esgsolutions.vn',
    website: 'https://www.esgsolutions.vn',
    tier: 'boutique',
  },
  {
    id: '8',
    name: 'Digital IR Studio',
    type: 'Digital IR',
    established: '2021',
    clients: '18+ Companies',
    services: ['IR Website Design', 'Virtual AGM', 'Investor Portal', 'IR Analytics', 'Digital Content'],
    specialization: ['Technology Solutions', 'Mobile-First', 'Data Visualization'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3827 4400',
    email: 'hello@digitalirstudio.com',
    website: 'https://www.digitalirstudio.com',
    tier: 'boutique',
  },
  {
    id: '9',
    name: 'Viet Capital IR Advisors',
    type: 'IR Consulting',
    established: '2017',
    clients: '14+ Mid-caps',
    services: ['IR Strategy', 'Investor Meetings', 'Quarterly Earnings', 'Perception Audits'],
    specialization: ['Mid-cap Focus', 'Banking Sector', 'Manufacturing'],
    headquarters: 'Hanoi',
    phone: '+84 24 3928 6700',
    email: 'info@vcir.vn',
    website: 'https://www.vcir.vn',
    tier: 'boutique',
  },
  {
    id: '10',
    name: 'Weber Shandwick Vietnam',
    type: 'Financial PR',
    established: '2014',
    clients: '20+ Brands',
    services: ['Corporate PR', 'Financial Communications', 'Crisis Communications', 'Social Media'],
    specialization: ['Global Networks', 'Integrated Campaigns', 'Consumer Focus'],
    headquarters: 'Ho Chi Minh City',
    phone: '+84 28 3821 9800',
    email: 'vietnam@webershandwick.com',
    website: 'https://www.webershandwick.com',
    tier: 'premier',
  },
]

/* ---------------------------------- Helpers ---------------------------------- */

const providerTypes = ['All', 'Full Service IR', 'IR Consulting', 'Financial PR', 'ESG Advisory', 'Digital IR']

function getTierColor(tier: string): string {
  switch (tier) {
    case 'premier':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'established':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'boutique':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

function getTierLabel(tier: string): string {
  switch (tier) {
    case 'premier':
      return 'Premier'
    case 'established':
      return 'Established'
    default:
      return 'Boutique'
  }
}

/* ---------------------------------- Page ---------------------------------- */

export function IRServicesPage(props: NavigationHandlers) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  const filteredProviders = irProviders.filter((provider) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      provider.name.toLowerCase().includes(query) ||
      provider.services.some((service) => service.toLowerCase().includes(query))
    const matchesType = selectedType === 'All' || provider.type === selectedType
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
              <h1 className="text-3xl text-slate-900 mb-2">IR Services</h1>
              <p className="text-sm text-slate-600">
                Investor Relations and financial communication service providers in Vietnam
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Presentation className="w-5 h-5 text-orange-600" />
              <span className="text-slate-900">{filteredProviders.length} Providers</span>
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
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-sm text-slate-600 whitespace-nowrap">Type:</span>
              <div className="flex gap-2">
                {providerTypes.map((type) => (
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

      {/* Providers list */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg text-slate-900">{provider.name}</h3>
                      <Badge className={`text-xs border ${getTierColor(provider.tier)}`}>
                        {getTierLabel(provider.tier)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <span className="text-orange-600">{provider.type}</span>
                      <span>•</span>
                      <span>Est. {provider.established}</span>
                      <span>•</span>
                      <span>{provider.clients}</span>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Services Offered</div>
                      <div className="flex flex-wrap gap-2">
                        {provider.services.map((service) => (
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
                      <div className="text-xs text-slate-500 mb-2">Specialization</div>
                      <div className="flex flex-wrap gap-2">
                        {provider.specialization.map((spec) => (
                          <span
                            key={spec}
                            className="px-2 py-1 text-xs bg-orange-50 text-orange-700 border border-orange-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{provider.headquarters}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{provider.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{provider.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <a
                          href={provider.website}
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

            {filteredProviders.length === 0 && (
              <div className="text-center py-12 bg-white border">
                <Presentation className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">
                  No IR service providers found matching your criteria
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
