import React, { useState } from 'react'
import ViewHeader from '../../components/common/ViewHeader'
import Card from '../../components/common/Card'
import { StyledInput } from '../../components/common/StyledInput'

interface HelpSupportViewProps {
    onBack: () => void
}

export default function HelpSupportView({ onBack }: HelpSupportViewProps) {
    const [search, setSearch] = useState('')

    const faqs = [
        {
            q: 'How do I sync my smart watch?',
            a: "Navigate to the Biometrics tab, click the 'Live Sync' status indicator, and authenticate with Apple Health or Google Fit to automatically import your steps, HRV, and sleep.",
        },
        {
            q: 'Can I switch my medical track?',
            a: 'Yes. If your goal changes (e.g., from Athletic to Prenatal), reach out to your coach or retake the Triage Diagnostic to safely recalibrate your diet and exercise engines.',
        },
        {
            q: 'How does the grocery logistics work?',
            a: 'The engine calculates your exact weekly macros, converts them to physical food quantities, and generates an automated cart link for Blinkit or Zepto.',
        },
    ]

    const filteredFaqs = faqs.filter(
        (f) =>
            f.q.toLowerCase().includes(search.toLowerCase()) ||
            f.a.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="view-container no-nav">
            <ViewHeader title="Help & Support" onBack={onBack} />
            <div className="content">
                <StyledInput
                    placeholder="Search for help... (e.g., Apple Watch)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="section-title">Quick Actions</div>
                <Card
                    className="card-hover"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => alert('Connecting to 24/7 NutReBirth live agent...')}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14 }}>Live Chat Support</h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            Avg wait time: ~2 mins.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>💬</div>
                </Card>

                <Card
                    className="card-hover"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => alert('Opening interactive onboarding tutorials video feed.')}
                >
                    <div>
                        <h3 style={{ margin: 0, fontSize: 14 }}>Video Tutorials</h3>
                        <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
                            Master the NutReBirth ecosystem.
                        </p>
                    </div>
                    <div style={{ fontSize: 22 }}>📺</div>
                </Card>

                <div className="section-title">Frequently Asked Questions</div>
                {filteredFaqs.map((faq, idx) => (
                    <Card key={idx} style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: '#f3f4f6' }}>
                            {faq.q}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            {faq.a}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
