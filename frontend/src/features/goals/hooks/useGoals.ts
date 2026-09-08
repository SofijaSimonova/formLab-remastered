import { useQuery } from '@tanstack/react-query'

import { getGoals } from '../api/goal.api'
import { goalKeys } from '../goal.keys'

export function useGoals() {
    return useQuery({
        queryKey: goalKeys.list(),
        queryFn: getGoals,
        staleTime: 5 * 60 * 1000,
    })
}