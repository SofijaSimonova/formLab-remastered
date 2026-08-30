import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteWorkoutExercise } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

interface DeleteWorkoutExerciseVariables {
    workoutId: string
    workoutExerciseId: string
}

export function useDeleteWorkoutExercise() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         workoutId,
                         workoutExerciseId,
                     }: DeleteWorkoutExerciseVariables) =>
            deleteWorkoutExercise(
                workoutId,
                workoutExerciseId,
            ),

        onSuccess: async (_, variables): Promise<void> => {
            await queryClient.invalidateQueries({
                queryKey: workoutKeys.exercises(
                    variables.workoutId,
                ),
            })
        },
    })
}