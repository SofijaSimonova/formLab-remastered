import { Link, useNavigate, useParams } from 'react-router-dom'

import { useWorkout } from '../../features/workout/hooks/useWorkout'
import { useWorkoutExercises } from '../../features/workout/hooks/useWorkoutExercises'
import { useCreateWorkoutSession } from '../../features/workout/hooks/useCreateWorkoutSession'
import { LoadingState } from '../../components/LoadingState'

import './WorkoutDetailPage.css'
import '../../components/shared.css'

function formatUpdatedAt(value: string) {
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value))
}

export function WorkoutDetailPage() {
    const { workoutId } = useParams<{ workoutId: string }>()
    const navigate = useNavigate()

    const {
        data: workout,
        isLoading: isWorkoutLoading,
        isError: isWorkoutError,
        refetch: refetchWorkout,
    } = useWorkout(workoutId ?? '')

    const {
        data: exercises = [],
        isLoading: isExercisesLoading,
        isError: isExercisesError,
        refetch: refetchExercises,
    } = useWorkoutExercises(workoutId ?? '')

    const createSessionMutation = useCreateWorkoutSession()

    const isLoading = isWorkoutLoading || isExercisesLoading
    const isError = isWorkoutError || isExercisesError
    const firstExercise = exercises[0]

    async function handleStartWorkout() {
        if (!workoutId || !firstExercise) {
            return
        }

        const session =
            await createSessionMutation.mutateAsync(workoutId)

        navigate(
            `/workouts/${workoutId}/session/${session.id}/exercises/${firstExercise.id}`,
        )
    }

    if (isLoading) {
        return (
            <main className="workout-detail-page">
                <LoadingState message="Loading workout..." />
            </main>
        )
    }

    if (isError || !workout) {
        return (
            <main className="workout-detail-page">
                <div className="workout-detail-container">
                    <div className="workout-detail-state workout-detail-state-error">
                        <h1>Unable to load this workout</h1>

                        <p>
                            Check your connection and try again.
                        </p>

                        <div className="workout-detail-error-actions">
                            <button
                                type="button"
                                onClick={() => {
                                    void refetchWorkout()
                                    void refetchExercises()
                                }}
                            >
                                Try again
                            </button>

                            <Link to="/me/workouts">
                                Back to workouts
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="workout-detail-page">
            <div className="workout-detail-container">
                <Link
                    to="/me/workouts"
                    className="workout-detail-back"
                >
                    ← Back to workouts
                </Link>

                <header className="workout-detail-header">
                    <div>
                        <span className="workout-detail-eyebrow">
                            FORMLAB / WORKOUT
                        </span>

                        <h1>{workout.name}</h1>

                        {workout.description && (
                            <p>{workout.description}</p>
                        )}
                    </div>

                    <span className="workout-detail-updated">
                        Updated {formatUpdatedAt(workout.updatedAt)}
                    </span>
                </header>

                <section
                    className="workout-detail-plan"
                    aria-labelledby="workout-plan-title"
                >
                    <div className="workout-detail-section-heading">
                        <div>
                            <span className="workout-detail-section-label">
                                EXERCISE PLAN
                            </span>
                            <h2 id="workout-plan-title">
                                {exercises.length} {exercises.length === 1
                                ? 'exercise'
                                : 'exercises'}
                            </h2>
                        </div>
                    </div>

                    {exercises.length === 0 ? (
                        <div className="workout-detail-empty">
                            No exercises have been added to this workout yet.
                        </div>
                    ) : (
                        <ol className="workout-detail-exercise-list">
                            {exercises.map((exercise) => (
                                <li key={exercise.id}>
                                    <span className="workout-detail-exercise-order">
                                        {exercise.exerciseOrder}
                                    </span>

                                    <div>
                                        <h3>{exercise.exerciseName}</h3>
                                        <p>
                                            {exercise.targetSets ?? 0} sets
                                            {' × '}
                                            {exercise.targetReps ?? 0} reps
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}
                </section>

                <section className="workout-detail-actions">
                    <div>
                        <span className="workout-detail-actions-label">
                            READY TO TRAIN?
                        </span>
                        <p>
                            Start a session and log each set as you go.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="workout-detail-start"
                        onClick={handleStartWorkout}
                        disabled={
                            !firstExercise ||
                            createSessionMutation.isPending
                        }
                    >
                        {createSessionMutation.isPending
                            ? 'Starting...'
                            : 'Start workout'}
                    </button>
                </section>

                {createSessionMutation.isError && (
                    <p className="workout-detail-start-error">
                        We could not start this workout. Please try again.
                    </p>
                )}
            </div>
        </main>
    )
}
