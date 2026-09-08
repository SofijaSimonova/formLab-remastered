package com.formlab.progress.repository;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public interface ProgressSetProjection {

    UUID getSessionId();

    UUID getWorkoutExerciseId();

    UUID getSetId();

    Integer getSetNumber();

    BigDecimal getWeight();

    Integer getReps();

    OffsetDateTime getCompletedAt();
}