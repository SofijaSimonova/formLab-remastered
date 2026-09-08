package com.formlab.workout.repository;

import java.math.BigDecimal;
import java.util.UUID;

public interface WorkoutSessionExerciseAggregationProjection {

    UUID getWorkoutExerciseId();

    String getExerciseName();

    Integer getExerciseOrder();

    Long getTotalSets();

    BigDecimal getTotalVolume();
}