import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from './Card'
import { SENT, SENTIMENTS, axis, tip, C, legendText } from '../lib/theme'

export default function AspectChart({ data, selected, onSelect }) {

  const barShape = (props) => {
    const aspect = props.payload?.aspect
    const dimmed = selected !== 'all' && selected !== aspect
    return (
      <g opacity={dimmed ? 0.3 : 1} style={{ cursor: 'pointer' }} onClick={() => onSelect(aspect)}>
        <Rectangle {...props} />
      </g>
    )
  }

  return (
    <Card title="Aspect breakdown" subtitle="Click a bar to filter the page by that aspect" className="h-full">
      {data.length === 0 ? (
        <p className="text-sm text-[#6E6B8A] py-16 text-center">No reviews match the current filters.</p>
      ) : (
        <div style={{ height: data.length * 46 + 50 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, bottom: 0, left: 0 }} barSize={22}>
              <CartesianGrid stroke={C.grid} strokeDasharray="4 4" horizontal={false} />
              <XAxis type="number" tick={axis} tickLine={false} axisLine={false} allowDecimals={false} />
              <YAxis type="category" dataKey="aspect" width={118} tick={{ ...axis, fill: C.ink }} tickLine={false} axisLine={false} />
              <Tooltip {...tip} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} formatter={legendText} />
              {SENTIMENTS.map((s, i) => (
                <Bar key={s} dataKey={s} stackId="a" fill={SENT[s]} radius={i === 2 ? [0, 6, 6, 0] : 0} shape={barShape} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
