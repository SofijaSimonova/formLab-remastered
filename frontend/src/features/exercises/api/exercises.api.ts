import type {
    ExerciseAlternativeResponse,
    ExercisePageResponse,
    ExerciseResponse,
    ReferenceResponse,
} from '../types/exercise.types'
import { apiClient } from '../../../api/client'

export async function getExercises(
    page: number,
    size: number,
    search?: string,
    bodyPartId?: string | null,
): Promise<ExercisePageResponse> {
    const response = await apiClient.get<ExercisePageResponse>(
        '/api/exercises',
        {
            params: {
                page,
                size,
                search: search || undefined,
                bodyPartId: bodyPartId || undefined,
            },
        },
    )

    return response.data
}

export async function getExerciseById(
    id: string,
): Promise<ExerciseResponse> {
    const response = await apiClient.get<ExerciseResponse>(
        `/api/exercises/${id}`,
    )

    return response.data
}

export async function getExerciseAlternatives(
    exerciseId: string,
): Promise<ExerciseAlternativeResponse[]> {
    const response = await apiClient.get<ExerciseAlternativeResponse[]>(
        `/api/exercises/${exerciseId}/alternatives`,
    )

    return response.data
}

export async function getBodyParts(): Promise<ReferenceResponse[]> {
    const response = await apiClient.get<ReferenceResponse[]>(
        '/api/body-parts',
    )

    return response.data
}