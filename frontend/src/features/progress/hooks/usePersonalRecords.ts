import { useQuery } from '@tanstack/react-query'

import { getPersonalRecords } from '../api/progress.api'
import { progressKeys } from '../progress.keys'

export function usePersonalRecords() {
    return useQuery({
        queryKey: progressKeys.personalRecords(),
        queryFn: getPersonalRecords,
    })
}