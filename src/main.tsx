import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './auth/AuthContext'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={googleClientId}>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
)
