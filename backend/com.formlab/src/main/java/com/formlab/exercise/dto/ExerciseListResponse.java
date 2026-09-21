package com.formlab.exercise.dto;

import com.formlab.exercise.entity.ExerciseTrackingType;

import java.util.List;
import java.util.UUID;

public record ExerciseListResponse(
        UUID id,
        String name,
        String description,
        List<ReferenceResponse> bodyParts,
        List<ReferenceResponse> tags,
        ExerciseTrackingType trackingType
) {
}