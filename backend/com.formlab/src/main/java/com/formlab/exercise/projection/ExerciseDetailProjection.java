package com.formlab.exercise.projection;

import com.formlab.exercise.entity.ExerciseTrackingType;

import java.util.UUID;

public interface ExerciseDetailProjection {

    UUID getId();

    String getName();

    String getDescription();

    String getInstructions();

    UUID getMovementPatternId();

    ExerciseTrackingType getTrackingType();
}