import { useQuery } from '@tanstack/react-query'

import { getTags } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

export function useTags() {
    return useQuery({
        queryKey: exerciseKeys.tags(),
        queryFn: getTags,
        staleTime: 10 * 60 * 1000,
    })
}