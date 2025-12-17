import { GoogleLogin } from '@react-oauth/google'
import { loginWithGoogle } from '../api/auth'

export default function Login() {

  async function onSuccess(credentialResponse: any) {
    try {
      const idToken = credentialResponse.credential
      const data = await loginWithGoogle(idToken)

      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      window.location.href = '/'
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
