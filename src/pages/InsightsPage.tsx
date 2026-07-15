import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  ChartColumn,
  Clock,
  Download,
  FileText,
  Funnel,
  Headphones,
  Mic,
  Play,
  Quote,
  Search,
  User,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { chartTooltipStyle, navigate } from '../components/ui'
import { slugify } from '../data/articles'
import type { NavigationHandlers } from '../types'

/* ---------------------------------- Local UI primitives ---------------------------------- */

function Input({ className = '', type, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${className}`}
      {...props}
    />
  )
}

function Badge({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <span
      data-slot="badge"
      className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden ${className}`}
    >
      {children}
    </span>
  )
}

/* ---------------------------------- Data ---------------------------------- */

interface Article {
  id: string
  title: string
  category: string
  author: string
  date: string
  readTime: string
  excerpt: string
  featured?: boolean
  tags: string[]
}

const articles: Article[] = [
  {
    id: '1',
    title: "Vietnam's Capital Markets Transformation: The Emerging Market Era Begins",
    category: 'Market Analysis',
    author: 'Dr. Nguyen Minh Tam',
    date: 'Jul 10, 2026',
    readTime: '8 min read',
    excerpt:
      "With FTSE Russell's emerging market upgrade taking effect September 21, 2026 and the VN-Index touching a record 1,937 in June, we analyze the key drivers, challenges, and investment opportunities shaping the second half of 2026.",
    featured: true,
    tags: ['FTSE Upgrade', 'Foreign Investment', 'Market Infrastructure'],
  },
  {
    id: '2',
    title: "FPT Corporation: Leading Vietnam's Digital Transformation",
    category: 'Company Research',
    author: 'Sarah Chen',
    date: 'Jul 8, 2026',
    readTime: '12 min read',
    excerpt:
      "An in-depth analysis of FPT's strategic positioning in AI, cloud services, and digital transformation across Southeast Asia. Our price target suggests 25% upside potential.",
    featured: true,
    tags: ['Technology', 'Digital Services', 'AI'],
  },
  {
    id: '3',
    title: "Vietnam's GDP Growth: Sustaining Momentum in Uncertain Times",
    category: 'Economic Outlook',
    author: 'Michael Thompson',
    date: 'Jul 4, 2026',
    readTime: '10 min read',
    excerpt:
      "Vietnam's 8.39% GDP growth in Q2 2026 outpaces regional peers. We examine the drivers behind this acceleration and whether the government's 10% target for 2026 is within reach.",
    featured: true,
    tags: ['GDP', 'Macroeconomics', 'Growth'],
  },
  {
    id: '4',
    title: 'ESG Disclosure Requirements: New Rules for Vietnamese Listed Companies',
    category: 'Regulatory Update',
    author: 'Le Thi Huong',
    date: 'Jun 28, 2026',
    readTime: '6 min read',
    excerpt:
      "The State Securities Commission's mandatory ESG reporting regime for listed companies expands in 2027, alongside phased English-language disclosure rules. Here's what IR teams need to prepare.",
    tags: ['ESG', 'Compliance', 'Sustainability'],
  },
  {
    id: '5',
    title: 'Banking Sector Deep Dive: Credit Growth and Asset Quality Trends',
    category: 'Sector Deep Dive',
    author: 'Tran Quoc Viet',
    date: 'Jun 24, 2026',
    readTime: '15 min read',
    excerpt:
      "A comprehensive analysis of Vietnam's banking sector covering credit expansion, NPL trends, digital banking adoption, and our top picks for H2 2026.",
    tags: ['Banking', 'Credit', 'Financial Services'],
  },
  {
    id: '6',
    title: 'Best Practices for Virtual Investor Days in the Post-Pandemic Era',
    category: 'IR Best Practices',
    author: 'Jennifer Lee',
    date: 'Jun 18, 2026',
    readTime: '7 min read',
    excerpt:
      'How Vietnamese companies are leveraging technology to enhance investor engagement through hybrid and virtual IR events. Case studies and actionable insights.',
    tags: ['Investor Relations', 'Digital IR', 'Best Practices'],
  },
  {
    id: '7',
    title: 'Real Estate Market Correction: Opportunities in the Downturn',
    category: 'Sector Deep Dive',
    author: 'Pham Duc Minh',
    date: 'Jun 12, 2026',
    readTime: '11 min read',
    excerpt:
      'As property prices adjust in major cities, we identify value opportunities in residential, commercial, and industrial segments.',
    tags: ['Real Estate', 'Property', 'Investment'],
  },
  {
    id: '8',
    title: "Vietnam's Manufacturing Boom: The China+1 Strategy Impact",
    category: 'Economic Outlook',
    author: 'David Park',
    date: 'Jun 5, 2026',
    readTime: '9 min read',
    excerpt:
      'Registered FDI surged 61% to $34.65 billion in the first half of 2026 as global companies diversify supply chains. Winners and losers in the new landscape.',
    tags: ['Manufacturing', 'FDI', 'Supply Chain'],
  },
  {
    id: '9',
    title: "VinFast's Global Expansion: Analyzing the EV Giant's Strategy",
    category: 'Company Research',
    author: 'Emily Watson',
    date: 'May 29, 2026',
    readTime: '13 min read',
    excerpt:
      "VinFast's aggressive push into North America and Europe faces challenges. We assess the company's technology, market positioning, and financial sustainability.",
    tags: ['Electric Vehicles', 'Automotive', 'Export'],
  },
  {
    id: '10',
    title: 'Quarterly Earnings: What IR Teams Should Highlight in Q2 2026',
    category: 'IR Best Practices',
    author: 'Nguyen Anh Tuan',
    date: 'May 22, 2026',
    readTime: '5 min read',
    excerpt:
      'Key metrics, narratives, and disclosure strategies to optimize your Q2 earnings communication with investors.',
    tags: ['Earnings', 'IR Strategy', 'Communications'],
  },
  {
    id: '11',
    title: "Coffee Exports Surge: Vietnam's Agricultural Advantage",
    category: 'Sector Deep Dive',
    author: 'Maria Santos',
    date: 'May 15, 2026',
    readTime: '8 min read',
    excerpt:
      "Record coffee prices and growing global demand position Vietnam's coffee sector for exceptional growth. Analysis of key exporters and market dynamics.",
    tags: ['Agriculture', 'Coffee', 'Commodities'],
  },
  {
    id: '12',
    title: 'Foreign Ownership Limits: Impact on Stock Valuations',
    category: 'Regulatory Update',
    author: 'Robert Kim',
    date: 'May 8, 2026',
    readTime: '10 min read',
    excerpt:
      "Foreign ownership caps remain the key obstacle MSCI flagged when it left Vietnam off its June watchlist. Sector-by-sector analysis of where room remains for international investors.",
    tags: ['Foreign Ownership', 'Regulation', 'Policy'],
  },
]

