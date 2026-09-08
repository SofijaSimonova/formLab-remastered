import {ExerciseTrackingType} from "../../exercises/types/exercise.types";

export interface WorkoutResponse {
    id: string
    userId: string
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
}

export interface WorkoutExerciseResponse {
    id: string
    workoutId: string
    exerciseId: string
    exerciseName: string
    trackingType: ExerciseTrackingType
    exerciseOrder: number
    targetSets: number | null
    targetReps: number | null
}

export interface WorkoutSetResponse {
    id: string
    workoutExerciseId: string
    setNumber: number
    weight: number | null
    reps: number
    completedAt: string
}

export interface CreateWorkoutRequest {
    name: string
    description?: string
}

export interface AddWorkoutExerciseRequest {
    exerciseId: string
    exerciseOrder: number
    targetSets?: number
    targetReps?: number
}

export interface CreateWorkoutSetRequest {
    setNumber: number
    weight?: number
    reps: number
}

export interface CreateWorkoutSessionResponse {
    id: string
    workoutId: string
    status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'
    startedAt: string
    completedAt: string | null
}

export interface WorkoutSessionExerciseSummaryResponse {
    workoutExerciseId: string
    exerciseName: string
    exerciseOrder: number
    totalSets: number
    totalVolume: number
    bestSetWeight: number | null
    bestSetReps: number | null
}

export interface WorkoutSessionSummaryResponse {
    sessionId: string
    workoutId: string
    workoutName: string
    status: 'COMPLETED'
    startedAt: string
    completedAt: string
    durationSeconds: number
    exerciseCount: number
    totalSets: number
    totalVolume: number
    exercises: WorkoutSessionExerciseSummaryResponse[]
}
