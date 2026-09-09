import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useExercises } from '../../features/exercises/hooks/useExercises'
import { useBodyParts } from '../../features/exercises/hooks/useBodyParts'
import { useExercise } from '../../features/exercises/hooks/useExercise'
import { useCreateExercise } from '../../features/exercises/hooks/useCreateExercise'
import { useUpdateExercise } from '../../features/exercises/hooks/useUpdateExercise'
import { useDeleteExercise } from '../../features/exercises/hooks/useDeleteExercise'
import { exerciseKeys } from '../../features/exercises/exercise.keys'

import type {
    CreateExerciseRequest,
    ExerciseResponse,
    ExerciseTrackingType,
    UpdateExerciseRequest,
} from '../../features/exercises/types/exercise.types'

import './AdminDashboardPage.css'

interface ExerciseFormState {
    name: string
    description: string
    instructions: string
    movementPatternId: string
    trackingType: ExerciseTrackingType
}

const initialFormState: ExerciseFormState = {
    name: '',
    description: '',
    instructions: '',
    movementPatternId: '',
    trackingType: 'WEIGHT',
}

interface ExerciseFormProps {
    exercise?: ExerciseResponse
    isSaving: boolean
    error: boolean
    onSubmit: (
        request:
            | CreateExerciseRequest
            | UpdateExerciseRequest,
    ) => void
    onCancel: () => void
}

function ExerciseForm({
                          exercise,
                          isSaving,
                          error,
                          onSubmit,
                          onCancel,
                      }: ExerciseFormProps) {
    const [form, setForm] =
        useState<ExerciseFormState>(() => ({
            name: exercise?.name ?? '',
            description: exercise?.description ?? '',
            instructions: exercise?.instructions ?? '',
            movementPatternId:
                exercise?.movementPatternId ?? '',
            trackingType:
                exercise?.trackingType ?? 'WEIGHT',
        }))

    function handleChange(
        event: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) {
        const { name, value } = event.target

        setForm((current) => ({
            ...current,
            [name]: value,
        }))
    }

    function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        const name = form.name.trim()

        if (!name) {
            return
        }

        onSubmit({
            name,
            description: form.description.trim(),
            instructions: form.instructions.trim(),
            movementPatternId:
                form.movementPatternId.trim() || null,
            trackingType: form.trackingType,
        })
    }

    return (
        <form
            className="admin-dashboard-form"
            onSubmit={handleSubmit}
        >
            <div className="admin-dashboard-form-field">
                <label htmlFor="admin-dashboard-name">
                    Name
                </label>

                <input
                    id="admin-dashboard-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={150}
                    required
                    disabled={isSaving}
                />
            </div>

            <div className="admin-dashboard-form-field">
                <label htmlFor="admin-dashboard-description">
                    Description
                </label>

                <textarea
                    id="admin-dashboard-description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    maxLength={10000}
                    rows={4}
                    disabled={isSaving}
                />
            </div>

            <div className="admin-dashboard-form-field">
                <label htmlFor="admin-dashboard-instructions">
                    Instructions
                </label>

                <textarea
                    id="admin-dashboard-instructions"
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    maxLength={10000}
                    rows={6}
                    disabled={isSaving}
                />
            </div>

            <div className="admin-dashboard-form-grid">
                <div className="admin-dashboard-form-field">
                    <label htmlFor="admin-dashboard-tracking-type">
                        Tracking Type
                    </label>

                    <select
                        id="admin-dashboard-tracking-type"
                        name="trackingType"
                        value={form.trackingType}
                        onChange={handleChange}
                        disabled={isSaving}
                    >
                        <option value="WEIGHT">
                            Weight
                        </option>

                        <option value="REPS">
                            Reps
                        </option>
                    </select>
                </div>

                <div className="admin-dashboard-form-field">
                    <label htmlFor="admin-dashboard-movement-pattern">
                        Movement Pattern ID
                    </label>

                    <input
                        id="admin-dashboard-movement-pattern"
                        name="movementPatternId"
                        type="text"
                        value={form.movementPatternId}
                        onChange={handleChange}
                        placeholder="Optional"
                        disabled={isSaving}
                    />
                </div>
            </div>

            {error && (
                <p className="admin-dashboard-form-error">
                    Unable to save the exercise. Please try again.
                </p>
            )}

            <div className="admin-dashboard-form-actions">
                <button
                    type="button"
                    className="admin-dashboard-secondary-button"
                    onClick={onCancel}
                    disabled={isSaving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="admin-dashboard-primary-button"
                    disabled={isSaving}
                >
                    {isSaving
                        ? 'Saving...'
                        : exercise
                            ? 'Save Changes'
                            : 'Create Exercise'}
                </button>
            </div>
        </form>
    )
}

