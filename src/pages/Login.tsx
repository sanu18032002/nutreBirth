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
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 120px)',
    }}>
      <div className="card" style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}>
        <h2 style={{ margin: 0 }}>Login to NutReBirth</h2>
        <p className="text-muted" style={{ marginTop: 4 }}>
          Sign in with Google to continue
        </p>
        <div style={{ marginTop: 16 }}>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={() => alert('Google login failed')}
          />
        </div>
      </div>
    </div>
  )
}
