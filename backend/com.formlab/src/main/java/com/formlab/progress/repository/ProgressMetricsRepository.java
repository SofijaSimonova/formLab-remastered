package com.formlab.progress.repository;

import com.formlab.workout.entity.WorkoutSession;
import com.formlab.workout.entity.enums.WorkoutSessionStatus;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface ProgressMetricsRepository
        extends Repository<WorkoutSession, UUID> {

    @Query("""
        SELECT
            COUNT(DISTINCT ws.id) AS totalWorkouts,

            COUNT(workoutSet.id) AS totalSets,

            COALESCE(
                SUM(
                    CASE
                        WHEN workoutSet.weight IS NOT NULL
                        THEN workoutSet.weight * workoutSet.reps
                        ELSE 0
                    END
                ),
                0
            ) AS totalVolume

        FROM WorkoutSession ws

        JOIN ws.workout w

        LEFT JOIN WorkoutSet workoutSet
            ON workoutSet.workoutSession = ws

        WHERE w.user.id = :userId
          AND ws.status = :status
    """)
    ProgressMetricsProjection getMetrics(
            @Param("userId") UUID userId,
            @Param("status") WorkoutSessionStatus status
    );

    @Query(value = """
    SELECT
        ws.completed_at AS date,
        COALESCE(
            SUM(
                CASE
                    WHEN workout_set.weight IS NOT NULL
                    THEN workout_set.weight * workout_set.reps
                    ELSE 0
                END
            ),
            0
        ) AS volume
    FROM workout_session ws
    JOIN workout w
        ON w.id = ws.workout_id
    LEFT JOIN workout_set workout_set
        ON workout_set.workout_session_id = ws.id
    WHERE w.user_id = :userId
      AND ws.status = :status
      AND ws.completed_at >= :from
      AND ws.completed_at < :to
    GROUP BY ws.id, ws.completed_at
    ORDER BY ws.completed_at
    """, nativeQuery = true)
    List<ProgressDailyVolumeProjection> getDailyVolume(
            @Param("userId") UUID userId,
            @Param("status") String status,
            @Param("from") Instant from,
            @Param("to") Instant to
    );

    @Query(value = """
        SELECT DISTINCT
            ws.completed_at AS date

        FROM workout_session ws

        JOIN workout w
            ON w.id = ws.workout_id

        WHERE w.user_id = :userId
          AND ws.status = :status
          AND ws.completed_at IS NOT NULL

        ORDER BY ws.completed_at DESC
        """, nativeQuery = true)
    List<ProgressWorkoutDateProjection> getWorkoutDates(
            @Param("userId") UUID userId,
            @Param("status") String status
    );
}