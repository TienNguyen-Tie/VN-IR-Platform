import { useState } from 'react'
import { ArrowRight, Sparkles, DollarSign, Building2, Users, MapPin, type LucideIcon } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts'
import {
  SponsoredBy,
  ImageWithFallback,
  RangeSelector,
  AIInsightTooltip,
  type AITooltipPayloadItem,
  type ChartRange,
} from '../ui'

/* FDI figures per MPI/NSO: H1 2026 registered $34.65B (+61%), disbursed $13.03B */
const stats: { label: string; value: string; icon: LucideIcon }[] = [
  { label: 'Registered FDI (H1 2026)', value: '$34.65B', icon: DollarSign },
  { label: 'Disbursed FDI (H1 2026)', value: '$13.03B', icon: Building2 },
  { label: 'Jobs Created', value: '285K', icon: Users },
  { label: 'Provinces & Cities', value: '34', icon: MapPin },
]

const fdiData: Record<ChartRange, { month: string; registered: number; disbursed: number }[]> = {
  '1M': [
    { month: 'Jun W1', registered: 1.4, disbursed: 0.6 },
    { month: 'Jun W2', registered: 1.6, disbursed: 0.5 },
    { month: 'Jun W3', registered: 1.2, disbursed: 0.7 },
    { month: 'Jun W4', registered: 1.8, disbursed: 0.6 },
    { month: 'Jul W1', registered: 1.3, disbursed: 0.5 },
    { month: 'Jul W2', registered: 1.5, disbursed: 0.6 },
  ],
  '3M': [
    { month: 'Apr', registered: 5.0, disbursed: 2.2 },
    { month: 'May', registered: 5.7, disbursed: 2.25 },
    { month: 'Jun', registered: 5.95, disbursed: 2.4 },
  ],
  '6M': [
    { month: 'Jan', registered: 4.3, disbursed: 1.9 },
    { month: 'Feb', registered: 5.5, disbursed: 2.0 },
    { month: 'Mar', registered: 8.2, disbursed: 2.3 },
    { month: 'Apr', registered: 5.0, disbursed: 2.2 },
    { month: 'May', registered: 5.7, disbursed: 2.25 },
    { month: 'Jun', registered: 5.95, disbursed: 2.4 },
  ],
  YTD: [
    { month: 'Q1 26', registered: 18.0, disbursed: 6.3 },
    { month: 'Q2 26', registered: 16.65, disbursed: 6.73 },
  ],
  '1Y': [
    { month: 'Q3 25', registered: 8.0, disbursed: 6.5 },
    { month: 'Q4 25', registered: 12.1, disbursed: 8.1 },
    { month: 'Q1 26', registered: 18.0, disbursed: 6.3 },
    { month: 'Q2 26', registered: 16.65, disbursed: 6.73 },
  ],
  '3Y': [
    { month: '2023', registered: 39.4, disbursed: 23.18 },
    { month: '2024', registered: 38.23, disbursed: 25.35 },
    { month: '2025', registered: 38.42, disbursed: 27.6 },
    { month: '2026 H1', registered: 34.65, disbursed: 13.03 },
  ],
}

/* Per-datapoint insights — MPI/NSO context for each period on the chart */
const fdiInsights: Record<string, string> = {
  '2023': '2023: $39.4B registered — a record year; $23.2B disbursed.',
  '2024': '2024: $38.2B registered; disbursement hit a then-record $25.35B.',
  '2025': '2025: $38.42B registered; $27.6B disbursed — an all-time high.',
  '2026 H1': 'H1 2026: $34.65B registered (+61% YoY); $13.03B disbursed — best first half in 18 years.',
  'Q1 26': 'Q1 2026 (est. split of H1): registration surge led by Singapore-backed mega-projects.',
  'Q2 26': 'Q2 2026: H1 total reached $34.65B — Singapore supplied 42% of newly registered capital.',
  'Q4 25': 'Q4 2025: year-end approvals pushed 2025 registration to $38.42B (+0.5% YoY).',
  'Q3 25': 'Q3 2025: disbursement pace set up the record $27.6B full-year figure.',
  Jan: 'January 2026: strong start — manufacturing projects dominate new registrations.',
  Feb: 'February 2026: post-Tet approvals accelerate; Singapore leads source countries.',
  Mar: 'March 2026: biggest month of Q1 as industrial-park expansions are licensed.',
  Apr: 'April 2026: momentum holds after the FTSE upgrade confirmation on April 8.',
  May: 'May 2026: registered capital keeps a +61% YoY pace; disbursement steady.',
  Jun: 'June 2026: H1 closes at $34.65B registered / $13.03B disbursed (MPI).',
}

const fdiFallback = (_label: string, payload: AITooltipPayloadItem[]) => {
  const reg = payload.find((p) => p.name?.startsWith('Registered'))
  const dis = payload.find((p) => p.name?.startsWith('Disbursed'))
  if (typeof reg?.value !== 'number' || typeof dis?.value !== 'number') return null
  return `Registered $${reg.value}B vs disbursed $${dis.value}B (weekly est.) — 2026 running +61% YoY.`
}

