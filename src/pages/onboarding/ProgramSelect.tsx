import React from 'react'
import ViewHeader from '../../components/common/ViewHeader'
import { getAllTracks } from '../../services/protocolEngine'
import type { TrackId } from '../../types'

interface ProgramSelectProps {
    onBack: () => void
    onSelectProgram: (trackId: TrackId) => void
}

export default function ProgramSelect({ onBack, onSelectProgram }: ProgramSelectProps) {
    const tracks = getAllTracks()

    return (
        <div className="view-container no-nav">
            <ViewHeader title="Select Program" onBack={onBack} />
            <div className="content">
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                    Based on your intake, choose your primary trajectory.
                </p>

                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className="program-card"
                        onClick={() => onSelectProgram(track.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onSelectProgram(track.id)
                            }
                        }}
                    >
                        <div
                            className="program-icon"
                            style={{
                                background: track.bgAccent,
                                color: track.badgeColor,
                            }}
                        >
                            {track.icon}
                        </div>
                        <div className="program-info">
                            <h3>{track.title}</h3>
                            <p>{track.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
