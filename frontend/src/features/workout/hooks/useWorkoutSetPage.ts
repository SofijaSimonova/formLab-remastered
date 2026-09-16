import {
    useMemo,
    useState,
} from 'react'
import {
    useNavigate,
    useParams,
} from 'react-router-dom'

import { useWorkoutSets } from './useWorkoutSets'
import { useCreateWorkoutSet } from './useCreateWorkoutSet'
import { useWorkoutExercises } from './useWorkoutExercises'
import { useCompleteWorkoutSession } from './useCompleteWorkoutSession'
import { useWorkoutSession } from './useWorkoutSession'
import { useRestTimer } from './useRestTimer'
import { useWorkoutSessionTimer } from './useWorkoutSessionTimer'

import type {
    WorkoutSetResponse,
} from '../types/workout.types'
import {WorkoutSetFormValues} from "../../schemas/workoutSet.schema";


export function useWorkoutSetPage() {
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

    const [
        completedSets,
        setCompletedSets,
    ] = useState<Set<string>>(
        new Set(),
    )

    const {
        data: session,
        isLoading:
            isSessionLoading,
        isError:
            isSessionError,
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
        isLoading:
            isExercisesLoading,
    } = useWorkoutExercises(
        workoutId ?? '',
    )

    const {
        data: sets = [],
        isLoading:
            isSetsLoading,
        isError:
            isSetsError,
    } = useWorkoutSets(
        workoutSessionId ?? '',
        workoutExerciseId ?? '',
    )

    const createSetMutation =
        useCreateWorkoutSet()

    const completeWorkoutSessionMutation =
        useCompleteWorkoutSession()

    const activeExercise =
        useMemo(
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

    const currentExerciseIndex =
        useMemo(
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

    const isWeightBased =
        activeExercise?.trackingType ===
        'WEIGHT'

    const targetSets =
        activeExercise?.targetSets ?? 0

    const completedSetCount =
        currentSets.length

    const progress =
        workoutExercises.length > 0
            ? Math.round(
                ((currentExerciseIndex +
                        1) /
                    workoutExercises.length) *
                100,
            )
            : 0

    async function handleAddSet(
        values: WorkoutSetFormValues,
    ) {
        if (
            !workoutSessionId ||
            !workoutExerciseId
        ) {
            return
        }

        const nextSetNumber =
            currentSets.length + 1

        await createSetMutation.mutateAsync({
            workoutSessionId,
            workoutExerciseId,
            request: {
                setNumber:
                nextSetNumber,

                weight: isWeightBased
                    ? Number(
                        values.weight,
                    )
                    : undefined,

                reps: Number(
                    values.reps,
                ),
            },
        })

        startRestTimer()
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
                sessionId:
                workoutSessionId,
            })

        navigate(
            `/workouts/${workoutId}/session/${workoutSessionId}/complete`,
        )
    }

    function handleSetCompleted(
        setId: string,
    ) {
        setCompletedSets(
            (previous) => {
                const next = new Set(
                    previous,
                )

                if (
                    next.has(setId)
                ) {
                    next.delete(
                        setId,
                    )
                } else {
                    next.add(setId)
                }

                return next
            },
        )
    }

    function navigateToExercise(
        exerciseId: string,
    ) {
        if (
            !workoutId ||
            !workoutSessionId
        ) {
            return
        }

        navigate(
            `/workouts/${workoutId}/session/${workoutSessionId}/exercises/${exerciseId}`,
        )
    }

    function handlePreviousExercise() {
        if (
            currentExerciseIndex <=
            0
        ) {
            return
        }

        const previousExercise =
            workoutExercises[
            currentExerciseIndex -
            1
                ]

        if (!previousExercise) {
            return
        }

        navigateToExercise(
            previousExercise.id,
        )
    }

    function handleNextExercise() {
        if (
            currentExerciseIndex <
            0 ||
            currentExerciseIndex >=
            workoutExercises.length -
            1
        ) {
            return
        }

        const nextExercise =
            workoutExercises[
            currentExerciseIndex +
            1
                ]

        if (!nextExercise) {
            return
        }

        navigateToExercise(
            nextExercise.id,
        )
    }

    return {
        workoutId,
        workoutSessionId,
        workoutExerciseId,

        session,
        isSessionLoading,
        isSessionError,

        elapsedSeconds,

        remainingSeconds,
        startRestTimer,
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

        isCreatingSet:
        createSetMutation.isPending,

        isFinishingWorkout:
        completeWorkoutSessionMutation
            .isPending,
    }
}