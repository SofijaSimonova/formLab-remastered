// export function Sidebar() {
//     return (
//         <aside className="sidebar">
//             <div className="logo">
//                 <div className="logo-name">FormLab</div>
//                 <div className="logo-subtitle">
//                     Elite Performance
//                 </div>
//             </div>
//
//             <nav className="nav">
//                 <button className="nav-link">
//                     <span className="nav-icon">▦</span>
//                     <span>Dashboard</span>
//                 </button>
//
//                 <button className="nav-link active">
//                     <span className="nav-icon">⚒</span>
//                     <span>Exercises</span>
//                 </button>
//
//                 <button className="nav-link">
//                     <span className="nav-icon">◷</span>
//                     <span>Workouts</span>
//                 </button>
//
//                 <button className="nav-link">
//                     <span className="nav-icon">⌁</span>
//                     <span>Progress</span>
//                 </button>
//
//                 <button className="nav-link">
//                     <span className="nav-icon">◴</span>
//                     <span>History</span>
//                 </button>
//
//                 <button className="nav-link">
//                     <span className="nav-icon">♙</span>
//                     <span>Profile</span>
//                 </button>
//             </nav>
//
//             <div className="sidebar-bottom">
//                 <button className="logout-button">
//                     <span className="nav-icon">↪</span>
//                     <span>Logout</span>
//                 </button>
//             </div>
//         </aside>
//     )
// }
import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

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

export function Sidebar(): JSX.Element {
    return (
        <aside className="sidebar">
            <div className="logo">
                <div className="logo-name">FormLab</div>
                <div className="logo-subtitle">Elite Performance</div>
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
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <button
                    className="logout-button"
                    onClick={(): void => {
                        // Clear tokens/auth state here
                        window.location.href = '/login';
                    }}
                >
                    <span className="nav-icon">↪</span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}