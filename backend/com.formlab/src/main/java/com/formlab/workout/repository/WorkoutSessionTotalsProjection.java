package com.formlab.workout.repository;

import java.math.BigDecimal;

public interface WorkoutSessionTotalsProjection {

    Long getExerciseCount();

    Long getTotalSets();

    BigDecimal getTotalVolume();
}