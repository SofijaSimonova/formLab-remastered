package com.formlab.workout.security;

import com.formlab.auth.security.AuthenticatedUser;
import com.formlab.workout.entity.WorkoutExercise;
import com.formlab.workout.entity.WorkoutSet;
import com.formlab.workout.repository.WorkoutExerciseRepository;
import com.formlab.workout.repository.WorkoutRepository;
import com.formlab.workout.repository.WorkoutSetRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component("workoutSecurity")
public class WorkoutSecurity {

    private final WorkoutRepository workoutRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutSetRepository workoutSetRepository;

    public WorkoutSecurity(
            WorkoutRepository workoutRepository,
            WorkoutExerciseRepository workoutExerciseRepository,
            WorkoutSetRepository workoutSetRepository
    ) {
        this.workoutRepository = workoutRepository;
        this.workoutExerciseRepository = workoutExerciseRepository;
        this.workoutSetRepository = workoutSetRepository;
    }

    public boolean isWorkoutOwner(
            Authentication authentication,
            UUID workoutId
    ) {
        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();

        return workoutRepository.existsByIdAndUserId(
                workoutId,
                user.getUserId()
        );
    }

    public boolean isWorkoutExerciseOwner(
            Authentication authentication,
            UUID workoutExerciseId
    ) {
        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();

        return workoutExerciseRepository
                .findById(workoutExerciseId)
                .map(WorkoutExercise::getWorkout)
                .map(workout ->
                        workout.getUser()
                                .getId()
                                .equals(user.getUserId())
                )
                .orElse(false);
    }

    public boolean isWorkoutSetOwner(
            Authentication authentication,
            UUID setId
    ) {
        AuthenticatedUser user =
                (AuthenticatedUser) authentication.getPrincipal();

        return workoutSetRepository
                .findById(setId)
                .map(WorkoutSet::getWorkoutExercise)
                .map(WorkoutExercise::getWorkout)
                .map(workout ->
                        workout.getUser()
                                .getId()
                                .equals(user.getUserId())
                )
                .orElse(false);
    }
}