package com.formlab.exercise.dto;

import java.util.UUID;

public record ExerciseFocusVariationResponse(
        UUID id,
        UUID exerciseId,
        UUID focusBodyPartId,
        String name,
        String description,
        String animationReference
) {
}