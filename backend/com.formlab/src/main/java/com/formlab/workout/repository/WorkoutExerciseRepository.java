package com.formlab.workout.repository;

import com.formlab.workout.entity.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkoutExerciseRepository
        extends JpaRepository<WorkoutExercise, UUID> {

    List<WorkoutExercise> findByWorkoutIdOrderByExerciseOrder(UUID workoutId);

    boolean existsByWorkoutIdAndExerciseOrder(
            UUID workoutId,
            Integer exerciseOrder
    );

    boolean existsByIdAndWorkoutUserId(
            UUID workoutExerciseId,
            UUID userId
    );
}