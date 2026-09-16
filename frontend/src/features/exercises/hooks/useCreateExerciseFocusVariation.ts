import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createExerciseFocusVariation } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

interface CreateExerciseFocusVariationVariables {
    exerciseId: string
    request: {
        focusBodyPartId: string
        name: string
        description: string
        animationReference: string
    }
}

export function useCreateExerciseFocusVariation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         exerciseId,
                         request,
                     }: CreateExerciseFocusVariationVariables) =>
            createExerciseFocusVariation(
                exerciseId,
                request,
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