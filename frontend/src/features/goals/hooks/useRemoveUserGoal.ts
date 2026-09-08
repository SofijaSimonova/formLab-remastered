import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { removeCurrentUserGoal } from '../api/goal.api'
import { goalKeys } from '../goal.keys'

export function useRemoveUserGoal() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (userGoalId: string) =>
            removeCurrentUserGoal(userGoalId),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: goalKeys.myGoals(),
            })
        },
    })
}