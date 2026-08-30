import { useInfiniteQuery } from '@tanstack/react-query'

import { getExercises } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

export function useExercises(
    search?: string,
    bodyPartId?: string,
    ) {
    return useInfiniteQuery({
        queryKey: exerciseKeys.list(search, bodyPartId),

        queryFn: ({ pageParam }) =>
            getExercises(
                pageParam,
                6,
                search,
                bodyPartId,
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