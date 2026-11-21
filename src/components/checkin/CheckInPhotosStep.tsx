import React, { useState } from 'react'
import Button from '../common/Button'
import Card from '../common/Card'

interface CheckInPhotosStepProps {
    onBack: () => void
    onNext: (photosUploaded: boolean) => void
}

export default function CheckInPhotosStep({ onBack, onNext }: CheckInPhotosStepProps) {
    const [frontUploaded, setFrontUploaded] = useState(false)
    const [sideUploaded, setSideUploaded] = useState(false)
    const [backUploaded, setBackUploaded] = useState(false)

    const hasAnyPhoto = frontUploaded || sideUploaded || backUploaded

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📸</div>
                <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px 0' }}>
                    Visual Progress Photos
                </h2>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Visual accountability is powerful, but this step is <strong>completely optional</strong>. Skip anytime if you are on a busy morning schedule!
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {/* Front */}
                <Card
                    style={{
                        textAlign: 'center',
                        padding: '16px 8px',
                        cursor: 'pointer',
                        borderColor: frontUploaded ? 'var(--accent-green)' : 'var(--border-color)',
                        background: frontUploaded ? 'rgba(0, 255, 136, 0.08)' : 'var(--bg-card)',
                    }}
                    onClick={() => setFrontUploaded(!frontUploaded)}
                >
                    <div style={{ fontSize: 26, marginBottom: 6 }}>👤</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>Front Pose</div>
                    <div style={{ fontSize: 10, color: frontUploaded ? 'var(--accent-green)' : 'var(--text-muted)', marginTop: 4 }}>
                        {frontUploaded ? '✓ Attached' : 'Tap to Add'}
                    </div>
                </Card>

                {/* Side */}
                <Card
                    style={{
                        textAlign: 'center',
                        padding: '16px 8px',
                        cursor: 'pointer',
                        borderColor: sideUploaded ? 'var(--accent-green)' : 'var(--border-color)',
                        background: sideUploaded ? 'rgba(0, 255, 136, 0.08)' : 'var(--bg-card)',
                    }}
                    onClick={() => setSideUploaded(!sideUploaded)}
                >
                    <div style={{ fontSize: 26, marginBottom: 6 }}>🧍</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>Side Profile</div>
                    <div style={{ fontSize: 10, color: sideUploaded ? 'var(--accent-green)' : 'var(--text-muted)', marginTop: 4 }}>
                        {sideUploaded ? '✓ Attached' : 'Tap to Add'}
                    </div>
                </Card>

                {/* Back */}
                <Card
                    style={{
                        textAlign: 'center',
                        padding: '16px 8px',
                        cursor: 'pointer',
                        borderColor: backUploaded ? 'var(--accent-green)' : 'var(--border-color)',
                        background: backUploaded ? 'rgba(0, 255, 136, 0.08)' : 'var(--bg-card)',
                    }}
                    onClick={() => setBackUploaded(!backUploaded)}
                >
                    <div style={{ fontSize: 26, marginBottom: 6 }}>🚶</div>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>Back Pose</div>
                    <div style={{ fontSize: 10, color: backUploaded ? 'var(--accent-green)' : 'var(--text-muted)', marginTop: 4 }}>
                        {backUploaded ? '✓ Attached' : 'Tap to Add'}
                    </div>
                </Card>
            </div>

            <Button
                variant="primary"
                onClick={() => onNext(hasAnyPhoto)}
                style={{ marginBottom: 12 }}
            >
                {hasAnyPhoto ? 'Submit Check-In with Photos →' : 'Analyze Check-In Data →'}
            </Button>

            <Button
                variant="secondary"
                onClick={() => onNext(false)}
                style={{ borderStyle: 'dashed' }}
            >
                Skip Photos for this Week
            </Button>

            <button
                type="button"
                onClick={onBack}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: 11,
                    width: '100%',
                    marginTop: 15,
                    cursor: 'pointer',
                }}
            >
                ← Back to Biofeedback
            </button>
        </div>
    )
}
