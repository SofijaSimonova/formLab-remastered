import { useMutation } from '@tanstack/react-query'

import { changePassword } from '../authApi'
import {ChangePasswordRequest} from "../types/types";


export function useChangePassword() {
    return useMutation({
        mutationFn: (
            request: ChangePasswordRequest,
        ) => changePassword(request),
    })
}