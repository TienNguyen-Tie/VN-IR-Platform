import { useEffect, useState } from 'react'
import type { Company, NavigationHandlers, Page } from './types'
import { navigate } from './components/ui'
import { companies as listedCompanies } from './pages/ListingPage'
import { HomePage } from './pages/HomePage'
import { MarketsPage } from './pages/MarketsPage'
import { ListingPage } from './pages/ListingPage'
import { CompanyPage } from './pages/CompanyPage'
import { BrokerageFirmsPage } from './pages/BrokerageFirmsPage'
import { FundsPage } from './pages/FundsPage'
import { IRServicesPage } from './pages/IRServicesPage'
import { InvestmentBanksPage } from './pages/InvestmentBanksPage'
import { InsightsPage } from './pages/InsightsPage'
import { EventsPage } from './pages/EventsPage'
import { NewsPage } from './pages/NewsPage'
import { EconomicDashboardPage } from './pages/EconomicDashboardPage'
import { PredictionsPage } from './pages/PredictionsPage'
import { PrivateMarketHubPage } from './pages/PrivateMarketHubPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { ResourceCenterPage } from './pages/ResourceCenterPage'
import { ArticlePage } from './pages/ArticlePage'

/** Hash path <-> page. Company detail is handled separately (`#/company/:ticker`). */
const pathToPage: Record<string, Page> = {
  '': 'home',
  '#/': 'home',
  '#/markets': 'markets',
  '#/companies': 'listing',
  '#/brokerage-firms': 'brokerageFirms',
  '#/funds': 'funds',
  '#/ir-services': 'irServices',
  '#/investment-banks': 'investmentBanks',
  '#/insights': 'insights',
  '#/events': 'events',
  '#/news': 'news',
  '#/dashboard': 'dashboard',
  '#/predictions': 'predictions',
  '#/private-market': 'privateMarket',
  '#/about': 'about',
  '#/contact': 'contact',
  '#/privacy': 'privacy',
  '#/terms': 'terms',
  '#/resources': 'resources',
}

const pageToPath: Record<Exclude<Page, 'company' | 'article'>, string> = {
  home: '#/',
  markets: '#/markets',
  listing: '#/companies',
  brokerageFirms: '#/brokerage-firms',
  funds: '#/funds',
  irServices: '#/ir-services',
  investmentBanks: '#/investment-banks',
  insights: '#/insights',
  events: '#/events',
  news: '#/news',
  dashboard: '#/dashboard',
  predictions: '#/predictions',
  privateMarket: '#/private-market',
  about: '#/about',
  contact: '#/contact',
  privacy: '#/privacy',
  terms: '#/terms',
  resources: '#/resources',
}

const COMPANY_PREFIX = '#/company/'
const ARTICLE_PREFIX = '#/article/'

interface Route {
  page: Page
  company: Company | null
  articleSlug: string | null
}

function parseHash(): Route {
  const hash = window.location.hash
  if (hash.startsWith(COMPANY_PREFIX)) {
    const ticker = decodeURIComponent(hash.slice(COMPANY_PREFIX.length))
    const company = listedCompanies.find((c) => c.ticker === ticker) ?? null
    return company
      ? { page: 'company', company, articleSlug: null }
      : { page: 'home', company: null, articleSlug: null }
  }
  if (hash.startsWith(ARTICLE_PREFIX)) {
    const slug = decodeURIComponent(hash.slice(ARTICLE_PREFIX.length))
    return { page: 'article', company: null, articleSlug: slug }
  }
  return { page: pathToPage[hash] ?? 'home', company: null, articleSlug: null }
}

export default function App() {
  const [route, setRoute] = useState<Route>(parseHash)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const nav: NavigationHandlers = {
    onNavigateToHome: () => navigate(pageToPath.home),
    onNavigateToMarkets: () => navigate(pageToPath.markets),
    onNavigateToListing: () => navigate(pageToPath.listing),
    onNavigateToBrokerageFirms: () => navigate(pageToPath.brokerageFirms),
    onNavigateToFunds: () => navigate(pageToPath.funds),
    onNavigateToIRServices: () => navigate(pageToPath.irServices),
    onNavigateToInvestmentBanks: () => navigate(pageToPath.investmentBanks),
    onNavigateToInsights: () => navigate(pageToPath.insights),
  }

  const onCompanyClick = (company: Company) => navigate(`${COMPANY_PREFIX}${company.ticker}`)

  switch (route.page) {
    case 'markets':
      return <MarketsPage {...nav} />
    case 'listing':
      return <ListingPage {...nav} onCompanyClick={onCompanyClick} />
    case 'company':
      return route.company ? (
        <CompanyPage {...nav} company={route.company} onBack={nav.onNavigateToListing} />
      ) : (
        <HomePage {...nav} onCompanyClick={onCompanyClick} />
      )
    case 'brokerageFirms':
      return <BrokerageFirmsPage {...nav} />
    case 'funds':
      return <FundsPage {...nav} />
    case 'irServices':
      return <IRServicesPage {...nav} />
    case 'investmentBanks':
      return <InvestmentBanksPage {...nav} />
    case 'insights':
      return <InsightsPage {...nav} />
    case 'events':
      return <EventsPage {...nav} />
    case 'news':
      return <NewsPage {...nav} />
    case 'dashboard':
      return <EconomicDashboardPage {...nav} />
    case 'predictions':
      return <PredictionsPage {...nav} />
    case 'privateMarket':
      return <PrivateMarketHubPage {...nav} />
    case 'about':
      return <AboutPage {...nav} />
    case 'contact':
      return <ContactPage {...nav} />
    case 'privacy':
      return <PrivacyPage {...nav} />
    case 'terms':
      return <TermsPage {...nav} />
    case 'resources':
      return <ResourceCenterPage {...nav} />
    case 'article':
      return <ArticlePage {...nav} slug={route.articleSlug ?? ''} />
    default:
      return <HomePage {...nav} onCompanyClick={onCompanyClick} />
  }
}
