package com.formlab.exercise.dto;

import java.util.List;
import java.util.UUID;

public record ExerciseResponse(
        UUID id,
        String name,
        String description,
        String instructions,
        UUID movementPatternId,
        List<ReferenceResponse> bodyParts,
        List<ReferenceResponse> equipment,
        List<ExerciseFocusVariationResponse> focusVariations
) {
}