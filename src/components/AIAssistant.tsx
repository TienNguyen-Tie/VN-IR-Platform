import { useState } from 'react'
import { Sparkles, X, Send, TrendingUp, Building2, FileText, Search, type LucideIcon } from 'lucide-react'
import { Button, Input } from './ui'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
}

const quickActions: { icon: LucideIcon; label: string; query: string }[] = [
  { icon: TrendingUp, label: 'Market Overview', query: "Give me today's market overview" },
  { icon: Building2, label: 'Find Companies', query: 'Help me find companies in the technology sector' },
  { icon: FileText, label: 'ESG Reports', query: 'Show me companies with strong ESG ratings' },
  { icon: Search, label: 'Search Help', query: 'How do I search for specific information?' },
]

function getResponse(query: string): string {
  if (query.includes('market overview')) {
    return 'The VN-Index is currently at 1,806.63 (+0.34% today), about 7% below its June record of ~1,937 after a 46% rally over the past 12 months. HOSE market cap stands near $349B. Foreign investors remain net sellers YTD (~$2.9B), with outflows expected to ease into the September 21 FTSE emerging-market inclusion. Top performing sectors today include Technology (+2.3%) and Banking (+1.8%).'
  }
  if (query.includes('technology sector')) {
    return 'I found 47 technology companies listed on Vietnamese exchanges. Top performers include FPT Corporation (FPT), Viettel Post (VTP), and Mobile World (MWG). Would you like detailed analysis on any specific company?'
  }
  if (query.includes('ESG')) {
    return 'Based on our ESG ratings, top-rated companies include Vinhomes (VHM), Vinamilk (VNM), and Hoa Phat Group (HPG). These companies score highly on environmental practices, governance transparency, and social responsibility. Would you like to see detailed ESG reports?'
  }
  if (query.includes('search')) {
    return 'You can search for companies by ticker symbol, name, or sector. Use the search bar at the top to find specific companies, or browse by sector on the Companies page. You can also filter by market cap, performance, and other criteria.'
  }
  return "I'm processing your request. Please note that I'm a demo AI assistant. In production, I would provide detailed insights based on real-time data and analysis."
}

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: "Hello! I'm your VietnamIR AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')

  const handleQuickAction = (query: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'user', content: query }])
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), type: 'assistant', content: getResponse(query) },
      ])
    }, 800)
  }

  const handleSend = () => {
    if (!input.trim()) return
    setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'user', content: input }])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content:
            "Thank you for your question. I'm processing your request and will provide detailed information based on VietnamIR's comprehensive database of Vietnamese capital markets.",
        },
      ])
    }, 800)
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white border shadow-2xl z-50 flex flex-col">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white">VietnamIR AI Assistant</h3>
                <p className="text-xs text-orange-100">Always here to help</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:bg-white/20 p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2 text-sm ${
                      m.type === 'user' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="mt-6">
                  <p className="text-xs text-slate-500 mb-3">Quick actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((qa, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickAction(qa.query)}
                        className="flex flex-col items-start gap-2 p-3 border border-slate-200 hover:border-orange-600 hover:bg-orange-50 transition-colors group text-left"
                      >
                        <qa.icon className="w-5 h-5 text-orange-600" />
                        <span className="text-xs text-slate-900 group-hover:text-orange-600">{qa.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} className="bg-orange-600 hover:bg-orange-700 text-white flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2">AI responses are for demonstration purposes</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center group ${
          open ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open AI Chat"
      >
        <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
      </button>
    </>
  )
}
