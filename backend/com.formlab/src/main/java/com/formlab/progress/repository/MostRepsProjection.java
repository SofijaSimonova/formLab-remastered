package com.formlab.progress.repository;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

public interface MostRepsProjection {

    UUID getExerciseId();

    String getExerciseName();

    Integer getReps();

    Instant getAchievedAt();

    UUID getWorkoutSessionId();

    String getWorkoutName();
}