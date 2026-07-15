import { useState } from 'react'
import {
  ArrowRight,
  Building2,
  Calendar,
  Download,
  FileText,
  Globe,
  MapPin,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Company, NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { ImageWithFallback, chartTooltipStyle } from '../components/ui'

/* ---------------------------------- Static data (July 2026) ---------------------------------- */

const industryMap: Record<string, string> = {
  Technology: 'IT Services & Software',
  Banking: 'Commercial Banking',
  Conglomerate: 'Diversified Holdings',
  'Steel & Manufacturing': 'Steel Production',
  'Consumer Goods': 'Food & Beverage',
  'Real Estate': 'Property Development',
  Energy: 'Oil & Gas',
}

interface CompanyInfo {
  description: string
  founded: string
  employees: string
  ceo: string
  revenue: string
  netIncome: string
  website: string
  headquarters: string
}

const companyInfoMap: Record<string, CompanyInfo> = {
  FPT: {
    description:
      "FPT Corporation is Vietnam's leading technology and telecommunications group, specializing in software development, IT services, telecommunications, and education. With over 40,000 employees globally, FPT delivers innovative solutions to more than 1,000 customers worldwide, including Fortune 500 companies.",
    founded: 'September 13, 1988',
    employees: '40,000+',
    ceo: 'Nguyen Van Khoa',
    revenue: '₫32.1 Trillion',
    netIncome: '₫5.88 Trillion',
    website: 'https://www.fpt.com.vn',
    headquarters: 'Hanoi, Vietnam',
  },
  VCB: {
    description:
      'Joint Stock Commercial Bank for Foreign Trade of Vietnam (Vietcombank) is one of the largest commercial banks in Vietnam, offering comprehensive banking services including retail banking, corporate banking, and investment banking services to millions of customers across the country.',
    founded: 'April 1, 1963',
    employees: '20,000+',
    ceo: 'Pham Quang Dung',
    revenue: '₫98.5 Trillion',
    netIncome: '₫28.4 Trillion',
    website: 'https://www.vietcombank.com.vn',
    headquarters: 'Hanoi, Vietnam',
  },
  VIC: {
    description:
      "Vingroup is Vietnam's largest private conglomerate with diversified business operations spanning real estate, retail, healthcare, education, agriculture, and automotive manufacturing. The group is known for pioneering Vietnamese brands and transforming various industries.",
    founded: 'August 8, 1993',
    employees: '60,000+',
    ceo: 'Nguyen Viet Quang',
    revenue: '₫156.2 Trillion',
    netIncome: '₫18.7 Trillion',
    website: 'https://www.vingroup.net',
    headquarters: 'Hanoi, Vietnam',
  },
  HPG: {
    description:
      "Hoa Phat Group is Vietnam's leading steel manufacturer and one of the largest in Southeast Asia. The company produces construction steel, steel pipes, and related products, serving both domestic and international markets with a strong focus on sustainable practices.",
    founded: 'September 1992',
    employees: '15,000+',
    ceo: 'Tran Dinh Long',
    revenue: '₫124.8 Trillion',
    netIncome: '₫22.3 Trillion',
    website: 'https://www.hoaphat.com.vn',
    headquarters: 'Hanoi, Vietnam',
  },
  MSN: {
    description:
      'Masan Group is a leading consumer-focused conglomerate in Vietnam, operating in key sectors including consumer retail, food & beverage, financial services, and resources. The company owns several well-known brands and has a strong distribution network nationwide.',
    founded: '2004',
    employees: '25,000+',
    ceo: 'Danny Le',
    revenue: '₫89.4 Trillion',
    netIncome: '₫12.6 Trillion',
    website: 'https://www.masangroup.com',
    headquarters: 'Ho Chi Minh City, Vietnam',
  },
  VHM: {
    description:
      "Vinhomes is Vietnam's largest real estate developer and a subsidiary of Vingroup. The company develops large-scale residential projects, commercial properties, and integrated urban areas across major Vietnamese cities, setting new standards for quality living.",
    founded: 'December 2012',
    employees: '10,000+',
    ceo: 'Nguyen Viet Quang',
    revenue: '₫76.5 Trillion',
    netIncome: '₫24.8 Trillion',
    website: 'https://www.vinhomes.vn',
    headquarters: 'Hanoi, Vietnam',
  },
  GAS: {
    description:
      "PetroVietnam Gas Joint Stock Corporation is Vietnam's leading gas company, engaged in the transportation, storage, distribution, and trading of natural gas. The company operates critical infrastructure serving power plants and industrial customers nationwide.",
    founded: 'April 26, 2006',
    employees: '5,000+',
    ceo: 'Duong Manh Son',
    revenue: '₫67.8 Trillion',
    netIncome: '₫15.2 Trillion',
    website: 'https://www.pvgas.com.vn',
    headquarters: 'Ho Chi Minh City, Vietnam',
  },
  VNM: {
    description:
      'Vietnam Dairy Products Joint Stock Company (Vinamilk) is the leading dairy company in Vietnam and one of the largest in Asia. The company produces a wide range of dairy products including milk, yogurt, and nutritional supplements, distributed across 43 countries worldwide.',
    founded: 'January 20, 1976',
    employees: '8,000+',
    ceo: 'Mai Kieu Lien',
    revenue: '₫58.3 Trillion',
    netIncome: '₫11.4 Trillion',
    website: 'https://www.vinamilk.com.vn',
    headquarters: 'Ho Chi Minh City, Vietnam',
  },
}

/* Chart data per range — illustrative, labels shifted to July 2026 era. */
interface PricePoint {
  time: string
  price: number
}

const CHART_RANGE_KEYS = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '3Y', '5Y'] as const
type StockRange = (typeof CHART_RANGE_KEYS)[number]

