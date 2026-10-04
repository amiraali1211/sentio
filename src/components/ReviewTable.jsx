import { useState } from 'react'
import Card from './Card'

const sentimentStyle = {
  Positive: 'bg-[#22C55E]/15 text-green-700',
  Neutral: 'bg-slate-200/70 text-slate-600',
  Negative: 'bg-[#EF4444]/15 text-red-700',
}
const Badge = ({ className, children }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${className}`}>{children}</span>
)
const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function ReviewTable({ reviews, pageSize = 8 }) {
  const [shown, setShown] = useState(pageSize)
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const rows = reviews
    .filter((r) => !term || r.text.toLowerCase().includes(term) || r.aspect.toLowerCase().includes(term))
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Card
      title="Review explorer"
      subtitle={`${rows.length} matching`}
      action={
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setShown(pageSize) }}
          placeholder="Search reviews"
          className="w-44 sm:w-60 rounded-lg border border-[#5B3FE3]/20 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3FE3]"
        />
      }
    >
      {rows.length === 0 ? (
        <p className="text-sm text-[#6E6B8A] py-8 text-center">No reviews match. Clear a filter or search term.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-xs text-[#6E6B8A] border-b border-[#5B3FE3]/10">
                  {['Review', 'Aspect', 'Source', 'Date', 'Tags'].map((h) => <th key={h} className="py-2 pr-4 font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, shown).map((r) => (
                  <tr key={r.id} className="border-b border-[#5B3FE3]/5 align-top hover:bg-[#EDE9FE]/30">
                    <td className="py-3 pr-4 text-[#14123B]/80 max-w-md">{r.text}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">{r.aspect}</td>
                    <td className="py-3 pr-4 text-[#6E6B8A] whitespace-nowrap">{r.source}</td>
                    <td className="py-3 pr-4 text-[#6E6B8A] whitespace-nowrap">{formatDate(r.date)}</td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge className={sentimentStyle[r.sentiment]}>{r.sentiment}</Badge>
                        {r.sarcasm && <Badge className="bg-[#5B3FE3]/10 text-[#4529C4]">Sarcasm detected</Badge>}
                        {r.promotional && <Badge className="bg-[#F4A261]/25 text-orange-800">Promotional</Badge>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {shown < rows.length && (
            <button type="button" onClick={() => setShown((n) => n + pageSize)} className="mt-4 text-sm font-medium text-[#5B3FE3] hover:text-[#4529C4]">
              Show {Math.min(pageSize, rows.length - shown)} more
            </button>
          )}
        </>
      )}
    </Card>
  )
}