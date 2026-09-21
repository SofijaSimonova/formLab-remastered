
import './AdminDashboardPage.css'
import '../../components/shared.css'

import { AdminExerciseTable } from '../../features/exercises/components/AdminExerciseTable'
import { AdminExerciseForm } from '../../features/exercises/components/AdminExerciseForm'
import { LoadingState } from '../../components/LoadingState'
import {useAdminDashboard} from "../../features/exercises/hooks/useAdminDashboard";

export function AdminDashboardPage() {
    const {
        search,
        setSearch,
        editingExerciseId,
        isCreateFormOpen,
        deleteTarget,
        setDeleteTarget,
        exercisesQuery,
        bodyPartsQuery,
        equipmentQuery,
        tagsQuery,
        editingExerciseQuery,
        editingAlternativesQuery,
        createMutation,
        updateMutation,
        deleteMutation,
        createAlternativeMutation,
        deleteAlternativeMutation,
        createFocusVariationMutation,
        updateFocusVariationMutation,
        deleteFocusVariationMutation,
        exercises,
        bodyParts,
        equipment,
        tags,
        editingExerciseListItem,
        alternatives,
        focusVariations,
        isSaving,
        isMetadataSaving,
        openCreateForm,
        closeCreateForm,
        openEditForm,
        closeEditForm,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleAddAlternative,
        handleDeleteAlternative,
        handleAddFocusVariation,
        handleUpdateFocusVariation,
        handleDeleteFocusVariation,
    } = useAdminDashboard()

    return (
        <section className="admin-dashboard-page">
            <header className="admin-dashboard-header">
                <div>
                    <span className="admin-dashboard-eyebrow">
                        Administration
                    </span>

                    <h1 className="admin-dashboard-title">
                        Admin Dashboard
                    </h1>

                    <p className="admin-dashboard-subtitle">
                        Manage the global FormLab
                        exercise library.
                    </p>
                </div>
            </header>

            <section className="admin-dashboard-panel">
                <div className="admin-dashboard-panel-header">
                    <div>
                        <h2 className="admin-dashboard-section-title">
                            Exercises
                        </h2>

                        <p className="admin-dashboard-section-description">
                            Create, edit, and remove
                            exercises available
                            to users.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="admin-dashboard-primary-button"
                        onClick={openCreateForm}
                    >
                        Add Exercise
                    </button>
                </div>

                <div className="admin-dashboard-toolbar">
                    <input
                        type="search"
                        className="admin-dashboard-search-input"
                        placeholder="Search exercises..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value,
                            )
                        }
                    />
                </div>

                {exercisesQuery.isPending && (
                    <LoadingState message="Loading exercises..." />
                )}

                {exercisesQuery.isError && (
                    <div className="error-state">
                        <h2>
                            Unable to load
                            exercises
                        </h2>

                        <p>
                            Something went wrong
                            while loading the
                            exercise library.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                exercisesQuery.refetch()
                            }
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!exercisesQuery.isPending &&
                    !exercisesQuery.isError && (
                        <AdminExerciseTable
                            exercises={exercises}
                            search={search}
                            hasNextPage={
                                !!exercisesQuery.hasNextPage
                            }
                            isFetchingNextPage={
                                exercisesQuery.isFetchingNextPage
                            }
                            onEdit={
                                openEditForm
                            }
                            onDelete={(exercise) =>
                                setDeleteTarget({
                                    id: exercise.id,
                                    name: exercise.name,
                                })
                            }
                            onLoadMore={() =>
                                exercisesQuery.fetchNextPage()
                            }
                        />
                    )}
            </section>

            {isCreateFormOpen && (
                <div className="admin-dashboard-modal-backdrop">
                    <div className="admin-dashboard-modal custom-scrollbar">
                        <div className="admin-dashboard-modal-header">
                            <div>
                                <h2 className="admin-dashboard-modal-title">
                                    Add Exercise
                                </h2>

                                <p className="admin-dashboard-modal-description">
                                    Add a new exercise
                                    to the global
                                    library.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="admin-dashboard-modal-close"
                                onClick={
                                    closeCreateForm
                                }
                                disabled={
                                    isSaving
                                }
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <AdminExerciseForm
                            key="create"
                            equipment={equipment}
                            tags={tags}
                            bodyParts={bodyParts}
                            alternatives={[]}
                            focusVariations={[]}
                            isSaving={
                                createMutation.isPending
                            }
                            isMetadataSaving={
                                false
                            }
                            error={
                                createMutation.isError
                            }
                            onSubmit={
                                handleCreate
                            }
                            onCancel={
                                closeCreateForm
                            }
                            onAddAlternative={() => {}}
                            onDeleteAlternative={() => {}}
                            onAddFocusVariation={() => {}}
                            onUpdateFocusVariation={() => {}}
                            onDeleteFocusVariation={() => {}}
                        />
                    </div>
                </div>
            )}

            {editingExerciseId && (
                <div className="admin-dashboard-modal-backdrop">
                    <div className="admin-dashboard-modal custom-scrollbar">
                        {editingExerciseQuery.isPending && (
                            <div className="admin-dashboard-modal-loading">
                                <div className="loading-spinner" />

                                <span>
                                    Loading
                                    exercise...
                                </span>
                            </div>
                        )}

                        {editingExerciseQuery.isError && (
                            <div className="error-state">
                                <h2>
                                    Unable to load
                                    the exercise
                                </h2>

                                <button
                                    type="button"
                                    onClick={
                                        closeEditForm
                                    }
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {editingExerciseQuery.data && (
                            <>
                                <div className="admin-dashboard-modal-header">
                                    <div>
                                        <h2 className="admin-dashboard-modal-title">
                                            Edit Exercise
                                        </h2>

                                        <p className="admin-dashboard-modal-description">
                                            Update the
                                            exercise
                                            details and
                                            metadata.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="admin-dashboard-modal-close"
                                        onClick={
                                            closeEditForm
                                        }
                                        disabled={
                                            isSaving ||
                                            isMetadataSaving
                                        }
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                </div>

                                <AdminExerciseForm
                                    key={
                                        editingExerciseQuery
                                            .data.id
                                    }
                                    exercise={
                                        editingExerciseQuery.data
                                    }
                                    exerciseListItem={
                                        editingExerciseListItem
                                    }
                                    equipment={
                                        equipment
                                    }
                                    tags={
                                        tags
                                    }
                                    bodyParts={
                                        bodyParts
                                    }
                                    alternatives={
                                        alternatives
                                    }
                                    focusVariations={
                                        focusVariations
                                    }
                                    isSaving={
                                        updateMutation.isPending
                                    }
                                    isMetadataSaving={
                                        isMetadataSaving
                                    }
                                    error={
                                        updateMutation.isError
                                    }
                                    onSubmit={
                                        handleUpdate
                                    }
                                    onCancel={
                                        closeEditForm
                                    }
                                    onAddAlternative={
                                        handleAddAlternative
                                    }
                                    onDeleteAlternative={
                                        handleDeleteAlternative
                                    }
                                    onAddFocusVariation={
                                        handleAddFocusVariation
                                    }
                                    onUpdateFocusVariation={
                                        handleUpdateFocusVariation
                                    }
                                    onDeleteFocusVariation={
                                        handleDeleteFocusVariation
                                    }
                                />
                            </>
                        )}
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="admin-dashboard-modal-backdrop">
                    <div className="admin-dashboard-delete-modal">
                        <h2 className="admin-dashboard-modal-title">
                            Delete Exercise
                        </h2>

                        <p className="admin-dashboard-delete-message">
                            Are you sure you want
                            to delete{' '}
                            <strong>
                                {
                                    deleteTarget.name
                                }
                            </strong>
                            ?
                        </p>

                        <p className="admin-dashboard-delete-warning">
                            An exercise already
                            used in a workout
                            cannot be deleted.
                        </p>

                        {deleteMutation.isError && (
                            <p className="admin-dashboard-form-error">
                                This exercise
                                could not be
                                deleted. It may
                                already be used
                                in a workout.
                            </p>
                        )}

                        <div className="admin-dashboard-form-actions">
                            <button
                                type="button"
                                className="admin-dashboard-secondary-button"
                                onClick={() =>
                                    setDeleteTarget(
                                        null,
                                    )
                                }
                                disabled={
                                    deleteMutation.isPending
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="admin-dashboard-danger-button"
                                onClick={
                                    handleDelete
                                }
                                disabled={
                                    deleteMutation.isPending
                                }
                            >
                                {deleteMutation.isPending
                                    ? 'Deleting...'
                                    : 'Delete Exercise'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}