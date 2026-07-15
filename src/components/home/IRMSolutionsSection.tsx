import { ChartLine, Users, Globe, Target, ArrowRight, type LucideIcon } from 'lucide-react'
import { SponsoredBy } from '../ui'
import dashboardImg from '../../assets/ir-dashboard.png'

const features: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: ChartLine, title: 'Comprehensive Analytics', description: 'Track investor sentiment, engagement metrics, and market performance in real-time' },
  { icon: Users, title: 'Stakeholder Management', description: 'Centralized platform to manage relationships with investors, analysts, and key stakeholders' },
  { icon: Globe, title: 'Global Connectivity', description: 'Connect with institutional and retail investors across international markets' },
  { icon: Target, title: 'Targeted Communications', description: 'Deliver the right message to the right audience at the right time with precision tools' },
]

export function IRMSolutionsSection() {
  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">IRM Solutions by VIFC - Fintech Hub</h2>
            <p className="text-sm text-slate-600 mb-6">Professional Investor Relations Management Platform</p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              VIFC - Fintech Hub IRM Solutions provides Vietnamese enterprises with enterprise-grade tools to manage investor
              relations, streamline communications, and enhance capital market visibility. Our platform integrates
              seamlessly with global best practices while understanding the unique needs of the Vietnamese market.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-50 border border-orange-200 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-sm text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 hover:border-orange-600 hover:text-orange-600 text-slate-700 transition-colors">
                <span>Schedule a Demo</span>
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="border border-slate-200 overflow-hidden bg-slate-50">
              <img src={dashboardImg} alt="IRM Solutions Dashboard" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <SponsoredBy companyName="VIFC - Fintech Hub" website="https://www.vifc.vn" />
        </div>
      </div>
    </section>
  )
}
