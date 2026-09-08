import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteWorkoutSet } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

interface DeleteWorkoutSetVariables {
    workoutSessionId: string
    workoutExerciseId: string
    setId: string
}

export function useDeleteWorkoutSet() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         workoutSessionId,
                         workoutExerciseId,
                         setId,
                     }: DeleteWorkoutSetVariables) =>
            deleteWorkoutSet(
                workoutSessionId,
                workoutExerciseId,
                setId,
            ),

        onSuccess: async (_, variables): Promise<void> => {
            await queryClient.invalidateQueries({
                queryKey: workoutKeys.sets(
                    variables.workoutSessionId,
                    variables.workoutExerciseId,
                ),
            })
        },
    })
}