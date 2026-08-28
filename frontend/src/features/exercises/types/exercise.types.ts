export interface ExerciseListResponse {
    id: string
    name: string
    description: string
    movementPatternId: string | null
    bodyParts: ReferenceResponse[]
    tags: ReferenceResponse[]
}

export interface ExerciseResponse {
    id: string
    name: string
    description: string
    instructions: string
    movementPatternId: string | null
    bodyParts: ReferenceResponse[]
    equipment: ReferenceResponse[]
    focusVariations: ExerciseFocusVariationResponse[]
}

export interface ReferenceResponse {
    id: string
    name: string
}

export interface ExerciseFocusVariationResponse {
    id: string
    exerciseId: string
    focusBodyPartId: string
    name: string
    description: string
    animationReference: string
}
export interface ExercisePageResponse {
    content: ExerciseListResponse[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}
export interface ExerciseAlternativeResponse {
    id: string,
    exerciseId: string,
    alternativeExerciseId: string,
    alternativeExerciseName: string,
    reason: string
}