package com.formlab.progress.repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

public interface HighestVolumeProjection {

    UUID getWorkoutSessionId();

    String getWorkoutName();

    BigDecimal getVolume();

    Instant getAchievedAt();
}