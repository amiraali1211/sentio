// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import SentimentGauge from '../components/SentimentGauge'

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
        <div className="flex items-center justify-center gap-3 mt-7">
          <Link
            to="/register"
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Get started free
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-full text-ink font-medium hover:bg-primary-soft transition-colors"
          >
            Log in
          </Link>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-16 max-w-5xl mx-auto">
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