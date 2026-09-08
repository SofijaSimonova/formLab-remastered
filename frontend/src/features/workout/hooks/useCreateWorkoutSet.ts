import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createWorkoutSet } from '../api/workout.api'
import type { CreateWorkoutSetRequest } from '../types/workout.types'
import { workoutKeys } from '../workout.keys'

interface CreateWorkoutSetVariables {
    workoutSessionId: string
    workoutExerciseId: string
    request: CreateWorkoutSetRequest
}

export function useCreateWorkoutSet() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         workoutSessionId,
                         workoutExerciseId,
                         request,
                     }: CreateWorkoutSetVariables) =>
            createWorkoutSet(
                workoutSessionId,
                workoutExerciseId,
                request,
            ),

        onSuccess: (
            _data,
            variables,
        ): void => {
            void queryClient.invalidateQueries({
                queryKey: workoutKeys.sets(
                    variables.workoutSessionId,
                    variables.workoutExerciseId,
                ),
            })
        },
    })
}