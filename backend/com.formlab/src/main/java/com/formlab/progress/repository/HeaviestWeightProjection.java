package com.formlab.progress.repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

public interface HeaviestWeightProjection {

    UUID getExerciseId();

    String getExerciseName();

    BigDecimal getWeight();

    Instant getAchievedAt();

    UUID getWorkoutSessionId();

    String getWorkoutName();
}