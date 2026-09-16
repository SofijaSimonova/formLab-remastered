import { useInfiniteQuery } from '@tanstack/react-query'

import { getWorkoutHistory } from '../api/history.api'
import { historyKeys } from '../history.keys'
import {HISTORY_PAGE_SIZE} from "../../../constraints/app.constants";


export function useWorkoutHistory() {
    return useInfiniteQuery({
        queryKey: historyKeys.list(),

        queryFn: ({ pageParam }) =>
            getWorkoutHistory(
                pageParam,
                HISTORY_PAGE_SIZE,
            ),

        initialPageParam: 0,

        getNextPageParam: (lastPage) => {
            if (lastPage.last) {
                return undefined
            }

            return lastPage.page + 1
        },
    })
}