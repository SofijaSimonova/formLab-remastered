package com.formlab.workout.repository;

import com.formlab.workout.entity.WorkoutSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkoutSetRepository extends JpaRepository<WorkoutSet, UUID> {

    List<WorkoutSet> findByWorkoutExerciseIdOrderBySetNumber(
            UUID workoutExerciseId
    );

    boolean existsByWorkoutExerciseIdAndSetNumber(
            UUID workoutExerciseId,
            Integer setNumber
    );
}