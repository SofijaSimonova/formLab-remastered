import { useQuery } from '@tanstack/react-query'

import { getBodyParts } from '../api/bodyParts.api'
import { exerciseKeys } from '../exercise.keys'

export function useBodyParts() {
    return useQuery({
        queryKey: exerciseKeys.bodyParts(),
        queryFn: getBodyParts,
        staleTime: 5 * 60 * 1000,
    })
}