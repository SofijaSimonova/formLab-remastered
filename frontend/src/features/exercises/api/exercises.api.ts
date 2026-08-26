import { apiClient } from '../../../api/client'
import type {
    ExerciseListResponse,
    ExerciseResponse,
} from '../types/exercise.types'

export async function getExercises(): Promise<ExerciseListResponse[]> {
    const { data } = await apiClient.get<ExerciseListResponse[]>('/api/exercises')

    return data
}

export async function getExerciseById(
    id: string,
): Promise<ExerciseResponse> {
    const { data } = await apiClient.get<ExerciseResponse>(
        `/api/exercises/${id}`,
    )

    return data
}