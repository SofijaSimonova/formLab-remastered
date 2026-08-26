import { useQuery } from '@tanstack/react-query'

import { getExercises } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

export function useExercises() {
    return useQuery({
        queryKey: exerciseKeys.list(),
        queryFn: getExercises,
    })
}