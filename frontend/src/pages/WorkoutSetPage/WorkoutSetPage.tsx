import { WorkoutSetForm } from '../../features/workout/components/WorkoutSetForm'
import { useWorkoutSetPage } from '../../features/workout/hooks/useWorkoutSetPage'
import { LoadingState } from '../../components/LoadingState'

import './WorkoutSetPage.css'
import '../../components/shared.css'

function formatStartedAt(
    value: string,
) {
    return new Intl.DateTimeFormat(
        'en-US',
        {
            hour: '2-digit',
            minute: '2-digit',
        },
    ).format(new Date(value))
}

function formatElapsedTime(
    totalSeconds: number,
) {
    const hours = Math.floor(
        totalSeconds / 3600,
    )

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60,
    )

    const seconds =
        totalSeconds % 60

    return [
        hours,
        minutes,
        seconds,
    ]
        .map((value) =>
            String(value).padStart(
                2,
                '0',
            ),
        )
        .join(':')
}

function formatRestTime(
    totalSeconds: number,
) {
    const minutes = Math.floor(
        totalSeconds / 60,
    )

    const seconds =
        totalSeconds % 60

    return `${String(minutes).padStart(
        2,
        '0',
    )}:${String(seconds).padStart(
        2,
        '0',
    )}`
}

