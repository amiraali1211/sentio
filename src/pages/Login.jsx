import { useNavigate, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('accountType', 'free')
    window.dispatchEvent(new Event('authchange'))

    navigate('/dashboard')
  }

  const handleGuest = () => {
    localStorage.setItem('token', 'guest-token')
    localStorage.setItem('accountType', 'guest')
    window.dispatchEvent(new Event('authchange'))

    navigate('/dashboard')
  }

  return (
    <div className="container-fluid min-vh-100 p-0">
      <div className="row g-0 min-vh-100">

        {/* Left Side */}
        <div
          className="col-lg-5 d-none d-lg-flex flex-column justify-content-between text-white p-5"
          style={{
            background: 'linear-gradient(160deg, #5737f4, #15103d)'
          }}
        >
          <div className="fs-2 fw-semibold">
            Sentio<span style={{ color: '#ffc229' }}>.</span>
          </div>

          <div className="text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{
                width: '90px',
                height: '90px',
                background: '#ffc229',
                color: '#15103d'
              }}
            >
              <i className="bi bi-bar-chart-line-fill fs-1"></i>
            </div>

            <h2 className="fw-semibold mb-3">
              Welcome back to Sentio.
            </h2>

            <p className="text-white-50">
              Continue exploring customer sentiment and discover
              what people really think.
            </p>
          </div>

          <div className="text-white-50 small">
            © 2026 Sentio
          </div>
        </div>

        {/* Right Side */}
        <div
          className="col-lg-7 d-flex align-items-center justify-content-center p-4 p-md-5"
          style={{ background: '#F6F4FE' }}
        >
          <div className="w-100" style={{ maxWidth: '420px' }}>

            <div className="text-center text-lg-start mb-4">

              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{
                  width: '50px',
                  height: '50px',
                  background: '#ECE8FE',
                  color: '#5737f4'
                }}
              >
                <i className="bi bi-box-arrow-in-right fs-5"></i>
              </div>

              <h1
                className="fw-semibold mb-1"
                style={{ color: '#15103d' }}
              >
                Welcome back
              </h1>

              <p className="text-muted mb-0">
                Log in to your Sentio account.
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white">
                    <i
                      className="bi bi-envelope"
                      style={{ color: '#5737f4' }}
                    ></i>
                  </span>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label">
                  Password
                </label>

                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white">
                    <i
                      className="bi bi-lock"
                      style={{ color: '#5737f4' }}
                    ></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-lg w-100 fw-semibold"
                style={{ backgroundColor: '#ffc229', color: '#15103d', border: 'none' }}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Log in
              </button>

            </form>

            {/* Divider */}
            <div className="d-flex align-items-center my-4">
              <div className="flex-grow-1 border-top"></div>
              <span className="px-3 text-muted small">or</span>
              <div className="flex-grow-1 border-top"></div>
            </div>

            {/* Guest Button */}
            <button
              onClick={handleGuest}
              className="btn btn-lg w-100 fw-medium"
              style={{
                border: '1px solid #5737f4',
                color: '#5737f4',
                background: 'white'
              }}
            >
              <i className="bi bi-person me-2"></i>
              Continue as guest
            </button>

            <p className="text-center text-muted mt-4 mb-0">
              Don't have an account?{' '}

              <Link
                to="/register"
                style={{
                  color: '#5737f4',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Create an account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}