import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { tip } from '../lib/theme'

const SURFACE = {
  purple: { background: 'linear-gradient(155deg, #5737f4 0%, #3d26bd 100%)', color: '#ffffff', boxShadow: '0 12px 28px -14px rgba(61,38,189,0.7)' },
  yellow: { background: '#ffc229', color: '#15103d', boxShadow: '0 12px 28px -14px rgba(180,130,0,0.6)' },
}

export default function KpiCard({ label, value, delta, unit = 'pts', goodWhenUp = true, data, dataKey, color = '#ffffff', tone = 'purple' }) {
  const onYellow = tone === 'yellow'
  const flat = delta == null || delta === 0
  const good = !flat && delta > 0 === goodWhenUp
  const badge = flat
    ? onYellow ? 'bg-[#15103d]/10 text-[#15103d]' : 'bg-white/15 text-white'
    : good
      ? onYellow ? 'bg-[#15103d] text-[#ffc229]' : 'bg-[#ffc229] text-[#15103d]'
      : 'bg-[#FF7A9E] text-[#15103d]'
  const gid = `kpi-${dataKey}`

  return (
    <section className="rounded-[1.25rem] p-5" style={SURFACE[tone]}>
      <p className={`text-xs ${onYellow ? 'text-[#15103d]/70' : 'text-white/70'}`}>{label}</p>
      <div className="flex items-end justify-between mt-1">
        <p className="font-display text-3xl font-semibold">{value}</p>
        {delta != null && (
          <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge}`}>
            {delta > 0 ? '▲' : delta < 0 ? '▼' : '–'} {Math.abs(delta)}{unit === '%' ? '%' : ` ${unit}`}
          </span>
        )}
      </div>
      <div className="h-12 mt-2 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip {...tip} labelFormatter={(_, p) => p?.[0]?.payload?.label} formatter={(v) => [v, label]} />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#${gid})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className={`text-[11px] mt-1 ${onYellow ? 'text-[#15103d]/70' : 'text-white/70'}`}>{delta == null ? 'Weekly trend' : 'vs previous 2 weeks'}</p>
    </section>
  )
}
