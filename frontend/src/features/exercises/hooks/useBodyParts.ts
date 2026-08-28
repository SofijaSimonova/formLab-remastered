import { useQuery } from '@tanstack/react-query'

import { getBodyParts } from '../api/bodyParts.api'

export function useBodyParts() {
    return useQuery({
        queryKey: ['body-parts'],
        queryFn: getBodyParts,
        staleTime: 5 * 60 * 1000,
    })
}