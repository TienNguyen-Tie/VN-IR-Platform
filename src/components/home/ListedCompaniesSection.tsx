import { ArrowRight, Star, TrendingUp, TrendingDown } from 'lucide-react'
import { SponsoredBy } from '../ui'
import type { Company } from '../../types'

interface ListedCompany extends Company {
  volume: string
  positive: boolean
}

const companies: ListedCompany[] = [
  { id: 'VIC', ticker: 'VIC', name: 'Vingroup JSC', exchange: 'HOSE', sector: 'Conglomerate', price: '42,500', change: 2.8, positive: true, marketCap: '$15.4B', volume: '2.8M' },
  { id: 'VCB', ticker: 'VCB', name: 'Vietcombank', exchange: 'HOSE', sector: 'Banking', price: '89,200', change: 1.2, positive: true, marketCap: '$18.2B', volume: '3.2M' },
  { id: 'HPG', ticker: 'HPG', name: 'Hoa Phat Group', exchange: 'HOSE', sector: 'Steel & Manufacturing', price: '28,400', change: 3.1, positive: true, marketCap: '$7.3B', volume: '5.1M' },
  { id: 'FPT', ticker: 'FPT', name: 'FPT Corporation', exchange: 'HOSE', sector: 'Technology', price: '125,600', change: 4.5, positive: true, marketCap: '$9.8B', volume: '1.9M' },
  { id: 'MSN', ticker: 'MSN', name: 'Masan Group', exchange: 'HOSE', sector: 'Consumer Goods', price: '67,800', change: -0.5, positive: false, marketCap: '$8.7B', volume: '2.4M' },
  { id: 'VHM', ticker: 'VHM', name: 'Vinhomes', exchange: 'HOSE', sector: 'Real Estate', price: '54,300', change: 1.8, positive: true, marketCap: '$12.1B', volume: '3.8M' },
  { id: 'GAS', ticker: 'GAS', name: 'PetroVietnam Gas', exchange: 'HOSE', sector: 'Energy', price: '96,500', change: 0.8, positive: true, marketCap: '$9.8B', volume: '1.2M' },
  { id: 'VNM', ticker: 'VNM', name: 'Vinamilk', exchange: 'HOSE', sector: 'Consumer Goods', price: '72,100', change: 1.3, positive: true, marketCap: '$6.2B', volume: '1.6M' },
]

export function ListedCompaniesSection({
  onCompanyClick,
  onViewAll,
}: {
  onCompanyClick?: (company: Company) => void
  onViewAll?: () => void
}) {
  return (
    <section className="bg-slate-50 border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Listed Companies</h2>
            <p className="text-sm text-slate-600">Top performing companies on Vietnam's stock exchanges</p>
          </div>
          <button onClick={onViewAll} className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
            View All Companies <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((c) => (
            <div
              key={c.ticker}
              onClick={() => onCompanyClick?.(c)}
              className="border bg-white hover:border-orange-600 transition-colors group cursor-pointer p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-orange-600 mb-0.5">{c.ticker}</div>
                  <h3 className="text-sm mb-0.5 text-slate-900">{c.name}</h3>
                  <p className="text-xs text-slate-500">{c.sector}</p>
                </div>
                <button className="p-1 hover:bg-orange-50 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <Star className="w-3.5 h-3.5 text-slate-400 hover:text-orange-600" />
                </button>
              </div>
              <div className="flex items-end justify-between mb-3 pb-3 border-b">
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Price (VND)</div>
                  <div className="text-lg text-slate-900">{c.price}</div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${c.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {c.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{c.change > 0 ? '+' : ''}{c.change}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">MCap: </span>
                  <span className="text-slate-900">{c.marketCap}</span>
                </div>
                <div>
                  <span className="text-slate-500">Vol: </span>
                  <span className="text-slate-900">{c.volume}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="Ho Chi Minh City Stock Exchange" website="https://www.hsx.vn" />
        </div>
      </div>
    </section>
  )
}
