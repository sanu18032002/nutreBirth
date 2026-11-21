import React, { useState, useRef, useEffect } from 'react'

interface Message {
    id: string
    sender: 'coach' | 'user' | 'ai'
    text: string
    timestamp: string
    macros?: {
        calories: number
        p: number
        c: number
        f: number
    }
}

export default function CoachChatView() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'coach',
            text: "Good morning! Don't forget your hydration goal today. Based on yesterday's workout, your CNS might be a bit fatigued. Let's aim for Zone 2 cardio today.",
            timestamp: 'Today, 8:00 AM',
        },
        {
            id: '2',
            sender: 'user',
            text: 'Got it. Just had my breakfast. 3 whole eggs, 2 slices of sourdough toast.',
            timestamp: 'Today, 8:15 AM',
        },
        {
            id: '3',
            sender: 'ai',
            text: 'Logged: ~420 kcal (P: 24g, C: 30g, F: 18g). Your coach has been updated.',
            timestamp: 'Today, 8:16 AM',
            macros: { calories: 420, p: 24, c: 30, f: 18 },
        },
    ])

    const [input, setInput] = useState('')
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: input.trim(),
            timestamp: 'Just now',
        }

        setMessages((prev) => [...prev, userMsg])
        const text = input.trim()
        setInput('')

        // Simulate AI Macro parser response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: `Analyzed "${text}": ~380 kcal (P: 28g, C: 32g, F: 14g). Macro targets updated.`,
                timestamp: 'Just now',
                macros: { calories: 380, p: 28, c: 32, f: 14 },
            }
            setMessages((prev) => [...prev, aiMsg])
        }, 800)
    }

    const handleVoiceClick = () => {
        const sampleFoods = [
            '1 bowl oatmeal with 1 scoop whey and almonds',
            '150g grilled chicken breast with 1 cup white rice',
            '200g Greek yogurt with blueberries and honey',
        ]
        const randomFood = sampleFoods[Math.floor(Math.random() * sampleFoods.length)]
        setInput(randomFood)
    }

    return (
        <div className="view-container" style={{ paddingBottom: 160 }}>
            <header className="header">
                <div className="header-left">
                    <div
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            background: '#111827',
                            border: '1px solid var(--accent-cyan)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 12,
                            fontWeight: 800,
                            color: 'var(--accent-cyan)',
                        }}
                    >
                        CA
                    </div>
                    <div>
                        <h1 style={{ fontSize: 16 }}>Coach Arjun</h1>
                        <span style={{ fontSize: 10, color: 'var(--accent-green)', fontWeight: 700 }}>
                            ● Online (Nutrition Lead)
                        </span>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => alert('Initiating encrypted Video Call via Daily.co / Twilio SDK...')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: 22,
                        cursor: 'pointer',
                        padding: 4,
                    }}
                    aria-label="Video Call"
                >
                    📹
                </button>
            </header>

            <div className="content">
                <div style={{ textAlign: 'center', fontSize: 10, color: '#555', marginBottom: 20 }}>
                    Today, 8:00 AM
                </div>

                {messages.map((msg) => {
                    if (msg.sender === 'user') {
                        return (
                            <div key={msg.id} className="chat-bubble chat-user">
                                {msg.text}
                            </div>
                        )
                    }

                    if (msg.sender === 'ai') {
                        return (
                            <div
                                key={msg.id}
                                className="chat-bubble chat-ai"
                                style={{ borderColor: 'var(--accent-cyan)' }}
                            >
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: 'var(--accent-cyan)',
                                        fontWeight: 800,
                                        marginBottom: 4,
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    🤖 AI MACRO CALCULATION
                                </div>
                                <div>{msg.text}</div>
                            </div>
                        )
                    }

                    return (
                        <div key={msg.id} className="chat-bubble chat-ai">
                            {msg.text}
                        </div>
                    )
                })}
                <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="chat-input-area">
                <input
                    type="text"
                    className="styled-input"
                    style={{ margin: 0, padding: 12, flex: 1 }}
                    placeholder="Type food or ask Coach..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="button"
                    className="mic-btn"
                    onClick={handleVoiceClick}
                    title="Tap for voice input sample"
                >
                    🎙️
                </button>
            </form>
        </div>
    )
}
