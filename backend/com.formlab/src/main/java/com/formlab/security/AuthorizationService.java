package com.formlab.security;

import com.formlab.auth.security.AuthenticatedUser;
import com.formlab.workout.repository.WorkoutExerciseRepository;
import com.formlab.workout.repository.WorkoutRepository;
import com.formlab.workout.repository.WorkoutSessionRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AuthorizationService {

    private final WorkoutRepository workoutRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutSessionRepository workoutSessionRepository;

    public AuthorizationService(
            WorkoutRepository workoutRepository,
            WorkoutExerciseRepository workoutExerciseRepository, WorkoutSessionRepository workoutSessionRepository
    ) {
        this.workoutRepository = workoutRepository;
        this.workoutExerciseRepository = workoutExerciseRepository;
        this.workoutSessionRepository = workoutSessionRepository;
    }

    public boolean isCurrentUser(
            UUID userId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();

        return user.getUserId().equals(userId);
    }

    public UUID getCurrentUserId(
            Authentication authentication
    ) {
        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();

        return user.getUserId();
    }

    public boolean canAccessWorkout(
            UUID workoutId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        UUID currentUserId = getCurrentUserId(authentication);

        return workoutRepository
                .existsByIdAndUserId(workoutId, currentUserId);
    }

    public boolean canAccessWorkoutExercise(
            UUID workoutExerciseId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        UUID currentUserId = getCurrentUserId(authentication);

        return workoutExerciseRepository
                .existsByIdAndWorkoutUserId(
                        workoutExerciseId,
                        currentUserId
                );
    }

    public boolean canAccessWorkoutSession(
            UUID workoutSessionId,
            Authentication authentication
    ) {
        if (authentication == null
                || !authentication.isAuthenticated()) {
            return false;
        }

        UUID currentUserId = getCurrentUserId(authentication);

        return workoutSessionRepository
                .existsByIdAndWorkoutUserId(
                        workoutSessionId,
                        currentUserId
                );
    }
}