import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Register() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('token', 'demo-token')
    window.dispatchEvent(new Event('authchange'))
    navigate('/dashboard')
  }

  return (
    <div className="container-fluid min-vh-100 p-0">
      <div className="row g-0 min-vh-100">
        <div
          className="col-lg-5 d-none d-lg-flex flex-column justify-content-between text-white p-5"
          style={{ background: 'linear-gradient(160deg, #5B3FE3, #14123B)' }}
        >
          <div className="fs-2 fw-semibold">
            Sentio<span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
          </div>
          <div>
            <h2 className="fw-semibold mb-3">
              See what customers really think, in minutes.
            </h2>
            <p className="text-white-50">
              Sentio turns scattered reviews into clear, aspect-level sentiment
              insights — no data team required.
            </p>
          </div>
          <div className="text-white-50 small">© 2026 Sentio</div>
        </div>

        <div className="col-lg-7 d-flex align-items-center justify-content-center p-4 p-md-5 bg-light">
          <div className="w-100" style={{ maxWidth: '420px' }}>
            <h1 className="fw-semibold mb-1" style={{ color: '#14123B' }}>
              Create your account
            </h1>
            <p className="text-muted mb-4">
              Start analyzing customer sentiment in minutes.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full name</label>
                <input type="text" className="form-control form-control-lg" placeholder="Amira Hassan" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control form-control-lg" placeholder="you@example.com" required />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input type="password" className="form-control form-control-lg" placeholder="••••••••" required />
              </div>

              <button
                type="submit"
                className="btn btn-lg w-100 text-white fw-medium"
                style={{ backgroundColor: '#5B3FE3' }}
              >
                Create account
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#5B3FE3', fontWeight: 500, textDecoration: 'none' }}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}