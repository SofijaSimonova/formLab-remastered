import { useState } from 'react'
import {useDebounce} from "../../../hooks/useDebounce";
import {useExercises} from "./useExercises";
import {useBodyParts} from "./useBodyParts";
import {useEquipment} from "./useEquipment";
import {useTags} from "./useTags";
import {useExercise} from "./useExercise";
import {useExerciseAlternatives} from "./useExerciseAlternatives";
import {useCreateExercise} from "./useCreateExercise";
import {useUpdateExercise} from "./useUpdateExercise";
import {useDeleteExercise} from "./useDeleteExercise";
import {useCreateExerciseAlternative} from "./useCreateExerciseAlternative";
import {useDeleteExerciseAlternative} from "./useDeleteExerciseAlternative";
import {useCreateExerciseFocusVariation} from "./useCreateExerciseFocusVariation";
import {useUpdateExerciseFocusVariation} from "./useUpdateExerciseFocusVariation";
import {useDeleteExerciseFocusVariation} from "./useDeleteExerciseFocusVariation";
import type {CreateExerciseRequest} from "../types/exercise.types";


export function useAdminDashboard() {

    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 400)

    const [
        editingExerciseId,
        setEditingExerciseId,
    ] = useState<string | null>(null)

    const [
        isCreateFormOpen,
        setIsCreateFormOpen,
    ] = useState(false)

    const [deleteTarget, setDeleteTarget] =
        useState<{
            id: string
            name: string
        } | null>(null)

    const exercisesQuery = useExercises(
        debouncedSearch.trim() || undefined,
    )

    const bodyPartsQuery = useBodyParts()
    const equipmentQuery = useEquipment()
    const tagsQuery = useTags()

    const editingExerciseQuery = useExercise(
        editingExerciseId ?? '',
    )

    const editingAlternativesQuery =
        useExerciseAlternatives(
            editingExerciseId ?? '',
        )

    const createMutation =
        useCreateExercise()

    const updateMutation =
        useUpdateExercise()

    const deleteMutation =
        useDeleteExercise()

    const createAlternativeMutation =
        useCreateExerciseAlternative()

    const deleteAlternativeMutation =
        useDeleteExerciseAlternative()

    const createFocusVariationMutation =
        useCreateExerciseFocusVariation()

    const updateFocusVariationMutation =
        useUpdateExerciseFocusVariation()

    const deleteFocusVariationMutation =
        useDeleteExerciseFocusVariation()

    const exercises =
        exercisesQuery.data?.pages.flatMap(
            (page) => page.content,
        ) ?? []

    const bodyParts =
        bodyPartsQuery.data ?? []

    const equipment =
        equipmentQuery.data ?? []

    const tags =
        tagsQuery.data ?? []

    const editingExerciseListItem =
        exercises.find(
            (exercise) =>
                exercise.id === editingExerciseId,
        )

    const alternatives =
        editingAlternativesQuery.data ?? []

    const focusVariations =
        editingExerciseQuery.data
            ?.focusVariations ?? []

    const isSaving =
        createMutation.isPending ||
        updateMutation.isPending

    const isMetadataSaving =
        createAlternativeMutation.isPending ||
        deleteAlternativeMutation.isPending ||
        createFocusVariationMutation.isPending ||
        updateFocusVariationMutation.isPending ||
        deleteFocusVariationMutation.isPending

    function openCreateForm() {
        createMutation.reset()
        setIsCreateFormOpen(true)
    }

    function closeCreateForm() {
        if (createMutation.isPending) {
            return
        }

        setIsCreateFormOpen(false)
        createMutation.reset()
    }

    function openEditForm(
        exerciseId: string,
    ) {
        updateMutation.reset()
        setEditingExerciseId(exerciseId)
    }

    function closeEditForm() {
        if (
            updateMutation.isPending ||
            isMetadataSaving
        ) {
            return
        }

        setEditingExerciseId(null)
        updateMutation.reset()
    }

    function handleCreate(
        request: CreateExerciseRequest,
    ) {
        createMutation.mutate(
            request,
            {
                onSuccess: () => {
                    closeCreateForm()
                },
            },
        )
    }

    function handleUpdate(
        request: CreateExerciseRequest,
    ) {
        if (!editingExerciseId) {
            return
        }

        updateMutation.mutate({
            exerciseId: editingExerciseId,
            request,
        })
    }

    function handleDelete() {
        if (!deleteTarget) {
            return
        }

        deleteMutation.mutate(
            deleteTarget.id,
            {
                onSuccess: () => {
                    setDeleteTarget(null)
                },
            },
        )
    }

    function handleAddAlternative(
        alternativeExerciseId: string,
        reason: string,
        reverseReason: string,
    ) {
        if (!editingExerciseId) {
            return
        }

        createAlternativeMutation.mutate({
            exerciseId: editingExerciseId,
            request: {
                alternativeExerciseId,
                reason,
                reverseReason,
            },
        })
    }

    function handleDeleteAlternative(
        alternativeId: string,
    ) {
        if (!editingExerciseId) {
            return
        }

        deleteAlternativeMutation.mutate({
            exerciseId: editingExerciseId,
            alternativeId,
        })
    }

    function handleAddFocusVariation(
        focusBodyPartId: string,
        name: string,
        description: string,
        animationReference: string,
    ) {
        if (!editingExerciseId) {
            return
        }

        createFocusVariationMutation.mutate({
            exerciseId: editingExerciseId,
            request: {
                focusBodyPartId,
                name,
                description,
                animationReference,
            },
        })
    }

    function handleUpdateFocusVariation(
        variationId: string,
        name: string,
        description: string,
        animationReference: string,
    ) {
        if (!editingExerciseId) {
            return
        }

        updateFocusVariationMutation.mutate({
            exerciseId: editingExerciseId,
            variationId,
            request: {
                name,
                description,
                animationReference,
            },
        })
    }

    function handleDeleteFocusVariation(
        variationId: string,
    ) {
        if (!editingExerciseId) {
            return
        }

        deleteFocusVariationMutation.mutate({
            exerciseId: editingExerciseId,
            variationId,
        })
    }


    return {
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
    }
}
