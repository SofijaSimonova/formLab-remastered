import { useMutation } from '@tanstack/react-query'

import { createWorkoutSession } from '../api/workout.api'

export function useCreateWorkoutSession() {
    return useMutation({
        mutationFn: (workoutId: string) =>
            createWorkoutSession(workoutId),
    })
}