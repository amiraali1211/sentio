// Mock output of the SENTIO pipeline. Replace the default export with an API call later.
// Review shape: { id, text, aspect, sentiment, source, date, sarcasm, promotional }

const ASPECTS = {
  'Sound quality': [0.78, {
    Positive: 'Crisp highs and deep bass, far better than I expected at this size.',
    Neutral: 'Sound is fine. Nothing special, nothing wrong.',
    Negative: 'Gets muddy at higher volumes and the bass distorts.',
  }],
  'Battery life': [0.6, {
    Positive: 'Easily lasts a full workday, and the case adds two more charges.',
    Neutral: 'Battery is about what you would expect from earbuds.',
    Negative: 'Battery dropped to half within a few months.',
  }],
  Price: [0.22, {
    Positive: 'Great value compared to the big brands.',
    Neutral: 'Priced in line with similar models.',
    Negative: 'Too expensive for what you get, especially after the latest price rise.',
  }],
  'Customer support': [0.12, {
    Positive: 'Support replaced my faulty unit within two days.',
    Neutral: 'Support answered, but it took a while.',
    Negative: 'Waited three weeks for a reply about my warranty claim.',
  }],
  Comfort: [0.55, {
    Positive: 'So light I forget I am wearing them.',
    Neutral: 'Comfortable enough for short sessions.',
    Negative: 'They hurt my ears after about an hour.',
  }],
  Connectivity: [0.45, {
    Positive: 'Pairs instantly and the connection never drops.',
    Neutral: 'Bluetooth works. Multipoint is a bit fiddly.',
    Negative: 'Keeps disconnecting whenever I walk past a wall.',
  }],
}

const SOURCES = ['Amazon', 'Reddit', 'Trustpilot', 'Tech forums']
const GENERATED_AT = '2026-09-24'

let seed = 7
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
const pick = (list) => list[Math.floor(rnd() * list.length)]

const COUNTRIES = [
  { name: 'United States', lat: 39.8, lng: -98.6, weight: 25 },
  { name: 'Egypt', lat: 26.8, lng: 30.8, weight: 22 },
  { name: 'United Kingdom', lat: 54.0, lng: -2.0, weight: 14 },
  { name: 'Saudi Arabia', lat: 24.0, lng: 45.0, weight: 10 },
  { name: 'Germany', lat: 51.2, lng: 10.4, weight: 9 },
  { name: 'United Arab Emirates', lat: 24.3, lng: 54.3, weight: 8 },
  { name: 'India', lat: 22.0, lng: 79.0, weight: 7 },
  { name: 'Canada', lat: 56.0, lng: -100.0, weight: 5 },
]
const pickCountry = () => {
  let r = rnd() * COUNTRIES.reduce((n, c) => n + c.weight, 0)
  for (const c of COUNTRIES) if ((r -= c.weight) < 0) return c.name
  return COUNTRIES[0].name
}

const generated = Array.from({ length: 84 }, (_, i) => {
  const aspect = pick(Object.keys(ASPECTS))
  const [pPositive, texts] = ASPECTS[aspect]
  const r = rnd()
  const sentiment = r < pPositive ? 'Positive' : r < pPositive + (1 - pPositive) * 0.25 ? 'Neutral' : 'Negative'
  const date = new Date(GENERATED_AT)
  date.setDate(date.getDate() - Math.floor(rnd() * 56))
  return {
    id: i + 1,
    text: texts[sentiment],
    aspect,
    sentiment,
    source: pick(SOURCES),
    date: date.toISOString().slice(0, 10),
    sarcasm: false,
    promotional: rnd() < 0.08,
    country: pickCountry(),
  }
})

const extra = [
  { text: 'Great, another charging case that dies in two hours. Love that for me.', aspect: 'Battery life', sentiment: 'Negative', source: 'Reddit', date: '2026-09-21', sarcasm: true, promotional: false },
  { text: 'Oh sure, "premium" price for a plastic case. Totally worth it.', aspect: 'Price', sentiment: 'Negative', source: 'Tech forums', date: '2026-09-17', sarcasm: true, promotional: false },
  { text: 'Wow, support only took a month to say no. Impressive speed.', aspect: 'Customer support', sentiment: 'Negative', source: 'Trustpilot', date: '2026-09-12', sarcasm: true, promotional: false },
  { text: 'Received free for an honest review: amazing sound, best earbuds ever!', aspect: 'Sound quality', sentiment: 'Positive', source: 'Amazon', date: '2026-09-19', sarcasm: false, promotional: true },
].map((r, i) => ({ id: 100 + i, country: ['Egypt', 'United Kingdom', 'United States', 'Germany'][i], ...r }))

// Sales per country for the analysis period (USD). prevUnits = units in the previous period.
const SALES = [
  { country: 'United States', units: 48200, revenue: 2410000, prevUnits: 44100 },
  { country: 'Egypt', units: 31500, revenue: 1180000, prevUnits: 25800 },
  { country: 'United Kingdom', units: 19800, revenue: 1090000, prevUnits: 20300 },
  { country: 'Saudi Arabia', units: 14200, revenue: 780000, prevUnits: 11900 },
  { country: 'Germany', units: 12600, revenue: 730000, prevUnits: 12700 },
  { country: 'United Arab Emirates', units: 9400, revenue: 560000, prevUnits: 7600 },
  { country: 'India', units: 8800, revenue: 310000, prevUnits: 6100 },
  { country: 'Canada', units: 6900, revenue: 360000, prevUnits: 6800 },
]

export const mockAnalysis = {
  subject: 'Nova Wireless Earbuds',
  generatedAt: GENERATED_AT,
  sources: SOURCES,
  countries: COUNTRIES,
  sales: SALES,
  summary: {
    overview:
      'Customers like how the Nova earbuds sound and feel, and most are happy with battery life. Complaints cluster around price and slow customer support, and a few reviews say battery capacity drops after several months.',
    strengths: ['Clear, powerful sound', 'Light and comfortable fit', 'Stable Bluetooth connection'],
    weaknesses: ['Seen as overpriced', 'Slow warranty and support replies', 'Battery wears down over time'],
  },
  reviews: [...generated, ...extra],
}

export default mockAnalysis