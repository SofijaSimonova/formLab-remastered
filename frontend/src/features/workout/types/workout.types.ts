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