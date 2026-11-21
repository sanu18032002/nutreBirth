import React, { useState } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

export default function BiometricsView() {
    const [uploadedFile, setUploadedFile] = useState<string | null>(null)
    const [isParsing, setIsParsing] = useState(false)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsParsing(true)
            setTimeout(() => {
                setUploadedFile(file.name)
                setIsParsing(false)
            }, 1200)
        }
    }

    return (
        <div className="view-container">
            <header className="header">
                <h1>Biometrics & Labs</h1>
            </header>

            <div className="content">
                {/* Daily Tracking Grid */}
                <div className="grid-2" style={{ marginBottom: 15 }}>
                    <Card style={{ margin: 0, textAlign: 'center', padding: '16px 12px' }}>
                        <div style={{ fontSize: 24, marginBottom: 5 }}>💧</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-cyan)' }}>
                            2.4L
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                            Hydration
                        </div>
                    </Card>

                    <Card style={{ margin: 0, textAlign: 'center', padding: '16px 12px' }}>
                        <div style={{ fontSize: 24, marginBottom: 5 }}>👣</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-green)' }}>
                            8,432
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                            Steps
                        </div>
                    </Card>

                    <Card style={{ margin: 0, textAlign: 'center', padding: '16px 12px' }}>
                        <div style={{ fontSize: 24, marginBottom: 5 }}>❤️</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-pink)' }}>
                            62 <span style={{ fontSize: 11 }}>bpm</span>
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                            Resting HR
                        </div>
                    </Card>

                    <Card style={{ margin: 0, textAlign: 'center', padding: '16px 12px' }}>
                        <div style={{ fontSize: 24, marginBottom: 5 }}>🔋</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--accent-yellow)' }}>
                            88%
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                            CNS Recovery
                        </div>
                    </Card>
                </div>

                {/* Body Composition */}
                <div className="section-title">Body Composition</div>
                <Card>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        <span>BMI</span>
                        <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
                            22.4 (Normal)
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        <span>Body Fat %</span>
                        <span style={{ color: 'var(--text-main)' }}>16.5%</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        <span>Muscle Mass</span>
                        <span style={{ color: 'var(--accent-cyan)' }}>34.2 kg</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 13,
                            fontWeight: 600,
                        }}
                    >
                        <span>Visceral Fat</span>
                        <span style={{ color: 'var(--accent-green)' }}>Level 4</span>
                    </div>
                </Card>

                {/* Blood Reports PDF Parser */}
                <div className="section-title">Blood Reports (PDF Parser)</div>
                <Card
                    style={{
                        borderColor: 'var(--accent-yellow)',
                        background: 'rgba(255, 193, 7, 0.05)',
                        marginBottom: 15,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                    >
                        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent-yellow)' }}>
                            🔔 3-Month Alert
                        </span>
                        <span
                            style={{
                                fontSize: 10,
                                background: '#332200',
                                color: 'var(--accent-yellow)',
                                padding: '3px 8px',
                                borderRadius: 4,
                                fontWeight: 800,
                            }}
                        >
                            Due Now
                        </span>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 15, lineHeight: 1.4 }}>
                        It has been 90 days since your last lipid/HbA1c panel. Please upload a new lab report to recalibrate your biomarker trends.
                    </p>

                    <label
                        style={{
                            border: '2px dashed #444',
                            borderRadius: 12,
                            padding: '18px 12px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            display: 'block',
                            transition: 'all 0.2s ease',
                            background: '#161b22',
                        }}
                    >
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        <div style={{ fontSize: 24, marginBottom: 5 }}>📄</div>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>
                            {isParsing
                                ? 'Parsing Blood Biomarkers (OCR)...'
                                : uploadedFile
                                ? `✓ Processed: ${uploadedFile}`
                                : 'Tap to Upload Lab PDF'}
                        </div>
                        {uploadedFile && (
                            <div style={{ fontSize: 10, color: 'var(--accent-green)', marginTop: 4 }}>
                                Extracted: HbA1c (5.3%), Triglycerides (98 mg/dL), Total Cholesterol (172 mg/dL)
                            </div>
                        )}
                    </label>
                </Card>

                <Button
                    variant="secondary"
                    onClick={() => alert('Phlebotomist scheduled! A certified lab partner will contact you for home collection.')}
                >
                    Book Blood Test (Phlebotomist)
                </Button>
            </div>
        </div>
    )
}
