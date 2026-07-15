import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { EventsSection } from '../components/home/EventsSection'

const stats = [
  { label: 'Upcoming Events', value: '18' },
  { label: 'Conferences', value: '6' },
  { label: 'Webinars', value: '9' },
  { label: 'Cities', value: '4' },
]

export function EventsPage(nav: NavigationHandlers) {
  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2">EVENTS &amp; CONNECT</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">Events &amp; Conferences</h1>
            <p className="text-slate-600 max-w-2xl mb-6">
              Conferences, webinars, roundtables, and networking opportunities across Vietnam's investment community.
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
        <EventsSection />
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
