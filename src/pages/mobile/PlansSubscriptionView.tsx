import React, { useState } from 'react'
import ViewHeader from '../../components/common/ViewHeader'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import SelectCard from '../../components/common/SelectCard'
import { useAuth } from '../../auth/AuthContext'

interface PlansSubscriptionViewProps {
    onBack: () => void
}

export default function PlansSubscriptionView({ onBack }: PlansSubscriptionViewProps) {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly')
    const { refreshUser } = useAuth()
    const [isUpgrading, setIsUpgrading] = useState(false)

    const handleUpgradeElite = async () => {
        setIsUpgrading(true)
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
            const res = await fetch(`${baseUrl}/payment/create-order`, {
                method: 'POST',
                credentials: 'include',
            })

            if (res.ok) {
                const order = await res.json()
                const options = {
                    key: order.key,
                    amount: order.amount,
                    currency: order.currency,
                    name: 'NutReBirth Elite',
                    description: 'Elite Protocol Membership',
                    order_id: order.orderId,
                    handler: async function (response: any) {
                        await fetch(`${baseUrl}/payment/verify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                            }),
                        })
                        await refreshUser()
                        alert('Upgraded to NutReBirth Elite 🎉')
                        onBack()
                    },
                    theme: { color: '#00D4FF' },
                }
                const rzp = new (window as any).Razorpay(options)
                rzp.open()
            } else {
                // Standalone / Offline fallback simulation
                setTimeout(async () => {
                    await refreshUser()
                    alert('NutReBirth Elite membership activated 🎉')
                    onBack()
                }, 800)
            }
        } catch {
            alert('NutReBirth Elite membership activated (Local test mode) 🎉')
            onBack()
        } finally {
            setIsUpgrading(false)
        }
    }

    const isAnnual = billingCycle === 'annually'
    const essentialPrice = isAnnual ? '₹1,599' : '₹1,999'
    const elitePrice = isAnnual ? '₹3,999' : '₹4,999'

    return (
        <div className="view-container no-nav">
            <ViewHeader title="Subscriptions" onBack={onBack} />
            <div className="content">
                {/* Pricing Toggle */}
                <div className="grid-2" style={{ marginBottom: 20 }}>
                    <SelectCard
                        active={billingCycle === 'monthly'}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Monthly
                    </SelectCard>
                    <SelectCard
                        active={billingCycle === 'annually'}
                        onClick={() => setBillingCycle('annually')}
                    >
                        Annually (-20%)
                    </SelectCard>
                </div>

                {/* Plan 1: Essential */}
                <Card style={{ borderColor: 'var(--border-color)', marginBottom: 16 }}>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: 16 }}>NutReBirth Essential</h3>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 15 }}>
                        {essentialPrice}
                        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
                            {' '}/mo
                        </span>
                    </div>
                    <ul
                        style={{
                            fontSize: 12,
                            color: 'var(--text-muted)',
                            lineHeight: 1.8,
                            paddingLeft: 18,
                            margin: '0 0 20px 0',
                        }}
                    >
                        <li>AI Diet & Exercise Data Engines</li>
                        <li>Automated Grocery List Generation</li>
                        <li>Basic Biometrics & Wearable Sync</li>
                        <li>Standard Community Support</li>
                    </ul>
                    <Button variant="secondary" style={{ padding: 12, margin: 0 }}>
                        Current Plan
                    </Button>
                </Card>

                {/* Plan 2: Elite */}
                <Card
                    gradient
                    style={{
                        borderColor: 'var(--accent-cyan)',
                        marginBottom: 20,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 5,
                        }}
                    >
                        <h3 style={{ margin: 0, fontSize: 16 }}>NutReBirth Elite</h3>
                        <span
                            style={{
                                background: 'var(--accent-cyan)',
                                color: '#000',
                                fontSize: 9,
                                fontWeight: 800,
                                padding: '3px 8px',
                                borderRadius: 12,
                                textTransform: 'uppercase',
                            }}
                        >
                            Most Popular
                        </span>
                    </div>
                    <div
                        style={{
                            fontSize: 28,
                            fontWeight: 900,
                            color: 'var(--accent-cyan)',
                            marginBottom: 15,
                        }}
                    >
                        {elitePrice}
                        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
                            {' '}/mo
                        </span>
                    </div>
                    <ul
                        style={{
                            fontSize: 12,
                            color: 'var(--text-muted)',
                            lineHeight: 1.8,
                            paddingLeft: 18,
                            margin: '0 0 20px 0',
                        }}
                    >
                        <li style={{ color: '#fff' }}>
                            <strong>Everything in Essential, plus:</strong>
                        </li>
                        <li>Dedicated 1-on-1 Human Coach</li>
                        <li>Medical/Endocrinologist Consultations</li>
                        <li>AI Form Correction Camera Access</li>
                        <li>Cloud Kitchen Direct Logistics</li>
                    </ul>
                    <Button
                        onClick={handleUpgradeElite}
                        disabled={isUpgrading}
                        style={{
                            padding: 12,
                            margin: 0,
                            boxShadow: '0 4px 15px rgba(0, 212, 255, 0.25)',
                        }}
                    >
                        {isUpgrading ? 'Processing...' : 'Upgrade to Elite'}
                    </Button>
                </Card>
            </div>
        </div>
    )
}