const chartRanges: Record<StockRange, PricePoint[]> = {
  '1D': [
    { time: '9:00', price: 45200 },
    { time: '10:00', price: 45350 },
    { time: '11:00', price: 45180 },
    { time: '12:00', price: 45420 },
    { time: '13:00', price: 45380 },
    { time: '14:00', price: 45550 },
    { time: '15:00', price: 45680 },
  ],
  '5D': [
    { time: 'Mon', price: 44800 },
    { time: 'Tue', price: 45100 },
    { time: 'Wed', price: 44950 },
    { time: 'Thu', price: 45300 },
    { time: 'Fri', price: 45680 },
  ],
  '1M': [
    { time: 'Jun 17', price: 43200 },
    { time: 'Jun 21', price: 43800 },
    { time: 'Jun 25', price: 44100 },
    { time: 'Jun 29', price: 43950 },
    { time: 'Jul 3', price: 44500 },
    { time: 'Jul 7', price: 44850 },
    { time: 'Jul 11', price: 45200 },
    { time: 'Jul 15', price: 45680 },
  ],
  '3M': [
    { time: 'Apr', price: 41500 },
    { time: 'May', price: 42300 },
    { time: 'Jun', price: 43950 },
    { time: 'Jul', price: 45680 },
  ],
  '6M': [
    { time: 'Jan', price: 39800 },
    { time: 'Feb', price: 40500 },
    { time: 'Mar', price: 40200 },
    { time: 'Apr', price: 41500 },
    { time: 'May', price: 42300 },
    { time: 'Jun', price: 43950 },
    { time: 'Jul', price: 45680 },
  ],
  YTD: [
    { time: 'Jan', price: 39800 },
    { time: 'Feb', price: 40500 },
    { time: 'Mar', price: 40200 },
    { time: 'Apr', price: 41500 },
    { time: 'May', price: 42300 },
    { time: 'Jun', price: 43950 },
    { time: 'Jul', price: 45680 },
  ],
  '1Y': [
    { time: 'Jul 25', price: 38200 },
    { time: 'Oct 25', price: 40100 },
    { time: 'Jan 26', price: 39800 },
    { time: 'Apr 26', price: 41500 },
    { time: 'Jul 26', price: 45680 },
  ],
  '3Y': [
    { time: '2023', price: 35000 },
    { time: '2024', price: 38500 },
    { time: '2025', price: 42000 },
    { time: '2026', price: 45680 },
  ],
  '5Y': [
    { time: '2021', price: 28000 },
    { time: '2022', price: 32000 },
    { time: '2023', price: 35000 },
    { time: '2024', price: 38500 },
    { time: '2025', price: 42000 },
    { time: '2026', price: 45680 },
  ],
}