export function AdminDashboardPage() {
    const queryClient = useQueryClient()

    const [search, setSearch] = useState('')
    const [editingExerciseId, setEditingExerciseId] =
        useState<string | null>(null)
    const [isCreateFormOpen, setIsCreateFormOpen] =
        useState(false)
    const [deleteTarget, setDeleteTarget] =
        useState<{
            id: string
            name: string
        } | null>(null)

    const exercisesQuery = useExercises(
        search.trim() || undefined,
    )

    const bodyPartsQuery = useBodyParts()

    const editingExerciseQuery = useExercise(
        editingExerciseId ?? '',
    )

    const createMutation = useCreateExercise()
    const updateMutation = useUpdateExercise()
    const deleteMutation = useDeleteExercise()

    const exercises =
        exercisesQuery.data?.pages.flatMap(
            (page) => page.content,
        ) ?? []

    const bodyParts = bodyPartsQuery.data ?? []

    const isSaving =
        createMutation.isPending ||
        updateMutation.isPending

    async function invalidateExerciseQueries() {
        await queryClient.invalidateQueries({
            queryKey: exerciseKeys.all,
        })
    }

    function openCreateForm() {
        createMutation.reset()
        setIsCreateFormOpen(true)
    }

    function closeCreateForm() {
        if (isSaving) {
            return
        }

        setIsCreateFormOpen(false)
        createMutation.reset()
    }

    function openEditForm(exerciseId: string) {
        updateMutation.reset()
        setEditingExerciseId(exerciseId)
    }

    function closeEditForm() {
        if (updateMutation.isPending) {
            return
        }

        setEditingExerciseId(null)
        updateMutation.reset()
    }

    function handleCreate(
        request:
            | CreateExerciseRequest
            | UpdateExerciseRequest,
    ) {
        if (!('trackingType' in request)) {
            return
        }

        createMutation.mutate(
            request as CreateExerciseRequest,
            {
                onSuccess: async () => {
                    closeCreateForm()
                    await invalidateExerciseQueries()
                },
            },
        )
    }

    function handleUpdate(
        request:
            | CreateExerciseRequest
            | UpdateExerciseRequest,
    ) {
        if (!editingExerciseId) {
            return
        }

        updateMutation.mutate(
            {
                exerciseId: editingExerciseId,
                request: request as UpdateExerciseRequest,
            },
            {
                onSuccess: async () => {
                    closeEditForm()
                    await invalidateExerciseQueries()
                },
            },
        )
    }

    function handleDelete() {
        if (!deleteTarget) {
            return
        }

        deleteMutation.mutate(deleteTarget.id, {
            onSuccess: async () => {
                setDeleteTarget(null)
                await invalidateExerciseQueries()
            },
        })
    }

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
                        Manage the global FormLab exercise library.
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
                            Create, edit, and remove exercises
                            available to users.
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
                            setSearch(event.target.value)
                        }
                    />
                </div>

                {exercisesQuery.isPending && (
                    <div className="loading-state">
                        <div className="loading-spinner" />
                        <span>Loading exercises...</span>
                    </div>
                )}

                {exercisesQuery.isError && (
                    <div className="error-state">
                        <h2>Unable to load exercises</h2>
                        <p>
                            Something went wrong while loading the exercise
                            library.
                        </p>
                        <button
                            type="button"
                            onClick={() => exercisesQuery.refetch()}
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!exercisesQuery.isPending &&
                    !exercisesQuery.isError && (
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
                                    {exercises.map(
                                        (exercise) => (
                                            <tr
                                                key={
                                                    exercise.id
                                                }
                                            >
                                                <td>
                                                    <div className="admin-dashboard-exercise-name">
                                                        {
                                                            exercise.name
                                                        }
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
                                                    <div className="admin-dashboard-body-parts">
                                                        {exercise.bodyParts
                                                                .map(
                                                                    (
                                                                        bodyPart,
                                                                    ) =>
                                                                        bodyPart.name,
                                                                )
                                                                .join(
                                                                    ', ',
                                                                ) ||
                                                            '—'}
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="admin-dashboard-row-actions">
                                                        <button
                                                            type="button"
                                                            className="admin-dashboard-secondary-button"
                                                            onClick={() =>
                                                                openEditForm(
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
                                                                setDeleteTarget(
                                                                    {
                                                                        id: exercise.id,
                                                                        name: exercise.name,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )}

                                    {exercises.length ===
                                        0 && (
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

                            {exercisesQuery.hasNextPage && (
                                <div className="admin-dashboard-pagination">
                                    <button
                                        type="button"
                                        className="admin-dashboard-secondary-button"
                                        onClick={() =>
                                            exercisesQuery.fetchNextPage()
                                        }
                                        disabled={
                                            exercisesQuery.isFetchingNextPage
                                        }
                                    >
                                        {exercisesQuery.isFetchingNextPage
                                            ? 'Loading...'
                                            : 'Load More'}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
            </section>

            {isCreateFormOpen && (
                <div className="admin-dashboard-modal-backdrop">
                    <div className="admin-dashboard-modal">
                        <div className="admin-dashboard-modal-header">
                            <div>
                                <h2 className="admin-dashboard-modal-title">
                                    Add Exercise
                                </h2>

                                <p className="admin-dashboard-modal-description">
                                    Add a new exercise to the global
                                    library.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="admin-dashboard-modal-close"
                                onClick={closeCreateForm}
                                disabled={isSaving}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        <ExerciseForm
                            key="create-exercise"
                            isSaving={
                                createMutation.isPending
                            }
                            error={createMutation.isError}
                            onSubmit={handleCreate}
                            onCancel={closeCreateForm}
                        />

                        {!bodyPartsQuery.isError && (
                            <div className="admin-dashboard-reference-note">
                                Body parts are seeded reference data
                                and are read-only.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {editingExerciseId && (
                <div className="admin-dashboard-modal-backdrop">
                    <div className="admin-dashboard-modal">
                        {editingExerciseQuery.isPending && (
                            <div className="admin-dashboard-status">
                                Loading exercise...
                            </div>
                        )}

                        {editingExerciseQuery.isError && (
                            <div className="admin-dashboard-error">
                                Unable to load the exercise.
                                <button
                                    type="button"
                                    className="admin-dashboard-secondary-button"
                                    onClick={closeEditForm}
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
                                            Update the exercise
                                            details.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="admin-dashboard-modal-close"
                                        onClick={closeEditForm}
                                        disabled={
                                            updateMutation.isPending
                                        }
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                </div>

                                <ExerciseForm
                                    key={
                                        editingExerciseQuery.data.id
                                    }
                                    exercise={
                                        editingExerciseQuery.data
                                    }
                                    isSaving={
                                        updateMutation.isPending
                                    }
                                    error={
                                        updateMutation.isError
                                    }
                                    onSubmit={handleUpdate}
                                    onCancel={closeEditForm}
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
                            Are you sure you want to delete{' '}
                            <strong>
                                {deleteTarget.name}
                            </strong>
                            ?
                        </p>

                        <p className="admin-dashboard-delete-warning">
                            An exercise already used in a workout
                            cannot be deleted.
                        </p>

                        {deleteMutation.isError && (
                            <p className="admin-dashboard-form-error">
                                This exercise could not be deleted.
                                It may already be used in a workout.
                            </p>
                        )}

                        <div className="admin-dashboard-form-actions">
                            <button
                                type="button"
                                className="admin-dashboard-secondary-button"
                                onClick={() =>
                                    setDeleteTarget(null)
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
                                onClick={handleDelete}
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