import { useMemo, useState } from 'react'

import './exercises.css'
import '../../components/shared.css'

import { useDebounce } from '../../hooks/useDebounce'
import { useExercises } from '../../features/exercises/hooks/useExercises'
import { useBodyParts } from '../../features/exercises/hooks/useBodyParts'
import { BodyExplorer } from '../../features/exercises/components/BodyExplorer'
import { ExerciseToolbar } from '../../features/exercises/components/ExerciseToolbar'
import { ExerciseCard } from '../../features/exercises/components/ExerciseCard'
import { LoadingState } from '../../components/LoadingState'

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
            <div className="exercises-page-header">
                <div>
                    <h1>Exercises</h1>

                    <p>
                        Library • {totalExercises} entries
                    </p>
                </div>

                <div className="exercises-page-header-actions">
                    <div className="exercises-page-search">
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
                        className="exercises-page-add-custom-button"
                    >
                        Add Custom
                    </button>
                </div>
            </div>

            <div className="exercises-page-layout">
                <BodyExplorer
                    bodyParts={bodyParts}
                    selectedBodyPartId={selectedBodyPartId}
                    onSelectBodyPart={setSelectedBodyPartId}
                />

                <main className="exercises-page-results">
                    <ExerciseToolbar
                        selectedBodyPartName={selectedBodyPartName}
                        onClearBodyPart={() =>
                            setSelectedBodyPartId(null)
                        }
                    />

                    {isLoading || isLoadingBodyParts ? (
                        <LoadingState message="Loading exercises..." />
                    ) : isError ? (
                        <div className="exercises-page-empty">
                            Failed to load exercises.
                        </div>
                    ) : (
                        <>
                            <div
                                className={`exercises-page-grid ${
                                    isFetching
                                        ? 'exercises-page-grid-loading'
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
                                    className="exercises-page-load-more"
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
                                <div className="exercises-page-empty">
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