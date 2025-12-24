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
      <div className="lock-badge">🔒 Premium</div>

      <h4>{featureName}</h4>
      <p className="text-muted mt-2">
        Unlock this feature by upgrading to Premium.
      </p>

      <button
        className="primary mt-3"
        onClick={() => navigate('/upgrade')}
      >
        Upgrade to Premium
      </button>
    </div>
  )
}
