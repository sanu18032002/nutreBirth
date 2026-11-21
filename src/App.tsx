import { useEffect, useState } from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PlanViewer from './components/PlanViewer'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import UserMenuDrawer from './components/UserMenuDrawer'
import Upgrade from './pages/Upgrade'
import { useAuth } from './auth/AuthContext'

export default function App() {
    const { plan } = useAuth()
    const location = useLocation()
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        return (document.documentElement.dataset.theme as 'light' | 'dark') || 'light'
    })

    // Ensure scrolling is always enabled across pages
    useEffect(() => {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.documentElement.style.overflow = ''
    }, [location.pathname])

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        document.documentElement.dataset.theme = next
        try {
            localStorage.setItem('theme', next)
        } catch {}
        setTheme(next)
    }

    return (
        <div className="app-root">
            <header>
                {/* Left corner: Logo + App name */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: '50%',
                            background: '#0ea5a0',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                        }}
                    >
                        N
                    </div>
                    <h1>NutReBirth</h1>
                </div>

                {/* Right corner: Nav + theme toggle + avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <Link to="/">Dashboard</Link>
                        <Link to="/plans">Plans</Link>
                        {plan === 'FREE' && <Link to="/upgrade">Upgrade</Link>}
                    </nav>

                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        style={{
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontSize: '1.25rem',
                            padding: '4px 8px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {theme === 'dark' ? '🌙' : '☀️'}
                    </button>

                    <UserMenuDrawer />
                </div>
            </header>

            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/plans"
                        element={
                            <RequireAuth>
                                <PlanViewer />
                            </RequireAuth>
                        }
                    />
                    <Route path="/upgrade" element={<Upgrade />} />

                </Routes>
            </main>
        </div>
    )
}
