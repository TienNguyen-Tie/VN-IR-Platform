import { useMemo, useState } from 'react'
import { ChevronDown, Search, SlidersHorizontal, Star, TrendingDown, TrendingUp } from 'lucide-react'
import type { Company, NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'

/* ---------------------------------- Types & data ---------------------------------- */

/** Company plus listing-page extras — structurally compatible with Company. */
export interface ListedCompany extends Company {
  positive: boolean
  volume: string
}

export const companies: ListedCompany[] = [
  { id: 'vic', ticker: 'VIC', name: 'Vingroup JSC', exchange: 'HOSE', sector: 'Conglomerate', price: '42,500', change: 2.8, positive: true, marketCap: '$15.4B', volume: '2.8M' },
  { id: 'vcb', ticker: 'VCB', name: 'Vietcombank', exchange: 'HOSE', sector: 'Banking', price: '89,200', change: 1.2, positive: true, marketCap: '$18.2B', volume: '3.2M' },
  { id: 'hpg', ticker: 'HPG', name: 'Hoa Phat Group', exchange: 'HOSE', sector: 'Steel & Manufacturing', price: '28,400', change: 3.1, positive: true, marketCap: '$7.3B', volume: '5.1M' },
  { id: 'fpt', ticker: 'FPT', name: 'FPT Corporation', exchange: 'HOSE', sector: 'Technology', price: '125,600', change: 4.5, positive: true, marketCap: '$9.8B', volume: '1.9M' },
  { id: 'msn', ticker: 'MSN', name: 'Masan Group', exchange: 'HOSE', sector: 'Consumer Goods', price: '67,800', change: -0.5, positive: false, marketCap: '$8.7B', volume: '2.4M' },
  { id: 'vhm', ticker: 'VHM', name: 'Vinhomes', exchange: 'HOSE', sector: 'Real Estate', price: '54,300', change: 1.8, positive: true, marketCap: '$12.1B', volume: '3.8M' },
  { id: 'gas', ticker: 'GAS', name: 'PetroVietnam Gas', exchange: 'HOSE', sector: 'Energy', price: '96,500', change: 0.8, positive: true, marketCap: '$9.8B', volume: '1.2M' },
  { id: 'vnm', ticker: 'VNM', name: 'Vinamilk', exchange: 'HOSE', sector: 'Consumer Goods', price: '72,100', change: 1.3, positive: true, marketCap: '$6.2B', volume: '1.6M' },
  { id: 'ctg', ticker: 'CTG', name: 'VietinBank', exchange: 'HOSE', sector: 'Banking', price: '34,200', change: 0.9, positive: true, marketCap: '$5.8B', volume: '4.2M' },
  { id: 'bid', ticker: 'BID', name: 'BIDV', exchange: 'HOSE', sector: 'Banking', price: '45,800', change: 1.5, positive: true, marketCap: '$7.1B', volume: '3.5M' },
  { id: 'vre', ticker: 'VRE', name: 'Vincom Retail', exchange: 'HOSE', sector: 'Real Estate', price: '29,100', change: 2.1, positive: true, marketCap: '$4.9B', volume: '2.1M' },
  { id: 'sab', ticker: 'SAB', name: 'Sabeco', exchange: 'HOSE', sector: 'Consumer Goods', price: '156,000', change: -0.3, positive: false, marketCap: '$5.6B', volume: '890K' },
  { id: 'vpb', ticker: 'VPB', name: 'VPBank', exchange: 'HOSE', sector: 'Banking', price: '23,400', change: 1.8, positive: true, marketCap: '$4.2B', volume: '5.8M' },
  { id: 'tcb', ticker: 'TCB', name: 'Techcombank', exchange: 'HOSE', sector: 'Banking', price: '48,500', change: 2.3, positive: true, marketCap: '$8.9B', volume: '2.9M' },
  { id: 'mbb', ticker: 'MBB', name: 'MB Bank', exchange: 'HOSE', sector: 'Banking', price: '27,800', change: 1.1, positive: true, marketCap: '$5.3B', volume: '4.1M' },
  { id: 'vjc', ticker: 'VJC', name: 'VietJet Aviation', exchange: 'HOSE', sector: 'Transportation', price: '142,500', change: 3.2, positive: true, marketCap: '$6.8B', volume: '1.5M' },
  { id: 'plx', ticker: 'PLX', name: 'Petrolimex', exchange: 'HOSE', sector: 'Energy', price: '38,900', change: 0.7, positive: true, marketCap: '$4.7B', volume: '1.8M' },
  { id: 'pow', ticker: 'POW', name: 'PetroVietnam Power', exchange: 'HOSE', sector: 'Energy', price: '12,300', change: 1.4, positive: true, marketCap: '$3.2B', volume: '6.5M' },
  { id: 'mwg', ticker: 'MWG', name: 'Mobile World', exchange: 'HOSE', sector: 'Retail', price: '58,700', change: 2.9, positive: true, marketCap: '$5.9B', volume: '3.3M' },
  { id: 'vci', ticker: 'VCI', name: 'Vietcombank Securities', exchange: 'HOSE', sector: 'Financial Services', price: '45,200', change: 1.6, positive: true, marketCap: '$2.8B', volume: '2.2M' },
]

function formatChange(change: number): string {
  return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`
}

/* ---------------------------------- Page ---------------------------------- */

type ListingPageProps = NavigationHandlers & {
  onCompanyClick: (company: Company) => void
}

export function ListingPage({ onCompanyClick, ...nav }: ListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSector, setSelectedSector] = useState('All Sectors')
  const [sortBy, setSortBy] = useState('marketCap')

  const sectors = useMemo(
    () => ['All Sectors', ...Array.from(new Set(companies.map((c) => c.sector)))],
    [],
  )

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase()
    const matches = companies.filter((c) => {
      const matchesQuery = c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q)
      const matchesSector = selectedSector === 'All Sectors' || c.sector === selectedSector
      return matchesQuery && matchesSector
    })
    const sorted = [...matches]
    if (sortBy === 'marketCap') {
      sorted.sort(
        (a, b) =>
          parseFloat(b.marketCap.replace(/[$B]/g, '')) -
          parseFloat(a.marketCap.replace(/[$B]/g, '')),
      )
    } else if (sortBy === 'change') {
      sorted.sort((a, b) => b.change - a.change)
    } else if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }
    return sorted
  }, [searchQuery, selectedSector, sortBy])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header {...nav} />

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl text-slate-900 mb-2">Listed Companies</h1>
          <p className="text-sm text-slate-600">
            Explore {companies.length} companies listed on Vietnam's stock exchanges
          </p>
        </div>
      </section>

      {/* Sticky search/filter/sort bar */}
      <section className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-[280px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by company name or ticker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 text-sm focus:outline-none focus:border-orange-600"
                />
              </div>
            </div>
            {/* Sector select */}
            <div className="relative">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="pl-10 pr-10 py-2 border border-slate-300 text-sm appearance-none focus:outline-none focus:border-orange-600 bg-white cursor-pointer"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            {/* Sort select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-4 pr-10 py-2 border border-slate-300 text-sm appearance-none focus:outline-none focus:border-orange-600 bg-white cursor-pointer"
              >
                <option value="marketCap">Sort by Market Cap</option>
                <option value="change">Sort by Change %</option>
                <option value="name">Sort by Name</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            {/* Result count */}
            <div className="text-sm text-slate-600">
              {filtered.length} {filtered.length === 1 ? 'company' : 'companies'}
            </div>
          </div>
        </div>
      </section>

      {/* Company card grid */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((company) => (
              <div
                key={company.ticker}
                onClick={() => onCompanyClick(company)}
                className="border bg-white hover:border-orange-600 transition-colors group cursor-pointer p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-orange-600 mb-0.5">{company.ticker}</div>
                    <h3 className="text-sm mb-0.5 text-slate-900">{company.name}</h3>
                    <p className="text-xs text-slate-500">{company.sector}</p>
                  </div>
                  <button className="p-1 hover:bg-orange-50 transition-colors">
                    <Star className="w-3.5 h-3.5 text-slate-400 hover:text-orange-600" />
                  </button>
                </div>
                <div className="flex items-end justify-between mb-3 pb-3 border-b">
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">Price (VND)</div>
                    <div className="text-lg text-slate-900">{company.price}</div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      company.positive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {company.positive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    <span>{formatChange(company.change)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">MCap: </span>
                    <span className="text-slate-900">{company.marketCap}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Vol: </span>
                    <span className="text-slate-900">{company.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-slate-600">No companies found matching your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      <AIAssistant />
      <Footer />
    </div>
  )
}
