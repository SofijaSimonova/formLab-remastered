package com.formlab.workout.repository;

import com.formlab.workout.entity.enums.WorkoutSessionStatus;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

public interface WorkoutSessionHistoryProjection {

    UUID getSessionId();

    UUID getWorkoutId();

    String getWorkoutName();

    WorkoutSessionStatus getStatus();

    Instant getStartedAt();

    Instant getCompletedAt();

    UUID getResumeWorkoutExerciseId();
}