import React from 'react'

export type TabId = 'hub' | 'biometrics' | 'logistics' | 'booking' | 'chat'

interface BottomNavProps {
    activeTab: TabId
    onTabChange: (tab: TabId) => void
    visible?: boolean
}

const TABS: Array<{ id: TabId; label: string; icon: string }> = [
    { id: 'hub', label: 'Hub', icon: '🏠' },
    { id: 'biometrics', label: 'Bio', icon: '❤️' },
    { id: 'logistics', label: 'Diet', icon: '📦' },
    { id: 'booking', label: 'Book', icon: '📅' },
    { id: 'chat', label: 'Chat', icon: '💬' },
]

export default function BottomNav({ activeTab, onTabChange, visible = true }: BottomNavProps) {
    return (
        <nav className={`bottom-nav ${visible ? '' : 'hidden'}`} aria-label="Bottom Navigation">
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    type="button"
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.id)}
                    aria-label={tab.label}
                >
                    <i>{tab.icon}</i>
                    <span>{tab.label}</span>
                </button>
            ))}
        </nav>
    )
}
