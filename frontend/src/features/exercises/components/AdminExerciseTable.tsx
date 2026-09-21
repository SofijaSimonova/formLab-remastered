import type { ExerciseListResponse } from '../../../features/exercises/types/exercise.types'

import '../../../components/shared.css'

interface AdminExerciseTableProps {
    exercises: ExerciseListResponse[]
    search: string
    hasNextPage: boolean
    isFetchingNextPage: boolean
    onEdit: (exerciseId: string) => void
    onDelete: (
        exercise: ExerciseListResponse,
    ) => void
    onLoadMore: () => void
}

export function AdminExerciseTable({
                                       exercises,
                                       search,
                                       hasNextPage,
                                       isFetchingNextPage,
                                       onEdit,
                                       onDelete,
                                       onLoadMore,
                                   }: AdminExerciseTableProps) {
    return (
        <>
            <div className="admin-dashboard-table-wrapper">
                <table className="admin-dashboard-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tracking</th>
                        <th>Body Parts</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {exercises.map((exercise) => (
                        <tr key={exercise.id}>
                            <td>
                                <div className="admin-dashboard-exercise-name">
                                    {exercise.name}
                                </div>

                                {exercise.description && (
                                    <div className="admin-dashboard-exercise-description">
                                        {
                                            exercise.description
                                        }
                                    </div>
                                )}
                            </td>

                            <td>
                                    <span className="admin-dashboard-tracking-badge">
                                        {
                                            exercise.trackingType
                                        }
                                    </span>
                            </td>

                            <td>
                                {exercise.bodyParts
                                        .map(
                                            (
                                                bodyPart,
                                            ) =>
                                                bodyPart.name,
                                        )
                                        .join(', ') ||
                                    '—'}
                            </td>

                            <td>
                                <div className="admin-dashboard-row-actions">
                                    <button
                                        type="button"
                                        className="admin-dashboard-secondary-button"
                                        onClick={() =>
                                            onEdit(
                                                exercise.id,
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="admin-dashboard-danger-button"
                                        onClick={() =>
                                            onDelete(
                                                exercise,
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {exercises.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="admin-dashboard-empty-state"
                            >
                                {search.trim()
                                    ? 'No exercises match your search.'
                                    : 'No exercises found.'}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {hasNextPage && (
                <div className="admin-dashboard-pagination">
                    <button
                        type="button"
                        className="load-more-button"
                        onClick={onLoadMore}
                        disabled={
                            isFetchingNextPage
                        }
                    >
                        {isFetchingNextPage
                            ? 'Loading...'
                            : 'Load More'}
                    </button>
                </div>
            )}
        </>
    )
}