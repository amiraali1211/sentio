import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import SentimentGauge from '../components/SentimentGauge'

const features = [
  {
    title: 'Aspect-level sentiment',
    desc: 'See exactly which parts of a product — price, support, quality — drive satisfaction or complaints.',
  },
  {
    title: 'Multi-source analysis',
    desc: 'Pulls opinions from e-commerce reviews, forums, and tech community sites, not just one platform.',
  },
  {
    title: 'Sarcasm & promo filtering',
    desc: 'Flags sarcastic reviews and promotional content so results reflect genuine customer opinion.',
  },
]

export default function Home() {
  return (
    <main>
      <section className="px-4 md:px-8 pt-16 pb-12 max-w-5xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-tight">
          Understand what customers
          <span className="text-primary"> really</span> think.
        </h1>
        <p className="text-muted mt-4 max-w-xl mx-auto">
          Sentio turns scattered reviews and opinions into clear, aspect-level
          sentiment insights — no data team required.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
          <Link
            to="/login"
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Continue as guest
          </Link>
          <Link
            to="/pricing"
            className="px-6 py-3 rounded-full text-ink font-medium hover:bg-primary-soft transition-colors"
          >
            Go Premium
          </Link>
        </div>
      </section>

      <section className="px-4 md:px-8 py-14 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-ink text-center mb-10">
            What Sentio does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-bg rounded-xl2 px-5 py-6">
                <h3 className="font-display text-lg font-semibold text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-16 max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <StatCard label="Opinions analyzed" value="2.1M+" />
          <StatCard label="Products tracked" value="18k" />
          <StatCard label="Avg. setup time" value="2 min" />
        </div>
        <SentimentGauge positive={58} neutral={24} negative={18} totalOpinions={12432} />
      </section>
    </main>
  )
}