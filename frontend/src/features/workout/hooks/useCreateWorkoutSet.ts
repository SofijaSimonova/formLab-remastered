import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createWorkoutSet } from '../api/workout.api'
import type { CreateWorkoutSetRequest } from '../types/workout.types'
import { workoutKeys } from '../workout.keys'

interface CreateWorkoutSetVariables {
    workoutExerciseId: string
    request: CreateWorkoutSetRequest
}

export function useCreateWorkoutSet() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         workoutExerciseId,
                         request,
                     }: CreateWorkoutSetVariables) =>
            createWorkoutSet(
                workoutExerciseId,
                request,
            ),

        onSuccess: async (_, variables): Promise<void> => {
            await queryClient.invalidateQueries({
                queryKey: workoutKeys.sets(
                    variables.workoutExerciseId,
                ),
            })
        },
    })
}