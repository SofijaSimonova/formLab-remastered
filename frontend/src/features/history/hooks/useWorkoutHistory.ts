import { useInfiniteQuery } from '@tanstack/react-query'

import { getWorkoutHistory } from '../api/history.api'
import { historyKeys } from '../history.keys'

export function useWorkoutHistory() {
    return useInfiniteQuery({
        queryKey: historyKeys.list(),

        queryFn: ({ pageParam }) =>
            getWorkoutHistory(pageParam, 20),

        initialPageParam: 0,

        getNextPageParam: (lastPage) => {
            if (lastPage.last) {
                return undefined
            }

            return lastPage.page + 1
        },
    })
}