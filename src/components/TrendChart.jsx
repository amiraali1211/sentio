import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from './Card'
import Segmented from './Segmented'
import { SENT, SENTIMENTS, axis, tip, C, legendText } from '../lib/theme'

export default function TrendChart({ data, percent, onModeChange }) {
  return (
    <Card
      className="h-full"
      title="Sentiment over time"
      subtitle="Hover for weekly counts"
      action={<Segmented value={percent ? 'share' : 'volume'} onChange={(v) => onModeChange(v === 'share')} options={[{ value: 'volume', label: 'Volume' }, { value: 'share', label: 'Share %' }]} />}
    >
      {data.length < 2 ? (
        <p className="text-sm text-[#6E6B8A] py-16 text-center">Not enough data in this range to show a trend.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} stackOffset={percent ? 'expand' : 'none'} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
              <CartesianGrid stroke={C.grid} strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="label" tick={axis} tickLine={false} axisLine={{ stroke: C.grid }} />
              <YAxis tick={axis} tickLine={false} axisLine={false} tickFormatter={percent ? (v) => `${Math.round(v * 100)}%` : undefined} />
              <Tooltip {...tip} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} formatter={legendText} />
              {SENTIMENTS.map((s) => (
                <Area key={s} type="monotone" dataKey={s} stackId="1" stroke={SENT[s]} fill={SENT[s]} fillOpacity={0.9} strokeWidth={1.5} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}