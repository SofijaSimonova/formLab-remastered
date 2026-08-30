import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createWorkout } from '../api/workout.api'
import type { CreateWorkoutRequest } from '../types/workout.types'
import { workoutKeys } from '../workout.keys'

export function useCreateWorkout() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: CreateWorkoutRequest) =>
            createWorkout(request),

        onSuccess: async (): Promise<void> => {
            await queryClient.invalidateQueries({
                queryKey: workoutKeys.list(),
            })
        },
    })
}