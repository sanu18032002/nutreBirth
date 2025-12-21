import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { loginWithGoogle } from '../api/auth'

export default function Login() {
  const navigate = useNavigate()

  async function onSuccess(credentialResponse: any) {
    try {
      // Clear any legacy token-based auth from older versions
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')

      const idToken = credentialResponse.credential
      await loginWithGoogle(idToken)
      // Backend sets an HttpOnly cookie; no token should be stored in localStorage.
      navigate('/', { replace: true })
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div className="card" style={{ width: 360 }}>
        <h2>Login to NutReBirth</h2>
        <p className="text-muted mt-2">
          Sign in with Google to continue
        </p>

        <div className="mt-4">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => alert('Google login failed')}
          />
        </div>
      </div>
    </div>
  )
}
