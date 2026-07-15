import { ArrowRight, Video, Globe, Calendar, MapPin, Users } from 'lucide-react'
import { SponsoredBy, ImageWithFallback, Button } from '../ui'

interface EventItem {
  title: string
  date: string
  time: string
  location: string
  type: string
  format: 'In-Person' | 'Virtual'
  attendees: string
  price: string
  image: string
  featured?: boolean
}

const events: EventItem[] = [
  {
    title: 'Vietnam Capital Markets Summit 2026',
    date: 'Sep 17-18, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'JW Marriott, Ho Chi Minh City',
    type: 'Conference',
    format: 'In-Person',
    attendees: '500+',
    price: '$499',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNjk1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    title: 'FTSE Inclusion Readiness Webinar',
    date: 'Jul 24, 2026',
    time: '2:00 PM - 3:30 PM',
    location: 'Online',
    type: 'Webinar',
    format: 'Virtual',
    attendees: '200+',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1760346547318-7e309662467d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJpbmFyJTIwb25saW5lJTIwbWVldGluZ3xlbnwxfHx8fDE3NjA3NTc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Banking Sector Investor Roundtable',
    date: 'Jul 30, 2026',
    time: '3:00 PM - 5:00 PM',
    location: 'Sofitel Legend Metropole, Hanoi',
    type: 'Roundtable',
    format: 'In-Person',
    attendees: '50',
    price: '$150',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNjk1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Q3 Market Outlook Briefing',
    date: 'Aug 6, 2026',
    time: '10:00 AM - 11:00 AM',
    location: 'Online',
    type: 'Briefing',
    format: 'Virtual',
    attendees: '300+',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1760346547318-7e309662467d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJpbmFyJTIwb25saW5lJTIwbWVldGluZ3xlbnwxfHx8fDE3NjA3NTc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Private Equity & VC Forum',
    date: 'Aug 20, 2026',
    time: '8:30 AM - 5:00 PM',
    location: 'InterContinental, Ho Chi Minh City',
    type: 'Forum',
    format: 'In-Person',
    attendees: '350+',
    price: '$599',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzYwNjk1NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'ESG Reporting Workshop',
    date: 'Sep 3, 2026',
    time: '1:00 PM - 4:00 PM',
    location: 'Online',
    type: 'Workshop',
    format: 'Virtual',
    attendees: '150+',
    price: '$99',
    image: 'https://images.unsplash.com/photo-1760346547318-7e309662467d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJpbmFyJTIwb25saW5lJTIwbWVldGluZ3xlbnwxfHx8fDE3NjA3NTc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
]

export function EventsSection() {
  const featured = events.find((e) => e.featured)
  const upcoming = events.filter((e) => !e.featured)

  return (
    <section className="bg-slate-50 border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">Events & Connect</h2>
            <p className="text-sm text-slate-600">Upcoming conferences, webinars, and networking opportunities</p>
          </div>
          <a href="#/events" className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
            Full Calendar <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-3">
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Upcoming Events</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {upcoming.map((ev, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} className="border bg-white hover:border-orange-600 transition-colors cursor-pointer p-3 group flex gap-3">
                  <div className="w-16 h-16 bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                    {ev.format === 'Virtual' ? (
                      <Video className="w-7 h-7 text-orange-600" />
                    ) : (
                      <Globe className="w-7 h-7 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-orange-600 mb-0.5">{ev.type}</div>
                    <h4 className="text-sm leading-tight mb-2 text-slate-900 line-clamp-2 group-hover:text-orange-600 transition-colors">{ev.title}</h4>
                    <div className="space-y-0.5 text-xs text-slate-600 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 flex-shrink-0 text-slate-400" />
                        <span className="truncate text-[10px]">{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 flex-shrink-0 text-slate-400" />
                        <span className="truncate text-[10px]">{ev.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-900">{ev.price}</span>
                      <Button size="sm" variant="outline" className="text-[10px] h-6 px-2 hover:bg-orange-600 hover:text-white hover:border-orange-600">
                        Register
                      </Button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {featured && (
            <div className="lg:col-span-1 border bg-white overflow-hidden hover:border-orange-600 transition-colors">
              <div className="relative aspect-video">
                <ImageWithFallback src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs px-3 py-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                  <span>FEATURED</span>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs px-2 py-1 flex items-center gap-1">
                  {featured.format === 'Virtual' ? <Video className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                  <span>{featured.type}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-base mb-3 text-slate-900 leading-tight">{featured.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-600" />
                    <div>
                      <div className="text-sm text-slate-900">{featured.date}</div>
                      <div className="text-xs text-slate-500">{featured.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-orange-600" />
                    <span className="text-sm text-slate-900">{featured.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 flex-shrink-0 text-orange-600" />
                    <span className="text-sm text-slate-900">{featured.attendees} attendees</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-base text-slate-900">{featured.price}</div>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">Register Now</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <SponsoredBy companyName="Vietnam Events & Conferences" website="https://www.vietnamevents.com" />
        </div>
      </div>
    </section>
  )
}
