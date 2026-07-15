import type { Company, NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { HeroSection } from '../components/home/HeroSection'
import { MarketOverviewSection } from '../components/home/MarketOverviewSection'
import { CapitalMarketSection } from '../components/home/CapitalMarketSection'
import { FDISection } from '../components/home/FDISection'
import { WhyVietnamSection } from '../components/home/WhyVietnamSection'
import { ListedCompaniesSection } from '../components/home/ListedCompaniesSection'
import { PrivateCompaniesSection } from '../components/home/PrivateCompaniesSection'
import { FundsSection } from '../components/home/FundsSection'
import { MacroSection } from '../components/home/MacroSection'
import { CommoditiesSection } from '../components/home/CommoditiesSection'
import { PredictionsSection } from '../components/home/PredictionsSection'
import { NewsAnnouncementsSection } from '../components/home/NewsAnnouncementsSection'
import { IRMSolutionsSection } from '../components/home/IRMSolutionsSection'
import { InsightsPodcastsSection } from '../components/home/InsightsPodcastsSection'
import { EventsSection } from '../components/home/EventsSection'
import { LearningHubSection } from '../components/home/LearningHubSection'
import { CTASection } from '../components/home/CTASection'

export function HomePage(
  props: NavigationHandlers & { onCompanyClick: (company: Company) => void },
) {
  const { onCompanyClick, ...nav } = props

  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        <HeroSection />
        <MarketOverviewSection />
        <CapitalMarketSection />
        <FDISection />
        <WhyVietnamSection />
        <ListedCompaniesSection onCompanyClick={onCompanyClick} onViewAll={nav.onNavigateToListing} />
        <PrivateCompaniesSection />
        <FundsSection />
        <MacroSection />
        <CommoditiesSection />
        <PredictionsSection />
        <NewsAnnouncementsSection />
        <IRMSolutionsSection />
        <InsightsPodcastsSection />
        <EventsSection />
        <LearningHubSection />
        <CTASection />
        <AIAssistant />
      </main>
      <Footer />
    </div>
  )
}
