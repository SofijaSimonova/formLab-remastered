import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createExerciseAlternative } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

interface CreateExerciseAlternativeVariables {
    exerciseId: string
    request: {
        alternativeExerciseId: string
        reason: string
        reverseReason: string
    }
}

export function useCreateExerciseAlternative() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         exerciseId,
                         request,
                     }: CreateExerciseAlternativeVariables) =>
            createExerciseAlternative(exerciseId, request),

        onSuccess: async (_, variables) => {
            await queryClient.invalidateQueries({
                queryKey: exerciseKeys.alternatives(
                    variables.exerciseId,
                ),
            })
        },
    })
}