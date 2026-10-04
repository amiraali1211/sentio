import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from './Card'
import { SENT, SENTIMENTS, tip } from '../lib/theme'

export default function SentimentDonut({ list, selected, onSelect, score }) {
  const data = SENTIMENTS.map((name) => ({ name, value: list.filter((r) => r.sentiment === name).length }))
  const total = list.length
  return (
    <Card title="Sentiment split" subtitle="Click a slice to filter">
      <div className="relative h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip {...tip} />
            <Pie data={data} dataKey="value" innerRadius={58} outerRadius={84} paddingAngle={3} stroke="none">
              {data.map((d) => (
                <Cell key={d.name} fill={SENT[d.name]} fillOpacity={selected !== 'all' && selected !== d.name ? 0.25 : 1} cursor="pointer" onClick={() => onSelect(d.name)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display text-2xl font-semibold text-[#14123B]">{score > 0 ? '+' : ''}{score}</span>
          <span className="text-[11px] text-[#6E6B8A]">net score</span>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        {data.map((d) => (
          <button key={d.name} type="button" onClick={() => onSelect(d.name)} className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-[#EDE9FE]/60 ${selected === d.name ? 'bg-[#EDE9FE]' : ''}`}>
            <span className="flex items-center gap-2 text-[#14123B]"><span className="h-2.5 w-2.5 rounded-full" style={{ background: SENT[d.name] }} />{d.name}</span>
            <span className="text-[#6E6B8A]">{d.value} ({total ? Math.round((d.value / total) * 100) : 0}%)</span>
          </button>
        ))}
      </div>
    </Card>
  )
}
