import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { completeWorkoutSession } from '../api/workout.api'
import { progressKeys } from '../../progress/progress.keys'

export function useCompleteWorkoutSession() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         workoutId,
                         sessionId,
                     }: {
            workoutId: string
            sessionId: string
        }) =>
            completeWorkoutSession(
                workoutId,
                sessionId,
            ),

        onSuccess: async () => {
            queryClient.removeQueries({
                queryKey: [
                    ...progressKeys.all,
                    'analysis',
                ],
            })

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: progressKeys.data(),
                }),

                queryClient.invalidateQueries({
                    queryKey: progressKeys.personalRecords(),
                }),

                queryClient.invalidateQueries({
                    queryKey: [
                        ...progressKeys.all,
                        'strength',
                    ],
                }),
            ])
        },
    })
}