export function WorkoutSetPage() {
    const {
        workoutId,
        workoutSessionId,
        workoutExerciseId,

        session,
        isSessionLoading,
        isSessionError,

        elapsedSeconds,

        remainingSeconds,
        addTime,
        subtractTime,
        skip,

        workoutExercises,
        isExercisesLoading,

        currentSets,
        isSetsLoading,
        isSetsError,

        activeExercise,
        isWeightBased,

        currentExerciseIndex,
        targetSets,
        completedSetCount,
        progress,

        completedSets,

        handleAddSet,
        handleFinishWorkout,
        handleSetCompleted,

        navigateToExercise,
        handlePreviousExercise,
        handleNextExercise,

        isCreatingSet,
        isFinishingWorkout,
    } = useWorkoutSetPage()

    const progressExerciseNumber =
        Math.max(
            currentExerciseIndex + 1,
            0,
        )

    const setsHeaderClassName = [
        'workout-set-sets-header',
        !isWeightBased
            ? 'workout-set-sets-header-reps-only'
            : '',
    ]
        .filter(Boolean)
        .join(' ')

    const setsListClassName = [
        'workout-set-sets-list',
        !isWeightBased
            ? 'workout-set-sets-list-reps-only'
            : '',
    ]
        .filter(Boolean)
        .join(' ')

    if (
        !workoutId ||
        !workoutSessionId ||
        !workoutExerciseId
    ) {
        return (
            <main className="workout-set-page">
                <div className="workout-set-error">
                    Invalid workout session.
                </div>
            </main>
        )
    }

    if (
        isSessionLoading ||
        !session
    ) {
        return (
            <main className="workout-set-page">
                <LoadingState message="Loading workout session..." />
            </main>
        )
    }

    if (
        isSessionError ||
        session.status !==
        'IN_PROGRESS'
    ) {
        return (
            <main className="workout-set-page">
                <div className="workout-set-error">
                    This workout session is no longer active.
                </div>
            </main>
        )
    }

    return (
        <main className="workout-set-page">
            <aside className="workout-set-sidebar">
                <div className="workout-set-sidebar-brand">
                    <span className="workout-set-brand-mark">
                        ↗
                    </span>

                    FORMLAB
                </div>

                <div className="workout-set-progress-section">
                    <span className="workout-set-sidebar-label">
                        WORKOUT PROGRESS
                    </span>

                    <div className="workout-set-progress-header">
                        <strong>
                            {
                                progressExerciseNumber
                            }
                            /
                            {
                                workoutExercises.length
                            }
                        </strong>

                        <span>
                            {progress}%
                        </span>
                    </div>

                    <div className="workout-set-progress-bar">
                        <div
                            className="workout-set-progress-bar-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="workout-set-exercise-list">
                    {isExercisesLoading ? (
                        <div className="workout-set-sidebar-loading">
                            Loading...
                        </div>
                    ) : (
                        workoutExercises.map(
                            (
                                exercise,
                                index,
                            ) => {
                                const isActive =
                                    exercise.id ===
                                    workoutExerciseId

                                const isPrevious =
                                    index <
                                    currentExerciseIndex

                                return (
                                    <button
                                        key={
                                            exercise.id
                                        }
                                        type="button"
                                        className={[
                                            'workout-set-sidebar-exercise',
                                            isActive
                                                ? 'workout-set-sidebar-exercise-active'
                                                : '',
                                            isPrevious
                                                ? 'workout-set-sidebar-exercise-completed'
                                                : '',
                                        ]
                                            .filter(
                                                Boolean,
                                            )
                                            .join(
                                                ' ',
                                            )}
                                        onClick={() =>
                                            navigateToExercise(
                                                exercise.id,
                                            )
                                        }
                                    >
                                        <span className="workout-set-exercise-status">
                                            {isPrevious
                                                ? '✓'
                                                : '○'}
                                        </span>

                                        <span className="workout-set-exercise-sidebar-content">
                                            <span className="workout-set-exercise-sidebar-name">
                                                {
                                                    exercise.exerciseName
                                                }
                                            </span>

                                            <span className="workout-set-exercise-sidebar-meta">
                                                {
                                                    exercise.targetSets
                                                }{' '}
                                                sets
                                            </span>
                                        </span>
                                    </button>
                                )
                            },
                        )
                    )}
                </div>
            </aside>

            <section className="workout-set-main">
                <header className="workout-set-topbar">
                    <div className="workout-set-session-heading">
                        <span className="workout-set-session-label">
                            ACTIVE SESSION:
                        </span>

                        <h1>
                            Workout
                        </h1>

                        <div className="workout-set-session-meta">
                            <span>
                                ◷ Started{' '}
                                {formatStartedAt(
                                    session.startedAt,
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="workout-set-session-actions">
                        <div className="workout-set-session-timer">
                            <span>
                                ◷
                            </span>

                            {formatElapsedTime(
                                elapsedSeconds,
                            )}
                        </div>

                        <button
                            type="button"
                            className="workout-set-finish-button"
                            onClick={() =>
                                void handleFinishWorkout()
                            }
                            disabled={
                                isFinishingWorkout
                            }
                        >
                            ✓ Finish

                            <span>
                                {isFinishingWorkout
                                    ? 'Finishing...'
                                    : 'Workout'}
                            </span>
                        </button>
                    </div>
                </header>

                <section className="workout-set-exercise-card">
                    <div className="workout-set-exercise-card-header">
                        <div>
                            <div className="workout-set-exercise-title-row">
                                <h2>
                                    {activeExercise?.exerciseName ??
                                        'Exercise'}
                                </h2>

                                <span className="workout-set-target-badge">
                                    Target:{' '}
                                    {targetSets}{' '}
                                    sets
                                </span>
                            </div>

                            <p className="workout-set-exercise-description">
                                Focus on controlled movement
                                and proper technique.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="workout-set-technique-button"
                        >
                            ↗ View Technique
                        </button>
                    </div>

                    <div
                        className={
                            setsHeaderClassName
                        }
                    >
                        <span>
                            SET
                        </span>

                        {isWeightBased && (
                            <span>
                                WEIGHT (KG)
                            </span>
                        )}

                        <span>
                            REPS
                        </span>

                        <span>
                            DONE
                        </span>
                    </div>

                    <div
                        className={
                            setsListClassName
                        }
                    >
                        {isSetsLoading ? (
                            <div className="workout-set-sets-loading">
                                Loading sets...
                            </div>
                        ) : isSetsError ? (
                            <div className="workout-set-sets-error">
                                Failed to load sets.
                            </div>
                        ) : currentSets.length ===
                        0 ? (
                            <div className="workout-set-sets-loading">
                                No sets logged yet.
                            </div>
                        ) : (
                            currentSets.map(
                                (set) => {
                                    const isCompleted =
                                        completedSets.has(
                                            set.id,
                                        )

                                    return (
                                        <div
                                            key={
                                                set.id
                                            }
                                            className={[
                                                'workout-set-row',
                                                !isWeightBased
                                                    ? 'workout-set-row-reps-only'
                                                    : '',
                                                isCompleted
                                                    ? 'workout-set-row-completed'
                                                    : '',
                                            ]
                                                .filter(
                                                    Boolean,
                                                )
                                                .join(
                                                    ' ',
                                                )}
                                        >
                                            <span className="workout-set-number">
                                                {
                                                    set.setNumber
                                                }
                                            </span>

                                            {isWeightBased && (
                                                <input
                                                    className="workout-set-input"
                                                    type="number"
                                                    value={
                                                        set.weight ??
                                                        ''
                                                    }
                                                    readOnly
                                                    aria-label={`Set ${set.setNumber} weight`}
                                                />
                                            )}

                                            <input
                                                className="workout-set-input"
                                                type="number"
                                                value={
                                                    set.reps
                                                }
                                                readOnly
                                                aria-label={`Set ${set.setNumber} reps`}
                                            />

                                            <button
                                                type="button"
                                                className="workout-set-done-button"
                                                onClick={() =>
                                                    handleSetCompleted(
                                                        set.id,
                                                    )
                                                }
                                                aria-label={`Mark set ${set.setNumber} as ${
                                                    isCompleted
                                                        ? 'incomplete'
                                                        : 'complete'
                                                }`}
                                            >
                                                ✓
                                            </button>
                                        </div>
                                    )
                                },
                            )
                        )}
                    </div>

                    <WorkoutSetForm
                        isWeightBased={
                            isWeightBased
                        }
                        nextSetNumber={
                            currentSets.length +
                            1
                        }
                        isSubmitting={
                            isCreatingSet
                        }
                        onSubmit={
                            handleAddSet
                        }
                    />
                </section>

                <section
                    className={[
                        'workout-set-rest-timer',
                        remainingSeconds ===
                        0
                            ? 'workout-set-rest-timer-finished'
                            : '',
                    ]
                        .filter(
                            Boolean,
                        )
                        .join(' ')}
                >
                    <div className="workout-set-rest-timer-icon">
                        ⌛
                    </div>

                    <div className="workout-set-rest-timer-info">
                        <span>
                            Rest Timer
                        </span>

                        <strong>
                            {formatRestTime(
                                remainingSeconds,
                            )}
                        </strong>
                    </div>

                    <div className="workout-set-rest-timer-actions">
                        <button
                            type="button"
                            onClick={() =>
                                subtractTime(
                                    30,
                                )
                            }
                            disabled={
                                remainingSeconds ===
                                0
                            }
                        >
                            -30s
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                addTime(30)
                            }
                        >
                            +30s
                        </button>

                        <button
                            type="button"
                            onClick={skip}
                            disabled={
                                remainingSeconds ===
                                0
                            }
                        >
                            Skip
                        </button>
                    </div>
                </section>

                <div className="workout-set-exercise-navigation">
                    <button
                        type="button"
                        disabled={
                            currentExerciseIndex <=
                            0
                        }
                        onClick={
                            handlePreviousExercise
                        }
                    >
                        ← Previous
                    </button>

                    <span>
                        {
                            completedSetCount
                        }{' '}
                        / {targetSets}{' '}
                        sets logged
                    </span>

                    <button
                        type="button"
                        disabled={
                            currentExerciseIndex <
                            0 ||
                            currentExerciseIndex >=
                            workoutExercises.length -
                            1
                        }
                        onClick={
                            handleNextExercise
                        }
                    >
                        Next →
                    </button>
                </div>
            </section>
        </main>
    )
}