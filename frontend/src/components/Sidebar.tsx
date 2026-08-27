export function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="logo">
                <div className="logo-name">FormLab</div>
                <div className="logo-subtitle">
                    Elite Performance
                </div>
            </div>

            <nav className="nav">
                <button className="nav-link">
                    <span className="nav-icon">▦</span>
                    <span>Dashboard</span>
                </button>

                <button className="nav-link active">
                    <span className="nav-icon">⚒</span>
                    <span>Exercises</span>
                </button>

                <button className="nav-link">
                    <span className="nav-icon">◷</span>
                    <span>Workouts</span>
                </button>

                <button className="nav-link">
                    <span className="nav-icon">⌁</span>
                    <span>Progress</span>
                </button>

                <button className="nav-link">
                    <span className="nav-icon">◴</span>
                    <span>History</span>
                </button>

                <button className="nav-link">
                    <span className="nav-icon">♙</span>
                    <span>Profile</span>
                </button>
            </nav>

            <div className="sidebar-bottom">
                <button className="logout-button">
                    <span className="nav-icon">↪</span>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    )
}