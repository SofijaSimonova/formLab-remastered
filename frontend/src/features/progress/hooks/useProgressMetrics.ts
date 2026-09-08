import { useQuery } from '@tanstack/react-query'

import { getProgressMetrics } from '../api/progress.api'
import { progressKeys } from '../progress.keys'

export function useProgressMetrics() {
    return useQuery({
        queryKey: progressKeys.metrics(),
        queryFn: getProgressMetrics,
    })
}