interface Podcast {
  title: string
  episode: string
  host: string
  duration: string
  date: string
  listeners: string
}

const podcasts: Podcast[] = [
  {
    title: 'The Vietnam Market Pulse',
    episode: 'Episode 32: FTSE Emerging Upgrade - Counting Down to September 21',
    host: 'Dr. Nguyen Minh Tam',
    duration: '42 min',
    date: 'Jul 12, 2026',
    listeners: '12.5K',
  },
  {
    title: 'IR Insights Podcast',
    episode: 'Episode 26: Mastering Quarterly Earnings Calls',
    host: 'Jennifer Lee & Sarah Chen',
    duration: '35 min',
    date: 'Jul 6, 2026',
    listeners: '8.2K',
  },
  {
    title: 'Capital Markets Deep Dive',
    episode: 'Episode 39: Banking Sector Trends & Opportunities',
    host: 'Michael Thompson',
    duration: '48 min',
    date: 'Jun 30, 2026',
    listeners: '15.3K',
  },
]

const regionalReturnsData = [
  { market: 'VN-Index', return: 17.3 },
  { market: 'SET (Thailand)', return: 6.8 },
  { market: 'PSEi (Philippines)', return: 9.4 },
  { market: 'KLCI (Malaysia)', return: 4.9 },
  { market: 'JCI (Indonesia)', return: 11.2 },
]

const foreignFlowsData = [
  { month: 'Jan', flow: -520 },
  { month: 'Feb', flow: -380 },
  { month: 'Mar', flow: -610 },
  { month: 'Apr', flow: -450 },
  { month: 'May', flow: -390 },
  { month: 'Jun', flow: -340 },
  { month: 'Jul', flow: -210 },
]

