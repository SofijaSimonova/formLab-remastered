package com.formlab.exercise.dto;

import java.util.List;
import java.util.UUID;

public record ExerciseListResponse(
        UUID id,
        String name,
        String description,
        UUID movementPatternId,
        List<ReferenceResponse> bodyParts,
        List<ReferenceResponse> tags
) {
}