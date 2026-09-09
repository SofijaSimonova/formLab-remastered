package com.formlab.workout.repository;

import com.formlab.workout.entity.WorkoutExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkoutExerciseRepository
        extends JpaRepository<WorkoutExercise, UUID> {

    @Query("""
            SELECT we
            FROM WorkoutExercise we
            JOIN FETCH we.exercise
            WHERE we.workout.id = :workoutId
            ORDER BY we.exerciseOrder
            """)
    List<WorkoutExercise> findByWorkoutIdOrderByExerciseOrder(
            @Param("workoutId") UUID workoutId
    );

    boolean existsByWorkoutIdAndExerciseOrder(
            UUID workoutId,
            Integer exerciseOrder
    );

    Optional<WorkoutExercise> findByWorkoutIdAndExerciseId(
            UUID workoutId,
            UUID exerciseId
    );

    boolean existsByIdAndWorkoutUserId(
            UUID workoutExerciseId,
            UUID userId
    );

    @Query("""
        SELECT we
        FROM WorkoutExercise we
        JOIN FETCH we.exercise
        WHERE we.id = :workoutExerciseId
        """)
    Optional<WorkoutExercise> findByIdWithExercise(
            @Param("workoutExerciseId") UUID workoutExerciseId
    );

    @Query("""
        SELECT CASE WHEN COUNT(we) > 0 THEN true ELSE false END
        FROM WorkoutExercise we
        WHERE we.id = :workoutExerciseId
          AND we.workout.id = :workoutId
        """)
    boolean existsByIdAndWorkoutId(
            @Param("workoutExerciseId") UUID workoutExerciseId,
            @Param("workoutId") UUID workoutId
    );

    boolean existsByExerciseId(UUID exerciseId);
}
