import { useQuery } from '@tanstack/react-query'

import { getProgressData } from '../api/progress.api'
import { progressKeys } from '../progress.keys'

export function useProgressData() {
    return useQuery({
        queryKey: progressKeys.data(),
        queryFn: getProgressData,
    })
}