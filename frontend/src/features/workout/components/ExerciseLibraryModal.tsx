import { useState } from 'react'

import type { ExerciseListResponse } from '../../exercises/types/exercise.types'

import './ExerciseLibraryModal.css'

interface ExerciseLibraryModalProps {
    exercises: ExerciseListResponse[]
    isLoading: boolean
    isFetchingNextPage: boolean
    hasNextPage: boolean

    bodyParts: {
        id: string
        name: string
    }[]

    onSearchChange: (search: string) => void
    onBodyPartChange: (bodyPartId: string | undefined) => void
    onLoadMore: () => void

    onAdd: (
        exercise: ExerciseListResponse,
        targetSets: number,
        targetReps: number,
    ) => Promise<void>

    onClose: () => void
}

export function ExerciseLibraryModal({
                                         exercises,
                                         isLoading,
                                         isFetchingNextPage,
                                         hasNextPage,
                                         bodyParts,
                                         onSearchChange,
                                         onBodyPartChange,
                                         onLoadMore,
                                         onAdd,
                                         onClose,
                                     }: ExerciseLibraryModalProps) {
    const [search, setSearch] = useState('')

    const [targetSets, setTargetSets] = useState(3)
    const [targetReps, setTargetReps] = useState(8)

    function handleSearchChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const value = event.target.value

        setSearch(value)
        onSearchChange(value)
    }

    function handleBodyPartChange(
        event: React.ChangeEvent<HTMLSelectElement>,
    ) {
        const value = event.target.value || undefined

        onBodyPartChange(value)
    }

    async function handleAdd(
        exercise: ExerciseListResponse,
    ) {
        await onAdd(
            exercise,
            targetSets,
            targetReps,
        )
    }

    return (
        <div
            className="exercise-library-overlay"
            onMouseDown={onClose}
        >
            <div
                className="exercise-library-modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <header className="exercise-library-header">
                    <div>
                        <span className="exercise-library-eyebrow">
                            FORMLAB / EXERCISE LIBRARY
                        </span>

                        <h2>
                            Add exercise
                        </h2>

                        <p>
                            Choose an exercise and define its target.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="exercise-library-close"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </header>

                <div className="exercise-library-controls">
                    <div className="exercise-library-search">
                        <span>⌕</span>

                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search exercises..."
                            autoFocus
                        />
                    </div>

                    <select
                        defaultValue=""
                        onChange={handleBodyPartChange}
                        className="exercise-library-body-part"
                    >
                        <option value="">
                            All body parts
                        </option>

                        {bodyParts.map((bodyPart) => (
                            <option
                                key={bodyPart.id}
                                value={bodyPart.id}
                            >
                                {bodyPart.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="exercise-library-target">
                    <div>
                        <label htmlFor="targetSets">
                            TARGET SETS
                        </label>

                        <input
                            id="targetSets"
                            type="number"
                            min={1}
                            value={targetSets}
                            onChange={(event) =>
                                setTargetSets(
                                    Math.max(
                                        1,
                                        Number(event.target.value),
                                    ),
                                )
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="targetReps">
                            TARGET REPS
                        </label>

                        <input
                            id="targetReps"
                            type="number"
                            min={1}
                            value={targetReps}
                            onChange={(event) =>
                                setTargetReps(
                                    Math.max(
                                        1,
                                        Number(event.target.value),
                                    ),
                                )
                            }
                        />
                    </div>
                </div>

                <div className="exercise-library-list">
                    {isLoading ? (
                        <div className="exercise-library-state">
                            Loading exercises...
                        </div>
                    ) : exercises.length === 0 ? (
                        <div className="exercise-library-state">
                            No exercises found.
                        </div>
                    ) : (
                        exercises.map((exercise) => (
                            <div
                                key={exercise.id}
                                className="exercise-library-item"
                            >
                                <div className="exercise-library-item-info">
                                    <h3>
                                        {exercise.name}
                                    </h3>

                                    {exercise.description && (
                                        <p>
                                            {exercise.description}
                                        </p>
                                    )}

                                    <div className="exercise-library-tags">
                                        {exercise.bodyParts.map(
                                            (bodyPart) => (
                                                <span
                                                    key={bodyPart.id}
                                                >
                                                    {bodyPart.name}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="exercise-library-add"
                                    onClick={() =>
                                        handleAdd(exercise)
                                    }
                                >
                                    + Add
                                </button>
                            </div>
                        ))
                    )}

                    {hasNextPage && (
                        <button
                            type="button"
                            className="exercise-library-load-more"
                            onClick={onLoadMore}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage
                                ? 'Loading...'
                                : 'Load more'}
                        </button>
                    )}
                </div>

                <footer className="exercise-library-footer">
                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    )
}