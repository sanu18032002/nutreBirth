import React from 'react'
import ViewHeader from '../../components/common/ViewHeader'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

interface CoachAppointmentProps {
    onBack: () => void
    onComplete: () => void
}

export default function CoachAppointment({ onBack, onComplete }: CoachAppointmentProps) {
    return (
        <div className="view-container no-nav">
            <ViewHeader title="Coach Accountability" onBack={onBack} />
            <div className="content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 60, margin: '20px 0' }}>🤝</div>
                <h2 style={{ marginBottom: 10, fontSize: 18, fontWeight: 800 }}>
                    Meet Your Dedicated Coach
                </h2>
                <p
                    style={{
                        fontSize: 13,
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        marginBottom: 30,
                    }}
                >
                    Accountability is the #1 driver of success. Book your kickoff call with your dedicated NutReBirth Coach to finalize your daily macro targets.
                </p>

                <Card
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 15,
                        textAlign: 'left',
                        borderColor: 'var(--accent-cyan)',
                        marginBottom: 30,
                    }}
                >
                    <div
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: '#111827',
                            border: '2px solid var(--accent-cyan)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 22,
                            fontWeight: 800,
                            color: 'var(--accent-cyan)',
                            flexShrink: 0,
                        }}
                    >
                        CA
                    </div>
                    <div>
                        <h3 style={{ margin: '0 0 5px 0', fontSize: 16, fontWeight: 700 }}>
                            Coach Arjun
                        </h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--accent-green)', fontWeight: 600 }}>
                            Nutrition & Performance Lead
                        </p>
                        <p style={{ margin: '4px 0 0 0', fontSize: 11, color: 'var(--text-muted)' }}>
                            10+ yrs elite athlete & clinical prep
                        </p>
                    </div>
                </Card>

                <Button onClick={onComplete}>
                    Secure Coach & Enter Hub
                </Button>
            </div>
        </div>
    )
}
