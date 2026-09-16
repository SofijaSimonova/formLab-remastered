import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getWorkoutById } from '../api/workout.api'
import { workoutKeys } from '../workout.keys'
import type { WorkoutResponse } from '../types/workout.types'

export function useWorkout(workoutId: string) {
    const queryClient = useQueryClient()

    const workouts =
        queryClient.getQueryData<WorkoutResponse[]>(
            workoutKeys.list(),
        )

    const cachedWorkout = workouts?.find(
        (workout) => workout.id === workoutId,
    )

    const listQueryState =
        queryClient.getQueryState<WorkoutResponse[]>(
            workoutKeys.list(),
        )

    return useQuery({
        queryKey: workoutKeys.detail(workoutId),
        queryFn: () => getWorkoutById(workoutId),
        enabled: !!workoutId,
        initialData: cachedWorkout,
        initialDataUpdatedAt:
            cachedWorkout
                ? listQueryState?.dataUpdatedAt
                : undefined,
    })
}