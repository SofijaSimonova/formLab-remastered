import { useQuery } from '@tanstack/react-query'

import { getWorkoutSessionSummary } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

export function useWorkoutSessionSummary(
    workoutId: string,
    workoutSessionId: string,
) {
    return useQuery({
        queryKey: workoutKeys.summary(
            workoutId,
            workoutSessionId,
        ),

        queryFn: () =>
            getWorkoutSessionSummary(
                workoutId,
                workoutSessionId,
            ),

        enabled:
            !!workoutId &&
            !!workoutSessionId,
    })
}