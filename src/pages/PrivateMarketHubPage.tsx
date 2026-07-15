import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { PrivateCompaniesSection } from '../components/home/PrivateCompaniesSection'

const stats = [
  { label: 'Private Companies', value: '850K+' },
  { label: 'Unicorns', value: '4' },
  { label: 'VC / PE Firms', value: '35' },
  { label: 'VC Investment 2026 YTD', value: '$0.8B' },
]

export function PrivateMarketHubPage(nav: NavigationHandlers) {
  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2">PRIVATE MARKET HUB</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">Private Companies &amp; Venture Capital</h1>
            <p className="text-slate-600 max-w-2xl mb-6">
              Vietnam's emerging private market — high-growth companies, unicorns, and the venture capital and private
              equity firms funding the next generation of businesses.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <div key={i} className="p-4 bg-white border">
                  <div className="text-2xl text-slate-900">{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <PrivateCompaniesSection />
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
