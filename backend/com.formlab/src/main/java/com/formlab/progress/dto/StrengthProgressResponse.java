package com.formlab.progress.dto;

import com.formlab.exercise.entity.ExerciseTrackingType;

import java.util.List;
import java.util.UUID;

public record StrengthProgressResponse(
        UUID exerciseId,
        String exerciseName,
        ExerciseTrackingType trackingType,
        StrengthProgressRange range,
        List<StrengthProgressPoint> points
) {
}