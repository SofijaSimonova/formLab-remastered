import { useQuery } from '@tanstack/react-query'

import { getStrengthProgress } from '../api/progress.api'
import { progressKeys } from '../progress.keys'
import type { StrengthProgressRange } from '../types/progress.types'

export function useStrengthProgress(
    exerciseId: string | undefined,
    range: StrengthProgressRange,
) {
    return useQuery({
        queryKey: progressKeys.strength(
            exerciseId ?? '',
            range,
        ),
        queryFn: () =>
            getStrengthProgress(
                exerciseId as string,
                range,
            ),
        enabled: !!exerciseId,
    })
}