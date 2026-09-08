package com.formlab.progress.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ProgressPersonalRecordsRepository
        extends Repository<com.formlab.workout.entity.WorkoutSession, UUID> {

    @Query(value = """
        SELECT
            e.id AS "exerciseId",
            e.name AS "exerciseName",
            ws_set.weight AS "weight",
            ws_set.completed_at AS "achievedAt",
            ws.id AS "workoutSessionId",
            w.name AS "workoutName"

        FROM workout_set ws_set

        JOIN workout_session ws
            ON ws.id = ws_set.workout_session_id

        JOIN workout_exercise we
            ON we.id = ws_set.workout_exercise_id

        JOIN exercise e
            ON e.id = we.exercise_id

        JOIN workout w
            ON w.id = ws.workout_id

        WHERE w.user_id = :userId
          AND ws.status = 'COMPLETED'
          AND ws_set.weight IS NOT NULL

        ORDER BY
            ws_set.weight DESC,
            ws_set.completed_at DESC

        LIMIT 1
        """, nativeQuery = true)
    HeaviestWeightProjection findHeaviestWeight(
            @Param("userId") UUID userId
    );

    @Query(value = """
        SELECT
            e.id AS "exerciseId",
            e.name AS "exerciseName",
            ws_set.reps AS "reps",
            ws_set.completed_at AS "achievedAt",
            ws.id AS "workoutSessionId",
            w.name AS "workoutName"

        FROM workout_set ws_set

        JOIN workout_session ws
            ON ws.id = ws_set.workout_session_id

        JOIN workout_exercise we
            ON we.id = ws_set.workout_exercise_id

        JOIN exercise e
            ON e.id = we.exercise_id

        JOIN workout w
            ON w.id = ws.workout_id

        WHERE w.user_id = :userId
          AND ws.status = 'COMPLETED'

        ORDER BY
            ws_set.reps DESC,
            ws_set.completed_at DESC

        LIMIT 1
        """, nativeQuery = true)
    MostRepsProjection findMostReps(
            @Param("userId") UUID userId
    );

    @Query(value = """
        SELECT
            ws.id AS "workoutSessionId",
            w.name AS "workoutName",
            COALESCE(
                SUM(
                    CASE
                        WHEN ws_set.weight IS NOT NULL
                        THEN ws_set.weight * ws_set.reps
                        ELSE 0
                    END
                ),
                0
            ) AS "volume",
            ws.completed_at AS "achievedAt"

        FROM workout_session ws

        JOIN workout w
            ON w.id = ws.workout_id

        LEFT JOIN workout_set ws_set
            ON ws_set.workout_session_id = ws.id

        WHERE w.user_id = :userId
          AND ws.status = 'COMPLETED'

        GROUP BY
            ws.id,
            w.name,
            ws.completed_at

        ORDER BY
            "volume" DESC,
            ws.completed_at DESC

        LIMIT 1
        """, nativeQuery = true)
    HighestVolumeProjection findHighestVolume(
            @Param("userId") UUID userId
    );

    @Query(value = """
    SELECT
        e.id AS "exerciseId",
        e.name AS "exerciseName",
        current_set.weight AS "weight",
        current_set.reps AS "reps",
        current_set.completed_at AS "achievedAt",
        current_session.id AS "workoutSessionId",
        current_workout.name AS "workoutName"

    FROM workout_set current_set

    JOIN workout_session current_session
        ON current_session.id = current_set.workout_session_id

    JOIN workout_exercise current_we
        ON current_we.id = current_set.workout_exercise_id

    JOIN exercise e
        ON e.id = current_we.exercise_id

    JOIN workout current_workout
        ON current_workout.id = current_session.workout_id

    WHERE current_workout.user_id = :userId
      AND current_session.status = 'COMPLETED'
      AND current_set.weight IS NOT NULL

      -- The current set must not be the first recorded
      -- performance for this exercise.
      AND EXISTS (
          SELECT 1
          FROM workout_set previous_set

          JOIN workout_session previous_session
              ON previous_session.id =
                 previous_set.workout_session_id

          JOIN workout_exercise previous_we
              ON previous_we.id =
                 previous_set.workout_exercise_id

          WHERE previous_we.exercise_id = current_we.exercise_id
            AND previous_session.status = 'COMPLETED'
            AND previous_set.weight IS NOT NULL
            AND previous_set.completed_at <
                current_set.completed_at
      )

      -- There must be no previous performance that is
      -- better than or equal to the current performance.
      AND NOT EXISTS (
          SELECT 1
          FROM workout_set previous_set

          JOIN workout_session previous_session
              ON previous_session.id =
                 previous_set.workout_session_id

          JOIN workout_exercise previous_we
              ON previous_we.id =
                 previous_set.workout_exercise_id

          WHERE previous_we.exercise_id = current_we.exercise_id
            AND previous_session.status = 'COMPLETED'
            AND previous_set.weight IS NOT NULL
            AND previous_set.completed_at <
                current_set.completed_at

            AND (
                previous_set.weight > current_set.weight

                OR (
                    previous_set.weight = current_set.weight
                    AND previous_set.reps >= current_set.reps
                )
            )
      )

    ORDER BY current_set.completed_at DESC

    LIMIT 1
    """, nativeQuery = true)
    RecentPrProjection findRecentPr(
            @Param("userId") UUID userId
    );
}