import { useState, type FormEvent } from 'react'
import {
  Building2,
  CheckCircle2,
  Clock,
  Handshake,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Send,
  type LucideIcon,
} from 'lucide-react'
import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { Button, Input } from '../components/ui'

interface ContactItem {
  icon: LucideIcon
  label: string
  lines: string[]
}

const contactInfo: ContactItem[] = [
  { icon: MapPin, label: 'Office', lines: ['Ho Chi Minh City, Vietnam'] },
  { icon: Mail, label: 'Email', lines: ['hello@vifc.vn'] },
  { icon: Phone, label: 'Phone', lines: ['+84 (0) 28 XXXX XXXX'] },
  { icon: Clock, label: 'Business hours', lines: ['Mon–Fri, 9:00–18:00 (ICT)'] },
]

interface Department {
  icon: LucideIcon
  name: string
  email: string
}

const departments: Department[] = [
  { icon: Building2, name: 'General enquiries', email: 'hello@vifc.vn' },
  { icon: Handshake, name: 'Partnerships', email: 'partnerships@vifc.vn' },
  { icon: Megaphone, name: 'Media & press', email: 'press@vifc.vn' },
  { icon: LineChart, name: 'IR services', email: 'ir@vifc.vn' },
]

const topics = [
  'General enquiry',
  'Partnership',
  'Media & press',
  'IR services',
  'Data & listings',
  'Something else',
]

const emptyForm = { name: '', email: '', company: '', topic: 'General enquiry', message: '' }

const controlBase =
  'w-full min-w-0 rounded-md border border-input bg-input-background px-3 text-sm transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]'
const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5'

export function ContactPage(nav: NavigationHandlers) {
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-xs text-orange-600 mb-2 uppercase">Contact</div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-2">
              Talk to the VietnamIR team
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Questions about the platform, a partnership, media, or our investor-relations
              services? Reach out and we&apos;ll route you to the right team.
            </p>
          </div>
        </section>

        {/* Contact + Form */}
        <section className="bg-slate-50">
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: contact info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-1">Get in touch</h2>
                  <p className="text-sm text-slate-600">
                    We&apos;d love to hear from investors, issuers, and partners across
                    Vietnam&apos;s markets.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((c) => (
                    <div key={c.label} className="bg-white border p-5">
                      <div className="w-10 h-10 bg-orange-50 flex items-center justify-center mb-3">
                        <c.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-sm font-medium text-slate-900">{c.label}</div>
                      {c.lines.map((l) => (
                        <div key={l} className="text-sm text-slate-600">
                          {l}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="bg-white border p-6">
                  <h3 className="text-base font-semibold text-slate-900 mb-4">Departments</h3>
                  <div className="space-y-4">
                    {departments.map((d) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-50 flex items-center justify-center flex-shrink-0">
                          <d.icon className="w-4 h-4 text-slate-600" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm text-slate-900">{d.name}</div>
                          <a
                            href={`mailto:${d.email}`}
                            className="text-sm text-orange-600 hover:text-orange-700"
                          >
                            {d.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="bg-white border p-6 lg:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 bg-green-50 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Thanks — we&apos;ll be in touch.
                    </h3>
                    <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
                      Your message has been received (in this demo, nothing is actually sent). Our
                      team typically replies within two business days.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false)
                        setForm(emptyForm)
                      }}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Name
                        </label>
                        <Input
                          id="name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className={labelClass}>
                        Company{' '}
                        <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <Input
                        id="company"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Company or fund name"
                      />
                    </div>

                    <div>
                      <label htmlFor="topic" className={labelClass}>
                        Topic
                      </label>
                      <select
                        id="topic"
                        value={form.topic}
                        onChange={(e) => setForm({ ...form, topic: e.target.value })}
                        className={`${controlBase} h-9 py-1`}
                      >
                        {topics.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can we help?"
                        className={`${controlBase} py-2 resize-y`}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      Send message <Send className="w-4 h-4" />
                    </Button>
                    <p className="text-xs text-slate-400">
                      This is a demo form — submissions are not sent anywhere.
                    </p>
                  </form>
                )}
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
