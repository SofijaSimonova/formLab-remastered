package com.formlab.exercise.dto;

import com.formlab.exercise.entity.ExerciseTrackingType;

import java.util.List;
import java.util.UUID;

public record ExerciseResponse(
        UUID id,
        String name,
        String description,
        String instructions,
        List<ReferenceResponse> bodyParts,
        List<ReferenceResponse> equipment,
        ExerciseTrackingType trackingType,
        List<ExerciseFocusVariationResponse> focusVariations
) {
}