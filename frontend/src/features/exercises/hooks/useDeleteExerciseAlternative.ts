import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteExerciseAlternative } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

interface DeleteExerciseAlternativeVariables {
    exerciseId: string
    alternativeId: string
}

export function useDeleteExerciseAlternative() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         exerciseId,
                         alternativeId,
                     }: DeleteExerciseAlternativeVariables) =>
            deleteExerciseAlternative(
                exerciseId,
                alternativeId,
            ),

        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: exerciseKeys.alternatives(
                    variables.exerciseId,
                ),
            })
        },
    })
}