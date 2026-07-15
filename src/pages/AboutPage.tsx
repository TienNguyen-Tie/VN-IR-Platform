import type { NavigationHandlers } from '../types'
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Cpu,
  Eye,
  Globe,
  Landmark,
  Newspaper,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { Button, SectionHeader, navigate } from '../components/ui'

interface Feature {
  icon: LucideIcon
  title: string
  text: string
}

const features: Feature[] = [
  {
    icon: BarChart3,
    title: 'Market Data & Indices',
    text: 'Pricing, index levels, sector performance, and macro dashboards across the HOSE, HNX, and UPCoM exchanges.',
  },
  {
    icon: Building2,
    title: 'Listed-Company Profiles',
    text: 'Structured profiles for 700+ listed enterprises — fundamentals, disclosures, ownership, and investor-relations contacts in one place.',
  },
  {
    icon: Briefcase,
    title: 'Funds & Service Directories',
    text: 'Curated directories of mutual funds and ETFs, securities firms, investment banks, and IR service providers operating in Vietnam.',
  },
  {
    icon: Newspaper,
    title: 'Research & Insights',
    text: 'Market commentary, thematic research, and explainers that turn raw data into decisions — plus a running feed of market news.',
  },
]

const stats = [
  { value: '700+', label: 'Listed companies covered' },
  { value: '$430B+', label: 'Market capitalization' },
  { value: '2', label: 'VIFC hubs — HCMC & Da Nang' },
  { value: '2026', label: 'Platform established' },
]

const vifcTimeline = [
  { date: 'Jun 27, 2025', event: 'National Assembly adopts Resolution 222/2025/QH15, establishing the Vietnam International Financial Centre' },
  { date: 'Dec 18, 2025', event: 'Government issues eight implementing decrees covering the VIFC regulatory framework' },
  { date: 'Jan 9, 2026', event: 'Da Nang hub inaugurated — fintech, green finance, and digital-asset innovation' },
  { date: 'Feb 11, 2026', event: 'Ho Chi Minh City hub launches — capital markets, banking, and global capital connectivity' },
]

const vifcHubs = [
  {
    icon: Landmark,
    city: 'Ho Chi Minh City',
    role: 'The large-scale financial gateway',
    text: 'Capital markets, banking, fund management, and global capital connectivity — the commercial heart of the VIFC and home to the HOSE exchange.',
  },
  {
    icon: Cpu,
    city: 'Da Nang',
    role: 'The innovation-driven hub',
    text: 'Fintech, wealth management, green finance, and a controlled sandbox for digital assets — where the Fintech Hub incubates the next generation of financial technology.',
  },
]

const values: Feature[] = [
  {
    icon: Eye,
    title: 'Transparency',
    text: 'Clear sourcing and plain-language explanations. Where figures are illustrative sample data, we label them as such.',
  },
  {
    icon: ShieldCheck,
    title: 'Accuracy',
    text: 'We treat data quality as a first-class feature and move quickly to correct anything that looks wrong.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    text: 'English-first, mobile-friendly, and free to browse — lowering the barrier to entry for Vietnam’s markets.',
  },
  {
    icon: Scale,
    title: 'Independence',
    text: 'We serve investors and issuers alike, without letting any single interest set the narrative.',
  },
]

export function AboutPage(nav: NavigationHandlers) {
  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2 uppercase">About VietnamIR</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">
              The reference layer for Vietnam&apos;s capital markets
            </h1>
            <p className="text-slate-600 max-w-2xl">
              VietnamIR is the capital-markets intelligence and investor-relations platform of the
              VIFC Fintech Hub — built inside the Vietnam International Financial Centre to connect
              Vietnamese listed companies, funds, and service providers with domestic and global
              investors.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Our mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The Vietnam International Financial Centre (VIFC) was created to make Vietnam a
                strategic gateway for international capital. Its Fintech Hub exists to build the
                digital infrastructure that ambition requires — and VietnamIR is the information
                layer of that effort.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Vietnam is one of the world&apos;s fastest-growing economies, yet reliable,
                English-language information about its listed companies, funds, and market
                infrastructure has long been fragmented. Our mission is to close that gap — to make
                Vietnam&apos;s capital markets transparent, navigable, and investable for everyone,
                from first-time retail investors to the global institutions the VIFC is designed to
                attract.
              </p>
            </div>
          </div>
        </section>

        {/* Part of the VIFC */}
        <section className="bg-slate-50 border-b">
          <div className="container mx-auto px-4 py-12">
            <SectionHeader
              title="Part of the Vietnam International Financial Centre"
              subtitle="One financial centre, two complementary hubs — established by Resolution 222/2025/QH15."
            />
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {vifcHubs.map((hub) => (
                <div key={hub.city} className="bg-white border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-orange-50 flex items-center justify-center">
                      <hub.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{hub.city}</h3>
                      <div className="text-xs text-orange-600">{hub.role}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{hub.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-white border divide-y">
              {vifcTimeline.map((t) => (
                <div key={t.date} className="p-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                  <div className="text-sm text-orange-600 font-medium w-28 flex-shrink-0">{t.date}</div>
                  <div className="text-sm text-slate-600">{t.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What the platform offers */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-12">
            <SectionHeader
              title="What the platform offers"
              subtitle="Four pillars, one integrated view of the market."
              linkText="Explore markets"
              onLinkClick={() => navigate('#/markets')}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-white border p-6">
                  <div className="w-10 h-10 bg-orange-50 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-slate-900">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="text-3xl lg:text-4xl font-semibold text-white mb-1">{s.value}</div>
                  <div className="text-sm text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why we built this */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Why we built this</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                2026 is Vietnam&apos;s inflection point. The VIFC opened its doors — Da Nang in
                January, Ho Chi Minh City in February — and on September 21, 2026, FTSE Russell
                reclassifies Vietnam as a Secondary Emerging Market, a milestone expected to draw
                billions in passive and active inflows from index-tracking funds worldwide.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                At the same time, the economy has been expanding at more than 8% a year, powered by
                manufacturing, exports, and a young, digitally native population of over 100 million.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A newly investable market needs trustworthy, well-structured information. The VIFC
                Fintech Hub built VietnamIR so that companies can tell their story to the global
                capital the Centre is designed to attract — and so investors can find, compare, and
                understand Vietnamese opportunities without wrestling with scattered filings and
                language barriers.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-slate-50 border-b">
          <div className="container mx-auto px-4 py-12">
            <SectionHeader
              title="What we value"
              subtitle="The principles behind every dataset and page."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v) => (
                <div key={v.title} className="bg-white border p-6">
                  <div className="w-10 h-10 bg-orange-50 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="bg-gradient-to-br from-slate-50 via-orange-50/40 to-slate-50 border p-8 lg:p-12 text-center">
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                Start exploring Vietnam&apos;s markets
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto mb-6">
                Track indices and sectors, dig into company fundamentals, and browse the funds and
                service providers building Vietnam&apos;s capital markets.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={() => navigate('#/markets')}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Explore Markets <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => navigate('#/companies')}>
                  Browse Companies <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
