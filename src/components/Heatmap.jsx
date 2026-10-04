import Card from './Card'
import { summarize } from '../lib/analytics'

const cellColor = (score) =>
  score >= 0 ? `rgba(34,197,94,${0.12 + 0.65 * (score / 100)})` : `rgba(239,68,68,${0.12 + 0.65 * (-score / 100)})`

export default function Heatmap({ list, aspects, sources, selectedAspect, selectedSource, onPick }) {
  return (
    <Card title="Aspect by source" subtitle="Net sentiment score. Click a cell to filter." className="h-full">
      <div className="overflow-x-auto">
        <div className="grid gap-1.5 min-w-[460px]" style={{ gridTemplateColumns: `130px repeat(${sources.length}, minmax(0, 1fr))` }}>
          <div />
          {sources.map((s) => (
            <div key={s} className="text-xs text-[#6E6B8A] text-center pb-1">{s}</div>
          ))}
          {aspects.map((a) => (
            <div key={a} className="contents">
              <div className="text-sm text-[#14123B] flex items-center">{a}</div>
              {sources.map((s) => {
                const cell = list.filter((r) => r.aspect === a && r.source === s)
                const { score } = summarize(cell)
                const active = selectedAspect === a && selectedSource === s
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={!cell.length}
                    title={cell.length ? `${a} on ${s}: ${score > 0 ? '+' : ''}${score} (${cell.length} reviews)` : 'No reviews'}
                    onClick={() => onPick(a, s)}
                    className={`h-11 rounded-lg text-sm font-medium text-[#14123B] transition-transform hover:scale-[1.04] disabled:bg-slate-50 disabled:text-slate-300 disabled:hover:scale-100 ${active ? 'ring-2 ring-[#5B3FE3]' : ''}`}
                    style={cell.length ? { background: cellColor(score) } : undefined}
                  >
                    {cell.length ? `${score > 0 ? '+' : ''}${score}` : '–'}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-[#6E6B8A]">
        <span>Negative</span>
        <div className="h-2 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(239,68,68,.75), #F1F5F9, rgba(34,197,94,.75))' }} />
        <span>Positive</span>
      </div>
    </Card>
  )
}
