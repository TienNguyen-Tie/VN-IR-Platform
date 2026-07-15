import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, ChevronRight, Menu, Search, Sparkles, X } from 'lucide-react'
import type { NavigationHandlers } from '../types'
import { Button, Input, navigate } from './ui'
import logo from '../assets/brand-mark.png'

const serviceItems = [
  { title: 'Securities Firms', subtitle: 'Brokerage & trading', handler: 'onNavigateToBrokerageFirms' },
  { title: 'Investment Banks', subtitle: 'M&A & capital markets', handler: 'onNavigateToInvestmentBanks' },
  { title: 'Funds', subtitle: 'Mutual funds & ETFs', handler: 'onNavigateToFunds' },
  { title: 'IR Services', subtitle: 'Investor relations', handler: 'onNavigateToIRServices' },
] as const

export function Header(props: NavigationHandlers) {
  const {
    onNavigateToHome,
    onNavigateToMarkets,
    onNavigateToListing,
    onNavigateToInsights,
  } = props

  const [searchOpen, setSearchOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!servicesOpen) return
    const close = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [servicesOpen])

  const handleMobileNav = (fn?: () => void) => {
    setMobileMenuOpen(false)
    fn?.()
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <div className="flex items-center gap-8">
            <button onClick={onNavigateToHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src={logo} alt="VietnamIR Logo" className="w-full h-full object-contain rounded" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base text-slate-900 leading-tight font-bold">VietnamIR</span>
                  <span className="text-[10px] text-slate-500 leading-tight">by VIFC - Fintech Hub</span>
                </div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={onNavigateToMarkets} className="text-sm text-slate-700 hover:text-orange-600 transition-colors">
                Markets
              </button>
              <button onClick={onNavigateToListing} className="text-sm text-slate-700 hover:text-orange-600 transition-colors">
                Companies
              </button>
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => setServicesOpen((v) => !v)}
                  className="flex items-center gap-1 text-sm text-slate-700 hover:text-orange-600 transition-colors outline-none"
                >
                  Services <ChevronDown className="w-3 h-3" />
                </button>
                {servicesOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white border rounded-md shadow-lg py-1 z-50">
                    {serviceItems.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => {
                          setServicesOpen(false)
                          props[item.handler]()
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-slate-50 cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm">{item.title}</span>
                          <span className="text-xs text-slate-500">{item.subtitle}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={onNavigateToInsights} className="text-sm text-slate-700 hover:text-orange-600 transition-colors">
                Insights
              </button>
              <a href="#/events" className="text-sm text-slate-700 hover:text-orange-600 transition-colors">
                Events
              </a>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 border px-3 py-1.5 w-80">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder="Search companies, funds..."
                    className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0"
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} className="flex-shrink-0 hover:bg-slate-100 p-1 transition-colors">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="hover:bg-slate-100">
                  <Search className="w-4 h-4 text-slate-600" />
                </Button>
              )}
            </div>

            <Button variant="ghost" size="icon" className="hidden md:flex text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="w-4 h-4" />
            </Button>
            <Button size="sm" className="hidden md:flex bg-orange-600 hover:bg-orange-700 text-white">
              Sign In
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-5 h-5 text-slate-700" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sheet menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-left font-semibold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="flex flex-col gap-1 mt-6">
              <button
                onClick={() => handleMobileNav(onNavigateToMarkets)}
                className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-slate-900">Markets</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleMobileNav(onNavigateToListing)}
                className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-slate-900">Companies</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <div className="border-t border-b py-2">
                <div className="px-3 py-2 text-xs text-slate-500">Services</div>
                {serviceItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleMobileNav(props[item.handler])}
                    className="w-full flex items-center justify-between p-3 pl-6 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-900">{item.title}</span>
                      <span className="text-xs text-slate-500">{item.subtitle}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleMobileNav(onNavigateToInsights)}
                className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-slate-900">Insights</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleMobileNav(() => navigate('#/events'))}
                className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <span className="text-slate-900">Events</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <div className="mt-6 px-3">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Sign In</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
