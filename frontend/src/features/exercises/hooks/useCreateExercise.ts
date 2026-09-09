import { useMutation } from '@tanstack/react-query'
import {
    createExercise,
} from '../api/exercises.api'
import type {
    CreateExerciseRequest,
} from '../types/exercise.types'

export function useCreateExercise() {
    return useMutation({
        mutationFn: (
            request: CreateExerciseRequest,
        ) => createExercise(request),
    })
}