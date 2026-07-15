import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { ChartPie, Search, TrendingDown, TrendingUp } from 'lucide-react'
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

interface Fund {
  id: string
  name: string
  ticker: string
  type: string
  manager: string
  nav: string
  aum: string
  ytdReturn: string
  oneYearReturn: string
  threeYearReturn: string
  inceptionDate: string
  managementFee: string
  minInvestment: string
  positive: boolean
}

const funds: Fund[] = [
  {
    id: '1',
    name: 'VFMVN Diamond ETF',
    ticker: 'FUEVFVND',
    type: 'ETF',
    manager: 'VFMVN Asset Management',
    nav: '28,450 VND',
    aum: '$245M',
    ytdReturn: '+18.5%',
    oneYearReturn: '+22.3%',
    threeYearReturn: '+45.2%',
    inceptionDate: 'Jan 2019',
    managementFee: '0.75%',
    minInvestment: '10M VND',
    positive: true,
  },
  {
    id: '2',
    name: 'SSIAM VN Index Fund',
    ticker: 'SSIVF',
    type: 'ETF',
    manager: 'SSI Asset Management',
    nav: '32,120 VND',
    aum: '$180M',
    ytdReturn: '+16.2%',
    oneYearReturn: '+19.8%',
    threeYearReturn: '+38.5%',
    inceptionDate: 'Mar 2018',
    managementFee: '0.65%',
    minInvestment: '5M VND',
    positive: true,
  },
  {
    id: '3',
    name: 'Dragon Capital Vietnam Growth Fund',
    ticker: 'DCVGF',
    type: 'Equity',
    manager: 'Dragon Capital',
    nav: '$42.50',
    aum: '$520M',
    ytdReturn: '+21.3%',
    oneYearReturn: '+28.7%',
    threeYearReturn: '+62.4%',
    inceptionDate: 'Jun 2015',
    managementFee: '1.5%',
    minInvestment: '$10,000',
    positive: true,
  },
  {
    id: '4',
    name: 'VinaCapital Vietnam Opportunity Fund',
    ticker: 'VOF',
    type: 'Equity',
    manager: 'VinaCapital',
    nav: '$5.85',
    aum: '$380M',
    ytdReturn: '+15.8%',
    oneYearReturn: '+24.5%',
    threeYearReturn: '+52.3%',
    inceptionDate: 'Aug 2003',
    managementFee: '2.0%',
    minInvestment: '$5,000',
    positive: true,
  },
  {
    id: '5',
    name: 'Manulife Vietnam Equity Fund',
    ticker: 'MVEF',
    type: 'Equity',
    manager: 'Manulife Investment Management',
    nav: '45,680 VND',
    aum: '$156M',
    ytdReturn: '+14.2%',
    oneYearReturn: '+18.9%',
    threeYearReturn: '+41.7%',
    inceptionDate: 'Feb 2017',
    managementFee: '1.75%',
    minInvestment: '20M VND',
    positive: true,
  },
  {
    id: '6',
    name: 'VCBF Balanced Fund',
    ticker: 'VCBF-BCF',
    type: 'Balanced',
    manager: 'Vietcombank Fund Management',
    nav: '18,240 VND',
    aum: '$128M',
    ytdReturn: '+8.5%',
    oneYearReturn: '+12.3%',
    threeYearReturn: '+28.6%',
    inceptionDate: 'May 2016',
    managementFee: '1.2%',
    minInvestment: '10M VND',
    positive: true,
  },
  {
    id: '7',
    name: 'DCDS Bond Fund',
    ticker: 'DCDS',
    type: 'Bond',
    manager: 'Dragon Capital',
    nav: '1,245 VND',
    aum: '$95M',
    ytdReturn: '+4.2%',
    oneYearReturn: '+5.8%',
    threeYearReturn: '+16.4%',
    inceptionDate: 'Nov 2014',
    managementFee: '0.85%',
    minInvestment: '50M VND',
    positive: true,
  },
  {
    id: '8',
    name: 'PYN Elite Fund',
    ticker: 'PYN',
    type: 'Equity',
    manager: 'PYN Fund Management',
    nav: '€94.25',
    aum: '$72M',
    ytdReturn: '+19.7%',
    oneYearReturn: '+26.4%',
    threeYearReturn: '+58.9%',
    inceptionDate: 'Dec 2012',
    managementFee: '1.8%',
    minInvestment: '€5,000',
    positive: true,
  },
  {
    id: '9',
    name: 'Mekong Enterprise Fund IV',
    ticker: 'MEF4',
    type: 'Private Equity',
    manager: 'Mekong Capital',
    nav: 'N/A',
    aum: '$185M',
    ytdReturn: 'N/A',
    oneYearReturn: 'N/A',
    threeYearReturn: '28.5% IRR',
    inceptionDate: 'Jan 2019',
    managementFee: '2.0%',
    minInvestment: '$5M',
    positive: true,
  },
  {
    id: '10',
    name: 'Vietnam Investments Group',
    ticker: 'VIG',
    type: 'Private Equity',
    manager: 'VIG Partners',
    nav: 'N/A',
    aum: '$142M',
    ytdReturn: 'N/A',
    oneYearReturn: 'N/A',
    threeYearReturn: '24.2% IRR',
    inceptionDate: 'Mar 2017',
    managementFee: '2.0%',
    minInvestment: '$3M',
    positive: true,
  },
  {
    id: '11',
    name: 'Openspace Ventures Fund III',
    ticker: 'OSV3',
    type: 'Venture Capital',
    manager: 'Openspace Ventures',
    nav: 'N/A',
    aum: '$290M',
    ytdReturn: 'N/A',
    oneYearReturn: 'N/A',
    threeYearReturn: 'N/A',
    inceptionDate: 'Jun 2021',
    managementFee: '2.5%',
    minInvestment: '$10M',
    positive: true,
  },
  {
    id: '12',
    name: 'Granite Oak Vietnam Fund',
    ticker: 'GOVF',
    type: 'Equity',
    manager: 'Granite Oak Capital',
    nav: '$8.45',
    aum: '$68M',
    ytdReturn: '+12.8%',
    oneYearReturn: '+17.2%',
    threeYearReturn: '+36.4%',
    inceptionDate: 'Sep 2016',
    managementFee: '1.65%',
    minInvestment: '$25,000',
    positive: true,
  },
]

