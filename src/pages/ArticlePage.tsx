import { ArrowLeft, ArrowRight, Calendar, CircleCheck, Clock, User } from 'lucide-react'
import type { NavigationHandlers } from '../types'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AIAssistant } from '../components/AIAssistant'
import { ImageWithFallback, navigate } from '../components/ui'
import { articles } from '../data/articles'

export function ArticlePage(props: NavigationHandlers & { slug: string }) {
  const { slug, ...nav } = props
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header {...nav} />
        <main>
          <section className="bg-slate-50 border-b">
            <div className="container mx-auto px-4 py-24 text-center">
              <h1 className="text-2xl font-semibold text-slate-900 mb-3">Article not found</h1>
              <p className="text-slate-600 mb-6">
                The article you're looking for may have been moved or is no longer available.
              </p>
              <button
                onClick={() => navigate('#/insights')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Insights</span>
              </button>
            </div>
          </section>
        </main>
        <AIAssistant />
        <Footer />
      </div>
    )
  }

  const related = articles.filter((a) => a.slug !== slug && a.category === article.category)
  const fill = articles.filter((a) => a.slug !== slug && a.category !== article.category)
  const relatedThree = [...related, ...fill].slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header {...nav} />
      <main>
        {/* Article hero */}
        <section className="bg-gradient-to-br from-slate-50 via-orange-50/30 to-slate-50 border-b">
          <div className="container mx-auto px-4 py-8">
            <a href="#/insights" className="inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span>All Insights</span>
            </a>
            <div className="max-w-3xl">
              <div className="inline-block px-2 py-1 bg-orange-600 text-white text-[10px] mb-3">{article.category}</div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-slate-900 mb-3 leading-tight">{article.title}</h1>
              <p className="text-lg text-slate-600 mb-4">{article.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span className="text-slate-900">{article.author}</span>
                  <span>&bull; {article.authorRole}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-10">
            <div className="max-w-3xl mx-auto">
              <div className="aspect-video border overflow-hidden bg-slate-100 mb-8">
                <ImageWithFallback src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>

              <div className="bg-orange-50 border border-orange-200 p-5 mb-10">
                <h2 className="text-sm font-semibold text-slate-900 mb-3">Key takeaways</h2>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CircleCheck className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {article.sections.map((section, i) => (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h2 className="text-xl font-semibold text-slate-900 mb-3">{section.heading}</h2>
                  )}
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-slate-600 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pt-6 border-t">
                {article.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="bg-slate-50">
          <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Related articles</h2>
              <a href="#/insights" className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedThree.map((a) => (
                <a key={a.slug} href={`#/article/${a.slug}`} className="border bg-white hover:border-orange-600 transition-all overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <ImageWithFallback src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-2 right-2 bg-orange-600 text-white text-[10px] px-2 py-1">{a.category}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm mb-2 leading-tight line-clamp-2 text-slate-900 group-hover:text-orange-600 transition-colors">{a.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span>{a.date}</span>
                      <span>&bull;</span>
                      <span>{a.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <AIAssistant />
      <Footer />
    </div>
  )
}
