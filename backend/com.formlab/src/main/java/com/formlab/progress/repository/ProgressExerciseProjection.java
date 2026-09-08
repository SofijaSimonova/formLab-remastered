package com.formlab.progress.repository;

import java.util.UUID;

public interface ProgressExerciseProjection {

    UUID getSessionId();

    UUID getExerciseId();

    String getExerciseName();

    Integer getExerciseOrder();

    UUID getWorkoutExerciseId();
}