interface Report {
  title: string
  author: string
  pages: string
  date: string
  downloads: string
  type: string
}

const reports: Report[] = [
  {
    title: 'Vietnam Capital Markets 2026: The Emerging Market Era Begins',
    author: 'VietnamIR Research',
    pages: '84 pages',
    date: 'July 2026',
    downloads: '2.4K',
    type: 'Annual Report',
  },
  {
    title: 'ESG Investing in Vietnam: Opportunities and Challenges',
    author: 'Sustainability Team',
    pages: '52 pages',
    date: 'June 2026',
    downloads: '1.8K',
    type: 'Thematic Report',
  },
  {
    title: 'Banking Sector Outlook 2026: Digital Transformation & Growth',
    author: 'Financial Services Desk',
    pages: '67 pages',
    date: 'June 2026',
    downloads: '3.1K',
    type: 'Sector Report',
  },
  {
    title: 'Vietnamese Tech Giants: Competitive Analysis & Valuations',
    author: 'Technology Research',
    pages: '45 pages',
    date: 'June 2026',
    downloads: '2.7K',
    type: 'Sector Report',
  },
  {
    title: 'Real Estate Market Reset: Finding Value in the Correction',
    author: 'Property Research',
    pages: '58 pages',
    date: 'May 2026',
    downloads: '1.9K',
    type: 'Sector Report',
  },
  {
    title: "Foreign Investment Guide: Navigating Vietnam's Capital Markets",
    author: 'Market Access Team',
    pages: '92 pages',
    date: 'May 2026',
    downloads: '4.2K',
    type: 'Guide',
  },
  {
    title: 'Supply Chain Dynamics: Vietnam in the Global Manufacturing Shift',
    author: 'Industrial Research',
    pages: '71 pages',
    date: 'May 2026',
    downloads: '2.5K',
    type: 'Thematic Report',
  },
  {
    title: 'IR Best Practices 2026: Benchmarking Study of Top Vietnamese Companies',
    author: 'IR Advisory',
    pages: '38 pages',
    date: 'May 2026',
    downloads: '1.6K',
    type: 'Study',
  },
]

interface ExpertOpinion {
  quote: string
  expert: string
  title: string
  specialty: string
  date: string
}

const expertOpinions: ExpertOpinion[] = [
  {
    quote:
      "FTSE's September 21 inclusion is the near-term anchor for foreign flows. For MSCI, the full CCP clearing rollout in early 2027 and progress on foreign ownership limits will decide the 2027 review.",
    expert: 'Dr. Nguyen Minh Tam',
    title: 'Chief Economist, VietnamIR',
    specialty: 'Market Structure & Policy',
    date: 'Jul 14, 2026',
  },
  {
    quote:
      'The digital banking revolution in Vietnam is accelerating faster than we anticipated. Banks that invest heavily in fintech will capture disproportionate market share over the next 3-5 years.',
    expert: 'Tran Quoc Viet',
    title: 'Head of Financial Services Research',
    specialty: 'Banking & Fintech',
    date: 'Jul 10, 2026',
  },
  {
    quote:
      "ESG is no longer optional for Vietnamese companies seeking international capital. We're seeing a clear valuation premium for companies with robust sustainability practices and transparent reporting.",
    expert: 'Le Thi Huong',
    title: 'ESG Strategy Director',
    specialty: 'Sustainability & Governance',
    date: 'Jul 7, 2026',
  },
  {
    quote:
      "The 'China+1' diversification strategy has fundamentally changed Vietnam's manufacturing landscape. FDI quality is improving, with more high-tech and high-value-added investments replacing traditional labor-intensive projects.",
    expert: 'David Park',
    title: 'Senior Economist',
    specialty: 'FDI & Trade',
    date: 'Jul 2, 2026',
  },
  {
    quote:
      'Vietnamese IROs must evolve beyond basic compliance. Best-in-class IR programs now include proactive ESG communication, digital investor engagement platforms, and real-time market intelligence.',
    expert: 'Jennifer Lee',
    title: 'IR Advisory Partner',
    specialty: 'Investor Relations',
    date: 'Jun 26, 2026',
  },
  {
    quote:
      "The real estate correction presents a generational buying opportunity in select segments. Industrial real estate and logistics facilities remain fundamentally strong, supported by Vietnam's manufacturing boom.",
    expert: 'Pham Duc Minh',
    title: 'Real Estate Sector Lead',
    specialty: 'Property & Construction',
    date: 'Jun 20, 2026',
  },
]

