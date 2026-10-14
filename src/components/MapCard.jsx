import { useState } from 'react'
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Card from './Card'
import Segmented from './Segmented'
import { C } from '../lib/theme'

const CARTO_KEY = import.meta.env.VITE_CARTO_KEY
const OSM_LINK = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const TILES = CARTO_KEY
  ? {
      url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=${CARTO_KEY}`,
      attribution: `${OSM_LINK} &copy; <a href="https://carto.com/attributions">CARTO</a>`,
    }
  : { url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: OSM_LINK }

const money = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2 }).format(n)
const num = (n) => new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
const signed = (n) => `${n > 0 ? '+' : ''}${n}`
const colorFor = (score) => (score == null ? C.lavender : score >= 20 ? C.primary : score <= -20 ? C.rose : C.lavender)

const MAP_CSS = '.sentio-map .leaflet-tile-pane { filter: url(#sentio-duotone); }'
const RAMP = {
  r: '0.114 0.239 0.478 0.702 0.945',
  g: '0.071 0.149 0.388 0.647 0.929',
  b: '0.376 0.741 0.961 0.980 1',
}

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-xl px-4 py-3 text-white" style={{ background: 'linear-gradient(155deg, #5737f4 0%, #3d26bd 100%)' }}>
      <p className="text-xs text-white/70">{label}</p>
      <p className="font-display text-xl font-semibold mt-0.5">{value}</p>
      {sub && <p className="text-[11px] text-white/70">{sub}</p>}
    </div>
  )
}

export default function MapCard({ data, selected, onSelect }) {
  const [metric, setMetric] = useState('revenue')
  const fmt = metric === 'revenue' ? money : num
  const ranked = [...data].sort((a, b) => b[metric] - a[metric])
  const max = Math.max(1, ...data.map((d) => d[metric]))
  const total = (k) => data.reduce((n, d) => n + d[k], 0)
  const totalOf = total(metric)
  const top = ranked[0]
  const atRisk = ranked.slice(0, 3).filter((d) => d.score != null && d.score < 0).sort((a, b) => a.score - b.score)[0]

  return (
    <Card
      title="Where it sells"
      subtitle="Bubble size = sales, color = customer sentiment in that country. Click a country to filter."
      action={<Segmented value={metric} onChange={setMetric} options={[{ value: 'revenue', label: 'Revenue' }, { value: 'units', label: 'Units' }]} />}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        <Stat label="Total revenue" value={money(total('revenue'))} />
        <Stat label="Units sold" value={num(total('units'))} />
        <Stat label="Top market" value={top?.country ?? '–'} sub={top ? `${Math.round((top[metric] / totalOf) * 100)}% of ${metric}` : undefined} />
      </div>

      {atRisk && (
        <p className="mb-4 rounded-xl bg-[#ffc229] px-4 py-2.5 text-sm text-[#15103d]">
          <b>{atRisk.country}</b> is a top-3 market, but sentiment there is negative ({signed(atRisk.score)}). Select it to see why.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* isolate keeps Leaflet's high z-index panes below the sticky filter bar and navbar */}
        <div className="sentio-map lg:col-span-2 isolate h-80 lg:h-[400px] rounded-xl overflow-hidden">
          <style>{MAP_CSS}</style>
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <filter id="sentio-duotone" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
              <feComponentTransfer>
                <feFuncR type="table" tableValues={RAMP.r} />
                <feFuncG type="table" tableValues={RAMP.g} />
                <feFuncB type="table" tableValues={RAMP.b} />
              </feComponentTransfer>
            </filter>
          </svg>
          <MapContainer center={[25, 20]} zoom={2} minZoom={2} scrollWheelZoom={false} worldCopyJump className="h-full w-full">
            <TileLayer attribution={TILES.attribution} url={TILES.url} maxZoom={19} />
            {data.map((d) => {
              const active = selected === d.country
              return (
                <CircleMarker
                  key={d.country}
                  center={[d.lat, d.lng]}
                  radius={8 + Math.sqrt(d[metric] / max) * 24}
                  pathOptions={{
                    color: C.ink,
                    weight: active ? 3.5 : 1.5,
                    fillColor: colorFor(d.score),
                    fillOpacity: selected !== 'all' && !active ? 0.3 : 0.8,
                  }}
                  eventHandlers={{ click: () => onSelect(d.country) }}
                >
                  <Tooltip>
                    <b>{d.country}</b><br />
                    {money(d.revenue)} · {num(d.units)} units{d.growth != null && ` (${signed(d.growth)}%)`}<br />
                    {d.score == null ? 'No matching reviews' : `Sentiment ${signed(d.score)} from ${d.reviews} reviews`}
                  </Tooltip>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </div>

        <div className="flex flex-col">
          <h4 className="text-sm font-semibold mb-1">Top markets</h4>
          {ranked.slice(0, 6).map((d) => (
            <button
              key={d.country}
              type="button"
              onClick={() => onSelect(d.country)}
              className={`rounded-lg px-2 py-2 text-left hover:bg-[#EDE9FE]/60 ${selected === d.country ? 'bg-[#EDE9FE]' : ''}`}
            >
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium">{d.country}</span>
                <span className="text-[#6E6B8A] whitespace-nowrap">
                  {fmt(d[metric])}
                  {d.growth != null && (
                    <b className={`ml-2 text-xs ${d.growth >= 0 ? 'text-[#5737f4]' : 'text-[#D63A68]'}`}>{d.growth >= 0 ? '▲' : '▼'} {Math.abs(d.growth)}%</b>
                  )}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-[#EDE9FE]">
                <div className="h-full rounded-full" style={{ width: `${(d[metric] / ranked[0][metric]) * 100}%`, background: colorFor(d.score) }} />
              </div>
            </button>
          ))}
          <div className="mt-auto pt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#6E6B8A]">
            {[['Positive', C.primary], ['Mixed / no data', C.lavender], ['Negative', C.rose]].map(([l, c]) => (
              <span key={l} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />{l}</span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
