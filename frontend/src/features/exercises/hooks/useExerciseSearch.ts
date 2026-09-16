import { useQuery } from '@tanstack/react-query'

import { getExercises } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'
import {EXERCISE_SEARCH_PAGE_SIZE} from "../../../constraints/app.constants";


export function useExerciseSearch(
    search: string,
    enabled = true,
) {
    const normalizedSearch = search.trim()

    return useQuery({
        queryKey: exerciseKeys.search(normalizedSearch),

        queryFn: () =>
            getExercises(
                0,
                EXERCISE_SEARCH_PAGE_SIZE,
                normalizedSearch,
            ),

        enabled:
            enabled && normalizedSearch.length > 0,

        staleTime: 60 * 1000,
    })
}