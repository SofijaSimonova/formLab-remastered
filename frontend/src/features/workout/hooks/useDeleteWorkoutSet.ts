import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteWorkoutSet } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

interface DeleteWorkoutSetVariables {
    workoutExerciseId: string
    setId: string
}

export function useDeleteWorkoutSet() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         workoutExerciseId,
                         setId,
                     }: DeleteWorkoutSetVariables) =>
            deleteWorkoutSet(
                workoutExerciseId,
                setId,
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