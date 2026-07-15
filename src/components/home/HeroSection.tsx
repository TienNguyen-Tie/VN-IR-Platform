import { TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 5, 50 10 T 100 10' stroke='%23000000' stroke-width='0.5' fill='none'/%3E%3Cpath d='M0 15 Q 25 10, 50 15 T 100 15' stroke='%23000000' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 40px',
        }}
      />
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 text-sm bg-green-50 text-green-700 px-3 py-1.5 mb-4 border-l-2 border-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>VN-Index +46% YoY &bull; FTSE Emerging Market Inclusion September 21, 2026</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold mb-3 text-slate-900">Vietnam Capital Markets</h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Investment insights for Vietnam's public and private markets
          </p>
        </div>
      </div>
    </section>
  )
}
