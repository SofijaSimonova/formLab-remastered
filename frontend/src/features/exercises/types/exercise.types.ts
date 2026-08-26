export interface ExerciseListResponse {
    id: string
    name: string
}

export interface ExerciseResponse {
    id: string
    name: string
    description: string
    instructions: string
    movementPatternId: string
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

export interface ExerciseListResponse {
    id: string
    name: string
}

export interface ExerciseResponse {
    id: string
    name: string
    description: string
    instructions: string
    movementPatternId: string
    bodyParts: ReferenceResponse[]
    equipment: ReferenceResponse[]
    focusVariations: ExerciseFocusVariationResponse[]
}