import { useMutation } from '@tanstack/react-query'
import {
    deleteExercise,
} from '../api/exercises.api'

export function useDeleteExercise() {
    return useMutation({
        mutationFn: (exerciseId: string) =>
            deleteExercise(exerciseId),
    })
}