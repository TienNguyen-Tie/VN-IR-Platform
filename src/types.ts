export type Page =
  | 'home'
  | 'company'
  | 'listing'
  | 'markets'
  | 'brokerageFirms'
  | 'funds'
  | 'irServices'
  | 'investmentBanks'
  | 'insights'
  | 'events'
  | 'news'
  | 'dashboard'
  | 'predictions'
  | 'privateMarket'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'resources'
  | 'article'

export interface Company {
  id: string
  name: string
  ticker: string
  exchange: string
  sector: string
  marketCap: string
  price: string
  change: number
  description?: string
  website?: string
  employees?: string
  founded?: string
}

export interface NavigationHandlers {
  onNavigateToHome: () => void
  onNavigateToMarkets: () => void
  onNavigateToListing: () => void
  onNavigateToBrokerageFirms: () => void
  onNavigateToFunds: () => void
  onNavigateToIRServices: () => void
  onNavigateToInvestmentBanks: () => void
  onNavigateToInsights: () => void
}
