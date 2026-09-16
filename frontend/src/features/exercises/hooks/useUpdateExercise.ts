import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {
    updateExercise,
} from '../api/exercises.api'
import type {
    UpdateExerciseRequest,
} from '../types/exercise.types'
import { exerciseKeys } from '../exercise.keys'

export function useUpdateExercise() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         exerciseId,
                         request,
                     }: {
            exerciseId: string
            request: UpdateExerciseRequest
        }) =>
            updateExercise(
                exerciseId,
                request,
            ),

        onSuccess: async (
            _data,
            variables,
        ) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: exerciseKeys.lists(),
                }),
                queryClient.invalidateQueries({
                    queryKey: exerciseKeys.detail(
                        variables.exerciseId,
                    ),
                }),
            ])
        },
    })
}