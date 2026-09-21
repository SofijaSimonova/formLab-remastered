import { useState } from 'react'

import { useDebounce } from '../../../hooks/useDebounce'
import { useExerciseSearch } from '../hooks/useExerciseSearch'

import '../../../components/shared.css'
import { useForm } from 'react-hook-form'

import type {
    CreateExerciseRequest,
    ExerciseAlternativeResponse,
    ExerciseFocusVariationResponse,
    ExerciseListResponse,
    ExerciseResponse,
    ExerciseFormValues,
    ReferenceResponse,
} from '../types/exercise.types'

interface AdminExerciseFormProps {
    exercise?: ExerciseResponse
    exerciseListItem?: ExerciseListResponse
    equipment: ReferenceResponse[]
    tags: ReferenceResponse[]
    bodyParts: ReferenceResponse[]
    alternatives: ExerciseAlternativeResponse[]
    focusVariations: ExerciseFocusVariationResponse[]
    isSaving: boolean
    isMetadataSaving: boolean
    error: boolean
    onSubmit: (
        request: CreateExerciseRequest,
    ) => void
    onCancel: () => void
    onAddAlternative: (
        alternativeExerciseId: string,
        reason: string,
        reverseReason: string,
    ) => void
    onDeleteAlternative: (
        alternativeId: string,
    ) => void
    onAddFocusVariation: (
        focusBodyPartId: string,
        name: string,
        description: string,
        animationReference: string,
    ) => void
    onUpdateFocusVariation: (
        variationId: string,
        name: string,
        description: string,
        animationReference: string,
    ) => void
    onDeleteFocusVariation: (
        variationId: string,
    ) => void
}

