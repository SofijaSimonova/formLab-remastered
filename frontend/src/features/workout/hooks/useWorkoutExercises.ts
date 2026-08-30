import { useQuery } from '@tanstack/react-query'

import { getWorkoutExercises } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

export function useWorkoutExercises(workoutId: string) {
    return useQuery({
        queryKey: workoutKeys.exercises(workoutId),
        queryFn: () => getWorkoutExercises(workoutId),
        enabled: !!workoutId,
    })
}