/* ---------------------------------- Helpers ---------------------------------- */

const categories = [
  'All',
  'Market Analysis',
  'Company Research',
  'Economic Outlook',
  'IR Best Practices',
  'Regulatory Update',
  'Sector Deep Dive',
]

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Market Analysis':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'Company Research':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'Economic Outlook':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'IR Best Practices':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'Regulatory Update':
      return 'bg-red-100 text-red-700 border-red-200'
    case 'Sector Deep Dive':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200'
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

/* ---------------------------------- Page ---------------------------------- */

export function InsightsPage(props: NavigationHandlers) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredArticles = articles.filter((article) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some((tag) => tag.toLowerCase().includes(query))
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticles = filteredArticles.filter((article) => article.featured)
  const regularArticles = filteredArticles.filter((article) => !article.featured)
  const showFeatured = featuredArticles.length > 0 && selectedCategory === 'All'

  return (
    <div className="min-h-screen bg-slate-50">
      <Header {...props} />

      {/* Hero */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl text-slate-900 mb-2">Insights</h1>
              <p className="text-sm text-slate-600">
                Market analysis, research reports, and expert commentary on Vietnam's capital
                markets
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="text-slate-900">{filteredArticles.length} Articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Category bar */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              <Funnel className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-sm border transition-colors whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-orange-600 text-white border-orange-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          {showFeatured && (
            <div className="mb-8">
              <h2 className="text-xl text-slate-900 mb-4">Featured</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => navigate(`#/article/${slugify(article.title)}`)}
                    className="bg-white border hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <div className="h-48 bg-gradient-to-br from-orange-50 to-slate-50 border-b flex items-center justify-center">
                      <FileText className="w-16 h-16 text-orange-200" />
                    </div>
                    <div className="p-6">
                      <Badge className={`text-xs border mb-3 ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </Badge>
                      <h3 className="text-lg text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-orange-600 text-sm group-hover:gap-3 transition-all">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            {showFeatured && <h2 className="text-xl text-slate-900 mb-4">All Insights</h2>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => navigate(`#/article/${slugify(article.title)}`)}
                  className="bg-white border hover:shadow-lg transition-shadow group cursor-pointer"
                >
                  <div className="p-6">
                    <Badge className={`text-xs border mb-3 ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </Badge>
                    <h3 className="text-lg text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs bg-slate-50 text-slate-600 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-orange-600 text-sm group-hover:gap-3 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12 bg-white border">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600">No insights found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-slate-900 mb-2">Podcasts</h2>
              <p className="text-sm text-slate-600">
                Listen to in-depth conversations with market leaders and experts
              </p>
            </div>
            <Headphones className="w-8 h-8 text-orange-600" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <div
                key={index}
                className="bg-slate-50 border hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{podcast.title}</p>
                      <h3 className="text-sm text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {podcast.episode}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <User className="w-3 h-3" />
                    <span>{podcast.host}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{podcast.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{podcast.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      <span>{podcast.listeners}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 text-sm transition-colors">
                      <Play className="w-4 h-4" />
                      <span>Listen Now</span>
                    </button>
                    <button className="p-2 border border-slate-200 hover:border-orange-600 hover:text-orange-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Charts and Numbers */}
      <section className="bg-slate-50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-slate-900 mb-2">Notable Charts and Numbers</h2>
              <p className="text-sm text-slate-600">Key data visualizations and market statistics</p>
            </div>
            <ChartColumn className="w-8 h-8 text-orange-600" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 — Regional YTD returns */}
            <div className="bg-white border p-6">
              <h3 className="text-lg text-slate-900 mb-2">
                VN-Index Performance vs. Regional Peers
              </h3>
              <p className="text-sm text-slate-600 mb-4">Year-to-date returns comparison (2026)</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalReturnsData}>
                    <XAxis dataKey="market" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Bar dataKey="return" fill="#ea580c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                <span>Source: Bloomberg</span>
                <span>Updated: Jul 14, 2026</span>
              </div>
            </div>

            {/* Card 2 — Foreign flows */}
            <div className="bg-white border p-6">
              <h3 className="text-lg text-slate-900 mb-2">Foreign Investment Flows</h3>
              <p className="text-sm text-slate-600 mb-4">
                Net foreign buying/selling (USD million, 2026)
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={foreignFlowsData}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Line type="monotone" dataKey="flow" stroke="#ea580c" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
                <span>Source: SSI Research</span>
                <span>Updated: Jul 14, 2026</span>
              </div>
            </div>

            {/* Card 3 — Market at a Glance */}
            <div className="bg-white border p-6">
              <h3 className="text-lg text-slate-900 mb-4">Market at a Glance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 border border-orange-200">
                  <p className="text-xs text-slate-600 mb-1">Total Market Cap</p>
                  <p className="text-2xl text-orange-600">$438.5B</p>
                  <p className="text-xs text-green-600 mt-1">+34.2% YoY</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">Listed Companies</p>
                  <p className="text-2xl text-slate-900">1,548</p>
                  <p className="text-xs text-slate-600 mt-1">+52 new listings</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">Avg Daily Volume</p>
                  <p className="text-2xl text-slate-900">$1.1B</p>
                  <p className="text-xs text-green-600 mt-1">+42% YoY</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-600 mb-1">P/E Ratio</p>
                  <p className="text-2xl text-slate-900">16.4x</p>
                  <p className="text-xs text-slate-600 mt-1">vs 16.8x regional avg</p>
                </div>
              </div>
            </div>

            {/* Card 4 — Key Economic Indicators */}
            <div className="bg-white border p-6">
              <h3 className="text-lg text-slate-900 mb-4">Key Economic Indicators</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-sm text-slate-600">GDP Growth (Q2 2026)</span>
                  <span className="text-lg text-orange-600">8.39%</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-sm text-slate-600">Inflation Rate (Jun 2026)</span>
                  <span className="text-lg text-slate-900">4.69%</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-sm text-slate-600">FDI Inflows (H1 2026)</span>
                  <span className="text-lg text-green-600">$34.65B</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <span className="text-sm text-slate-600">Export Growth YTD</span>
                  <span className="text-lg text-green-600">+21.0%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Foreign Reserves</span>
                  <span className="text-lg text-slate-900">$103.6B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Reports */}
      <section className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-slate-900 mb-2">Special Reports</h2>
              <p className="text-sm text-slate-600">Comprehensive research and in-depth analysis</p>
            </div>
            <FileText className="w-8 h-8 text-orange-600" />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-slate-50 border hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="p-5">
                  <Badge className="text-xs bg-orange-600 text-white border-orange-600 mb-3">
                    {report.type}
                  </Badge>
                  <h3 className="text-sm text-slate-900 mb-3 line-clamp-3 group-hover:text-orange-600 transition-colors min-h-[60px]">
                    {report.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <User className="w-3 h-3" />
                      <span className="line-clamp-1">{report.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <FileText className="w-3 h-3" />
                      <span>{report.pages}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Calendar className="w-3 h-3" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Download className="w-3 h-3" />
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-orange-600 hover:text-white border border-slate-200 hover:border-orange-600 py-2 text-sm transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Opinions */}
      <section className="bg-slate-50 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-slate-900 mb-2">Expert Opinions</h2>
              <p className="text-sm text-slate-600">
                Perspectives from leading market analysts and industry experts
              </p>
            </div>
            <Quote className="w-8 h-8 text-orange-600" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertOpinions.map((opinion, index) => (
              <div key={index} className="bg-white border p-6 hover:shadow-lg transition-shadow">
                <Quote className="w-8 h-8 text-orange-200 mb-4" />
                <p className="text-sm text-slate-700 mb-6 italic leading-relaxed">
                  "{opinion.quote}"
                </p>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900 mb-1">{opinion.expert}</p>
                    <p className="text-xs text-slate-600 mb-1">{opinion.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Award className="w-3 h-3" />
                      <span>{opinion.specialty}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                      <Calendar className="w-3 h-3" />
                      <span>{opinion.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AIAssistant />
      <Footer />
    </div>
  )
}
