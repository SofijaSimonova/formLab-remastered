import { useQuery } from '@tanstack/react-query'

import { getWorkoutSets } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

export function useWorkoutSets(
    workoutSessionId: string,
    workoutExerciseId: string,
) {
    return useQuery({
        queryKey: workoutKeys.sets(
            workoutSessionId,
            workoutExerciseId,
        ),
        queryFn: () =>
            getWorkoutSets(
                workoutSessionId,
                workoutExerciseId,
            ),
        enabled:
            !!workoutSessionId &&
            !!workoutExerciseId,
    })
}