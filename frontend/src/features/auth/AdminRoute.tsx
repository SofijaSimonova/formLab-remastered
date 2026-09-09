import { Navigate, Outlet } from 'react-router-dom'

import { useCurrentUser } from '../user/hooks/useCurrentUser'

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
        return (
            <div className="loading-state">
                <div className="loading-spinner" />
                <span>Loading...</span>
            </div>
        )
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