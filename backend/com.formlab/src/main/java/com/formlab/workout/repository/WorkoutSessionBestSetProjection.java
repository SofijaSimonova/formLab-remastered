package com.formlab.workout.repository;

import java.math.BigDecimal;
import java.util.UUID;

public interface WorkoutSessionBestSetProjection {

    UUID getWorkoutExerciseId();

    BigDecimal getBestSetWeight();

    Integer getBestSetReps();
}