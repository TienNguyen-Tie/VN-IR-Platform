import type { ReactNode } from 'react'
import { Shield } from 'lucide-react'
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
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: (
      <>
        <p>We collect information you provide directly and information gathered automatically as you use VietnamIR:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Account details such as your name, email address, and company, when you register or contact us.</li>
          <li>Usage data — pages viewed, searches run, watchlists, and interactions with dashboards and directories.</li>
          <li>Device and technical data such as IP address, browser type, operating system, and approximate location.</li>
          <li>Communications you send us through forms, email, or the in-app assistant.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    title: 'How We Use It',
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Operate, maintain, and improve the platform and its market data.</li>
          <li>Personalize your experience, including watchlists and saved views.</li>
          <li>Respond to enquiries and deliver investor-relations services you request.</li>
          <li>Send product updates, research, and market alerts you have opted into.</li>
          <li>Detect, prevent, and address abuse, fraud, and security issues.</li>
          <li>Comply with applicable Vietnamese law and regulatory obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content: (
      <>
        <p>
          We use essential, analytics, and preference cookies. Essential cookies keep the platform
          working; analytics cookies help us understand how the platform is used so we can improve
          it; preference cookies remember your settings.
        </p>
        <p>
          You can control or delete cookies through your browser settings. Disabling some cookies
          may affect functionality such as staying signed in or retaining your preferences.
        </p>
      </>
    ),
  },
  {
    id: 'data-sharing',
    title: 'Data Sharing',
    content: (
      <>
        <p>We do not sell your personal data. We share information only in limited circumstances:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>With service providers — such as hosting, analytics, and email — acting on our behalf under contract.</li>
          <li>With regulators, courts, or authorities where required by law or to protect our rights and users.</li>
          <li>With a successor entity in connection with a merger, acquisition, or asset sale.</li>
        </ul>
        <p>Aggregated or de-identified data that cannot reasonably identify you may be shared publicly, for example in market statistics.</p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: (
      <>
        <p>
          Depending on where you are located, you may have the right to access, correct, delete, or
          export your personal data, and to object to or restrict certain processing.
        </p>
        <p>
          To exercise these rights, email us at{' '}
          <a href="mailto:privacy@vifc.vn" className="text-orange-600 hover:text-orange-700">
            privacy@vifc.vn
          </a>
          . We may need to verify your identity before acting on a request.
        </p>
      </>
    ),
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: (
      <p>
        We use encryption in transit, access controls, and regular reviews to protect your
        information. No method of transmission or storage is perfectly secure, but we work to
        safeguard your data and will notify you and the relevant authorities of a material breach
        where required by law.
      </p>
    ),
  },
  {
    id: 'international-transfers',
    title: 'International Transfers',
    content: (
      <p>
        VietnamIR is operated from Vietnam. If you access the platform from outside Vietnam, your
        information may be transferred to, stored in, and processed in Vietnam and other countries
        where our service providers operate, with safeguards appropriate to the transfer.
      </p>
    ),
  },
  {
    id: 'childrens-privacy',
    title: "Children's Privacy",
    content: (
      <p>
        The platform is intended for users aged 18 and over and is not directed at children. We do
        not knowingly collect personal data from children. If you believe a child has provided us
        with information, please contact us and we will delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: (
      <p>
        We may update this policy as the platform evolves or as legal requirements change. Material
        changes will be posted on this page with a revised &ldquo;Last updated&rdquo; date, and where
        appropriate we will notify you directly.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <>
        <p>
          Questions about this policy or your personal data can be sent to{' '}
          <a href="mailto:privacy@vifc.vn" className="text-orange-600 hover:text-orange-700">
            privacy@vifc.vn
          </a>{' '}
          or{' '}
          <a href="mailto:hello@vifc.vn" className="text-orange-600 hover:text-orange-700">
            hello@vifc.vn
          </a>
          . You can also reach us by post at our office in Ho Chi Minh City, Vietnam.
        </p>
        <p>We aim to respond to privacy requests within 30 days.</p>
      </>
    ),
  },
]

export function PrivacyPage(nav: NavigationHandlers) {
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
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-slate-600 max-w-2xl">
              How VietnamIR, an initiative by VIFC - Fintech Hub, collects, uses, and protects your
              information when you use our capital-markets platform.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl">
              <p className="text-sm text-slate-500 mb-6">Last updated: {LAST_UPDATED}</p>

              <div className="flex gap-3 bg-slate-50 border p-5 mb-8">
                <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  This policy is provided as informational sample content for the VietnamIR platform
                  and is not legal advice. It describes the practices we follow across our website,
                  dashboards, and directories.
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
