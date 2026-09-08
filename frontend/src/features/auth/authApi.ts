import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ChangePasswordRequest
} from './types/types'

import { apiClient } from '../../api/client'

export async function login(
    request: LoginRequest
): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
        '/api/auth/login',
        request
    )

    return response.data
}

export async function register(
    request: RegisterRequest
): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
        '/api/auth/register',
        request
    )

    return response.data
}

export async function changePassword(
    request: ChangePasswordRequest,
): Promise<void> {
    await apiClient.put(
        '/api/auth/me/password',
        request,
    )
}