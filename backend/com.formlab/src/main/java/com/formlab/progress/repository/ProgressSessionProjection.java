package com.formlab.progress.repository;

import java.time.OffsetDateTime;
import java.util.UUID;

public interface ProgressSessionProjection {

    UUID getSessionId();

    UUID getWorkoutId();

    String getWorkoutName();

    OffsetDateTime getStartedAt();

    OffsetDateTime getCompletedAt();
}