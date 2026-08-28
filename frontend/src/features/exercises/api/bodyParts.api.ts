import type { ReferenceResponse } from '../types/exercise.types'
import { apiClient } from '../../../api/client'

export async function getBodyParts(): Promise<ReferenceResponse[]> {
    const response = await apiClient.get<ReferenceResponse[]>(
        '/api/body-parts',
    )

    return response.data
}