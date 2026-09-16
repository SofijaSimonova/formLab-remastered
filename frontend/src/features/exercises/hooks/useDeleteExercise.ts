import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {
    deleteExercise,
} from '../api/exercises.api'
import { exerciseKeys } from '../exercise.keys'

export function useDeleteExercise() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (exerciseId: string) =>
            deleteExercise(exerciseId),

        onSuccess: async (
            _data,
            exerciseId,
        ) => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: exerciseKeys.lists(),
                }),
                queryClient.invalidateQueries({
                    queryKey: exerciseKeys.detail(
                        exerciseId,
                    ),
                }),
                queryClient.invalidateQueries({
                    queryKey: [
                        ...exerciseKeys.all,
                        'alternatives',
                    ],
                }),
            ])
        },
    })
}