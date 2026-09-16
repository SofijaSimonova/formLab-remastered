import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



import { useBodyParts } from '../../exercises/hooks/useBodyParts'
import { useExercises } from '../../exercises/hooks/useExercises'

import type { ExerciseListResponse } from '../../exercises/types/exercise.types'
import type { WorkoutExerciseResponse } from '../types/workout.types'

import { useDebounce } from '../../../hooks/useDebounce'


import type { WorkoutDetailsFormValues } from '../../schemas/workout.schema'
import {useCreateWorkout} from "./useCreateWorkout";
import {useAddWorkoutExercise} from "./useAddWorkoutExercise";
import {useCreateWorkoutSession} from "./useCreateWorkoutSession";
import {useWorkoutExercises} from "./useWorkoutExercises";
import {SEARCH_DEBOUNCE_MS} from "../../../constraints/app.constants";

export function useCreateWorkoutBuilder() {
    const navigate = useNavigate()

    const createWorkoutMutation =
        useCreateWorkout()

    const addWorkoutExerciseMutation =
        useAddWorkoutExercise()

    const createWorkoutSessionMutation =
        useCreateWorkoutSession()

    const [
        createdWorkoutId,
        setCreatedWorkoutId,
    ] = useState<string | null>(null)

    const [
        isExerciseLibraryOpen,
        setIsExerciseLibraryOpen,
    ] = useState(false)

    const [search, setSearch] = useState('')

    const [
        bodyPartId,
        setBodyPartId,
    ] = useState<string | undefined>()

    const debouncedSearch = useDebounce(
        search,
        SEARCH_DEBOUNCE_MS,
    )

    const workoutExercisesQuery =
        useWorkoutExercises(
            createdWorkoutId ?? '',
        )

    const exercisesQuery = useExercises(
        debouncedSearch.trim() || undefined,
        bodyPartId,
    )

    const bodyPartsQuery = useBodyParts()

    const exercises =
        exercisesQuery.data?.pages.flatMap(
            (page) => page.content,
        ) ?? []

    const workoutExercises:
        | WorkoutExerciseResponse[]
        | undefined =
        workoutExercisesQuery.data

    async function createWorkout(
        values: WorkoutDetailsFormValues,
    ): Promise<void> {
        const workout =
            await createWorkoutMutation.mutateAsync({
                name: values.name.trim(),
                description:
                    values.description.trim() ||
                    undefined,
            })

        setCreatedWorkoutId(workout.id)
    }

    async function addExercise(
        exercise: ExerciseListResponse,
        targetSets: number,
        targetReps: number,
    ): Promise<void> {
        if (!createdWorkoutId) {
            return
        }

        const nextOrder =
            (workoutExercises?.length ?? 0) + 1

        await addWorkoutExerciseMutation.mutateAsync({
            workoutId: createdWorkoutId,
            request: {
                exerciseId: exercise.id,
                exerciseOrder: nextOrder,
                targetSets,
                targetReps,
            },
        })
    }

    async function startWorkout(): Promise<void> {
        if (
            !createdWorkoutId ||
            !workoutExercises?.length
        ) {
            return
        }

        const firstWorkoutExercise =
            workoutExercises[0]

        const session =
            await createWorkoutSessionMutation.mutateAsync(
                createdWorkoutId,
            )

        navigate(
            `/workouts/${createdWorkoutId}/session/${session.id}/exercises/${firstWorkoutExercise.id}`,
        )
    }

    const totalSets =
        workoutExercises?.reduce(
            (total, exercise) =>
                total +
                (exercise.targetSets ?? 0),
            0,
        ) ?? 0

    const totalReps =
        workoutExercises?.reduce(
            (total, exercise) =>
                total +
                (exercise.targetSets ?? 0) *
                (exercise.targetReps ?? 0),
            0,
        ) ?? 0

    return {
        createdWorkoutId,

        isExerciseLibraryOpen,
        setIsExerciseLibraryOpen,

        workoutExercises,

        isWorkoutExercisesLoading:
        workoutExercisesQuery.isPending,

        exercises,

        isExercisesLoading:
        exercisesQuery.isPending,

        isFetchingNextPage:
        exercisesQuery.isFetchingNextPage,

        hasNextPage:
            !!exercisesQuery.hasNextPage,

        fetchNextPage:
        exercisesQuery.fetchNextPage,

        bodyParts:
            bodyPartsQuery.data ?? [],

        search,
        setSearch,

        bodyPartId,
        setBodyPartId,

        totalSets,
        totalReps,

        createWorkout,
        addExercise,
        startWorkout,

        isCreatingWorkout:
        createWorkoutMutation.isPending,

        createWorkoutError:
        createWorkoutMutation.isError,

        isStartingWorkout:
        createWorkoutSessionMutation.isPending,
    }
}