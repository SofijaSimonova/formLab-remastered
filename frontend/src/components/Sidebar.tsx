import { JSX, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../features/auth/AuthContext';
import { useCurrentUser } from '../features/user/hooks/useCurrentUser';

// 1. Explicitly type the structure of our nav configuration items
interface NavItem {
    path: string;
    label: string;
    icon: string;
}

// 2. Type the navigation configuration array
const NAV_ITEMS: NavItem[] = [
    { path: '/exercises', label: 'Exercises', icon: '⚒' },      // Matches your /exercises route
    { path: '/me/workouts', label: 'Workouts', icon: '◷' },    // Matches your /me/workouts route
    { path: '/progress', label: 'Progress', icon: '⌁' },
    { path: '/history', label: 'History', icon: '◴' },
    { path: '/profile', label: 'Profile', icon: '♙' },

];

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'formlab-sidebar-collapsed';

export function Sidebar(): JSX.Element {
    const { logout } = useAuth();
    const { data: currentUser } = useCurrentUser();

    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        try {
            return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true';
        } catch {
            return false;
        }
    });

    function toggleCollapsed(): void {
        setIsCollapsed((previous) => {
            const next = !previous;

            try {
                localStorage.setItem(
                    SIDEBAR_COLLAPSED_STORAGE_KEY,
                    String(next),
                );
            } catch {
                // ignore write failures (e.g. private browsing)
            }

            return next;
        });
    }

    function handleLogout(): void {
        logout();
        window.location.href = '/login';
    }

    return (
        <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="sidebar-top">
                <div className="logo">
                    <div className="logo-name">FormLab</div>
                    <div className="logo-subtitle">Elite Performance</div>
                </div>

                <button
                    type="button"
                    className="sidebar-toggle"
                    onClick={toggleCollapsed}
                    aria-label={
                        isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
                    }
                >
                    {isCollapsed ? '›' : '‹'}
                </button>
            </div>

            <nav className="nav">
                {NAV_ITEMS.map((item: NavItem) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        // Type-safe argument destructuring from React Router
                        className={({ isActive }: { isActive: boolean }): string =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        title={isCollapsed ? item.label : undefined}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}

                {currentUser?.role === 'ADMIN' && (
                    <NavLink
                        to="/admin"
                        className={({ isActive }: { isActive: boolean }): string =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                        title={isCollapsed ? 'Admin' : undefined}
                    >
                        <span className="nav-icon">⚙</span>
                        <span>Admin</span>
                    </NavLink>
                )}
            </nav>

            <div className="sidebar-bottom">
                <button
                    className="logout-button"
                    onClick={handleLogout}
                    title={isCollapsed ? 'Logout' : undefined}
                >
                    <span className="nav-icon">↪</span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
