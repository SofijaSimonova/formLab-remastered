import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useWorkoutSets } from '../../features/workout/hooks/useWorkoutSets'
import { useCreateWorkoutSet } from '../../features/workout/hooks/useCreateWorkoutSet'
import { useWorkoutExercises } from '../../features/workout/hooks/useWorkoutExercises'
import { useCompleteWorkoutSession } from '../../features/workout/hooks/useCompleteWorkoutSession'
import { useWorkoutSession } from '../../features/workout/hooks/useWorkoutSession'
import { useRestTimer } from '../../features/workout/hooks/useRestTimer'

import type { WorkoutSetResponse } from '../../features/workout/types/workout.types'

import './WorkoutSetPage.css'


function formatStartedAt(value: string) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value))
}


function formatElapsedTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor(
        (totalSeconds % 3600) / 60,
    )
    const seconds = totalSeconds % 60

    return [
        hours,
        minutes,
        seconds,
    ]
        .map((value) =>
            String(value).padStart(2, '0'),
        )
        .join(':')
}


function useWorkoutSessionTimer(
    startedAt: string | undefined,
) {
    const [elapsedSeconds, setElapsedSeconds] =
        useState(0)

    useEffect(() => {
        if (!startedAt) {
            setElapsedSeconds(0)
            return
        }

        const startedAtMs =
            new Date(startedAt).getTime()

        if (Number.isNaN(startedAtMs)) {
            setElapsedSeconds(0)
            return
        }

        const updateElapsed = () => {
            const elapsed = Math.max(
                0,
                Math.floor(
                    (Date.now() - startedAtMs) / 1000,
                ),
            )

            setElapsedSeconds(elapsed)
        }

        updateElapsed()

        const intervalId = window.setInterval(
            updateElapsed,
            1000,
        )

        return () => {
            window.clearInterval(intervalId)
        }
    }, [startedAt])

    return elapsedSeconds
}


