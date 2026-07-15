import { CircleCheck, ArrowRight } from 'lucide-react'
import { ImageWithFallback, Button } from '../ui'

const benefits = [
  'Access to 700+ listed companies with detailed financials and real-time market analytics',
  'Expert research reports and investment insights from market professionals',
  'IR resources, professional development tools, and exclusive training programs',
  'Direct communication with company IR teams and exclusive networking events',
]

export function CTASection() {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs mb-4">START YOUR JOURNEY</div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">Ready to Connect with Global Investors?</h2>
            <p className="text-lg text-slate-600 mb-6">
              Join thousands of global investors discovering Vietnam's growth story. Access comprehensive market data,
              company research, and expert insights to make informed investment decisions.
            </p>
            <div className="space-y-3 mb-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CircleCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{b}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 hover:border-orange-600 hover:text-orange-600">
                Learn More
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-4">No credit card required &bull; Free 30-day trial &bull; Cancel anytime</p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] border overflow-hidden bg-slate-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1665880751135-16ce93f9d9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwYnVzaW5lc3MlMjBza3lsaW5lfGVufDF8fHx8MTc2MDc1NTY3OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Vietnam Business Landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xl text-slate-900">700+</div>
                  <div className="text-xs text-slate-600">Listed Companies</div>
                </div>
                <div>
                  <div className="text-xl text-slate-900">$430B</div>
                  <div className="text-xs text-slate-600">Market Cap</div>
                </div>
                <div>
                  <div className="text-xl text-slate-900">102M</div>
                  <div className="text-xs text-slate-600">Population</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
