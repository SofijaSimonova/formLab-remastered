export interface GoalResponse {
    id: string
    name: string
    description?: string
}

export interface UserGoalResponse {
    id: string
    userId: string
    goalId: string
    goalName: string
    createdAt: string
}

export interface AddUserGoalRequest {
    goalId: string
}