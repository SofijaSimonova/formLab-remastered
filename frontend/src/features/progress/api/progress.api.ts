import {
    apiClient,
    aiClient,
} from '../../../api/client'

import type {
    PersonalRecordsResponse,
    ProgressDataResponse,
    StrengthProgressRange,
    StrengthProgressResponse,
    ProgressAnalysisResponse,
    ProgressMetricsResponse,
    ProgressQuestionResponse
} from '../types/progress.types'

export async function getProgressData(): Promise<ProgressDataResponse> {
    const response =
        await apiClient.get<ProgressDataResponse>(
            '/api/me/progress-data',
        )

    return response.data
}

export async function getPersonalRecords(): Promise<PersonalRecordsResponse> {
    const response =
        await apiClient.get<PersonalRecordsResponse>(
            '/api/me/progress/personal-records',
        )

    return response.data
}

export async function getStrengthProgress(
    exerciseId: string,
    range: StrengthProgressRange,
): Promise<StrengthProgressResponse> {
    const response =
        await apiClient.get<StrengthProgressResponse>(
            '/api/me/progress/strength',
            {
                params: {
                    exerciseId,
                    range,
                },
            },
        )

    return response.data
}

export async function getProgressAnalysis(
    exerciseId: string,
    range: StrengthProgressRange,
): Promise<ProgressAnalysisResponse> {
    const response =
        await aiClient.get<ProgressAnalysisResponse>(
            `/api/ai/progress/${exerciseId}`,
            {
                params: {
                    range,
                },
            },
        )

    return response.data
}

export async function getProgressMetrics(): Promise<ProgressMetricsResponse> {
    const response =
        await apiClient.get<ProgressMetricsResponse>(
            '/api/me/progress/metrics',
        )

    return response.data
}

export async function askProgressQuestion(
    exerciseId: string,
    range: StrengthProgressRange,
    question: string,
): Promise<ProgressQuestionResponse> {
    const response =
        await aiClient.post<ProgressQuestionResponse>(
            `/api/ai/progress/${exerciseId}/questions`,
            {
                question,
            },
            {
                params: {
                    range,
                },
            },
        )

    return response.data
}