import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteExerciseFocusVariation } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

interface DeleteExerciseFocusVariationVariables {
    exerciseId: string
    variationId: string
}

export function useDeleteExerciseFocusVariation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         exerciseId,
                         variationId,
                     }: DeleteExerciseFocusVariationVariables) =>
            deleteExerciseFocusVariation(
                exerciseId,
                variationId,
            ),

        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: exerciseKeys.detail(
                    variables.exerciseId,
                ),
            })
        },
    })
}