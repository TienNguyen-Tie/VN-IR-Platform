import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { MacroSection } from '../components/home/MacroSection'
import { FDISection } from '../components/home/FDISection'

/* Summary tiles — headline figures for the July 2026 economic picture (GSO/NSO, MPI, SBV). */
const summary = [
  { label: 'GDP Growth (Q2 2026)', value: '8.39%', note: 'H1 2026: +8.18% YoY' },
  { label: 'Inflation (Jun 2026)', value: '4.69%', note: 'Target ~4.5%' },
  { label: 'Registered FDI (H1)', value: '$34.65B', note: '+61% YoY' },
  { label: 'Trade Balance (H1)', value: '-$16.7B', note: 'Import-led deficit' },
  { label: 'USD/VND', value: '26,400', note: 'SBV rate 4.50%' },
  { label: 'GDP Size (2025)', value: '$514B', note: 'Per capita $5,026' },
]

export function EconomicDashboardPage(nav: NavigationHandlers) {
  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2">ECONOMIC DASHBOARD</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">Vietnam Economic Dashboard</h1>
            <p className="text-slate-600 max-w-2xl mb-6">
              Macroeconomic indicators, exchange rates, trade data, and foreign direct investment — updated for Q2 2026.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {summary.map((s, i) => (
                <div key={i} className="p-3 bg-white border">
                  <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                  <div className="text-xl text-slate-900 mb-0.5">{s.value}</div>
                  <div className="text-[10px] text-slate-500">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <MacroSection />
        <FDISection />
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
