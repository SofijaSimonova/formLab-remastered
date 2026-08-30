import { useQuery } from '@tanstack/react-query'

import { getWorkouts } from '../api/workout.api'
import {workoutKeys} from "../workout.keys";


export function useWorkouts() {
    return useQuery({
        queryKey: workoutKeys.list(),
        queryFn: getWorkouts,
    })
}