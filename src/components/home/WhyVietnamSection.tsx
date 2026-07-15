import { useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  Building,
  Globe,
  MapPin,
  Play,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { SponsoredBy } from '../ui'
import vietnamMap from '../../assets/vietnam-map.png'

const videos = [
  { id: '1', title: "Vietnam's Economic Miracle: From War to Wealth", thumbnail: 'https://images.unsplash.com/photo-1553234219-23b818dbb1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwY2l0eSUyMHNreWxpbmUlMjBtb2Rlcm4lMjBkeW5hbWljfGVufDF8fHx8MTc2MDc2NjkxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', duration: '2:45', views: '1.2M' },
  { id: '2', title: 'Why Global Companies Are Moving to Vietnam', thumbnail: 'https://images.unsplash.com/photo-1611250396725-294c6af32fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwZmFjdG9yeSUyMGludHVzdHJpYWwlMjB5b3VuZyUyMHdvcmtlcnN8ZW58MXx8fHwxNzYwNzY2OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', duration: '3:12', views: '890K' },
  { id: '3', title: "Vietnam's Tech Startup Boom Explained", thumbnail: 'https://images.unsplash.com/photo-1733826544831-ad71d05c8423?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXAlMjBvZmZpY2V8ZW58MXx8fHwxNzYwNzY2OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', duration: '2:58', views: '654K' },
  { id: '4', title: "Inside Vietnam's Manufacturing Revolution", thumbnail: 'https://images.unsplash.com/photo-1653667685657-f00fdd1c1f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxobyUyMGNoaSUyMG1pbmglMjBjaXR5JTIwdHJhZmZpYyUyMG1vZGVybnxlbnwxfHx8fDE3NjA3NjY5MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', duration: '4:20', views: '1.5M' },
  { id: '5', title: "Vietnam's Young Population: Economic Powerhouse", thumbnail: 'https://images.unsplash.com/photo-1747625119811-2966006c118d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIweW91bmclMjBwcm9mZXNzaW9uYWxzJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzYwNzY2OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', duration: '3:45', views: '723K' },
  { id: '6', title: "How Vietnam Became ASEAN's Rising Star", thumbnail: 'https://images.unsplash.com/photo-1758092726615-d7da6c884b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5vaSUyMGNpdHklMjBza3lsaW5lJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYwNzY2OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', duration: '5:10', views: '2.1M' },
]

/* Macro facts as of mid-2026 (GSO/NSO, MPI) */
const glance: { label: string; value: string; sublabel: string; icon: LucideIcon; trend: string }[] = [
  { label: 'Population', value: '102.2M', sublabel: 'Median age: 33.4 years', icon: Users, trend: '+0.8% annually' },
  { label: 'GDP Growth', value: '8.18%', sublabel: 'H1 2026 YoY', icon: TrendingUp, trend: '2026 target: ≥10%' },
  { label: 'Market Size', value: '$514B', sublabel: 'GDP (2025)', icon: Building, trend: '+8.02% in 2025' },
  { label: 'Trade Volume', value: '$920B', sublabel: 'Exports + Imports (2025)', icon: Globe, trend: '+27% H1 2026' },
  { label: 'FDI Inflows', value: '$34.7B', sublabel: 'H1 2026 registered', icon: TrendingUp, trend: 'Record pace' },
  { label: 'Digital Economy', value: '$45B', sublabel: 'E-commerce market', icon: Building, trend: '+20% growth' },
]

const cities = [
  { name: 'Ho Chi Minh City', gdp: '$68B', specialty: 'Finance, Tech, Services', growth: '+7.8%', top: '83%', left: '62%' },
  { name: 'Hanoi', gdp: '$52B', specialty: 'Government, Manufacturing', growth: '+7.2%', top: '16%', left: '49%' },
  { name: 'Dong Nai', gdp: '$15B', specialty: 'Electronics, Auto Parts', growth: '+10.2%', top: '82%', left: '69%' },
  { name: 'Da Nang', gdp: '$9B', specialty: 'Tourism, IT Services', growth: '+9.4%', top: '52%', left: '80%' },
  { name: 'Hai Phong', gdp: '$11B', specialty: 'Logistics, Automotive', growth: '+11.8%', top: '17%', left: '59%' },
  { name: 'Can Tho', gdp: '$7B', specialty: 'Agriculture, Processing', growth: '+6.5%', top: '92%', left: '50%' },
]

const industries = [
  { name: 'Electronics & Semiconductors', value: '$142B', share: '38%', companies: 'Samsung, Intel, LG', growth: '+18%' },
  { name: 'Textiles & Apparel', value: '$44B', share: '12%', companies: 'Nike, Adidas suppliers', growth: '+8%' },
  { name: 'Information Technology', value: '$36B', share: '10%', companies: 'FPT, VNG, Viettel', growth: '+22%' },
  { name: 'Agriculture & Aquaculture', value: '$32B', share: '9%', companies: 'Coffee, Rice, Seafood', growth: '+6%' },
  { name: 'Real Estate & Construction', value: '$28B', share: '8%', companies: 'Vingroup, Novaland', growth: '+12%' },
  { name: 'Automotive & Parts', value: '$18B', share: '5%', companies: 'VinFast, Thaco', growth: '+15%' },
  { name: 'Tourism & Hospitality', value: '$24B', share: '7%', companies: 'Hotels, Airlines', growth: '+25%' },
  { name: 'Renewable Energy', value: '$16B', share: '4%', companies: 'Solar, Wind farms', growth: '+35%' },
]

export function WhyVietnamSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)

  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Why Vietnam?</h2>
            <p className="text-sm text-slate-600">Economic fundamentals, growth drivers, and investment advantages</p>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
            Investment Guide <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Video strip */}
        <div className="mb-12 bg-black p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Watch Latest Videos</h3>
            <span className="text-xs text-slate-400">Scroll for more &rarr;</span>
          </div>
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="relative w-[200px] h-[355px] bg-slate-900 overflow-hidden cursor-pointer group flex-shrink-0"
                >
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 border border-white/60 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm group-hover:bg-slate-900/60 transition-colors">
                      <Play className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-xs text-white mb-2 leading-tight line-clamp-2">{v.title}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-300">
                      <span>{v.views} views</span>
                      <span className="px-1.5 py-0.5 bg-slate-900/80 text-white">{v.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vietnam at a Glance */}
        <div className="mb-12">
          <h3 className="text-sm text-slate-900 mb-4">Vietnam at a Glance</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {glance.map((s, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-200 hover:border-orange-600 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className="w-4 h-4 text-orange-600" />
                  <span className="text-xs text-slate-600">{s.label}</span>
                </div>
                <div className="text-2xl text-slate-900 mb-1">{s.value}</div>
                <div className="text-[10px] text-slate-500 mb-1">{s.sublabel}</div>
                <div className="text-[10px] text-green-600">{s.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Areas of Economic Development */}
        <div>
          <h3 className="text-sm text-slate-900 mb-4">Key Areas of Economic Development</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="border border-slate-200 bg-white">
              <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <h4 className="text-sm text-slate-900">Cities and Provinces</h4>
                </div>
                <button className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs transition-colors">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Insights</span>
                </button>
              </div>
              <div
                className="p-6 relative"
                style={{
                  backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                  backgroundPosition: '0 0',
                }}
              >
                <div className="relative w-full h-[504px] flex items-center justify-center z-10">
                  <div className="relative h-full z-20">
                    <img src={vietnamMap} alt="Vietnam Map" className="h-full w-auto object-contain" />
                    {cities.map((c, i) => (
                      <div
                        key={i}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top: c.top, left: c.left }}
                        onMouseEnter={() => setHoveredCity(c.name)}
                        onMouseLeave={() => setHoveredCity(null)}
                      >
                        <div className="relative">
                          <div className="w-3 h-3 bg-orange-600 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-150 transition-transform duration-200" />
                          {hoveredCity === c.name && (
                            <div
                              className="absolute z-50 bg-white border border-slate-200 shadow-lg p-3 min-w-[180px] pointer-events-none"
                              style={{ top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' }}
                            >
                              <div className="text-xs text-slate-900 mb-1">{c.name}</div>
                              <div className="text-[10px] text-slate-600 mb-1">GDP: {c.gdp}</div>
                              <div className="text-[10px] text-green-600 mb-1">{c.growth}</div>
                              <div className="text-[10px] text-slate-500 leading-tight">{c.specialty}</div>
                              <div
                                className="absolute w-2 h-2 bg-white border-l border-t border-slate-200"
                                style={{
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%) rotate(45deg)',
                                  marginBottom: '-4px',
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-600 rounded-full" />
                    <span>Major economic hubs</span>
                  </div>
                  <span className="text-slate-300">&bull;</span>
                  <span>Hover for details</span>
                </div>
              </div>
            </div>

            {/* Sectors */}
            <div className="border border-slate-200 bg-white">
              <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-orange-600" />
                  <h4 className="text-sm text-slate-900">Sectors and Industries</h4>
                </div>
                <button className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs transition-colors">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Insights</span>
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {industries.map((s, i) => (
                    <div key={i} className="p-3 border border-slate-200 bg-slate-50 hover:border-orange-600 hover:bg-orange-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-orange-600" />
                        <div className="text-xs text-green-600">{s.growth}</div>
                      </div>
                      <div className="text-xs text-slate-900 mb-1 leading-tight">{s.name}</div>
                      <div className="text-lg text-slate-900 mb-1">{s.value}</div>
                      <div className="text-[10px] text-slate-500 mb-1">{s.companies}</div>
                      <div className="text-[10px] text-slate-400">{s.share} of exports</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="Vietnam Chamber of Commerce and Industry" website="https://www.vcci.com.vn" />
        </div>
      </div>
    </section>
  )
}
