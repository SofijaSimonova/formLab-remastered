import { useQuery } from '@tanstack/react-query'

import { getExerciseAlternatives } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

export function useExerciseAlternatives(exerciseId: string) {
    return useQuery({
        queryKey: exerciseKeys.alternatives(exerciseId),
        queryFn: () => getExerciseAlternatives(exerciseId),
        enabled: !!exerciseId,
    })
}