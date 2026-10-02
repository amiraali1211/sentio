import { useNavigate, Link } from 'react-router-dom'

export default function Pricing() {
  const navigate = useNavigate()

  const handleGuest = () => {
    localStorage.setItem('token', 'guest-token')
    localStorage.setItem('accountType', 'guest')
    window.dispatchEvent(new Event('authchange'))
    navigate('/dashboard')
  }

  const handlePremium = () => {
    // DEMO ONLY — no real payment is processed here.
    // Wire this to Stripe (or similar) + a backend once you have one.
    localStorage.setItem('token', 'premium-token')
    localStorage.setItem('accountType', 'premium')
    window.dispatchEvent(new Event('authchange'))
    navigate('/dashboard')
  }

  return (
    <main className="px-4 md:px-8 py-16 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl font-semibold text-ink text-center mb-2">
        Simple, transparent pricing
      </h1>
      <p className="text-muted text-center mb-12">
        Start free as a guest, or unlock full analysis with Premium.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl2 shadow-card px-7 py-8 flex flex-col">
          <h2 className="font-display text-xl font-semibold text-ink mb-1">Guest</h2>
          <p className="text-muted text-sm mb-4">Try Sentio instantly, no account needed.</p>
          <p className="font-display text-3xl font-semibold text-ink mb-6">Free</p>
          <ul className="text-sm text-muted flex flex-col gap-2 mb-8">
            <li>✓ Limited opinions per analysis</li>
            <li>✓ Overall + aspect sentiment</li>
            <li>✓ No saved reports</li>
          </ul>
          <button
            onClick={handleGuest}
            className="mt-auto bg-primary-soft text-primary rounded-lg py-2.5 text-sm font-medium hover:bg-primary hover:text-white transition-colors"
          >
            Continue as guest
          </button>
        </div>

        <div className="bg-ink text-white rounded-xl2 shadow-soft px-7 py-8 flex flex-col">
          <h2 className="font-display text-xl font-semibold mb-1">Premium</h2>
          <p className="text-white/60 text-sm mb-4">Full analysis power for individuals and teams.</p>
          <p className="font-display text-3xl font-semibold mb-6">
            $9<span className="text-base text-white/60 font-normal"> /month</span>
          </p>
          <ul className="text-sm text-white/70 flex flex-col gap-2 mb-8">
            <li>✓ Unlimited opinions per analysis</li>
            <li>✓ Saved, shareable reports</li>
            <li>✓ Sarcasm & promo-content filtering</li>
            <li>✓ Priority data sources</li>
          </ul>
          <button
            onClick={handlePremium}
            className="mt-auto bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Go Premium
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted mt-8">
        Payments aren't live yet — this demo activates Premium features instantly for testing.
      </p>

      <p className="text-center text-sm text-muted mt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
      </p>
    </main>
  )
}