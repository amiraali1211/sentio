import Card from './Card'
import { C } from '../lib/theme'

export default function Authenticity({ list, hidePromo, onToggleHide }) {
  const total = list.length
  const promo = list.filter((r) => r.promotional).length
  const sarcasm = list.filter((r) => r.sarcasm).length
  const genuine = list.filter((r) => !r.promotional && !r.sarcasm).length
  const pct = (n) => (total ? (n / total) * 100 : 0)

  const rows = [
    { label: 'Genuine', n: genuine, color: C.primary },
    { label: 'Promotional', n: promo, color: C.yellow },
    { label: 'Sarcastic', n: sarcasm, color: C.rose },
  ]
  return (
    <Card title="Opinion authenticity" subtitle="Reviews SENTIO flagged" className="h-full">
      <p className="font-display text-4xl font-semibold">{Math.round(pct(genuine))}%</p>
      <p className="text-xs text-[#6E6B8A] mb-4">of matching reviews look genuine</p>
      <div className="flex h-3 rounded-full overflow-hidden bg-[#EDE9FE]">
        {rows.map((r) => (
          <div key={r.label} title={`${r.label}: ${r.n}`} style={{ width: `${pct(r.n)}%`, background: r.color }} />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />{r.label}</span>
            <span className="text-[#6E6B8A]">{r.n}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onToggleHide}
        className={`mt-5 w-full rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${hidePromo ? 'bg-[#5737f4] text-white hover:bg-[#3d26bd]' : 'bg-[#EDE9FE] text-[#5737f4] hover:bg-[#E0D9FB]'}`}
      >
        {hidePromo ? 'Showing genuine only. Show all' : 'Hide promotional reviews'}
      </button>
    </Card>
  )
}
