import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'

const LAST_UPDATED = 'July 2026'

interface Section {
  id: string
  title: string
  content: ReactNode
}

const sections: Section[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: (
      <p>
        By accessing or using VietnamIR (the &ldquo;Platform&rdquo;), an initiative by VIFC - Fintech
        Hub, you agree to be bound by these Terms of Service and by our Privacy Policy. If you do not
        agree, please do not use the Platform.
      </p>
    ),
  },
  {
    id: 'eligibility',
    title: 'Eligibility',
    content: (
      <p>
        You must be at least 18 years old and able to form a legally binding contract to use the
        Platform. If you use it on behalf of a company or other organization, you represent that you
        are authorized to accept these Terms on its behalf.
      </p>
    ),
  },
  {
    id: 'use-of-the-platform',
    title: 'Use of the Platform',
    content: (
      <>
        <p>
          We grant you a limited, non-exclusive, non-transferable, revocable license to access the
          Platform for personal or internal business use. You agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Scrape, harvest, or systematically extract data at scale, or resell or redistribute our data.</li>
          <li>Reverse engineer, copy, or create derivative works from the Platform.</li>
          <li>Interfere with, disrupt, or place undue load on the Platform or its infrastructure.</li>
          <li>Use the Platform for unlawful purposes or misrepresent your affiliation with any person or entity.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'no-investment-advice',
    title: 'No Investment Advice',
    content: (
      <>
        <p>
          <span className="font-medium text-slate-900">
            All content on the Platform is provided for informational purposes only and does not
            constitute investment, legal, tax, or financial advice,
          </span>{' '}
          nor an offer or solicitation to buy or sell any security.
        </p>
        <p>
          Some prices, figures, company profiles, and other data shown across VietnamIR are
          illustrative sample data and may not reflect real-time or accurate market values. You
          should not rely on the Platform as your sole basis for any decision.
        </p>
        <p>
          Always do your own research and consult a licensed financial adviser before investing.
          Past performance is not indicative of future results, and all investments carry risk,
          including loss of capital.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: (
      <p>
        The Platform, including the VietnamIR and VIFC - Fintech Hub brands, text, graphics, design,
        and data compilations, is owned by VIFC or its licensors and is protected by intellectual
        property laws. Except as expressly permitted in these Terms, no rights are granted to you.
      </p>
    ),
  },
  {
    id: 'third-party-content',
    title: 'Third-Party Content',
    content: (
      <p>
        The Platform may display or link to content, directories, and data provided by third
        parties. We do not endorse and are not responsible for third-party content, websites, or
        services, and your use of them is at your own risk and subject to their terms.
      </p>
    ),
  },
  {
    id: 'disclaimers-liability',
    title: 'Disclaimers & Limitation of Liability',
    content: (
      <>
        <p>
          The Platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis
          without warranties of any kind, whether express or implied, including accuracy,
          completeness, or fitness for a particular purpose.
        </p>
        <p>
          To the fullest extent permitted by law, VIFC and its affiliates will not be liable for any
          indirect, incidental, or consequential losses, or for any loss arising from your reliance
          on Platform content or from any investment decision you make.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: (
      <p>
        These Terms are governed by the laws of the Socialist Republic of Vietnam, without regard to
        conflict-of-laws principles. Any dispute arising from or relating to the Platform will be
        subject to the exclusive jurisdiction of the competent courts of Ho Chi Minh City, Vietnam.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content: (
      <p>
        We may modify these Terms from time to time. When we do, we will update the &ldquo;Last
        updated&rdquo; date above. Your continued use of the Platform after changes take effect
        constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <p>
        Questions about these Terms can be sent to{' '}
        <a href="mailto:legal@vifc.vn" className="text-orange-600 hover:text-orange-700">
          legal@vifc.vn
        </a>{' '}
        or{' '}
        <a href="mailto:hello@vifc.vn" className="text-orange-600 hover:text-orange-700">
          hello@vifc.vn
        </a>
        , or by post to our office in Ho Chi Minh City, Vietnam.
      </p>
    ),
  },
]

export function TermsPage(nav: NavigationHandlers) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2 uppercase">Legal</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-slate-600 max-w-2xl">
              The terms that govern your use of VietnamIR, an initiative by VIFC - Fintech Hub.
              Please read them carefully before using the platform.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl">
              <p className="text-sm text-slate-500 mb-6">Last updated: {LAST_UPDATED}</p>

              <div className="flex gap-3 bg-orange-50 border border-orange-200 p-5 mb-8">
                <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">
                  This is informational sample content for a demonstration platform, not legal
                  advice. Some market data and company figures shown across VietnamIR are
                  illustrative and provided for demonstration purposes only.
                </p>
              </div>

              {/* Table of contents */}
              <nav className="border p-5 mb-10">
                <div className="text-sm font-semibold text-slate-900 mb-3">On this page</div>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {sections.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="text-left text-sm text-slate-600 hover:text-orange-600 transition-colors"
                    >
                      {i + 1}. {s.title}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Sections */}
              <div className="space-y-10">
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="text-lg font-semibold text-slate-900 mb-3">
                      {i + 1}. {s.title}
                    </h2>
                    <div className="space-y-3 text-slate-600 leading-relaxed">{s.content}</div>
                  </section>
                ))}
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
