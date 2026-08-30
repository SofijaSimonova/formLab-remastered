import { useQuery } from '@tanstack/react-query'

import { getWorkoutSets } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

export function useWorkoutSets(
    workoutExerciseId: string,
) {
    return useQuery({
        queryKey: workoutKeys.sets(workoutExerciseId),
        queryFn: () =>
            getWorkoutSets(workoutExerciseId),
        enabled: !!workoutExerciseId,
    })
}
