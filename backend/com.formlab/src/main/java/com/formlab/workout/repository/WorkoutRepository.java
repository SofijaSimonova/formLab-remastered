package com.formlab.workout.repository;

import com.formlab.workout.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkoutRepository extends JpaRepository<Workout, UUID> {

    List<Workout> findByUserId(UUID userId);

    boolean existsByIdAndUserId(UUID workoutId, UUID userId);
}