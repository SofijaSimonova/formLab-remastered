import { useMutation } from '@tanstack/react-query'
import {
    updateExercise,
} from '../api/exercises.api'
import type {
    UpdateExerciseRequest,
} from '../types/exercise.types'

export function useUpdateExercise() {
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
    })
}