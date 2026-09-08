package com.formlab.workout.repository;

import com.formlab.workout.entity.WorkoutSession;
import com.formlab.workout.entity.enums.WorkoutSessionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface WorkoutSessionRepository
        extends JpaRepository<WorkoutSession, UUID>, JpaSpecificationExecutor<WorkoutSession> {

    List<WorkoutSession> findByWorkoutIdOrderByStartedAtDesc(
            UUID workoutId
    );

    @Query("""
            SELECT workoutSession
            FROM WorkoutSession workoutSession
            JOIN FETCH workoutSession.workout workout
            WHERE workoutSession.id = :sessionId
              AND workout.id = :workoutId
            """)
    Optional<WorkoutSession> findByIdAndWorkoutId(
            @Param("sessionId") UUID sessionId,
            @Param("workoutId") UUID workoutId
    );

    boolean existsByWorkoutIdAndStatus(
            UUID workoutId,
            WorkoutSessionStatus status
    );

    boolean existsByIdAndWorkoutUserId(
            UUID workoutSessionId,
            UUID userId
    );

    @Query("""
        SELECT ws
        FROM WorkoutSession ws
        JOIN FETCH ws.workout
        WHERE ws.id = :sessionId
        """)
    Optional<WorkoutSession> findByIdWithWorkout(
            @Param("sessionId") UUID sessionId
    );

    @Query("""
        SELECT we.exercise.id
        FROM WorkoutSession ws
        JOIN ws.workout w
        JOIN WorkoutExercise we
            ON we.workout.id = w.id
        WHERE ws.id = :sessionId
        """)
    List<UUID> findExerciseIdsBySessionId(
            @Param("sessionId") UUID sessionId
    );

    @Query(
            value = """
                SELECT
                    ws.id AS sessionId,
                    w.id AS workoutId,
                    w.name AS workoutName,
                    ws.status AS status,
                    ws.started_at AS startedAt,
                    ws.completed_at AS completedAt,

                    CASE
                        WHEN ws.status = 'IN_PROGRESS'
                        THEN (
                            SELECT we.id
                            FROM workout_exercise we
                            LEFT JOIN (
                                SELECT
                                    workout_exercise_id,
                                    COUNT(*) AS set_count
                                FROM workout_set
                                WHERE workout_session_id = ws.id
                                GROUP BY workout_exercise_id
                            ) logged
                                ON logged.workout_exercise_id = we.id
                            WHERE we.workout_id = w.id
                            ORDER BY
                                CASE
                                    WHEN we.target_sets IS NOT NULL
                                         AND COALESCE(logged.set_count, 0) < we.target_sets
                                    THEN 0

                                    WHEN we.target_sets IS NULL
                                         AND COALESCE(logged.set_count, 0) = 0
                                    THEN 0

                                    ELSE 1
                                END ASC,

                                CASE
                                    WHEN we.target_sets IS NOT NULL
                                         AND COALESCE(logged.set_count, 0) < we.target_sets
                                    THEN we.exercise_order

                                    WHEN we.target_sets IS NULL
                                         AND COALESCE(logged.set_count, 0) = 0
                                    THEN we.exercise_order

                                    ELSE NULL
                                END ASC,

                                CASE
                                    WHEN NOT (
                                        (
                                            we.target_sets IS NOT NULL
                                            AND COALESCE(logged.set_count, 0) < we.target_sets
                                        )
                                        OR
                                        (
                                            we.target_sets IS NULL
                                            AND COALESCE(logged.set_count, 0) = 0
                                        )
                                    )
                                    THEN we.exercise_order
                                    ELSE NULL
                                END DESC
                            LIMIT 1
                        )
                        ELSE NULL
                    END AS resumeWorkoutExerciseId

                FROM workout_session ws
                JOIN workout w
                    ON w.id = ws.workout_id

                WHERE w.user_id = :userId
                  AND ws.status IN ('IN_PROGRESS', 'COMPLETED')

                ORDER BY ws.started_at DESC
                """,

            countQuery = """
                SELECT COUNT(*)
                FROM workout_session ws
                JOIN workout w
                    ON w.id = ws.workout_id

                WHERE w.user_id = :userId
                  AND ws.status IN ('IN_PROGRESS', 'COMPLETED')
                """,

            nativeQuery = true
    )
    Page<WorkoutSessionHistoryProjection> findHistoryByUserId(
            @Param("userId") UUID userId,
            Pageable pageable
    );


}