const annualData = [
  { year: '2021', revenue: 18500, netIncome: 2800 },
  { year: '2022', revenue: 21200, netIncome: 3400 },
  { year: '2023', revenue: 24800, netIncome: 4100 },
  { year: '2024', revenue: 28500, netIncome: 4950 },
  { year: '2025', revenue: 32100, netIncome: 5880 },
]

const quarterlyData = [
  { quarter: 'Q3 2025', revenue: 7200, netIncome: 1320 },
  { quarter: 'Q4 2025', revenue: 7850, netIncome: 1440 },
  { quarter: 'Q1 2026', revenue: 8300, netIncome: 1520 },
  { quarter: 'Q2 2026', revenue: 8750, netIncome: 1600 },
]

const financialRatios = [
  { label: 'ROE', value: '22.4%', note: '+2.1% YoY', noteClass: 'text-green-600' },
  { label: 'ROA', value: '14.8%', note: '+1.5% YoY', noteClass: 'text-green-600' },
  { label: 'Debt/Equity', value: '0.45', note: 'Healthy', noteClass: 'text-slate-500' },
  { label: 'Current Ratio', value: '2.1', note: 'Strong', noteClass: 'text-green-600' },
  { label: 'Quick Ratio', value: '1.8', note: 'Solid', noteClass: 'text-green-600' },
  { label: 'EPS', value: '4,250', note: '+15% YoY', noteClass: 'text-green-600' },
]

const newsItems = [
  {
    title: 'FPT Corporation announces Q2 2026 earnings: Revenue up 18% YoY',
    date: 'July 10, 2026',
    category: 'Earnings',
    image:
      'https://images.unsplash.com/photo-1760555960699-dc19c4104301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZmluYW5jZSUyMG1vZGVybnxlbnwxfHx8fDE3NjA2NjA2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Strong performance driven by digital transformation services and technology exports.',
  },
  {
    title: 'New strategic partnership with leading Japanese tech firm',
    date: 'July 6, 2026',
    category: 'Corporate',
    image:
      'https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb3Jwb3JhdGV8ZW58MXx8fHwxNzYwNzU5MjA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Partnership to enhance AI and cloud computing capabilities in Southeast Asia.',
  },
  {
    title: 'Board approves $50M share buyback program',
    date: 'June 30, 2026',
    category: 'Investor Relations',
    image:
      'https://images.unsplash.com/photo-1631856952982-7db18c2bdca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwYW5hbHlzaXMlMjBncmFwaHxlbnwxfHx8fDE3NjA3NTkyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: "Demonstrates confidence in company's financial strength and future prospects.",
  },
  {
    title: 'Expansion into renewable energy sector with new solar project',
    date: 'June 22, 2026',
    category: 'Corporate',
    image:
      'https://images.unsplash.com/photo-1733503747506-773e56e4078f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MDY5NjQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    excerpt: 'Investing $120M in solar energy infrastructure to support ESG commitments.',
  },
]

const ownershipData = [
  { name: 'Strategic Investors', value: 35, color: '#ea580c' },
  { name: 'Institutional Investors', value: 28, color: '#fb923c' },
  { name: 'Foreign Investors', value: 22, color: '#fdba74' },
  { name: 'Retail Investors', value: 15, color: '#fed7aa' },
]

const majorShareholders = [
  { name: 'Vietnam Investment Fund', shares: '45,200,000', percentage: '18.5%', type: 'Strategic' },
  { name: 'Dragon Capital', shares: '32,800,000', percentage: '13.4%', type: 'Institutional' },
  { name: 'State Capital Investment Corporation', shares: '28,500,000', percentage: '11.7%', type: 'Strategic' },
  { name: 'VinaCapital', shares: '24,100,000', percentage: '9.9%', type: 'Institutional' },
  { name: 'Mekong Capital', shares: '18,600,000', percentage: '7.6%', type: 'Institutional' },
]

