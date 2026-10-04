import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from './Card'
import { C, tip } from '../lib/theme'

export default function KpiCard({ label, value, delta, unit = 'pts', goodWhenUp = true, data, dataKey, color = C.primary, highlight }) {
  const flat = delta == null || delta === 0
  const good = !flat && delta > 0 === goodWhenUp
  const gid = `kpi-${dataKey}`
  return (
    <Card className={highlight ? 'ring-1 ring-[#F4A261]/60 bg-[#FFF8F2]' : ''}>
      <p className="text-xs text-[#6E6B8A]">{label}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="font-display text-3xl font-semibold text-[#14123B]">{value}</p>
        {delta != null && (
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${flat ? 'bg-slate-100 text-slate-500' : good ? 'bg-[#22C55E]/15 text-green-700' : 'bg-[#EF4444]/15 text-red-700'}`}>
            {delta > 0 ? '▲' : delta < 0 ? '▼' : '–'} {Math.abs(delta)}{unit === '%' ? '%' : ` ${unit}`}
          </span>
        )}
      </div>
      <div className="h-12 mt-2 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip {...tip} labelFormatter={(_, p) => p?.[0]?.payload?.label} formatter={(v) => [v, label]} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#${gid})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-[#6E6B8A] mt-1">{delta == null ? 'Weekly trend' : 'vs previous 2 weeks'}</p>
    </Card>
  )
}
