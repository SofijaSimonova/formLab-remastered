export type StrengthProgressRange =
    | 'ONE_MONTH'
    | 'THREE_MONTHS'
    | 'SIX_MONTHS'
    | 'ONE_YEAR'

export interface StrengthProgressPoint {
    date: string
    value: number
}

export type ExerciseTrackingType =
    | 'WEIGHT'
    | 'REPS'

export interface StrengthProgressResponse {
    exerciseId: string
    exerciseName: string
    trackingType: ExerciseTrackingType
    range: StrengthProgressRange
    points: StrengthProgressPoint[]
}

export interface WorkoutSetData {
    setId: string
    setNumber: number
    weight: number | null
    reps: number
    completedAt: string
}

export interface WorkoutExerciseData {
    exerciseId: string
    exerciseName: string
    exerciseOrder: number
    sets: WorkoutSetData[]
}

export interface WorkoutSessionData {
    sessionId: string
    workoutId: string
    workoutName: string
    startedAt: string
    completedAt: string | null
    exercises: WorkoutExerciseData[]
}

export interface UserGoalData {
    goalName: string
}

export interface ProgressDataResponse {
    sessions: WorkoutSessionData[]
    goals: UserGoalData[]
}

export interface PersonalRecord {
    exerciseId: string | null
    exerciseName: string | null
    value: number | null
    reps: number | null
    achievedAt: string
    workoutSessionId: string
    workoutName: string
}

export interface PersonalRecordsResponse {
    heaviestWeight: PersonalRecord | null
    mostReps: PersonalRecord | null
    highestVolume: PersonalRecord | null
    recentPr: PersonalRecord | null
}

export interface ProgressAnalysisResponse {
    summary: string
    insights: string[]
    recommendations: string[]
    suggestedPrompts: string[]
}

export interface ProgressQuestionResponse {
    answer: string
}

export interface ProgressMetricsResponse {
    totalWorkouts: number
    totalSets: number
    totalVolume: number
    weeklyVolume: WeeklyVolumeData[]
    currentStreak: number
}

export interface WeeklyVolumeData {
    date: string
    volume: number
}