import React, { useState } from 'react'
import ViewHeader from '../../components/common/ViewHeader'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import SelectCard from '../../components/common/SelectCard'

interface MedicalClearanceProps {
    onBack: () => void
    onConfirm: (slot: string) => void
}

export default function MedicalClearance({ onBack, onConfirm }: MedicalClearanceProps) {
    const [selectedSlot, setSelectedSlot] = useState('1:30 PM')
    const slots = ['1:30 PM', '3:00 PM', '4:15 PM']

    return (
        <div className="view-container no-nav">
            <ViewHeader title="Medical Clearance" onBack={onBack} />
            <div className="content" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 60, margin: '20px 0' }}>🏥</div>
                <h2 style={{ marginBottom: 10, fontSize: 18, fontWeight: 800 }}>
                    Expert Consultation Required
                </h2>
                <p
                    style={{
                        fontSize: 13,
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        marginBottom: 30,
                    }}
                >
                    Because you selected a Clinical or Maternal track, NutReBirth protocols require a brief clearance call with our certified endocrinologist or OB-GYN specialist before generating your nutrition plan.
                </p>

                <Card style={{ textAlign: 'left', marginBottom: 25 }}>
                    <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13, color: '#e5e7eb' }}>
                        Available Today
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {slots.map((slot) => (
                            <SelectCard
                                key={slot}
                                active={selectedSlot === slot}
                                onClick={() => setSelectedSlot(slot)}
                                style={{ flex: 1 }}
                            >
                                {slot}
                            </SelectCard>
                        ))}
                    </div>
                </Card>

                <Button onClick={() => onConfirm(selectedSlot)}>
                    Book Medical Consult →
                </Button>
            </div>
        </div>
    )
}