const documents = [
  {
    category: 'Financial Reports',
    items: [
      { title: 'Annual Report 2025', date: 'March 31, 2026', size: '2.4 MB' },
      { title: 'Q2 2026 Financial Statements', date: 'July 15, 2026', size: '1.8 MB' },
      { title: 'Q1 2026 Financial Statements', date: 'April 15, 2026', size: '1.7 MB' },
      { title: 'Q4 2025 Financial Statements', date: 'January 15, 2026', size: '1.6 MB' },
    ],
  },
  {
    category: 'Shareholder Documents',
    items: [
      { title: '2026 Annual General Meeting Notice', date: 'March 15, 2026', size: '850 KB' },
      { title: 'Proxy Voting Form 2026', date: 'March 15, 2026', size: '320 KB' },
      { title: 'Articles of Association (Updated)', date: 'January 10, 2026', size: '1.2 MB' },
    ],
  },
  {
    category: 'Corporate Governance',
    items: [
      { title: 'Corporate Governance Report 2025', date: 'March 31, 2026', size: '1.5 MB' },
      { title: 'Board of Directors Bios', date: 'February 20, 2026', size: '680 KB' },
      { title: 'Code of Business Conduct', date: 'January 5, 2026', size: '920 KB' },
    ],
  },
  {
    category: 'Presentations',
    items: [
      { title: 'Q2 2026 Investor Presentation', date: 'July 15, 2026', size: '3.2 MB' },
      { title: '2026 Corporate Strategy Overview', date: 'May 12, 2026', size: '4.1 MB' },
      { title: 'ESG Report 2025', date: 'June 30, 2026', size: '2.8 MB' },
    ],
  },
]

const pageTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'financials', label: 'Financials' },
  { id: 'shareholders', label: 'Shareholders' },
  { id: 'documents', label: 'Documents' },
  { id: 'news', label: 'News' },
]

/* ---------------------------------- Company hero ---------------------------------- */

interface CompanyHeroProps {
  companyName: string
  ticker: string
  exchange: string
  sector: string
  /** Passed per spec but not rendered in the hero. */
  industry: string
  website: string
  headquarters: string
  stockPrice: number
  priceChange: number
  priceChangePercent: number
  marketCap: string
  volume: string
  isWatchlisted: boolean
  logoUrl?: string
}

