export interface WorkoutSessionHistoryResponse {
    sessionId: string
    workoutId: string
    workoutName: string
    status: 'IN_PROGRESS' | 'COMPLETED'
    startedAt: string
    completedAt: string | null
    durationSeconds: number | null
    resumeWorkoutExerciseId: string | null
}

export interface WorkoutSessionHistoryPage {
    content: WorkoutSessionHistoryResponse[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}