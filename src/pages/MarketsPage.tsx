import { useState } from 'react'
import { Activity, DollarSign, TrendingDown, TrendingUp, Wheat, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'

/* ---------------------------------- Data (as of July 2026) ---------------------------------- */

interface MarketIndex {
  name: string
  value: string
  change: string
  changePercent: string
  positive: boolean
  description: string
}

const marketIndices: MarketIndex[] = [
  {
    name: 'VN-Index',
    value: '1,806.63',
    change: '+6.12',
    changePercent: '+0.34%',
    positive: true,
    description: 'Ho Chi Minh Stock Exchange',
  },
  {
    name: 'HNX-Index',
    value: '306.67',
    change: '+1.28',
    changePercent: '+0.42%',
    positive: true,
    description: 'Hanoi Stock Exchange',
  },
  {
    name: 'UPCOM-Index',
    value: '112.45',
    change: '-0.20',
    changePercent: '-0.18%',
    positive: false,
    description: 'Unlisted Public Company Market',
  },
  {
    name: 'VN30',
    value: '1,880.24',
    change: '+9.54',
    changePercent: '+0.51%',
    positive: true,
    description: 'Top 30 Blue-chip Stocks',
  },
]

interface StockRow {
  ticker: string
  name: string
  price: string
  change: string
  volume: string
}

const topGainers: StockRow[] = [
  { ticker: 'FPT', name: 'FPT Corporation', price: '125,600', change: '+4.5%', volume: '1.9M' },
  { ticker: 'HPG', name: 'Hoa Phat Group', price: '28,400', change: '+3.1%', volume: '5.1M' },
  { ticker: 'VJC', name: 'VietJet Aviation', price: '142,500', change: '+3.2%', volume: '1.5M' },
  { ticker: 'MWG', name: 'Mobile World', price: '58,700', change: '+2.9%', volume: '3.3M' },
  { ticker: 'VIC', name: 'Vingroup JSC', price: '42,500', change: '+2.8%', volume: '2.8M' },
  { ticker: 'TCB', name: 'Techcombank', price: '48,500', change: '+2.3%', volume: '2.9M' },
]

const topLosers: StockRow[] = [
  { ticker: 'MSN', name: 'Masan Group', price: '67,800', change: '-0.5%', volume: '2.4M' },
  { ticker: 'SAB', name: 'Sabeco', price: '156,000', change: '-0.3%', volume: '890K' },
  { ticker: 'VNM', name: 'Vinamilk', price: '72,100', change: '-0.2%', volume: '1.6M' },
]

interface Commodity {
  name: string
  symbol: string
  price: string
  change: string
  positive: boolean
  unit: string
  description: string
}

const commodities: Commodity[] = [
  { name: 'Gold', symbol: 'XAU', price: '$2,045.30', change: '+1.2%', positive: true, unit: 'per oz', description: 'Spot Gold' },
  { name: 'Brent Crude Oil', symbol: 'BRT', price: '$84.52', change: '-0.8%', positive: false, unit: 'per barrel', description: 'Crude Oil Futures' },
  { name: 'WTI Crude Oil', symbol: 'WTI', price: '$80.12', change: '-0.6%', positive: false, unit: 'per barrel', description: 'West Texas Intermediate' },
  { name: 'Vietnamese Rice', symbol: 'VN-RICE', price: '$620', change: '+2.1%', positive: true, unit: 'per ton', description: '5% Broken Rice Export' },
  { name: 'Coffee Arabica', symbol: 'KC', price: '$1.89', change: '+1.5%', positive: true, unit: 'per lb', description: 'Arabica Coffee Futures' },
  { name: 'Coffee Robusta', symbol: 'RC', price: '$2,345', change: '+0.9%', positive: true, unit: 'per ton', description: 'Robusta Coffee Futures' },
  { name: 'Natural Gas', symbol: 'NG', price: '$2.87', change: '+2.3%', positive: true, unit: 'per MMBtu', description: 'Natural Gas Futures' },
  { name: 'Rubber', symbol: 'RUBBER', price: '$1.65', change: '-0.4%', positive: false, unit: 'per kg', description: 'Natural Rubber' },
]

interface CurrencyPair {
  pair: string
  rate: string
  change: string
  positive: boolean
  description: string
}

const currencies: CurrencyPair[] = [
  { pair: 'USD/VND', rate: '26,400', change: '+0.12%', positive: true, description: 'US Dollar to Vietnamese Dong' },
  { pair: 'EUR/VND', rate: '30,850', change: '+0.25%', positive: true, description: 'Euro to Vietnamese Dong' },
  { pair: 'JPY/VND', rate: '178.20', change: '-0.08%', positive: false, description: 'Japanese Yen to Vietnamese Dong' },
  { pair: 'CNY/VND', rate: '3,690', change: '+0.15%', positive: true, description: 'Chinese Yuan to Vietnamese Dong' },
  { pair: 'SGD/VND', rate: '20,620', change: '+0.10%', positive: true, description: 'Singapore Dollar to Vietnamese Dong' },
  { pair: 'THB/VND', rate: '815.40', change: '-0.05%', positive: false, description: 'Thai Baht to Vietnamese Dong' },
]

interface Bond {
  name: string
  yield: string
  change: string
  positive: boolean
  maturity: string
  description: string
}

const bonds: Bond[] = [
  { name: 'Vietnam 10Y Govt Bond', yield: '3.15%', change: '+0.05%', positive: false, maturity: '2036', description: '10-Year Government Bond' },
  { name: 'Vietnam 5Y Govt Bond', yield: '2.72%', change: '+0.03%', positive: false, maturity: '2031', description: '5-Year Government Bond' },
  { name: 'Vietnam 2Y Govt Bond', yield: '2.35%', change: '+0.02%', positive: false, maturity: '2028', description: '2-Year Government Bond' },
  { name: 'Corporate AAA Bond', yield: '6.60%', change: '-0.10%', positive: true, maturity: '2031', description: 'AAA Rated Corporate Bond' },
]

const tabs: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'stocks', label: 'Stocks', icon: Activity },
  { id: 'commodities', label: 'Commodities', icon: Wheat },
  { id: 'currencies', label: 'Currencies', icon: DollarSign },
  { id: 'bonds', label: 'Bonds', icon: Zap },
]

