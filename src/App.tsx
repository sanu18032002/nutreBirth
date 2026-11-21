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

// Sub-Pages & Modals
import PlansSubscriptionView from './pages/mobile/PlansSubscriptionView'
import HelpSupportView from './pages/mobile/HelpSupportView'
import WeeklyCheckInModal from './components/checkin/WeeklyCheckInModal'

// DB, Engine & Types
import { db, seedIfEmpty } from './db'
import { getProtocolData } from './services/protocolEngine'
import type { CheckInEvaluationResult } from './services/checkInEngine'
import type { TrackId, IntakeDiagnostics, CheckInRecord } from './types'

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
    const [showCheckInModal, setShowCheckInModal] = useState(false)
    const [refeedActive, setRefeedActive] = useState(false)
    const [refeedTargets, setRefeedTargets] = useState<{
        calories: number
        protein: number
        carbs: number
        fat: number
        extraCarbsG: number
    } | undefined>(undefined)
    const [latestCheckIn, setLatestCheckIn] = useState<CheckInRecord | undefined>(undefined)

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
                    if (profile.checkIns && profile.checkIns.length > 0) {
                        const last = profile.checkIns[profile.checkIns.length - 1]
                        setLatestCheckIn(last)
                    }
                    if (profile.refeedActive) {
                        setRefeedActive(true)
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

    const handleCheckInComplete = (record: CheckInRecord, result: CheckInEvaluationResult) => {
        setLatestCheckIn(record)
        if (result.refeedRecommended && result.refeedTargets) {
            setRefeedActive(true)
            setRefeedTargets(result.refeedTargets)
        } else if (result.verdict === 'green') {
            setRefeedActive(false)
        }

        db.profile.update('local', {
            refeedActive: result.refeedRecommended,
        }).catch(() => {})

        setShowCheckInModal(false)
        setActiveTab('hub')
    }

    const protocol = getProtocolData(activeTrack)
    const isBottomNavVisible = screen === 'main' && !showCheckInModal

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
                            onOpenCheckIn={() => setShowCheckInModal(true)}
                            refeedActive={refeedActive}
                            refeedTargets={refeedTargets}
                            latestCheckIn={latestCheckIn}
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

            {/* 8. Weekly Check-In Modal Flow (5 Screens) */}
            {showCheckInModal && (
                <WeeklyCheckInModal
                    onClose={() => setShowCheckInModal(false)}
                    onComplete={handleCheckInComplete}
                    prevWeightKg={latestCheckIn?.weightKg ?? (intakeData.weightKg || 75.0)}
                    prevWaistCm={latestCheckIn?.waistCm ?? 84.0}
                    currentCalories={protocol.dailyTargets.calories}
                    currentProtein={protocol.dailyTargets.protein}
                    currentCarbs={protocol.dailyTargets.carbs}
                    currentFat={protocol.dailyTargets.fat}
                    tdee={Math.round((intakeData.weightKg || 75) * 34)}
                    weeksInDeficit={latestCheckIn?.weeksInDeficit ?? 4}
                />
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
