import { Navigate, Outlet } from 'react-router-dom'

import { useCurrentUser } from '../user/hooks/useCurrentUser'
import { LoadingState } from '../../components/LoadingState'

import '../../components/shared.css'

export function AdminRoute() {
    const {
        data: user,
        isError,
    } = useCurrentUser()

    if (isError) {
        return (
            <Navigate
                to="/"
                replace
            />
        )
    }

    if (!user) {
        return <LoadingState />
    }

    if (user.role !== 'ADMIN') {
        return (
            <Navigate
                to="/"
                replace
            />
        )
    }

    return <Outlet />
}