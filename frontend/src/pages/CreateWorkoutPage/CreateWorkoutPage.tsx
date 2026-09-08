import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link } from 'react-router-dom'

import { useCreateWorkout } from '../../features/workout/hooks/useCreateWorkout'
import { useAddWorkoutExercise } from '../../features/workout/hooks/useAddWorkoutExercise'
import { useWorkoutExercises } from '../../features/workout/hooks/useWorkoutExercises'

import { useExercises } from '../../features/exercises/hooks/useExercises'
import { useBodyParts } from '../../features/exercises/hooks/useBodyParts'

import { useDebounce } from '../../hooks/useDebounce'

import type { ExerciseListResponse } from '../../features/exercises/types/exercise.types'

import { ExerciseLibraryModal } from '../../features/workout/components/ExerciseLibraryModal'
import { useNavigate } from 'react-router-dom'
import { useCreateWorkoutSession } from '../../features/workout/hooks/useCreateWorkoutSession'
import './CreateWorkoutPage.css'


export function CreateWorkoutPage() {
    const createWorkoutMutation = useCreateWorkout()
    const addWorkoutExerciseMutation = useAddWorkoutExercise()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [createdWorkoutId, setCreatedWorkoutId] =
        useState<string | null>(null)

    const [isExerciseLibraryOpen, setIsExerciseLibraryOpen] =
        useState(false)

    const [search, setSearch] = useState('')
    const [bodyPartId, setBodyPartId] =
        useState<string | undefined>()

    const debouncedSearch = useDebounce(search, 300)

    const {
        data: workoutExercises,
        isLoading: isWorkoutExercisesLoading,
    } = useWorkoutExercises(
        createdWorkoutId ?? '',
    )

    const {
        data: exercisePages,
        isLoading: isExercisesLoading,
        isFetching: isFetchingExercises,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useExercises(
        debouncedSearch || undefined,
        bodyPartId,
    )

    const {
        data: bodyParts,
    } = useBodyParts()

    const exercises =
        exercisePages?.pages.flatMap(
            (page) => page.content,
        ) ?? []


    const navigate = useNavigate()

    const createWorkoutSessionMutation =
        useCreateWorkoutSession()


    async function handleCreateWorkout(
        event: SubmitEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        if (!name.trim()) {
            return
        }

        const workout =
            await createWorkoutMutation.mutateAsync({
                name: name.trim(),
                description:
                    description.trim() || undefined,
            })

        setCreatedWorkoutId(workout.id)
    }


    async function handleAddExercise(
        exercise: ExerciseListResponse,
        targetSets: number,
        targetReps: number,
    ) {
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

        /*
         * Keep the library open so the modal can confirm the
         * save and the user can add or update another exercise.
         */
    }

    async function handleStartWorkout() {
        if (!createdWorkoutId || !workoutExercises?.length) {
            return
        }

        const firstWorkoutExercise = workoutExercises[0]

        const session =
            await createWorkoutSessionMutation.mutateAsync(
                createdWorkoutId,
            )

        navigate(
            `/workouts/${createdWorkoutId}/session/${session.id}/exercises/${firstWorkoutExercise.id}`,
        )
    }


    function handleSearchChange(
        value: string,
    ) {
        setSearch(value)
    }


    function handleBodyPartChange(
        value: string | undefined,
    ) {
        setBodyPartId(value)
    }


    const totalSets =
        workoutExercises?.reduce(
            (total, exercise) =>
                total + (exercise.targetSets ?? 0),
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


    return (
        <main className="create-workout-page">

            <header className="create-workout-page-header">

                <Link
                    to="/workouts"
                    className="create-workout-page-back"
                    aria-label="Back to workouts"
                >
                    ←
                </Link>

                <h1>
                    Create New Workout
                </h1>

                <div className="create-workout-page-actions">

                    <Link
                        to="/workouts"
                        className="create-workout-page-discard"
                    >
                        Discard
                    </Link>

                    {createdWorkoutId && (
                        <button
                            type="button"
                            className="create-workout-page-save"
                            onClick={handleStartWorkout}
                            disabled={
                                createWorkoutSessionMutation.isPending ||
                                !workoutExercises?.length
                            }
                        >
                            {createWorkoutSessionMutation.isPending
                                ? 'Starting...'
                                : 'Start Workout'}
                        </button>
                    )}

                    {!createdWorkoutId && (
                        <button
                            type="submit"
                            form="create-workout-form"
                            className="create-workout-page-save"
                            disabled={
                                createWorkoutMutation.isPending ||
                                !name.trim()
                            }
                        >
                            {createWorkoutMutation.isPending
                                ? 'Creating...'
                                : 'Save Workout'}
                        </button>
                    )}

                </div>

            </header>


            <div className="create-workout-page-main">

                <section className="create-workout-page-card">

                    <h2>
                        Workout Details
                    </h2>


                    <form
                        id="create-workout-form"
                        onSubmit={handleCreateWorkout}
                    >

                        <div className="create-workout-page-field">

                            <label htmlFor="workout-name">
                                Workout name
                            </label>

                            <input
                                id="workout-name"
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Upper Body"
                                maxLength={150}
                            />

                        </div>


                        <div className="create-workout-page-field">

                            <label htmlFor="workout-description">
                                Description
                            </label>

                            <textarea
                                id="workout-description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(
                                        event.target.value,
                                    )
                                }
                                placeholder="Describe your workout..."
                                rows={5}
                            />

                        </div>


                        {createWorkoutMutation.isError && (
                            <div className="create-workout-page-error">
                                Failed to create workout.
                                Please try again.
                            </div>
                        )}

                    </form>


                    {createdWorkoutId && (
                        <div className="create-workout-page-field">

                            <label>
                                Target Metrics
                            </label>

                            <div>
                                <strong>
                                    {workoutExercises?.length ?? 0}
                                </strong>
                                {' exercises · '}

                                <strong>
                                    {totalSets}
                                </strong>
                                {' target sets · '}

                                <strong>
                                    {totalReps}
                                </strong>
                                {' target reps'}
                            </div>

                        </div>
                    )}

                </section>


                <section className="create-workout-page-sequence">

                    <div className="create-workout-page-sequence-header">

                        <div>
                            <h2>
                                Exercise Sequence
                            </h2>

                            <p>
                                Add exercises from your library
                                and build the execution order.
                            </p>
                        </div>

                        {createdWorkoutId && (
                            <span>
                                {workoutExercises?.length ?? 0} Exercises
                            </span>
                        )}

                    </div>


                    {!createdWorkoutId ? (

                        <div className="create-workout-page-empty">

                            <div className="create-workout-page-empty-icon">
                                +
                            </div>

                            <h3>
                                Create the workout first.
                            </h3>

                            <p>
                                Save your workout details and then
                                start adding exercises to the sequence.
                            </p>

                        </div>

                    ) : isWorkoutExercisesLoading ? (

                        <div className="create-workout-page-empty">

                            <div className="create-workout-page-empty-icon">
                                ...
                            </div>

                            <h3>
                                Loading sequence...
                            </h3>

                            <p>
                                Getting the exercises for this workout.
                            </p>

                        </div>

                    ) : !workoutExercises ||
                    workoutExercises.length === 0 ? (

                        <div className="create-workout-page-empty">

                            <div className="create-workout-page-empty-icon">
                                +
                            </div>

                            <h3>
                                Build your sequence.
                            </h3>

                            <p>
                                Add exercises from the FormLab
                                exercise library.
                            </p>

                            <button
                                type="button"
                                className="create-workout-page-add-exercise"
                                onClick={() =>
                                    setIsExerciseLibraryOpen(true)
                                }
                            >
                                + Add Exercise
                            </button>

                        </div>

                    ) : (

                        <>

                            {workoutExercises.map(
                                (workoutExercise) => (
                                    <article
                                        key={workoutExercise.id}
                                    >

                                        <div>
                                            <span>
                                                {String(
                                                    workoutExercise.exerciseOrder,
                                                ).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </div>

                                        <div>
                                            <h3>
                                                {
                                                    workoutExercise.exerciseName
                                                }
                                            </h3>

                                            <p>
                                                {workoutExercise.targetSets ?? 0}
                                                {' Sets × '}
                                                {workoutExercise.targetReps ?? 0}
                                                {' Reps'}
                                            </p>
                                        </div>

                                    </article>
                                ),
                            )}

                            <button
                                type="button"
                                className="create-workout-page-add-exercise"
                                onClick={() =>
                                    setIsExerciseLibraryOpen(true)
                                }
                            >
                                + Add Exercise from Library
                            </button>

                        </>

                    )}

                </section>

            </div>


            {isExerciseLibraryOpen && (
                <ExerciseLibraryModal

                    exercises={exercises}

                    isLoading={
                        isExercisesLoading ||
                        isFetchingExercises
                    }

                    isFetchingNextPage={
                        isFetchingNextPage
                    }

                    hasNextPage={
                        !!hasNextPage
                    }

                    bodyParts={
                        bodyParts ?? []
                    }

                    workoutExercises={
                        workoutExercises ?? []
                    }

                    onSearchChange={
                        handleSearchChange
                    }

                    onBodyPartChange={
                        handleBodyPartChange
                    }

                    onLoadMore={() =>
                        fetchNextPage()
                    }

                    onAdd={
                        handleAddExercise
                    }

                    onClose={() =>
                        setIsExerciseLibraryOpen(false)
                    }

                />
            )}

        </main>
    )
}