export function AdminExerciseForm({
                                      exercise,
                                      exerciseListItem,
                                      equipment,
                                      tags,
                                      bodyParts,
                                      alternatives,
                                      focusVariations,
                                      isSaving,
                                      isMetadataSaving,
                                      error,
                                      onSubmit,
                                      onCancel,
                                      onAddAlternative,
                                      onDeleteAlternative,
                                      onAddFocusVariation,
                                      onUpdateFocusVariation,
                                      onDeleteFocusVariation,
                                  }: AdminExerciseFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ExerciseFormValues>({
        defaultValues: {
            name: exercise?.name ?? '',
            description: exercise?.description ?? '',
            instructions: exercise?.instructions ?? '',
            trackingType:
                exercise?.trackingType ?? 'WEIGHT',
            bodyPartIds:
                exercise?.bodyParts.map(
                    (bodyPart) => bodyPart.id,
                ) ?? [],
            equipmentIds:
                exercise?.equipment.map(
                    (item) => item.id,
                ) ?? [],
            tagIds:
                exerciseListItem?.tags.map(
                    (tag) => tag.id,
                ) ?? [],
        },
    })

    const selectedBodyPartIds = watch('bodyPartIds') ?? []
    const selectedEquipmentIds = watch('equipmentIds') ?? []
    const selectedTagIds = watch('tagIds') ?? []

    const existingAlternativeExerciseIds =
        new Set(
            alternatives.map(
                (alternative) =>
                    alternative.alternativeExerciseId,
            ),
        )

    const [
        alternativeExerciseId,
        setAlternativeExerciseId,
    ] = useState('')

    const [
        alternativeSearch,
        setAlternativeSearch,
    ] = useState('')

    const debouncedAlternativeSearch =
        useDebounce(alternativeSearch, 300)

    const alternativeSearchQuery =
        useExerciseSearch(
            debouncedAlternativeSearch,
            !!exercise,
        )

    const alternativeExercises =
        alternativeSearchQuery.data?.content
            .filter(
                (item) =>
                    item.id !== exercise?.id &&
                    !existingAlternativeExerciseIds.has(
                        item.id,
                    ),
            ) ?? []

    const [alternativeReason, setAlternativeReason] =
        useState('')

    const [
        alternativeReverseReason,
        setAlternativeReverseReason,
    ] = useState('')

    const [
        editingVariationId,
        setEditingVariationId,
    ] = useState<string | null>(null)

    const [
        variationFocusBodyPartId,
        setVariationFocusBodyPartId,
    ] = useState('')

    const [variationName, setVariationName] =
        useState('')

    const [
        variationDescription,
        setVariationDescription,
    ] = useState('')

    const [
        variationAnimationReference,
        setVariationAnimationReference,
    ] = useState('')

    function toggleIds(
        field: 'bodyPartIds' | 'equipmentIds' | 'tagIds',
        id: string,
    ) {
        const selectedIds = watch(field) ?? []
        const next = selectedIds.includes(id)
            ? selectedIds.filter((selectedId) => selectedId !== id)
            : [...selectedIds, id]

        setValue(field, next, {
            shouldDirty: true,
        })
    }

    function toggleEquipment(id: string) {
        toggleIds('equipmentIds', id)
    }

    function submitForm(values: ExerciseFormValues) {
        onSubmit({
            name: values.name.trim(),
            description: values.description.trim(),
            instructions: values.instructions.trim(),
            trackingType: values.trackingType,
            bodyPartIds: values.bodyPartIds,
            equipmentIds: values.equipmentIds,
            tagIds: values.tagIds,
        })
    }

    function handleAddAlternative() {
        if (
            !alternativeExerciseId ||
            !alternativeReason.trim() ||
            !alternativeReverseReason.trim()
        ) {
            return
        }

        onAddAlternative(
            alternativeExerciseId,
            alternativeReason.trim(),
            alternativeReverseReason.trim(),
        )

        setAlternativeExerciseId('')
        setAlternativeSearch('')
        setAlternativeReason('')
        setAlternativeReverseReason('')
    }

    function startVariationEdit(
        variation: ExerciseFocusVariationResponse,
    ) {
        setEditingVariationId(variation.id)
        setVariationFocusBodyPartId(
            variation.focusBodyPartId,
        )
        setVariationName(variation.name)
        setVariationDescription(
            variation.description ?? '',
        )
        setVariationAnimationReference(
            variation.animationReference ?? '',
        )
    }

    function resetVariationForm() {
        setEditingVariationId(null)
        setVariationFocusBodyPartId('')
        setVariationName('')
        setVariationDescription('')
        setVariationAnimationReference('')
    }

    function handleSaveVariation() {
        if (
            !variationFocusBodyPartId ||
            !variationName.trim()
        ) {
            return
        }

        if (editingVariationId) {
            onUpdateFocusVariation(
                editingVariationId,
                variationName.trim(),
                variationDescription.trim(),
                variationAnimationReference.trim(),
            )
        } else {
            onAddFocusVariation(
                variationFocusBodyPartId,
                variationName.trim(),
                variationDescription.trim(),
                variationAnimationReference.trim(),
            )
        }

        resetVariationForm()
    }

    return (
        <form
            className="admin-dashboard-form"
            onSubmit={handleSubmit(submitForm)}
        >
            <div className="admin-dashboard-form-field">
                <label htmlFor="admin-dashboard-name">
                    Name
                </label>

                <input
                    id="admin-dashboard-name"
                    type="text"
                    maxLength={150}
                    disabled={isSaving}
                    {...register('name', {
                        required:
                            'Name is required',
                        maxLength: {
                            value: 150,
                            message:
                                'Name must be at most 150 characters',
                        },
                    })}
                />

                {errors.name && (
                    <span className="admin-dashboard-form-error">
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div className="admin-dashboard-form-field">
                <label htmlFor="admin-dashboard-description">
                    Description
                </label>

                <textarea
                    id="admin-dashboard-description"
                    rows={4}
                    maxLength={10000}
                    disabled={isSaving}
                    {...register('description')}
                />
            </div>

            <div className="admin-dashboard-form-field">
                <label htmlFor="admin-dashboard-instructions">
                    Instructions
                </label>

                <textarea
                    id="admin-dashboard-instructions"
                    rows={6}
                    maxLength={10000}
                    disabled={isSaving}
                    {...register('instructions')}
                />
            </div>

            <div className="admin-dashboard-form-grid">
                <div className="admin-dashboard-form-field">
                    <label htmlFor="admin-dashboard-tracking-type">
                        Tracking Type
                    </label>

                    <select
                        id="admin-dashboard-tracking-type"
                        disabled={isSaving}
                        {...register(
                            'trackingType',
                        )}
                    >
                        <option value="WEIGHT">
                            Weight
                        </option>

                        <option value="REPS">
                            Reps
                        </option>
                    </select>
                </div>

            </div>

            <div className="admin-dashboard-reference-section">
                <span className="admin-dashboard-reference-title">
                    Body Parts
                </span>

                <div className="admin-dashboard-body-part-list">
                    {bodyParts.map((bodyPart) => (
                        <label
                            key={bodyPart.id}
                            className="admin-dashboard-body-part-tag"
                        >
                            <input
                                type="checkbox"
                                checked={selectedBodyPartIds.includes(bodyPart.id)}
                                onChange={() =>
                                    toggleIds('bodyPartIds', bodyPart.id)
                                }
                                disabled={isSaving}
                            />
                            <span>{bodyPart.name}</span>
                        </label>
                    ))}

                    {bodyParts.length === 0 && (
                        <span className="admin-dashboard-reference-note">
                            No body parts available.
                        </span>
                    )}
                </div>
            </div>

            <div className="admin-dashboard-reference-section">
                <span className="admin-dashboard-reference-title">
                    Equipment
                </span>

                <div className="admin-dashboard-body-part-list">
                    {equipment.map((item) => (
                        <label
                            key={item.id}
                            className="admin-dashboard-body-part-tag"
                        >
                            <input
                                type="checkbox"
                                checked={selectedEquipmentIds.includes(item.id)}
                                onChange={() => toggleEquipment(item.id)}
                                disabled={isSaving}
                            />
                            <span>{item.name}</span>
                        </label>
                    ))}

                    {equipment.length === 0 && (
                        <span className="admin-dashboard-reference-note">
                            No equipment available.
                        </span>
                    )}
                </div>
            </div>

            <div className="admin-dashboard-reference-section">
                <span className="admin-dashboard-reference-title">
                    Tags
                </span>

                <div className="admin-dashboard-body-part-list">
                    {tags.map((tag) => (
                        <label
                            key={tag.id}
                            className="admin-dashboard-body-part-tag"
                        >
                            <input
                                type="checkbox"
                                checked={selectedTagIds.includes(tag.id)}
                                onChange={() =>
                                    toggleIds('tagIds', tag.id)
                                }
                                disabled={isSaving}
                            />
                            <span>{tag.name}</span>
                        </label>
                    ))}

                    {tags.length === 0 && (
                        <span className="admin-dashboard-reference-note">
                            No tags available.
                        </span>
                    )}
                </div>
            </div>

            {exercise && (
                <>
                    <div className="admin-dashboard-reference-section">
                        <span className="admin-dashboard-reference-title">
                            Alternative Exercises
                        </span>

                        {alternatives.length > 0 && (
                            <div className="admin-dashboard-metadata-list">
                                {alternatives.map(
                                    (
                                        alternative,
                                    ) => (
                                        <div
                                            key={
                                                alternative.id
                                            }
                                            className="admin-dashboard-metadata-item"
                                        >
                                            <div>
                                                <strong>
                                                    {
                                                        alternative.alternativeExerciseName
                                                    }
                                                </strong>

                                                <p>
                                                    {
                                                        alternative.reason
                                                    }
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="admin-dashboard-danger-button"
                                                onClick={() =>
                                                    onDeleteAlternative(
                                                        alternative.id,
                                                    )
                                                }
                                                disabled={
                                                    isMetadataSaving
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}

                        <div className="admin-dashboard-metadata-form">
                            <input
                                type="search"
                                placeholder="Search alternative exercises..."
                                value={alternativeSearch}
                                onChange={(event) => {
                                    setAlternativeSearch(
                                        event.target.value,
                                    )
                                    setAlternativeExerciseId('')
                                }}
                                disabled={isMetadataSaving}
                            />

                            {alternativeSearchQuery.isPending && (
                                <span className="admin-dashboard-reference-note">
                                    Searching exercises...
                                </span>
                            )}

                            {alternativeSearchQuery.isError && (
                                <span className="admin-dashboard-form-error">
                                    Unable to search exercises.
                                    Please try again.
                                </span>
                            )}

                            {!alternativeSearchQuery.isPending &&
                                !alternativeSearchQuery.isError &&
                                alternativeExercises.length > 0 && (
                                    <div className="admin-dashboard-alternative-results custom-scrollbar">
                                        {alternativeExercises.map(
                                            (item) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    className={
                                                        alternativeExerciseId ===
                                                        item.id
                                                            ? 'admin-dashboard-alternative-result admin-dashboard-alternative-result-selected'
                                                            : 'admin-dashboard-alternative-result'
                                                    }
                                                    onClick={() => {
                                                        setAlternativeExerciseId(
                                                            item.id,
                                                        )
                                                        setAlternativeSearch(
                                                            item.name,
                                                        )
                                                    }}
                                                    disabled={
                                                        isMetadataSaving
                                                    }
                                                >
                                                    {item.name}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                )}

                            {!alternativeSearchQuery.isPending &&
                                !alternativeSearchQuery.isError &&
                                alternativeSearch.trim() &&
                                alternativeExercises.length === 0 && (
                                    <span className="admin-dashboard-reference-note">
                                        No available exercises found.
                                    </span>
                                )}

                            {alternativeExerciseId && (
                                <div className="admin-dashboard-reference-note">
                                    Selected:{' '}
                                    {
                                        alternativeExercises.find(
                                            (item) =>
                                                item.id ===
                                                alternativeExerciseId,
                                        )?.name
                                    }
                                </div>
                            )}

                            <input
                                type="text"
                                placeholder="Reason"
                                maxLength={500}
                                value={
                                    alternativeReason
                                }
                                onChange={(event) =>
                                    setAlternativeReason(
                                        event.target.value,
                                    )
                                }
                                disabled={
                                    isMetadataSaving
                                }
                            />

                            <input
                                type="text"
                                placeholder="Reverse reason"
                                maxLength={500}
                                value={
                                    alternativeReverseReason
                                }
                                onChange={(event) =>
                                    setAlternativeReverseReason(
                                        event.target.value,
                                    )
                                }
                                disabled={
                                    isMetadataSaving
                                }
                            />

                            <button
                                type="button"
                                className="admin-dashboard-secondary-button"
                                onClick={
                                    handleAddAlternative
                                }
                                disabled={
                                    isMetadataSaving ||
                                    !alternativeExerciseId ||
                                    !alternativeReason.trim() ||
                                    !alternativeReverseReason.trim()
                                }
                            >
                                Add Alternative
                            </button>
                        </div>
                    </div>

                    <div className="admin-dashboard-reference-section">
                        <span className="admin-dashboard-reference-title">
                            Focus Variations
                        </span>

                        {focusVariations.length >
                            0 && (
                                <div className="admin-dashboard-metadata-list">
                                    {focusVariations.map(
                                        (
                                            variation,
                                        ) => (
                                            <div
                                                key={
                                                    variation.id
                                                }
                                                className="admin-dashboard-metadata-item"
                                            >
                                                <div>
                                                    <strong>
                                                        {
                                                            variation.name
                                                        }
                                                    </strong>

                                                    {variation.description && (
                                                        <p>
                                                            {
                                                                variation.description
                                                            }
                                                        </p>
                                                    )}

                                                    {variation.animationReference && (
                                                        <small>
                                                            {
                                                                variation.animationReference
                                                            }
                                                        </small>
                                                    )}
                                                </div>

                                                <div className="admin-dashboard-row-actions">
                                                    <button
                                                        type="button"
                                                        className="admin-dashboard-secondary-button"
                                                        onClick={() =>
                                                            startVariationEdit(
                                                                variation,
                                                            )
                                                        }
                                                        disabled={
                                                            isMetadataSaving
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="admin-dashboard-danger-button"
                                                        onClick={() =>
                                                            onDeleteFocusVariation(
                                                                variation.id,
                                                            )
                                                        }
                                                        disabled={
                                                            isMetadataSaving
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                        <div className="admin-dashboard-metadata-form">
                            <select
                                value={
                                    variationFocusBodyPartId
                                }
                                onChange={(event) =>
                                    setVariationFocusBodyPartId(
                                        event.target.value,
                                    )
                                }
                                disabled={
                                    isMetadataSaving ||
                                    !!editingVariationId
                                }
                            >
                                <option value="">
                                    Select focus body
                                    part
                                </option>

                                {bodyParts.map(
                                    (bodyPart) => (
                                        <option
                                            key={
                                                bodyPart.id
                                            }
                                            value={
                                                bodyPart.id
                                            }
                                        >
                                            {
                                                bodyPart.name
                                            }
                                        </option>
                                    ),
                                )}
                            </select>

                            <input
                                type="text"
                                placeholder="Variation name"
                                maxLength={100}
                                value={
                                    variationName
                                }
                                onChange={(event) =>
                                    setVariationName(
                                        event.target.value,
                                    )
                                }
                                disabled={
                                    isMetadataSaving
                                }
                            />

                            <textarea
                                placeholder="Description"
                                maxLength={10000}
                                value={
                                    variationDescription
                                }
                                onChange={(event) =>
                                    setVariationDescription(
                                        event.target.value,
                                    )
                                }
                                disabled={
                                    isMetadataSaving
                                }
                            />

                            <input
                                type="text"
                                placeholder="Animation reference"
                                maxLength={255}
                                value={
                                    variationAnimationReference
                                }
                                onChange={(event) =>
                                    setVariationAnimationReference(
                                        event.target.value,
                                    )
                                }
                                disabled={
                                    isMetadataSaving
                                }
                            />

                            <div className="admin-dashboard-form-actions">
                                {editingVariationId && (
                                    <button
                                        type="button"
                                        className="admin-dashboard-secondary-button"
                                        onClick={
                                            resetVariationForm
                                        }
                                        disabled={
                                            isMetadataSaving
                                        }
                                    >
                                        Cancel
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="admin-dashboard-primary-button"
                                    onClick={
                                        handleSaveVariation
                                    }
                                    disabled={
                                        isMetadataSaving ||
                                        !variationFocusBodyPartId ||
                                        !variationName.trim()
                                    }
                                >
                                    {editingVariationId
                                        ? 'Save Variation'
                                        : 'Add Variation'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {error && (
                <p className="admin-dashboard-form-error">
                    Unable to save the exercise.
                    Please try again.
                </p>
            )}

            <div className="admin-dashboard-form-actions">
                <button
                    type="button"
                    className="admin-dashboard-secondary-button"
                    onClick={onCancel}
                    disabled={
                        isSaving ||
                        isMetadataSaving
                    }
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="admin-dashboard-primary-button"
                    disabled={
                        isSaving ||
                        isMetadataSaving
                    }
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