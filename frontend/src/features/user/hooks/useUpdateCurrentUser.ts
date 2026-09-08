import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { updateCurrentUser } from '../api/user.api'
import type { UpdateAppUserRequest } from '../types/user.types'
import { userKeys } from '../user.keys'

export function useUpdateCurrentUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            request: UpdateAppUserRequest,
        ) =>
            updateCurrentUser(request),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: userKeys.me(),
            })
        },
    })
}