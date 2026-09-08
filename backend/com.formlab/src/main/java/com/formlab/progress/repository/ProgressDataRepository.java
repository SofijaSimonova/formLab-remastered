package com.formlab.progress.repository;

import com.formlab.workout.entity.enums.WorkoutSessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.formlab.workout.entity.WorkoutSession;

import java.util.List;
import java.util.UUID;

public interface ProgressDataRepository
        extends JpaRepository<WorkoutSession, UUID> {

    @Query("""
        SELECT
            ws.id AS sessionId,
            w.id AS workoutId,
            w.name AS workoutName,
            ws.startedAt AS startedAt,
            ws.completedAt AS completedAt
        FROM WorkoutSession ws
        JOIN ws.workout w
        WHERE w.user.id = :userId
          AND ws.status = :status
        ORDER BY ws.completedAt ASC
    """)
    List<ProgressSessionProjection> findSessions(
            @Param("userId") UUID userId,
            @Param("status") WorkoutSessionStatus status
    );

    @Query("""
        SELECT
            ws.id AS sessionId,
            we.id AS workoutExerciseId,
            e.id AS exerciseId,
            e.name AS exerciseName,
            we.exerciseOrder AS exerciseOrder
        FROM WorkoutSession ws
        JOIN ws.workout w
        JOIN WorkoutExercise we
            ON we.workout = w
        JOIN we.exercise e
        WHERE w.user.id = :userId
          AND ws.status = :status
        ORDER BY
            ws.completedAt ASC,
            we.exerciseOrder ASC
    """)
    List<ProgressExerciseProjection> findExercises(
            @Param("userId") UUID userId,
            @Param("status") WorkoutSessionStatus status
    );

    @Query("""
    SELECT
        ws.id AS sessionId,
        we.id AS workoutExerciseId,
        workoutSet.id AS setId,
        workoutSet.setNumber AS setNumber,
        workoutSet.weight AS weight,
        workoutSet.reps AS reps,
        workoutSet.completedAt AS completedAt
    FROM WorkoutSet workoutSet
    JOIN workoutSet.workoutSession ws
    JOIN workoutSet.workoutExercise we
    JOIN ws.workout w
    WHERE w.user.id = :userId
      AND ws.status = :status
    ORDER BY
        ws.completedAt ASC,
        we.exerciseOrder ASC,
        workoutSet.setNumber ASC
""")
    List<ProgressSetProjection> findSets(
            @Param("userId") UUID userId,
            @Param("status") WorkoutSessionStatus status
    );

    @Query("""
        SELECT
            ug.goal.id AS goalId,
            ug.goal.name AS goalName
        FROM UserGoal ug
        WHERE ug.user.id = :userId
        ORDER BY ug.createdAt ASC
    """)
    List<ProgressGoalProjection> findGoals(
            @Param("userId") UUID userId
    );
}