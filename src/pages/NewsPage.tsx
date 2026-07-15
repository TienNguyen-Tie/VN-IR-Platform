import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { NewsAnnouncementsSection } from '../components/home/NewsAnnouncementsSection'

export function NewsPage(nav: NavigationHandlers) {
  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2">NEWS &amp; ANNOUNCEMENTS</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">Market News &amp; Company Filings</h1>
            <p className="text-slate-600 max-w-2xl">
              Regulatory updates, policy changes, earnings reports, and corporate actions from across Vietnam's capital markets.
            </p>
          </div>
        </section>
        <NewsAnnouncementsSection />
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
