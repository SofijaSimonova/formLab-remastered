package com.formlab.progress.repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

public interface RecentPrProjection {

    UUID getExerciseId();

    String getExerciseName();

    BigDecimal getWeight();

    Integer getReps();

    Instant getAchievedAt();

    UUID getWorkoutSessionId();

    String getWorkoutName();
}