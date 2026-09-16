import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { completeWorkoutSession } from '../api/workout.api'

import { progressKeys } from '../../progress/progress.keys'
import {historyKeys} from "../../history/history.keys";

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

            queryClient.removeQueries({
                queryKey:
                    progressKeys.questions(),
            })

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: progressKeys.data(),
                }),

                queryClient.invalidateQueries({
                    queryKey:
                        progressKeys.personalRecords(),
                }),

                queryClient.invalidateQueries({
                    queryKey: [
                        ...progressKeys.all,
                        'strength',
                    ],
                }),

                queryClient.invalidateQueries({
                    queryKey:
                        progressKeys.metrics(),
                }),

                queryClient.invalidateQueries({
                    queryKey: historyKeys.list(),
                })
            ])
        },
    })
}