import Card from './Card'
import { summarize } from '../lib/analytics'

const STEPS = [
  { label: 'Strongly negative', bg: '#FF6B93', fg: '#15103d' },
  { label: 'Negative', bg: '#FFC2D3', fg: '#15103d' },
  { label: 'Near neutral', bg: '#EDE9FE', fg: '#15103d' },
  { label: 'Positive', bg: '#B9ACFB', fg: '#15103d' },
  { label: 'Strongly positive', bg: '#5737f4', fg: '#ffffff' },
]
function stepFor(score) {
  if (score <= -50) return 0
  if (score <= -10) return 1
  if (score < 10) return 2
  if (score < 50) return 3
  return 4
}

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
              <div className="text-sm flex items-center">{a}</div>
              {sources.map((s) => {
                const cell = list.filter((r) => r.aspect === a && r.source === s)
                const { score } = summarize(cell)
                const step = STEPS[stepFor(score)]
                const active = selectedAspect === a && selectedSource === s
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={!cell.length}
                    title={cell.length ? `${a} on ${s}: ${score > 0 ? '+' : ''}${score} (${cell.length} reviews)` : 'No reviews'}
                    onClick={() => onPick(a, s)}
                    className={`h-11 rounded-lg text-sm font-semibold transition-transform hover:scale-[1.04] disabled:bg-[#F6F4FE] disabled:text-[#C4BFDD] disabled:hover:scale-100 ${active ? 'ring-2 ring-[#15103d]' : ''}`}
                    style={cell.length ? { background: step.bg, color: step.fg } : undefined}
                  >
                    {cell.length ? `${score > 0 ? '+' : ''}${score}` : '–'}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#6E6B8A]">
        {STEPS.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded" style={{ background: s.bg }} />{s.label}
          </span>
        ))}
      </div>
    </Card>
  )
}
