export type UserRole =
    | 'USER'
    | 'ADMIN'

export interface AppUserResponse {
    id: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
    updatedAt: string
    role: UserRole
}

export interface UpdateAppUserRequest {
    firstName: string
    lastName: string
}