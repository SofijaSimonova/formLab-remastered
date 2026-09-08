export interface AppUserResponse {
    id: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
}

export interface UpdateAppUserRequest {
    firstName: string
    lastName: string
}