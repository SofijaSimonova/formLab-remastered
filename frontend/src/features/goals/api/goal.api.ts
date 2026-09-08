import { apiClient } from '../../../api/client'

import type {
    AddUserGoalRequest,
    GoalResponse,
    UserGoalResponse,
} from '../types/goal.types'

export async function getGoals(): Promise<GoalResponse[]> {
    const response =
        await apiClient.get<GoalResponse[]>(
            '/api/goals',
        )

    return response.data
}

export async function getCurrentUserGoals(): Promise<
    UserGoalResponse[]
> {
    const response =
        await apiClient.get<UserGoalResponse[]>(
            '/api/users/me/goals',
        )

    return response.data
}

export async function addCurrentUserGoal(
    request: AddUserGoalRequest,
): Promise<UserGoalResponse> {
    const response =
        await apiClient.post<UserGoalResponse>(
            '/api/users/me/goals',
            request,
        )

    return response.data
}

export async function removeCurrentUserGoal(
    userGoalId: string,
): Promise<void> {
    await apiClient.delete(
        `/api/users/me/goals/${userGoalId}`,
    )
}