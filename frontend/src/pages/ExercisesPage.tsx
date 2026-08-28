import { useMemo, useState } from 'react'

import { useDebounce } from '../hooks/useDebounce'
import { useExercises } from '../features/exercises/hooks/useExercises'
import { useBodyParts } from '../features/exercises/hooks/useBodyParts'
import { BodyExplorer } from '../features/exercises/components/BodyExplorer'
import { ExerciseCard } from '../features/exercises/components/ExerciseCard'
import { ExerciseToolbar } from '../features/exercises/components/ExerciseToolbar'
import '../features/exercises/exercises.css'

export function ExercisesPage() {
    const [selectedBodyPartId, setSelectedBodyPartId] =
        useState<string | null>(null)

    const [search, setSearch] = useState('')

    const debouncedSearch = useDebounce(search, 400)

    const {
        data,
        isLoading,
        isError,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useExercises(
        debouncedSearch,
        selectedBodyPartId ?? undefined,
    )

    const {
        data: bodyParts = [],
        isLoading: isLoadingBodyParts,
    } = useBodyParts()

    const exercises = useMemo(
        () => data?.pages.flatMap((page) => page.content) ?? [],
        [data],
    )

    const selectedBodyPartName = useMemo(() => {
        if (!selectedBodyPartId) {
            return null
        }

        return (
            bodyParts.find(
                (bodyPart) => bodyPart.id === selectedBodyPartId,
            )?.name ?? null
        )
    }, [bodyParts, selectedBodyPartId])

    const totalExercises =
        data?.pages?.[0]?.totalElements ?? 0

    return (
        <div className="exercises-page">

            {/* PAGE HEADER */}
            <div className="exercises-page-header">
                <div>
                    <h1>Exercises</h1>

                    <p>
                        Library • {totalExercises} entries
                    </p>
                </div>

                <div className="exercises-page-header-actions">
                    <div className="exercise-search">
                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Search exercises..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />
                    </div>

                    <button
                        type="button"
                        className="add-custom-button"
                    >
                        Add Custom
                    </button>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="exercises-layout">

                {/* BODY EXPLORER - NEVER DISAPPEARS */}
                <BodyExplorer
                    bodyParts={bodyParts}
                    selectedBodyPartId={selectedBodyPartId}
                    onSelectBodyPart={setSelectedBodyPartId}
                />

                {/* EXERCISE RESULTS */}
                <main className="exercise-results">

                    <ExerciseToolbar
                        selectedBodyPartName={selectedBodyPartName}
                        onClearBodyPart={() =>
                            setSelectedBodyPartId(null)
                        }
                    />

                    {/* ONLY THIS PART LOADS */}
                    {isLoading || isLoadingBodyParts ? (
                        <div className="exercise-results-loader">
                            <div className="exercise-loader-spinner" />
                            <span>Loading exercises...</span>
                        </div>
                    ) : isError ? (
                        <div className="empty-exercises">
                            Failed to load exercises.
                        </div>
                    ) : (
                        <>
                            <div
                                className={`exercise-grid ${
                                    isFetching
                                        ? 'exercise-grid-loading'
                                        : ''
                                }`}
                            >
                                {exercises.map((exercise) => (
                                    <ExerciseCard
                                        key={exercise.id}
                                        exercise={exercise}
                                    />
                                ))}
                            </div>

                            {hasNextPage && (
                                <button
                                    type="button"
                                    className="load-more-button"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                >
                                    {isFetchingNextPage
                                        ? 'Loading...'
                                        : 'Load More Entries'}

                                    <span>⌄</span>
                                </button>
                            )}

                            {exercises.length === 0 && (
                                <div className="empty-exercises">
                                    No exercises found.
                                </div>
                            )}
                        </>
                    )}

                </main>
            </div>
        </div>
    )
}