function CompanyHero({
  companyName,
  ticker,
  exchange,
  sector,
  website,
  headquarters,
  stockPrice,
  priceChange,
  priceChangePercent,
  marketCap,
  volume,
  isWatchlisted,
  logoUrl,
}: CompanyHeroProps) {
  const isPositive = priceChangePercent >= 0

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
              {logoUrl ? (
                <ImageWithFallback src={logoUrl} alt={companyName} className="w-full h-full object-contain p-2" />
              ) : (
                <Building2 className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl text-slate-900">{companyName}</h1>
                <button className="p-1.5 border border-slate-300 hover:border-orange-600 hover:bg-orange-50 transition-colors">
                  <Star
                    className={`w-4 h-4 ${
                      isWatchlisted ? 'fill-orange-600 text-orange-600' : 'text-slate-400'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                <span className="text-slate-900">{ticker}</span>
                <span className="text-slate-400">•</span>
                <span>{exchange}</span>
                <span className="text-slate-400">•</span>
                <span>{sector}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{headquarters}</span>
                </div>
                <span className="text-slate-400">•</span>
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700"
                  >
                    {website}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-300 text-sm text-slate-700 hover:border-orange-600 hover:bg-orange-50 transition-colors">
              Download Report
            </button>
            <button className="px-4 py-2 bg-orange-600 text-sm text-white hover:bg-orange-700 transition-colors">
              Contact IR
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs text-slate-600 mb-1">Current Price</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-slate-900">{stockPrice.toLocaleString()}</span>
              <span className="text-xs text-slate-500">VND</span>
            </div>
            <div
              className={`flex items-center gap-1 mt-1 text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>
                {isPositive ? '+' : ''}
                {priceChange.toLocaleString()}
              </span>
              <span>
                ({isPositive ? '+' : ''}
                {priceChangePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Today's Change</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs text-slate-600 mb-1">Market Cap</div>
            <div className="text-2xl text-slate-900 mb-1">{marketCap}</div>
            <div className="text-[10px] text-slate-500">VND Billion</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs text-slate-600 mb-1">Volume</div>
            <div className="text-2xl text-slate-900 mb-1">{volume}</div>
            <div className="text-[10px] text-slate-500">Shares Traded</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs text-slate-600 mb-1">P/E Ratio</div>
            <div className="text-2xl text-slate-900 mb-1">15.8</div>
            <div className="text-[10px] text-slate-500">TTM</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-4">
            <div className="text-xs text-slate-600 mb-1">Dividend Yield</div>
            <div className="text-2xl text-slate-900 mb-1">3.2%</div>
            <div className="text-[10px] text-slate-500">Annual</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- Stock price chart ---------------------------------- */

function StockPriceChart() {
  const [range, setRange] = useState<StockRange>('1M')
  const data = chartRanges[range]
  const isUp = data[data.length - 1].price >= data[0].price

  return (
    <div className="bg-white border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-slate-900">Stock Price Performance</h3>
        <div className="flex gap-1 border border-slate-300 p-0.5">
          {CHART_RANGE_KEYS.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2 py-1 text-[10px] transition-colors ${
                range === r ? 'bg-orange-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0.2} />
              <stop offset="95%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} horizontal={true} />
          <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Area
            type="monotone"
            dataKey="price"
            name="Price (VND)"
            stroke={isUp ? '#10b981' : '#ef4444'}
            strokeWidth={2.5}
            fill="url(#stockGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ---------------------------------- Company overview ---------------------------------- */

function CompanyOverview({ info }: { info: CompanyInfo }) {
  const facts = [
    { icon: Calendar, label: 'Founded', value: info.founded },
    { icon: Users, label: 'Employees', value: info.employees },
    { icon: Building2, label: 'CEO', value: info.ceo },
    { icon: FileText, label: 'Annual Revenue (2025)', value: info.revenue },
  ]

  return (
    <div className="bg-white border border-slate-200">
      <div className="p-4 bg-slate-50 border-b">
        <h3 className="text-sm text-slate-900">Company Overview</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-slate-700 leading-relaxed mb-6">{info.description}</p>
        <div className="grid grid-cols-2 gap-4">
          {facts.map((fact) => {
            const Icon = fact.icon
            return (
              <div key={fact.label} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">{fact.label}</div>
                  <div className="text-sm text-slate-900">{fact.value}</div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-slate-600 mb-1">Revenue Growth</div>
              <div className="text-lg text-green-600">+12.5%</div>
              <div className="text-[10px] text-slate-500">YoY</div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-1">Net Income</div>
              <div className="text-lg text-slate-900">{info.netIncome}</div>
              <div className="text-[10px] text-slate-500">2025</div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-1">Profit Margin</div>
              <div className="text-lg text-slate-900">18.3%</div>
              <div className="text-[10px] text-slate-500">2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- Financial highlights ---------------------------------- */

function FinancialHighlights() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200">
        <div className="p-4 bg-slate-50 border-b">
          <h3 className="text-sm text-slate-900">Financial Performance (Annual)</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={annualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} horizontal={true} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
              <Bar dataKey="revenue" name="Revenue (B VND)" fill="#ea580c" barSize={40} />
              <Bar dataKey="netIncome" name="Net Income (B VND)" fill="#fb923c" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200">
        <div className="p-4 bg-slate-50 border-b">
          <h3 className="text-sm text-slate-900">Quarterly Performance (Last 4 Quarters)</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={quarterlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} horizontal={true} />
              <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={{ stroke: '#cbd5e1' }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '11px' }} />
              <Bar dataKey="revenue" name="Revenue (B VND)" fill="#ea580c" barSize={40} />
              <Bar dataKey="netIncome" name="Net Income (B VND)" fill="#fb923c" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200">
        <div className="p-4 bg-slate-50 border-b">
          <h3 className="text-sm text-slate-900">Key Financial Ratios</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {financialRatios.map((ratio) => (
              <div key={ratio.label} className="p-3 bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-600 mb-1">{ratio.label}</div>
                <div className="text-xl text-slate-900">{ratio.value}</div>
                <div className={`text-[10px] ${ratio.noteClass} mt-1`}>{ratio.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- News ---------------------------------- */

function CompanyNews() {
  return (
    <div className="bg-white border border-slate-200">
      <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
        <h3 className="text-sm text-slate-900">Latest News & Announcements</h3>
        <a href="#" className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </a>
      </div>
      <div className="divide-y divide-slate-200">
        {newsItems.map((item, i) => (
          <a key={i} href="#" className="flex gap-4 p-4 hover:bg-slate-50 transition-colors">
            <div className="w-24 h-24 bg-slate-100 flex-shrink-0 overflow-hidden">
              <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-orange-50 border border-orange-200 text-[10px] text-orange-700">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>
              <h4 className="text-sm text-slate-900 mb-1 line-clamp-2">{item.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{item.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------- Shareholders ---------------------------------- */

function Shareholders() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200">
        <div className="p-4 bg-slate-50 border-b">
          <h3 className="text-sm text-slate-900">Ownership Structure</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={ownershipData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ownershipData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xs text-slate-600 mb-1">Total Shares Outstanding</div>
                <div className="text-lg text-slate-900">244,500,000</div>
              </div>
              <div>
                <div className="text-xs text-slate-600 mb-1">Free Float</div>
                <div className="text-lg text-slate-900">37%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200">
        <div className="p-4 bg-slate-50 border-b">
          <h3 className="text-sm text-slate-900">Major Shareholders</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 text-xs text-slate-600">Shareholder</th>
                  <th className="text-right py-2 text-xs text-slate-600">Shares</th>
                  <th className="text-right py-2 text-xs text-slate-600">Percentage</th>
                  <th className="text-center py-2 text-xs text-slate-600">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {majorShareholders.map((holder, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-3 text-sm text-slate-900">{holder.name}</td>
                    <td className="py-3 text-sm text-slate-700 text-right">{holder.shares}</td>
                    <td className="py-3 text-sm text-slate-900 text-right">{holder.percentage}</td>
                    <td className="py-3 text-center">
                      <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-[10px] text-slate-700">
                        {holder.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- Documents ---------------------------------- */

function Documents() {
  return (
    <div className="bg-white border border-slate-200">
      <div className="p-4 bg-slate-50 border-b">
        <h3 className="text-sm text-slate-900">IR Documents & Reports</h3>
      </div>
      <div className="p-4">
        <div className="space-y-6">
          {documents.map((group, i) => (
            <div key={i}>
              <h4 className="text-xs text-slate-900 mb-3">{group.category}</h4>
              <div className="space-y-2">
                {group.items.map((doc, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between p-3 border border-slate-200 hover:border-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-orange-50 border border-orange-200 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-slate-900 mb-1">{doc.title}</div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{doc.date}</span>
                          </div>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 border border-slate-300 hover:border-orange-600 hover:bg-orange-100 transition-colors flex-shrink-0">
                      <Download className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------- Page ---------------------------------- */

type CompanyPageProps = NavigationHandlers & {
  company: Company
  onBack: () => void
}

export function CompanyPage({ company, onBack, ...nav }: CompanyPageProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const price = parseFloat(company.price.replace(/,/g, ''))
  const changePct = company.change
  const priceChange = (price * changePct) / 100
  const info = companyInfoMap[company.ticker] ?? companyInfoMap.FPT
  const extras = company as Company & { volume?: string }
  const volume = extras.volume ?? '2.4M'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header {...nav} />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={nav.onNavigateToHome}
              className="text-sm text-slate-600 hover:text-orange-600 transition-colors"
            >
              Home
            </button>
            <span className="text-slate-400">/</span>
            <button onClick={onBack} className="text-sm text-slate-600 hover:text-orange-600 transition-colors">
              Listed Companies
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-sm text-slate-900">{company.ticker}</span>
          </div>
        </div>
      </div>

      <CompanyHero
        companyName={company.name}
        ticker={company.ticker}
        exchange="HOSE"
        sector={company.sector}
        industry={industryMap[company.sector] ?? company.sector}
        website={info.website}
        headquarters={info.headquarters}
        stockPrice={price}
        priceChange={priceChange}
        priceChangePercent={changePct}
        marketCap={company.marketCap.replace('$', '').replace('B', ',000')}
        volume={volume}
        isWatchlisted={false}
      />

      {/* Stock chart */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <StockPriceChart />
        </div>
      </section>

      {/* Sticky tab bar */}
      <section className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 border-b border-slate-200">
            {pageTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <CompanyOverview info={info} />
                <FinancialHighlights />
              </div>
              <div className="lg:col-span-1">
                <CompanyNews />
              </div>
            </div>
          )}
          {activeTab === 'financials' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <FinancialHighlights />
              </div>
            </div>
          )}
          {activeTab === 'shareholders' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Shareholders />
            </div>
          )}
          {activeTab === 'documents' && (
            <div className="grid lg:grid-cols-1 gap-6">
              <Documents />
            </div>
          )}
          {activeTab === 'news' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <CompanyNews />
              </div>
            </div>
          )}
        </div>
      </section>

      <AIAssistant />
      <Footer />
    </div>
  )
}
