import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { authFetch } from '../api/http'

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const [status, setStatus] = useState<'loading' | 'authed' | 'unauthed'>('loading')

    useEffect(() => {
        let cancelled = false

            ; (async () => {
                try {
                    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
                    const res = await authFetch(`${baseUrl}/me`, { method: 'GET' })
                    if (!cancelled) setStatus(res.ok ? 'authed' : 'unauthed')
                } catch {
                    if (!cancelled) setStatus('unauthed')
                }
            })()

        return () => {
            cancelled = true
        }
    }, [])

    if (status === 'loading') return <div className="text-muted">Checking session…</div>
    return status === 'authed' ? children : <Navigate to="/login" replace />
}