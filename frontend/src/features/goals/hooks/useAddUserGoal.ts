import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { addCurrentUserGoal } from '../api/goal.api'
import type { AddUserGoalRequest } from '../types/goal.types'
import { goalKeys } from '../goal.keys'

export function useAddUserGoal() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            request: AddUserGoalRequest,
        ) =>
            addCurrentUserGoal(request),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: goalKeys.myGoals(),
            })
        },
    })
}