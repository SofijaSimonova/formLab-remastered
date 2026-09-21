import { useQuery } from '@tanstack/react-query'

import { getProgressAnalysis } from '../api/progress.api'
import { progressKeys } from '../progress.keys'
import type { StrengthProgressRange } from '../types/progress.types'

export function useProgressAnalysis(
    exerciseId: string | undefined,
    range: StrengthProgressRange,
) {
    return useQuery({
        queryKey: progressKeys.analysis(
            exerciseId ?? '',
            range,
        ),
        queryFn: () =>
            getProgressAnalysis(
                exerciseId as string,
                range,
            ),
        enabled: !!exerciseId,
        staleTime: 5 * 60 * 1000,
    })
}