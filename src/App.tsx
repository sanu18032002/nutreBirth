import { Link, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PlanViewer from './components/PlanViewer'
import Login from './pages/Login'
import RequireAuth from './components/RequireAuth'
import UserMenuDrawer from './components/UserMenuDrawer'
import Upgrade from './pages/Upgrade'

export default function App() {
    return (
        <div className="app-root">
            <header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    {/* Logo */}
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

                <nav
                    style={{
                        marginLeft: 'auto',
                        display: 'flex',
                        gap: 16,
                    }}
                >
                    <Link to="/">Dashboard</Link>
                    <Link to="/plans">Plans</Link>
                    <Link to="/upgrade">Upgrade</Link>

                </nav>
                <button
                    onClick={() => {
                        const t = document.documentElement.dataset.theme
                        document.documentElement.dataset.theme = t === 'dark' ? 'light' : 'dark'
                    }}
                    aria-label="Toggle theme"
                    style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '1.5rem'
                    }}
                >
                    {/* Simple moon/sun icon using emoji; replace with any icon library */}
                    {document.documentElement.dataset.theme === 'dark' ? '🌙' : '☀️'}
                </button>

                <UserMenuDrawer />

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
