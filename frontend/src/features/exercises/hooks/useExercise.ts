import { useQuery } from '@tanstack/react-query'

import { getExerciseById } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

export function useExercise(id: string) {
    return useQuery({
        queryKey: exerciseKeys.detail(id),
        queryFn: () => getExerciseById(id),
        enabled: !!id,
    })
}