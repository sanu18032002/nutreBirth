import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authFetch } from '../api/http'

type MeResponse = {
  email?: string
  plan?: string
}

function initialsFrom(email: string | undefined): string {
  const v = (email ?? '').trim()
  if (!v) return 'U'
  const left = v.split('@')[0] ?? v
  const parts = left.replace(/[^a-zA-Z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
  if (parts.length === 0) return left.slice(0, 2).toUpperCase()
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function UserMenuDrawer() {
  const navigate = useNavigate()
  const location = useLocation()

  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [me, setMe] = useState<MeResponse | null>(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

  useEffect(() => {
    // only fetch session info on non-login pages (avoid noisy calls)
    if (location.pathname === '/login') return
    let cancelled = false

    ;(async () => {
      try {
        const res = await authFetch(`${baseUrl}/me`, { method: 'GET' })
        if (!res.ok) {
          if (!cancelled) setMe(null)
          return
        }
        const data = (await res.json()) as MeResponse
        if (!cancelled) setMe(data)
      } catch {
        if (!cancelled) setMe(null)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [baseUrl, location.pathname])

  const initials = useMemo(() => initialsFrom(me?.email), [me?.email])

  // Hide if not authenticated or on login route
  if (location.pathname === '/login' || !me?.email) return null

  async function doLogout() {
    try {
      await authFetch(`${baseUrl}/auth/logout`, { method: 'POST' })
    } finally {
      // Clear any legacy storage from older token-based auth versions
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')

      setConfirming(false)
      setOpen(false)
      navigate('/login', { replace: true })
    }
  }

  return (
    <>
      <button className="avatar-btn" aria-label="Open user menu" onClick={() => setOpen(true)}>
        {initials}
      </button>

      {open && (
        <div className="drawer-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <aside className="drawer" role="dialog" aria-label="User menu" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="avatar-lg">{initials}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {me.email}
                </div>
                <div className="text-muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {me.plan ? `Plan: ${me.plan}` : ''}
                </div>
              </div>
              <button aria-label="Close" className="drawer-close" onClick={() => setOpen(false)}>
                ×
              </button>
            </div>

            <div className="drawer-actions">
              <button
                className="drawer-item"
                onClick={() => {
                  setOpen(false)
                  // Opens the existing ProfileModal on Dashboard
                  navigate('/?profile=1')
                }}
              >
                Profile
              </button>

              <button className="drawer-item danger" onClick={() => setConfirming(true)}>
                Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {confirming && (
        <div className="confirm-backdrop" role="presentation" onClick={() => setConfirming(false)}>
          <div className="confirm-card card" role="dialog" aria-label="Confirm sign out" onClick={(e) => e.stopPropagation()}>
            <h3>Sign out?</h3>
            <p className="text-muted mt-2">You’ll be redirected to the login page.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
              <button onClick={() => setConfirming(false)}>Cancel</button>
              <button className="primary" onClick={doLogout}>Sign out</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