/* ---------------------------------- Helpers ---------------------------------- */

const fundTypes = ['All', 'Equity', 'Balanced', 'Bond', 'ETF', 'Private Equity', 'Venture Capital']

function getTypeColor(type: string): string {
  switch (type) {
    case 'Equity':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'ETF':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'Balanced':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'Bond':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'Private Equity':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200'
    case 'Venture Capital':
      return 'bg-pink-100 text-pink-700 border-pink-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

function ReturnValue({ value }: { value: string }) {
  return (
    <div
      className={`text-sm flex items-center gap-1 ${
        value.includes('+') ? 'text-green-600' : value === 'N/A' ? 'text-slate-500' : 'text-red-600'
      }`}
    >
      {value !== 'N/A' &&
        (value.includes('+') ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        ))}
      {value}
    </div>
  )
}

/* ---------------------------------- Page ---------------------------------- */

export function FundsPage(props: NavigationHandlers) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  const filteredFunds = funds.filter((fund) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      fund.name.toLowerCase().includes(query) ||
      fund.ticker.toLowerCase().includes(query) ||
      fund.manager.toLowerCase().includes(query)
    const matchesType = selectedType === 'All' || fund.type === selectedType
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
              <h1 className="text-3xl text-slate-900 mb-2">Funds Directory</h1>
              <p className="text-sm text-slate-600">
                Mutual funds, ETFs, and investment funds operating in Vietnam
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ChartPie className="w-5 h-5 text-orange-600" />
              <span className="text-slate-900">{filteredFunds.length} Funds</span>
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
                placeholder="Search funds, tickers, or managers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-sm text-slate-600 whitespace-nowrap">Type:</span>
              <div className="flex gap-2">
                {fundTypes.map((type) => (
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

      {/* Funds list */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {filteredFunds.map((fund) => (
              <div key={fund.id} className="bg-white border p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-slate-900">{fund.name}</h3>
                          <Badge className={`text-xs border ${getTypeColor(fund.type)}`}>
                            {fund.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                          <span className="text-orange-600">{fund.ticker}</span>
                          <span>•</span>
                          <span>{fund.manager}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">NAV</div>
                        <div className="text-sm text-slate-900">{fund.nav}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">AUM</div>
                        <div className="text-sm text-slate-900">{fund.aum}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">YTD Return</div>
                        <ReturnValue value={fund.ytdReturn} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">1-Year Return</div>
                        <ReturnValue value={fund.oneYearReturn} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-sm">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">3-Year Return</div>
                        <div className="text-slate-900">{fund.threeYearReturn}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Inception</div>
                        <div className="text-slate-900">{fund.inceptionDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Mgmt Fee</div>
                        <div className="text-slate-900">{fund.managementFee}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Min Investment</div>
                        <div className="text-slate-900">{fund.minInvestment}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredFunds.length === 0 && (
              <div className="text-center py-12 bg-white border">
                <ChartPie className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">No funds found matching your criteria</p>
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
