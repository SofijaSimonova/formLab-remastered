import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    createExercise,
} from '../api/exercises.api'
import type {
    CreateExerciseRequest,
} from '../types/exercise.types'
import { exerciseKeys } from '../exercise.keys'

export function useCreateExercise() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            request: CreateExerciseRequest,
        ) => createExercise(request),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: exerciseKeys.lists(),
            })
        },
    })
}