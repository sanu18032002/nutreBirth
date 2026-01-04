import React, { createContext, useContext, useEffect, useState } from 'react'

type Plan = 'FREE' | 'PREMIUM'

type AuthContextType = {
    plan: Plan
    refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [plan, setPlan] = useState<Plan>('FREE')

    async function refreshUser() {
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
            const res = await fetch(`${baseUrl}/me`, { credentials: 'include' })

            if (res.ok) {
                const user = await res.json()
                setPlan(user.plan)
                try {
                    localStorage.setItem('user', JSON.stringify(user))
                } catch {
                    // ignore storage failures
                }
            } else {
                setPlan('FREE')
            }
        } catch (err) {
            setPlan('FREE')
        }
    }

    useEffect(() => {
        refreshUser()
    }, [])

    return (
        <AuthContext.Provider value={{ plan, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
