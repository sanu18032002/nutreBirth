import React from 'react'
import { isPremium } from '../auth/user'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  featureName?: string
}

export default function PremiumGate({
  children,
  featureName = 'This feature',
}: Props) {
  const navigate = useNavigate()

  if (isPremium()) {
    return <>{children}</>
  }

  return (
    <div className="card premium-locked">
      <div className="lock-badge">
        <span>🔒 PREMIUM UNLOCK</span>
      </div>

      <h3 style={{ margin: '10px 0 8px', fontSize: '1.3rem', fontWeight: 700 }}>
        Unlock {featureName}
      </h3>

      <p className="text-muted" style={{ maxWidth: 520, margin: '0 auto', fontSize: 14, lineHeight: 1.6 }}>
        Upgrade to get full meal-by-meal portion details, complete macronutrient breakdowns, and micronutrient tracking tailored to your targets.
      </p>

      <div style={{ marginTop: 20 }}>
        <button
          className="primary"
          style={{
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
          }}
          onClick={() => navigate('/upgrade')}
        >
          <span>Upgrade to Premium — ₹199</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}
