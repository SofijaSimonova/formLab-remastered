package com.formlab.exercise.projection;

import com.formlab.exercise.entity.ExerciseTrackingType;

import java.util.UUID;

public interface ExerciseListProjection {

    UUID getId();

    String getName();

    String getDescription();

    UUID getMovementPatternId();

    ExerciseTrackingType getTrackingType();
}