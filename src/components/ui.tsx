import { useState, type CSSProperties, type ImgHTMLAttributes, type ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'

/* ---------------------------------- Navigation ---------------------------------- */

/** Hash-based navigation. Any component can call this to route without prop threading. */
export function navigate(path: string) {
  window.location.hash = path
}

/* ---------------------------------- SectionHeader ---------------------------------- */

export function SectionHeader({
  title,
  subtitle,
  linkText,
  onLinkClick,
}: {
  title: string
  subtitle: string
  linkText?: string
  onLinkClick?: () => void
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-1">{title}</h2>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>
      {linkText && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onLinkClick?.()
          }}
          className="text-sm text-orange-600 hover:text-orange-700 flex items-center gap-1"
        >
          {linkText} <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}

/* ---------------------------------- SponsoredBy ---------------------------------- */

export function SponsoredBy({ companyName, website }: { companyName: string; website: string }) {
  return (
    <div className="mt-6">
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-600 transition-colors"
      >
        <span>
          Sponsored by <span className="text-slate-700">{companyName}</span>
        </span>
        <ArrowUpRight className="w-3 h-3" />
      </a>
    </div>
  )
}

/* ---------------------------------- ImageWithFallback ---------------------------------- */

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(
  props: ImgHTMLAttributes<HTMLImageElement> & { style?: CSSProperties },
) {
  const [error, setError] = useState(false)
  const { src, alt, className, style, ...rest } = props

  if (error) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setError(true)}
    />
  )
}

/* ---------------------------------- Tabs ---------------------------------- */

export interface TabDef {
  value: string
  label: ReactNode
}

export function TabButtons({
  tabs,
  active,
  onChange,
  className = 'mb-4 bg-white border p-0 h-auto',
}: {
  tabs: TabDef[]
  active: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <div
      className={`text-muted-foreground inline-flex w-fit items-center justify-center rounded-xl ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] [&_svg]:pointer-events-none [&_svg]:shrink-0 ${
            active === tab.value ? 'bg-orange-600 text-white' : 'text-foreground'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

/* ---------------------------------- RangeSelector ---------------------------------- */

export const CHART_RANGES = ['1M', '3M', '6M', 'YTD', '1Y', '3Y'] as const
export type ChartRange = (typeof CHART_RANGES)[number]

export function RangeSelector({
  value,
  onChange,
}: {
  value: ChartRange
  onChange: (range: ChartRange) => void
}) {
  return (
    <div className="mb-4">
      <div className="flex gap-1 border border-slate-300 rounded p-0.5 w-fit">
        {CHART_RANGES.map((range) => (
          <button
            key={range}
            onClick={() => onChange(range)}
            className={`px-2 py-1 text-[10px] transition-colors ${
              value === range ? 'bg-orange-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------- Button / Input ---------------------------------- */

type ButtonVariant = 'default' | 'outline' | 'ghost'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

const buttonVariants: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
}

const buttonSizes: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 gap-1.5 px-3',
  lg: 'h-10 px-6',
  icon: 'size-9',
}

export function Button({
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
      {...props}
    />
  )
}

export function Input({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-9 w-full min-w-0 rounded-md border border-input bg-input-background px-3 py-1 text-sm transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${className}`}
      {...props}
    />
  )
}

/* ---------------------------------- Chart styling ---------------------------------- */

export const chartTooltipStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  fontSize: '11px',
} as const

/* ---------------------------------- AI Insight tooltip ---------------------------------- */

export interface AITooltipPayloadItem {
  name?: string
  value?: number | string
  color?: string
  payload?: Record<string, unknown>
}

/**
 * Recharts tooltip in the "AI Insight" callout style: series values plus a
 * per-datapoint insight line. Pass via <Tooltip content={<AIInsightTooltip getInsight={...} />} />;
 * recharts injects active/payload/label.
 */
export function AIInsightTooltip({
  active,
  payload,
  label,
  getInsight,
}: {
  active?: boolean
  payload?: AITooltipPayloadItem[]
  label?: string | number
  getInsight: (label: string, payload: AITooltipPayloadItem[]) => string | null
}) {
  if (!active || !payload || payload.length === 0) return null
  const insight = getInsight(String(label), payload)
  return (
    <div className="bg-orange-50 border border-orange-200 p-3 max-w-[230px] shadow-md">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Sparkles className="w-3 h-3 text-orange-600 flex-shrink-0" />
        <span className="text-[10px] font-semibold text-orange-600">{label}</span>
      </div>
      <div className={insight ? 'space-y-0.5 mb-1.5' : 'space-y-0.5'}>
        {payload.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-700">
            <span className="w-2 h-2 flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span>
              {item.name}:{' '}
              <span className="font-medium">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            </span>
          </div>
        ))}
      </div>
      {insight && (
        <p className="text-[10px] text-slate-700 leading-tight border-t border-orange-200 pt-1.5">
          {insight}
        </p>
      )}
    </div>
  )
}
