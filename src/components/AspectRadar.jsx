import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts'
import Card from './Card'
import { C, tip } from '../lib/theme'

export default function AspectRadar({ data }) {
  const rows = data.map((a) => ({ aspect: a.aspect, index: Math.round((a.score + 100) / 2) }))
  return (
    <Card title="Satisfaction profile" subtitle="0 = all negative, 100 = all positive" className="h-full">
      {rows.length < 3 ? (
        <p className="text-sm text-[#6E6B8A] py-16 text-center">Needs at least 3 aspects to draw.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={rows} outerRadius="58%">
              <PolarGrid stroke={C.grid} />
              <PolarAngleAxis dataKey="aspect" tick={{ fontSize: 11, fill: C.ink }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Tooltip {...tip} />
              <Radar name="Satisfaction" dataKey="index" stroke={C.primary} fill={C.primary} fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
