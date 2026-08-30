import { useQuery } from '@tanstack/react-query'

import { getWorkoutById } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'

export function useWorkout(workoutId: string) {
    return useQuery({
        queryKey: workoutKeys.detail(workoutId),
        queryFn: () => getWorkoutById(workoutId),
        enabled: !!workoutId,
    })
}