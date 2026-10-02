import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

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
          className="col-lg-5 d-none d-lg-flex flex-column justify-content-between text-white p-5 position-relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #5B3FE3, #14123B)' }}
        >
          <div className="fs-2 fw-semibold" style={{ zIndex: 2 }}>
            Sentio<span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
          </div>

          <div style={{ zIndex: 2 }}>
            <svg width="100%" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="40" r="26" fill="rgba(255,255,255,0.08)" />
              <circle cx="280" cy="180" r="38" fill="rgba(255,255,255,0.06)" />

              <rect x="30" y="60" width="150" height="70" rx="16" fill="white" fillOpacity="0.95" />
              <circle cx="56" cy="95" r="4" fill="#22C55E" />
              <rect x="70" y="80" width="90" height="8" rx="4" fill="#E5E1F7" />
              <rect x="70" y="96" width="70" height="8" rx="4" fill="#E5E1F7" />
              <rect x="70" y="112" width="50" height="8" rx="4" fill="#E5E1F7" />

              <rect x="120" y="140" width="170" height="70" rx="16" fill="white" fillOpacity="0.95" />
              <circle cx="146" cy="175" r="4" fill="#EF4444" />
              <rect x="160" y="160" width="110" height="8" rx="4" fill="#E5E1F7" />
              <rect x="160" y="176" width="90" height="8" rx="4" fill="#E5E1F7" />
              <rect x="160" y="192" width="60" height="8" rx="4" fill="#E5E1F7" />
            </svg>
          </div>

          <div style={{ zIndex: 2 }}>
            <h2 className="fw-semibold mb-3">
              See what customers really think, in minutes.
            </h2>
            <p className="text-white-50">
              Sentio turns scattered reviews into clear, aspect-level sentiment
              insights — no data team required.
            </p>
          </div>

          <div className="text-white-50 small" style={{ zIndex: 2 }}>© 2026 Sentio</div>
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
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-person" style={{ color: '#5B3FE3' }}></i>
                  </span>
                  <input type="text" className="form-control" placeholder="Amira Hassan" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope" style={{ color: '#5B3FE3' }}></i>
                  </span>
                  <input type="email" className="form-control" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-lock" style={{ color: '#5B3FE3' }}></i>
                  </span>
                  <input type="password" className="form-control" placeholder="••••••••" required />
                </div>
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