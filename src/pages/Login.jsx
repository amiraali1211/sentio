import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault()
  localStorage.setItem('token', 'demo-token')
  window.dispatchEvent(new Event('authchange'))
  navigate('/dashboard')
}

  return (
    <main className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-72px)]">
      <div className="bg-surface rounded-xl2 shadow-card w-full max-w-sm px-7 py-8">
        <h1 className="font-display text-2xl font-semibold text-ink mb-1">Welcome back</h1>
        <p className="text-sm text-muted mb-6">Log in to your Sentio account.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-ink block mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-primary/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm text-ink block mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-primary/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-primary text-white rounded-lg py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  )
}