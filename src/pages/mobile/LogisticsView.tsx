import React from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { getProtocolData } from '../../services/protocolEngine'
import type { TrackId } from '../../types'

interface LogisticsViewProps {
    trackId: TrackId
}

export default function LogisticsView({ trackId }: LogisticsViewProps) {
    const protocol = getProtocolData(trackId)

    const groceryItems = [
        { name: 'Chicken Breast (Raw) / Paneer', qty: '2.5 kg', category: 'Protein' },
        { name: 'Fresh Spinach & Microgreens', qty: '800 g', category: 'Micros' },
        { name: 'Rolled Oats / Jasmine Rice', qty: '1.2 kg', category: 'Carbohydrates' },
        { name: 'Sweet Potatoes (Raw)', qty: '1.5 kg', category: 'Slow Carbs' },
        { name: 'Cold-Pressed Olive Oil / Ghee', qty: '500 ml', category: 'Healthy Fats' },
    ]

    const handleZeptoSync = () => {
        alert('Sending grocery logistics payload to Zepto API. Cart generated!')
    }

    const handleBlinkitSync = () => {
        alert('Sending grocery logistics payload to Blinkit API. Cart generated!')
    }

    return (
        <div className="view-container">
            <header className="header">
                <h1>Food Fulfillment</h1>
            </header>

            <div className="content">
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
                    Your weekly {protocol.title} has been converted into exact grocery logistics and gram portions.
                </p>

                <div className="section-title" style={{ marginTop: 0 }}>
                    Automated Grocery List (Weekly)
                </div>
                <Card style={{ padding: '8px 16px', marginBottom: 20 }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, fontWeight: 500 }}>
                        {groceryItems.map((item, idx) => (
                            <li
                                key={idx}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 0',
                                    borderBottom: idx === groceryItems.length - 1 ? 'none' : '1px solid #1f2937',
                                }}
                            >
                                <span>{item.name}</span>
                                <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                                    {item.qty}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>

                <div className="grid-2" style={{ marginBottom: 25 }}>
                    <Button
                        style={{
                            background: '#541554',
                            boxShadow: 'none',
                            fontSize: 12,
                            padding: '14px',
                            margin: 0,
                        }}
                        onClick={handleZeptoSync}
                    >
                        Send to Zepto
                    </Button>
                    <Button
                        style={{
                            background: '#F6D140',
                            color: '#000',
                            boxShadow: 'none',
                            fontSize: 12,
                            padding: '14px',
                            margin: 0,
                            fontWeight: 800,
                        }}
                        onClick={handleBlinkitSync}
                    >
                        Send to Blinkit
                    </Button>
                </div>

                <div className="section-title">Meal Prep Integration</div>
                <Card
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>Nutri-Kitchen Partners</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                            Want it cooked? We route macros directly to partnered kitchens.
                        </div>
                    </div>
                    <Button
                        variant="secondary"
                        style={{
                            width: 'auto',
                            padding: '8px 14px',
                            fontSize: 11,
                            margin: 0,
                            whiteSpace: 'nowrap',
                        }}
                        onClick={() => alert('Nutri-Kitchen partner service coverage available in your PIN code.')}
                    >
                        Explore
                    </Button>
                </Card>
            </div>
        </div>
    )
}
