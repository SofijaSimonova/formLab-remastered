import { useQuery } from '@tanstack/react-query'

import { getWorkoutSession } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

export function useWorkoutSession(
    workoutId: string,
    workoutSessionId: string,
) {
    return useQuery({
        queryKey: workoutKeys.session(
            workoutId,
            workoutSessionId,
        ),
        queryFn: () =>
            getWorkoutSession(
                workoutId,
                workoutSessionId,
            ),
        enabled: Boolean(
            workoutId && workoutSessionId,
        ),
    })
}