/* H1 2026 top sources: Singapore $7.31B, South Korea $5.45B (MPI) */
const countries = [
  { country: 'Singapore', amount: '$7.31B', projects: 265 },
  { country: 'South Korea', amount: '$5.45B', projects: 214 },
  { country: 'China', amount: '$3.90B', projects: 302 },
  { country: 'Japan', amount: '$3.40B', projects: 171 },
  { country: 'Taiwan', amount: '$2.80B', projects: 142 },
]

const news = [
  { title: 'FDI inflows surge 61% in H1 2026 to $34.65B, led by Singapore', time: '3h ago', image: 'https://images.unsplash.com/photo-1602848050027-66adedeb1a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwYnVzaW5lc3MlMjBwZW9wbGUlMjBtZWV0aW5nfGVufDF8fHx8MTc2MDc4MDQwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'Disbursed FDI hits $13.03B, highest first half in 18 years', time: '5h ago', image: 'https://images.unsplash.com/photo-1697281679290-ad7be1b10682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwbWFudWZhY3R1cmluZyUyMGZhY3Rvcnl8ZW58MXx8fHwxNzYwNzgwNDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'New industrial parks approved in northern provinces', time: '8h ago', image: 'https://images.unsplash.com/photo-1758487893269-9dd7dff6366f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwcG9ydCUyMGxvZ2lzdGljc3xlbnwxfHx8fDE3NjA3ODA0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'South Korean electronics firms expand operations', time: '1d ago', image: 'https://images.unsplash.com/photo-1672069001612-5aa1f50de74b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwYnVzaW5lc3MlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MDc4MDQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'Politburo Resolution 10 pivots FDI strategy to quality over quantity', time: '1d ago', image: 'https://images.unsplash.com/photo-1719845788637-57ff1e230578?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZmluYW5jZSUyMG9mZmljZXxlbnwxfHx8fDE3NjA3ODA0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'Government streamlines investment licensing procedures', time: '2d ago', image: 'https://images.unsplash.com/photo-1739204618173-3e89def7140f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwd2FyZWhvdXNlJTIwZGlzdHJpYnV0aW9ufGVufDF8fHx8MTc2MDc4MDQwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'Japanese investors commit billions to high-tech manufacturing', time: '2d ago', image: 'https://images.unsplash.com/photo-1758092726614-7e5c023d019e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwY2l0eSUyMHNreWxpbmUlMjBtb2Rlcm58ZW58MXx8fHwxNzYwNzgwNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  { title: 'Moody’s lifts Vietnam outlook to Positive on reform momentum', time: '3d ago', image: 'https://images.unsplash.com/photo-1739206202374-3cf3f1a4a164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwc2hpcHBpbmclMjBjb250YWluZXJzfGVufDF8fHx8MTc2MDc4MDQwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
]

export function FDISection() {
  const [timeframe, setTimeframe] = useState<ChartRange>('YTD')

  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Foreign Direct Investment (FDI)</h2>
            <p className="text-sm text-slate-600">Capital inflows, investment trends, and source countries</p>
          </div>
          <a href="#/dashboard" className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
            Full Report <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="p-4 border bg-slate-50">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="w-4 h-4 text-orange-600" />
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
              <div className="text-2xl text-slate-900">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border p-4 bg-white relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">FDI Trends - Registered vs Disbursed ($B)</h3>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-600">AI Insight</span>
              </div>
            </div>
            <RangeSelector value={timeframe} onChange={setTimeframe} />
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={fdiData[timeframe]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical horizontal />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(234, 88, 12, 0.06)' }}
                  content={
                    <AIInsightTooltip
                      getInsight={(label, payload) => fdiInsights[label] ?? fdiFallback(label, payload)}
                    />
                  }
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
                <Bar dataKey="registered" fill="#ea580c" name="Registered ($B)" />
                <Bar dataKey="disbursed" fill="#fb7d3c" name="Disbursed ($B)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border bg-white">
            <div className="p-4 bg-slate-50 border-b">
              <h3 className="text-sm font-semibold">Top Source Countries</h3>
            </div>
            <div className="divide-y">
              {countries.map((c, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-900">{c.country}</span>
                    <span className="text-sm text-orange-600">{c.amount}</span>
                  </div>
                  <div className="text-xs text-slate-500">{c.projects} projects</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 mb-3">
          {news.map((item, i) => (
            <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:border-orange-600 transition-colors cursor-pointer flex gap-3 overflow-hidden h-24">
              <div className="flex-1 min-w-0 p-3 flex flex-col justify-between">
                <p className="text-xs text-slate-900 leading-tight line-clamp-3">{item.title}</p>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
              <div className="w-24 h-24 flex-shrink-0 bg-slate-100 overflow-hidden">
                <ImageWithFallback src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="Vietnam Investment Review" website="https://vir.com.vn" />
        </div>
      </div>
    </section>
  )
}
