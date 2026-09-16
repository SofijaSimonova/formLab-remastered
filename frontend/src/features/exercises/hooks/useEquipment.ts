import { useQuery } from '@tanstack/react-query'

import { getEquipment } from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

export function useEquipment() {
    return useQuery({
        queryKey: exerciseKeys.equipment(),
        queryFn: getEquipment,
        staleTime: 10 * 60 * 1000,
    })
}