/* ---------------------------------- Subcomponents ---------------------------------- */

function StockTable({ rows, changeClass }: { rows: StockRow[]; changeClass: string }) {
  return (
    <div className="bg-white border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-slate-600">Ticker</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600">Company</th>
              <th className="px-4 py-3 text-right text-xs text-slate-600">Price (VND)</th>
              <th className="px-4 py-3 text-right text-xs text-slate-600">Change</th>
              <th className="px-4 py-3 text-right text-xs text-slate-600">Volume</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((stock) => (
              <tr key={stock.ticker} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-orange-600">{stock.ticker}</td>
                <td className="px-4 py-3 text-sm text-slate-900">{stock.name}</td>
                <td className="px-4 py-3 text-sm text-slate-900 text-right">{stock.price}</td>
                <td className={`px-4 py-3 text-sm ${changeClass} text-right`}>{stock.change}</td>
                <td className="px-4 py-3 text-sm text-slate-600 text-right">{stock.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------------------------- Page ---------------------------------- */

export function MarketsPage(props: NavigationHandlers) {
  const [activeTab, setActiveTab] = useState('stocks')

  return (
    <div className="min-h-screen bg-slate-50">
      <Header {...props} />

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl text-slate-900 mb-2">Markets</h1>
          <p className="text-sm text-slate-600">Real-time data across Vietnamese and global markets</p>
        </div>
      </section>

      {/* Sticky tab bar */}
      <section className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 border-b border-slate-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
          {activeTab === 'stocks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl text-slate-900 mb-4">Market Indices</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {marketIndices.map((index) => (
                    <div key={index.name} className="border bg-white p-4">
                      <h3 className="text-sm text-slate-900 mb-1">{index.name}</h3>
                      <p className="text-xs text-slate-500 mb-3">{index.description}</p>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl text-slate-900">{index.value}</div>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            index.positive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {index.positive ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span>{index.changePercent}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl text-slate-900 mb-4">Top Gainers</h2>
                <StockTable rows={topGainers} changeClass="text-green-600" />
              </div>

              <div>
                <h2 className="text-xl text-slate-900 mb-4">Top Losers</h2>
                <StockTable rows={topLosers} changeClass="text-red-600" />
              </div>
            </div>
          )}

          {activeTab === 'commodities' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl text-slate-900 mb-4">Commodity Prices</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {commodities.map((commodity) => (
                    <div key={commodity.symbol} className="border bg-white p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm text-slate-900 mb-1">{commodity.name}</h3>
                          <p className="text-xs text-slate-500">{commodity.symbol}</p>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            commodity.positive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {commodity.positive ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          <span>{commodity.change}</span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="text-2xl text-slate-900">{commodity.price}</div>
                        <div className="text-xs text-slate-500">{commodity.unit}</div>
                      </div>
                      <p className="text-xs text-slate-600">{commodity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'currencies' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl text-slate-900 mb-4">Exchange Rates</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currencies.map((currency) => (
                    <div key={currency.pair} className="border bg-white p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm text-slate-900">{currency.pair}</h3>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            currency.positive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {currency.positive ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          <span>{currency.change}</span>
                        </div>
                      </div>
                      <div className="text-2xl text-slate-900 mb-2">{currency.rate}</div>
                      <p className="text-xs text-slate-600">{currency.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bonds' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl text-slate-900 mb-4">Government & Corporate Bonds</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {bonds.map((bond) => (
                    <div key={bond.name} className="border bg-white p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-sm text-slate-900 mb-1">{bond.name}</h3>
                          <p className="text-xs text-slate-500">Maturity: {bond.maturity}</p>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            bond.positive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {bond.positive ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                          )}
                          <span>{bond.change}</span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="text-2xl text-slate-900">{bond.yield}</div>
                        <div className="text-xs text-slate-500">Yield</div>
                      </div>
                      <p className="text-xs text-slate-600">{bond.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <AIAssistant />
      <Footer />
    </div>
  )
}
