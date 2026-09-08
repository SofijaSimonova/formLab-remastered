import { Link, useParams } from 'react-router-dom'

import { useWorkoutSessionSummary } from '../../features/workout/hooks/useWorkoutSessionSummary'

import './WorkoutCompletePage.css'

function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes < 60) {
        return `${minutes}m`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return `${hours}h ${remainingMinutes}m`
}

function formatVolume(volume: number) {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
    }).format(volume)
}

export function WorkoutCompletePage() {
    const { workoutId, workoutSessionId } = useParams<{
        workoutId: string
        workoutSessionId: string
    }>()

    const {
        data: summary,
        isLoading,
        isError,
    } = useWorkoutSessionSummary(
        workoutId ?? '',
        workoutSessionId ?? '',
    )

    if (isLoading) {
        return (
            <main className="workout-complete-page">
                <div className="workout-complete-loading">
                    Loading workout summary...
                </div>
            </main>
        )
    }

    if (isError || !summary) {
        return (
            <main className="workout-complete-page">
                <div className="workout-complete-error">
                    <h1>
                        Unable to load workout summary
                    </h1>

                    <Link to="/me/workouts">
                        Back to Workouts
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="workout-complete-page">
            <div className="workout-complete-container">

                <header className="workout-complete-header">
                    <div className="workout-complete-icon">
                        ✓
                    </div>

                    <h1>
                        Workout Complete!
                    </h1>

                    <p>
                        {summary.workoutName}
                    </p>
                </header>

                <section className="workout-complete-summary-stats">

                    <div className="workout-complete-summary-stat">
                        <span className="workout-complete-summary-stat-label">
                            DURATION
                        </span>

                        <strong>
                            {formatDuration(
                                summary.durationSeconds,
                            )}
                        </strong>
                    </div>

                    <div className="workout-complete-summary-stat">
                        <span className="workout-complete-summary-stat-label">
                            EXERCISES
                        </span>

                        <strong>
                            {summary.exerciseCount}
                        </strong>
                    </div>

                    <div className="workout-complete-summary-stat">
                        <span className="workout-complete-summary-stat-label">
                            TOTAL VOLUME
                        </span>

                        <strong>
                            {formatVolume(
                                summary.totalVolume,
                            )}
                            <small> kg</small>
                        </strong>
                    </div>

                    <div className="workout-complete-summary-stat">
                        <span className="workout-complete-summary-stat-label">
                            TOTAL SETS
                        </span>

                        <strong>
                            {summary.totalSets}
                        </strong>
                    </div>

                </section>

                <section className="workout-complete-exercise-breakdown">

                    <div className="workout-complete-section-title">
                        EXERCISE BREAKDOWN
                    </div>

                    <div className="workout-complete-exercise-list">

                        {[...summary.exercises]
                            .sort(
                                (a, b) =>
                                    a.exerciseOrder -
                                    b.exerciseOrder,
                            )
                            .map((exercise, index) => (
                                <article
                                    key={
                                        exercise.workoutExerciseId
                                    }
                                    className="workout-complete-summary-exercise"
                                >
                                    <div className="workout-complete-exercise-number">
                                        {index + 1}
                                    </div>

                                    <div className="workout-complete-exercise-info">
                                        <h2>
                                            {exercise.exerciseName}
                                        </h2>

                                        <div className="workout-complete-best-set">
                                            <span>
                                                Best Set:
                                            </span>

                                            <strong>
                                                {exercise.bestSetWeight != null
                                                    ? `${exercise.bestSetWeight}kg`
                                                    : '—'}
                                                {' × '}
                                                {exercise.bestSetReps ?? '—'}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="workout-complete-sets-total">
                                        {exercise.totalSets}
                                        {' '}
                                        Sets Total
                                    </div>
                                </article>
                            ))}
                    </div>

                </section>

                <div className="workout-complete-actions">
                    <Link
                        to="/me/workouts"
                        className="workout-complete-back-workouts-button"
                    >
                        Back to Workouts
                    </Link>
                </div>

            </div>
        </main>
    )
}