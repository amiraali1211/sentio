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
    localStorage.setItem('token', 'premium-token')
    localStorage.setItem('accountType', 'premium')
    window.dispatchEvent(new Event('authchange'))
    navigate('/dashboard')
  }

  return (
    <main className="px-4 md:px-8 py-16 max-w-4xl mx-auto">
      <h1 className="font-display text-3xl font-semibold text-[#15103d] text-center mb-2">
        Simple, transparent pricing
      </h1>
      <p className="text-[#6E6B8A] text-center mb-12">
        Start free as a guest, or unlock full analysis with Premium.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-lg shadow-[#5737f4]/10 px-7 py-8 flex flex-col border border-[#5737f4]/10">
          <h2 className="font-display text-xl font-semibold text-[#15103d] mb-1">Guest</h2>
          <p className="text-[#6E6B8A] text-sm mb-4">Try Sentio instantly, no account needed.</p>
          <p className="font-display text-3xl font-semibold text-[#15103d] mb-6">Free</p>
          <ul className="text-sm text-[#6E6B8A] flex flex-col gap-2 mb-8">
            <li><span className="text-[#5737f4] font-bold">✓</span> Limited opinions per analysis</li>
            <li><span className="text-[#5737f4] font-bold">✓</span> Overall + aspect sentiment</li>
            <li><span className="text-[#5737f4] font-bold">✓</span> No saved reports</li>
          </ul>
          <button
            onClick={handleGuest}
            className="mt-auto border-2 border-[#5737f4] text-[#5737f4] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#5737f4] hover:text-white transition-colors"
          >
            Continue as guest
          </button>
        </div>

        <div className="relative bg-[#15103d] text-white rounded-3xl shadow-xl shadow-[#5737f4]/30 px-7 py-8 flex flex-col">
          <span className="absolute -top-3 right-6 bg-[#ffc229] text-[#15103d] text-xs font-bold px-3 py-1 rounded-full">
            Most popular
          </span>
          <h2 className="font-display text-xl font-semibold mb-1">Premium</h2>
          <p className="text-white/60 text-sm mb-4">Full analysis power for individuals and teams.</p>
          <p className="font-display text-3xl font-semibold mb-6">
            $9<span className="text-base text-white/60 font-normal"> /month</span>
          </p>
          <ul className="text-sm text-white/80 flex flex-col gap-2 mb-8">
            <li><span className="text-[#ffc229] font-bold">✓</span> Unlimited opinions per analysis</li>
            <li><span className="text-[#ffc229] font-bold">✓</span> Saved, shareable reports</li>
            <li><span className="text-[#ffc229] font-bold">✓</span> Sarcasm &amp; promo-content filtering</li>
            <li><span className="text-[#ffc229] font-bold">✓</span> Priority data sources</li>
          </ul>
          <button
            onClick={handlePremium}
            className="mt-auto bg-[#ffc229] text-[#15103d] rounded-xl py-2.5 text-sm font-bold hover:bg-[#e6a800] transition-colors"
          >
            Go Premium
          </button>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-center text-xs text-[#6E6B8A]">
          Payments aren't live yet — this demo activates Premium features instantly for testing.
        </p>

        <p className="text-center text-sm text-[#6E6B8A] mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-[#5737f4] font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  )
}
