import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateExerciseFocusVariation } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

interface UpdateExerciseFocusVariationVariables {
    exerciseId: string
    variationId: string
    request: {
        name: string
        description: string
        animationReference: string
    }
}

export function useUpdateExerciseFocusVariation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         exerciseId,
                         variationId,
                         request,
                     }: UpdateExerciseFocusVariationVariables) =>
            updateExerciseFocusVariation(
                exerciseId,
                variationId,
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