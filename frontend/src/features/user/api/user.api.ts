import { apiClient } from '../../../api/client'

import type {
    AppUserResponse,
    UpdateAppUserRequest,
} from '../types/user.types'

export async function getCurrentUser(): Promise<AppUserResponse> {
    const response =
        await apiClient.get<AppUserResponse>(
            '/api/users/me',
        )

    return response.data
}

export async function updateCurrentUser(
    request: UpdateAppUserRequest,
): Promise<AppUserResponse> {
    const response =
        await apiClient.put<AppUserResponse>(
            '/api/users/me',
            request,
        )

    return response.data
}