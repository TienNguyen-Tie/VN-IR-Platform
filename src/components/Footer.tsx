import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Companies', href: '#/companies' },
      { label: 'Funds', href: '#/funds' },
      { label: 'Events', href: '#/events' },
      { label: 'Market Data', href: '#/dashboard' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Insights', href: '#/insights' },
      { label: 'IR Academy', href: '#/resources' },
      { label: 'Research Reports', href: '#/insights' },
      { label: 'News', href: '#/news' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#/about' },
      { label: 'Contact', href: '#/contact' },
      { label: 'Privacy', href: '#/privacy' },
      { label: 'Terms', href: '#/terms' },
    ],
  },
]

const socials = [Facebook, Twitter, Linkedin, Instagram, Youtube]

export function Footer() {
  return (
    <footer className="border-t bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-8 bg-orange-600" />
              <div className="flex flex-col">
                <span className="text-sm text-white leading-tight">VietnamIR</span>
                <span className="text-[10px] text-slate-400 leading-tight">by VIFC - Fintech Hub</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Vietnam's integrated capital markets platform connecting enterprises with global investors.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-xs text-slate-400 hover:text-orange-600 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">&copy; 2026 VietnamIR.com. A VIFC - Fintech Hub Initiative.</div>
          <div className="flex items-center gap-3">
            {socials.map((Icon, i) => (
              <a key={i} href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-orange-600 transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
