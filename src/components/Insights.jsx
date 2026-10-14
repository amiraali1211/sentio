import Card from './Card'
import { C } from '../lib/theme'

function Row({ a, onSelect, color, textColor }) {
  return (
    <button type="button" onClick={() => onSelect(a.aspect)} className="block w-full rounded-lg px-2 py-2 text-left hover:bg-[#EDE9FE]/60">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{a.aspect}</span>
        <span className="text-xs text-[#6E6B8A]">{a.total} mentions · <b style={{ color: textColor }}>{a.score > 0 ? '+' : ''}{a.score}</b></span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-[#EDE9FE]">
        <div className="h-full rounded-full" style={{ width: `${Math.max(6, Math.abs(a.score))}%`, background: color }} />
      </div>
    </button>
  )
}

export default function Insights({ summary, aspects, onSelect }) {
  const ranked = [...aspects].sort((a, b) => b.score - a.score)
  const strengths = ranked.filter((a) => a.score > 0).slice(0, 3)
  const pains = [...ranked].reverse().filter((a) => a.score < 0).slice(0, 3)
  return (
    <Card title="Key insights" subtitle="Ranked from the current filters. Click a row to focus on it.">
      <p className="rounded-xl bg-[#F6F4FE] px-4 py-3 text-sm leading-relaxed text-[#15103d]/80">{summary.overview}</p>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div>
          <h4 className="text-sm font-semibold mb-1">Strengths</h4>
          {strengths.length ? strengths.map((a) => <Row key={a.aspect} a={a} onSelect={onSelect} color={C.primary} textColor={C.primary} />) : <p className="text-sm text-[#6E6B8A] px-2">No clear strengths in this view.</p>}
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Pain points</h4>
          {pains.length ? pains.map((a) => <Row key={a.aspect} a={a} onSelect={onSelect} color={C.rose} textColor={C.roseText} />) : <p className="text-sm text-[#6E6B8A] px-2">No clear pain points in this view.</p>}
        </div>
      </div>
    </Card>
  )
}
