import { apiClient } from '../../../api/client'

import type {
    AddWorkoutExerciseRequest,
    CreateWorkoutRequest,
    CreateWorkoutSetRequest,
    WorkoutExerciseResponse,
    WorkoutResponse,
    WorkoutSetResponse,
} from '../types/workout.types'


export async function getWorkouts(): Promise<WorkoutResponse[]> {
    const response = await apiClient.get<WorkoutResponse[]>(
        '/api/me/workouts',
    )

    return response.data
}


export async function getWorkoutById(
    workoutId: string,
): Promise<WorkoutResponse> {
    const response = await apiClient.get<WorkoutResponse>(
        `/api/me/workouts/${workoutId}`,
    )

    return response.data
}


export async function createWorkout(
    request: CreateWorkoutRequest,
): Promise<WorkoutResponse> {
    const response = await apiClient.post<WorkoutResponse>(
        '/api/me/workouts',
        request,
    )

    return response.data
}


export async function getWorkoutExercises(
    workoutId: string,
): Promise<WorkoutExerciseResponse[]> {
    const response = await apiClient.get<WorkoutExerciseResponse[]>(
        `/api/workouts/${workoutId}/exercises`,
    )

    return response.data
}


export async function addWorkoutExercise(
    workoutId: string,
    request: AddWorkoutExerciseRequest,
): Promise<WorkoutExerciseResponse> {
    const response = await apiClient.post<WorkoutExerciseResponse>(
        `/api/workouts/${workoutId}/exercises`,
        request,
    )

    return response.data
}


export async function deleteWorkoutExercise(
    workoutId: string,
    workoutExerciseId: string,
): Promise<void> {
    await apiClient.delete(
        `/api/workouts/${workoutId}/exercises/${workoutExerciseId}`,
    )
}


export async function getWorkoutSets(
    workoutExerciseId: string,
): Promise<WorkoutSetResponse[]> {
    const response = await apiClient.get<WorkoutSetResponse[]>(
        `/api/workout-exercises/${workoutExerciseId}/sets`,
    )

    return response.data
}


export async function createWorkoutSet(
    workoutExerciseId: string,
    request: CreateWorkoutSetRequest,
): Promise<WorkoutSetResponse> {
    const response = await apiClient.post<WorkoutSetResponse>(
        `/api/workout-exercises/${workoutExerciseId}/sets`,
        request,
    )

    return response.data
}


export async function deleteWorkoutSet(
    workoutExerciseId: string,
    setId: string,
): Promise<void> {
    await apiClient.delete(
        `/api/workout-exercises/${workoutExerciseId}/sets/${setId}`,
    )
}