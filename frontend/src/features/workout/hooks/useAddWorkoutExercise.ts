import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addWorkoutExercise } from '../api/workout.api'
import type { AddWorkoutExerciseRequest } from '../types/workout.types'
import { workoutKeys } from '../workout.keys'

interface AddWorkoutExerciseVariables {
    workoutId: string
    request: AddWorkoutExerciseRequest
}

export function useAddWorkoutExercise() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         workoutId,
                         request,
                     }: AddWorkoutExerciseVariables) =>
            addWorkoutExercise(workoutId, request),

        onSuccess: async (_, variables): Promise<void> => {
            await queryClient.invalidateQueries({
                queryKey: workoutKeys.exercises(
                    variables.workoutId,
                ),
            })
        },
    })
}