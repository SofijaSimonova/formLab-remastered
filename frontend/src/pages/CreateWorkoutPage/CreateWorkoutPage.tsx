import { Link } from 'react-router-dom'

import { WorkoutDetailsForm } from '../../features/workout/components/WorkoutDetailsForm'
import { ExerciseLibraryModal } from '../../features/workout/components/ExerciseLibraryModal'

import './CreateWorkoutPage.css'
import {useCreateWorkoutBuilder} from "../../features/workout/hooks/useCreateWorkoutBuilder";

export function CreateWorkoutPage() {
    const {
        createdWorkoutId,

        isExerciseLibraryOpen,
        setIsExerciseLibraryOpen,

        workoutExercises,
        isWorkoutExercisesLoading,

        exercises,
        isExercisesLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,

        bodyParts,

        search,
        setSearch,

        bodyPartId,
        setBodyPartId,

        totalSets,
        totalReps,

        createWorkout,
        addExercise,
        startWorkout,

        isCreatingWorkout,
        createWorkoutError,
        isStartingWorkout,
    } = useCreateWorkoutBuilder()

    return (
        <main className="create-workout-page">
            <header className="create-workout-page-header">
                <Link
                    to="/me/workouts"
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
                            onClick={() =>
                                void startWorkout()
                            }
                            disabled={
                                isStartingWorkout ||
                                !workoutExercises?.length
                            }
                        >
                            {isStartingWorkout
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
                                isCreatingWorkout
                            }
                        >
                            {isCreatingWorkout
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

                    <WorkoutDetailsForm
                        isSubmitting={
                            isCreatingWorkout
                        }
                        serverError={
                            createWorkoutError
                        }
                        onSubmit={createWorkout}
                    />

                    {createdWorkoutId && (
                        <div className="create-workout-page-field">
                            <label>
                                Target Metrics
                            </label>

                            <div>
                                <strong>
                                    {
                                        workoutExercises?.length ??
                                        0
                                    }
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
                                {
                                    workoutExercises?.length ??
                                    0
                                } Exercises
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
                                    setIsExerciseLibraryOpen(
                                        true,
                                    )
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
                                        key={
                                            workoutExercise.id
                                        }
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
                                                {
                                                    workoutExercise.targetSets ??
                                                    0
                                                }
                                                {' Sets × '}
                                                {
                                                    workoutExercise.targetReps ??
                                                    0
                                                }
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
                                    setIsExerciseLibraryOpen(
                                        true,
                                    )
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
                    isLoading={isExercisesLoading}
                    isFetchingNextPage={
                        isFetchingNextPage
                    }
                    hasNextPage={hasNextPage}
                    bodyParts={bodyParts}
                    workoutExercises={
                        workoutExercises ?? []
                    }
                    onSearchChange={setSearch}
                    onBodyPartChange={
                        setBodyPartId
                    }
                    onLoadMore={() =>
                        void fetchNextPage()
                    }
                    onAdd={addExercise}
                    onClose={() =>
                        setIsExerciseLibraryOpen(
                            false,
                        )
                    }
                />
            )}
        </main>
    )
}