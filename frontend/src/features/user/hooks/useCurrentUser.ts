import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '../api/user.api'
import { userKeys } from '../user.keys'

export function useCurrentUser() {
    return useQuery({
        queryKey: userKeys.me(),
        queryFn: getCurrentUser,
        staleTime: 5 * 60 * 1000,
    })
}