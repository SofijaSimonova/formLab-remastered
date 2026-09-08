import { useQuery } from '@tanstack/react-query'

import {
    getCurrentUserGoals,
} from '../api/goal.api'
import { goalKeys } from '../goal.keys'

export function useUserGoals() {
    return useQuery({
        queryKey: goalKeys.myGoals(),
        queryFn: getCurrentUserGoals,
    })
}