function formatRestTime(totalSeconds: number) {
    const minutes = Math.floor(
        totalSeconds / 60,
    )

    const seconds = totalSeconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
        seconds,
    ).padStart(2, '0')}`
}


export function WorkoutSetPage() {
    const navigate = useNavigate()

    const {
        workoutId,
        workoutSessionId,
        workoutExerciseId,
    } = useParams<{
        workoutId: string
        workoutSessionId: string
        workoutExerciseId: string
    }>()

    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [completedSets, setCompletedSets] =
        useState<Set<string>>(new Set())

    const addSetInputRef =
        useRef<HTMLInputElement>(null)

    const {
        data: session,
        isLoading: isSessionLoading,
        isError: isSessionError,
    } = useWorkoutSession(
        workoutId ?? '',
        workoutSessionId ?? '',
    )

    const elapsedSeconds =
        useWorkoutSessionTimer(
            session?.startedAt,
        )

    const {
        remainingSeconds,
        start: startRestTimer,
        addTime,
        subtractTime,
        skip,
    } = useRestTimer()

    const {
        data: workoutExercises = [],
        isLoading: isExercisesLoading,
    } = useWorkoutExercises(
        workoutId ?? '',
    )

    const {
        data: sets = [],
        isLoading: isSetsLoading,
        isError: isSetsError,
    } = useWorkoutSets(
        workoutSessionId ?? '',
        workoutExerciseId ?? '',
    )

    const createSetMutation =
        useCreateWorkoutSet()

    const activeExercise = useMemo(
        () =>
            workoutExercises.find(
                (exercise) =>
                    exercise.id ===
                    workoutExerciseId,
            ),
        [
            workoutExercises,
            workoutExerciseId,
        ],
    )

    const isWeightBased =
        activeExercise?.trackingType === 'WEIGHT'

    const currentExerciseIndex = useMemo(
        () =>
            workoutExercises.findIndex(
                (exercise) =>
                    exercise.id ===
                    workoutExerciseId,
            ),
        [
            workoutExercises,
            workoutExerciseId,
        ],
    )

    const currentSets =
        sets as WorkoutSetResponse[]

    const targetSets =
        activeExercise?.targetSets ?? 0

    const completedSetCount =
        currentSets.length

    const progress =
        workoutExercises.length > 0
            ? Math.round(
                ((currentExerciseIndex + 1) /
                    workoutExercises.length) *
                100,
            )
            : 0

    const completeWorkoutSessionMutation =
        useCompleteWorkoutSession()

    async function handleAddSet() {
        if (
            !workoutSessionId ||
            !workoutExerciseId ||
            !reps.trim()
        ) {
            return
        }

        if (
            isWeightBased &&
            !weight.trim()
        ) {
            return
        }

        const nextSetNumber =
            currentSets.length + 1

        await createSetMutation.mutateAsync({
            workoutSessionId,
            workoutExerciseId,
            request: {
                setNumber: nextSetNumber,
                weight: isWeightBased
                    ? Number(weight)
                    : undefined,
                reps: Number(reps),
            },
        })

        startRestTimer()

        setWeight('')
        setReps('')
    }

    async function handleFinishWorkout() {
        if (
            !workoutId ||
            !workoutSessionId
        ) {
            return
        }

        await completeWorkoutSessionMutation
            .mutateAsync({
                workoutId,
                sessionId: workoutSessionId,
            })

        navigate(
            `/workouts/${workoutId}/session/${workoutSessionId}/complete`,
        )
    }

    function handleSetCompleted(
        setId: string,
    ) {
        setCompletedSets((previous) => {
            const next = new Set(previous)

            if (next.has(setId)) {
                next.delete(setId)
            } else {
                next.add(setId)
            }

            return next
        })
    }

    function handlePreviousExercise() {
        if (currentExerciseIndex <= 0) {
            return
        }

        const previousExercise =
            workoutExercises[
            currentExerciseIndex - 1
                ]

        navigate(
            `/workouts/${workoutId}/session/${workoutSessionId}/exercises/${previousExercise.id}`,
        )
    }

    function handleNextExercise() {
        if (
            currentExerciseIndex < 0 ||
            currentExerciseIndex >=
            workoutExercises.length - 1
        ) {
            return
        }

        const nextExercise =
            workoutExercises[
            currentExerciseIndex + 1
                ]

        navigate(
            `/workouts/${workoutId}/session/${workoutSessionId}/exercises/${nextExercise.id}`,
        )
    }

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
                <div className="workout-set-error">
                    Loading workout session...
                </div>
            </main>
        )
    }

    if (
        isSessionError ||
        session.status !== 'IN_PROGRESS'
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

            {/* SIDEBAR */}

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
                            {Math.max(
                                currentExerciseIndex + 1,
                                0,
                            )}
                            /
                            {workoutExercises.length}
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
                            (exercise, index) => {

                                const isActive =
                                    exercise.id ===
                                    workoutExerciseId

                                const isPrevious =
                                    index <
                                    currentExerciseIndex

                                return (
                                    <button
                                        key={exercise.id}
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
                                            .filter(Boolean)
                                            .join(' ')}
                                        onClick={() =>
                                            navigate(
                                                `/workouts/${workoutId}/session/${workoutSessionId}/exercises/${exercise.id}`,
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


            {/* MAIN */}

            <section className="workout-set-main">

                {/* HEADER */}

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
                            <span>◷</span>

                            {formatElapsedTime(
                                elapsedSeconds,
                            )}
                        </div>

                        <button
                            type="button"
                            className="workout-set-finish-button"
                            onClick={
                                handleFinishWorkout
                            }
                            disabled={
                                completeWorkoutSessionMutation
                                    .isPending
                            }
                        >
                            ✓ Finish

                            <span>
                                {
                                    completeWorkoutSessionMutation
                                        .isPending
                                        ? 'Finishing...'
                                        : 'Workout'
                                }
                            </span>
                        </button>

                    </div>

                </header>


                {/* ACTIVE EXERCISE */}

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
                                    {targetSets} sets
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


                    {/* SET HEADER */}

                    <div
                        className={[
                            'workout-set-sets-header',
                            !isWeightBased
                                ? 'workout-set-sets-header-reps-only'
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
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


                    {/* SETS */}

                    <div
                        className={[
                            'workout-set-sets-list',
                            !isWeightBased
                                ? 'workout-set-sets-list-reps-only'
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >

                        {isSetsLoading ? (
                            <div className="workout-set-sets-loading">
                                Loading sets...
                            </div>
                        ) : isSetsError ? (
                            <div className="workout-set-sets-error">
                                Failed to load sets.
                            </div>
                        ) : currentSets.length === 0 ? (
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
                                            key={set.id}
                                            className={[
                                                'workout-set-row',
                                                !isWeightBased
                                                    ? 'workout-set-row-reps-only'
                                                    : '',
                                                isCompleted
                                                    ? 'workout-set-row-completed'
                                                    : '',
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
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
                                                />
                                            )}

                                            <input
                                                className="workout-set-input"
                                                type="number"
                                                value={
                                                    set.reps
                                                }
                                                readOnly
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


                    {/* ADD SET */}

                    <div
                        className={[
                            'workout-set-add-form',
                            !isWeightBased
                                ? 'workout-set-add-form-reps-only'
                                : '',
                        ]
                            .filter(Boolean)
                            .join(' ')}
                    >

                        <span className="workout-set-next-set-number">
                            {currentSets.length + 1}
                        </span>

                        {isWeightBased && (
                            <input
                                ref={addSetInputRef}
                                className="workout-set-input"
                                type="number"
                                min="0"
                                step="0.5"
                                placeholder="Weight"
                                value={weight}
                                onChange={(event) =>
                                    setWeight(
                                        event.target.value,
                                    )
                                }
                            />
                        )}

                        <input
                            ref={
                                isWeightBased
                                    ? undefined
                                    : addSetInputRef
                            }
                            className="workout-set-input"
                            type="number"
                            min="1"
                            placeholder="Reps"
                            value={reps}
                            onChange={(event) =>
                                setReps(
                                    event.target.value,
                                )
                            }
                        />

                        <button
                            type="button"
                            className="workout-set-save-button"
                            disabled={
                                createSetMutation.isPending ||
                                !reps.trim() ||
                                (
                                    isWeightBased &&
                                    !weight.trim()
                                )
                            }
                            onClick={handleAddSet}
                        >
                            {createSetMutation.isPending
                                ? '...'
                                : 'Add'}
                        </button>

                    </div>


                    <button
                        type="button"
                        className="workout-set-add-button"
                        onClick={() =>
                            addSetInputRef.current?.focus()
                        }
                    >
                        + Add Set
                    </button>

                </section>


                {/* REST TIMER */}

                <section
                    className={[
                        'workout-set-rest-timer',
                        remainingSeconds === 0
                            ? 'workout-set-rest-timer-finished'
                            : '',
                    ]
                        .filter(Boolean)
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
                                subtractTime(30)
                            }
                            disabled={
                                remainingSeconds === 0
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
                                remainingSeconds === 0
                            }
                        >
                            Skip
                        </button>

                    </div>

                </section>


                {/* NAVIGATION */}

                <div className="workout-set-exercise-navigation">

                    <button
                        type="button"
                        disabled={
                            currentExerciseIndex <= 0
                        }
                        onClick={
                            handlePreviousExercise
                        }
                    >
                        ← Previous
                    </button>

                    <span>
                        {completedSetCount} / {targetSets}{' '}
                        sets logged
                    </span>

                    <button
                        type="button"
                        disabled={
                            currentExerciseIndex < 0 ||
                            currentExerciseIndex >=
                            workoutExercises.length - 1
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