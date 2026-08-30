import { Outlet } from 'react-router-dom'

import { Sidebar } from './Sidebar'

export function ProtectedLayout() {
    return (
        <div className="app">
            <Sidebar />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}