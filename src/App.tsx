import { useEffect, useState } from 'react'
import MobileFrame from './components/common/MobileFrame'
import BottomNav, { TabId } from './components/common/BottomNav'

// Onboarding Pages
import LoginView from './pages/onboarding/LoginView'
import IntakeQuestionnaire from './pages/onboarding/IntakeQuestionnaire'
import ProgramSelect from './pages/onboarding/ProgramSelect'
import MedicalClearance from './pages/onboarding/MedicalClearance'
import CoachAppointment from './pages/onboarding/CoachAppointment'

// In-App Tab Views
import HubView from './pages/mobile/HubView'
import BiometricsView from './pages/mobile/BiometricsView'
import LogisticsView from './pages/mobile/LogisticsView'
import CoachChatView from './pages/mobile/CoachChatView'
import BookingPortalView from './pages/mobile/BookingPortalView'

// Sub-Pages
import PlansSubscriptionView from './pages/mobile/PlansSubscriptionView'
import HelpSupportView from './pages/mobile/HelpSupportView'

// DB & Types
import { db, seedIfEmpty } from './db'
import type { TrackId, IntakeDiagnostics, UserProfile } from './types'

type ScreenState =
    | 'login'
    | 'questionnaire'
    | 'programs'
    | 'medical'
    | 'coach'
    | 'main'
    | 'plans'
    | 'support'

export default function App() {
    const [screen, setScreen] = useState<ScreenState>('main')
    const [activeTab, setActiveTab] = useState<TabId>('hub')
    const [activeTrack, setActiveTrack] = useState<TrackId>('athletic')
    const [intakeData, setIntakeData] = useState<IntakeDiagnostics>({
        age: 28,
        sex: 'Male',
        weightKg: 75,
        heightCm: 175,
        activityLevel: 'Moderately Active (Workout 3-4x/wk)',
        dietaryPreference: 'omnivore',
        avgSleep: '7-9 Hours (Optimal)',
        stressMood: 'Low / Manageable',
        jointLimitations: ['None / Healthy'],
        wearables: ['Apple Watch'],
    })

    // Load persisted profile or initialize
    useEffect(() => {
        ;(async () => {
            try {
                await seedIfEmpty()
                const profile = await db.profile.get('local')
                if (profile) {
                    if (profile.trackId) {
                        setActiveTrack(profile.trackId)
                    }
                    if (profile.intake) {
                        setIntakeData(profile.intake)
                    }
                }
            } catch (err) {
                console.warn('DB initialization notice:', err)
            }
        })()
    }, [])

    const handleLogin = (phone: string) => {
        db.profile
            .update('local', { phone })
            .catch(() => db.profile.put({ id: 'local', heightCm: 175, weightKg: 75, activityLevel: 'moderate', phone }))
        setScreen('questionnaire')
    }

    const handleQuestionnaireSubmit = (data: IntakeDiagnostics) => {
        setIntakeData(data)
        db.profile.update('local', {
            intake: data,
            heightCm: data.heightCm || 175,
            weightKg: data.weightKg || 75,
            age: data.age || 28,
            sex: (data.sex?.toLowerCase() as 'male' | 'female') || 'male',
        }).catch(() => {})
        setScreen('programs')
    }

    const handleSelectProgram = (trackId: TrackId) => {
        setActiveTrack(trackId)
        db.profile.update('local', { trackId }).catch(() => {})

        if (trackId === 'clinical' || trackId === 'maternal') {
            setScreen('medical')
        } else {
            setScreen('coach')
        }
    }

    const handleMedicalClearanceConfirm = (slot: string) => {
        db.profile.update('local', { medicalConsultTime: slot }).catch(() => {})
        setScreen('coach')
    }

    const handleCoachComplete = () => {
        db.profile.update('local', { coachBooked: true }).catch(() => {})
        setScreen('main')
        setActiveTab('hub')
    }

    const isBottomNavVisible = screen === 'main'

    return (
        <MobileFrame>
            {/* 1. Onboarding: Login */}
            {screen === 'login' && (
                <LoginView
                    onLogin={handleLogin}
                    onGoogleLogin={() => {
                        window.location.href = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}/oauth2/authorization/google`
                    }}
                />
            )}

            {/* 2. Onboarding: Intake Diagnostics */}
            {screen === 'questionnaire' && (
                <IntakeQuestionnaire
                    initialData={intakeData}
                    onSubmit={handleQuestionnaireSubmit}
                />
            )}

            {/* 3. Onboarding: Program Track Selection */}
            {screen === 'programs' && (
                <ProgramSelect
                    onBack={() => setScreen('questionnaire')}
                    onSelectProgram={handleSelectProgram}
                />
            )}

            {/* 4. Onboarding: Conditional Medical Clearance */}
            {screen === 'medical' && (
                <MedicalClearance
                    onBack={() => setScreen('programs')}
                    onConfirm={handleMedicalClearanceConfirm}
                />
            )}

            {/* 5. Onboarding: Coach Appointment */}
            {screen === 'coach' && (
                <CoachAppointment
                    onBack={() => setScreen('programs')}
                    onComplete={handleCoachComplete}
                />
            )}

            {/* 6. Main App Views (Tabs) */}
            {screen === 'main' && (
                <>
                    {activeTab === 'hub' && (
                        <HubView
                            trackId={activeTrack}
                            intake={intakeData}
                            onRetakeTriage={() => setScreen('programs')}
                        />
                    )}
                    {activeTab === 'biometrics' && <BiometricsView />}
                    {activeTab === 'logistics' && <LogisticsView trackId={activeTrack} />}
                    {activeTab === 'booking' && (
                        <BookingPortalView
                            onNavigatePlans={() => setScreen('plans')}
                            onNavigateSupport={() => setScreen('support')}
                            onRetakeOnboarding={() => setScreen('login')}
                        />
                    )}
                    {activeTab === 'chat' && <CoachChatView />}
                </>
            )}

            {/* 7. Sub-Screens */}
            {screen === 'plans' && (
                <PlansSubscriptionView onBack={() => setScreen('main')} />
            )}
            {screen === 'support' && (
                <HelpSupportView onBack={() => setScreen('main')} />
            )}

            {/* Persistent Bottom Navigation for In-App Tabs */}
            <BottomNav
                activeTab={activeTab}
                onTabChange={(tab) => {
                    setActiveTab(tab)
                    if (screen !== 'main') setScreen('main')
                }}
                visible={isBottomNavVisible}
            />
        </MobileFrame>
    )
}
