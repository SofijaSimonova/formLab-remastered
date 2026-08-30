import { useMutation } from '@tanstack/react-query'

import { register } from '../authApi'
import type { RegisterRequest } from '../types/types'

export function useRegister() {
    return useMutation({
        mutationFn: register,
    })
}