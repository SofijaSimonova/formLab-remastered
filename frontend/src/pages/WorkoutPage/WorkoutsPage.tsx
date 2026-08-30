import { Link } from 'react-router-dom'

import { useWorkouts } from '../../features/workout/hooks/useWorkouts'

import './WorkoutsPage.css'

export function WorkoutsPage() {
    const {
        data: workouts,
        isLoading,
        isError,
        refetch,
    } = useWorkouts()

    if (isLoading) {
        return (
            <main className="workouts-page">
                <div className="workouts-container">
                    <div className="workouts-heading">
                        <span className="workouts-eyebrow">
                            FORMLAB / TRAINING
                        </span>

                        <h1>Your workouts.</h1>

                        <p>
                            Build and organize your training sessions.
                        </p>
                    </div>

                    <div className="workouts-state">
                        Loading workouts...
                    </div>
                </div>
            </main>
        )
    }

    if (isError) {
        return (
            <main className="workouts-page">
                <div className="workouts-container">
                    <div className="workouts-heading">
                        <span className="workouts-eyebrow">
                            FORMLAB / TRAINING
                        </span>

                        <h1>Your workouts.</h1>

                        <p>
                            Build and organize your training sessions.
                        </p>
                    </div>

                    <div className="workouts-state workouts-state-error">
                        <p>
                            Failed to load your workouts.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="workouts-page">
            <div className="workouts-container">

                <header className="workouts-heading">
                    <div>
                        <span className="workouts-eyebrow">
                            FORMLAB / TRAINING
                        </span>

                        <h1>Your workouts.</h1>

                        <p>
                            Build and organize your training sessions.
                        </p>
                    </div>

                    <Link
                        to="/workouts/new"
                        className="workouts-create-button"
                    >
                        + Create workout
                    </Link>
                </header>

                {!workouts || workouts.length === 0 ? (
                    <section className="workouts-empty">
                        <span className="workouts-empty-eyebrow">
                            NO WORKOUTS
                        </span>

                        <h2>
                            Nothing here yet.
                        </h2>

                        <p>
                            Create your first workout and start building
                            your training system.
                        </p>

                        <Link
                            to="/workouts/new"
                            className="workouts-create-button"
                        >
                            + Create workout
                        </Link>
                    </section>
                ) : (
                    <section className="workouts-grid">
                        {workouts.map((workout) => (
                            <Link
                                key={workout.id}
                                to={`/workouts/${workout.id}`}
                                className="workout-card"
                            >
                                <div className="workout-card-top">
                                    <span className="workout-card-label">
                                        WORKOUT
                                    </span>

                                    <span className="workout-card-arrow">
                                        →
                                    </span>
                                </div>

                                <div className="workout-card-content">
                                    <h2>
                                        {workout.name}
                                    </h2>

                                    {workout.description && (
                                        <p>
                                            {workout.description}
                                        </p>
                                    )}
                                </div>

                                <div className="workout-card-footer">
                                    <span>
                                        {new Date(
                                            workout.updatedAt,
                                        ).toLocaleDateString()}
                                    </span>

                                    <span>
                                        Open workout
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </section>
                )}

            </div>
        </main>
    )
}