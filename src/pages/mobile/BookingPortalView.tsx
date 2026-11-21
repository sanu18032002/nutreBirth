import React from 'react'
import Card from '../../components/common/Card'

interface BookingPortalViewProps {
    onNavigatePlans: () => void
    onNavigateSupport: () => void
    onRetakeOnboarding: () => void
}

export default function BookingPortalView({
    onNavigatePlans,
    onNavigateSupport,
    onRetakeOnboarding,
}: BookingPortalViewProps) {
    return (
        <div className="view-container">
            <header className="header">
                <h1>Booking Portal</h1>
            </header>

            <div className="content">
                <div className="section-title" style={{ marginTop: 0 }}>
                    Expert Consultations
                </div>

                <Card
                    className="card-hover"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => alert('Coach check-in booked for Friday, 4:00 PM.')}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14 }}>Coach Check-in</h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            Bi-weekly progress review & macro adjustments.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>📅</div>
                </Card>

                <Card
                    className="card-hover"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => alert('Physiotherapy consultation scheduled with Dr. Sarah.')}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14 }}>Physiotherapist</h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            Joint mobility, pain rehab & gait evaluation.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>🦴</div>
                </Card>

                <Card
                    className="card-hover"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => alert('Phlebotomist scheduled for home blood sample collection.')}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14 }}>Phlebotomist (Blood)</h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            Home collection booking for metabolic panel.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>🩸</div>
                </Card>

                <div className="section-title">Account & Settings</div>

                <Card
                    className="card-hover"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={onNavigatePlans}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14 }}>Plans & Subscriptions</h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            Manage your membership tier & billing.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>💳</div>
                </Card>

                <Card
                    className="card-hover"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={onNavigateSupport}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14 }}>Help & Support</h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            FAQs, tutorials, and customer service.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>❓</div>
                </Card>

                <Card
                    className="card-hover"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderColor: 'rgba(255, 64, 129, 0.3)',
                    }}
                    onClick={onRetakeOnboarding}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14, color: 'var(--accent-pink)' }}>
                            Reset &amp; Retake Onboarding
                        </h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            Restart intake diagnostics, tracks &amp; coach kickoff.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>🔄</div>
                </Card>
            </div>
        </div>
    )
}
