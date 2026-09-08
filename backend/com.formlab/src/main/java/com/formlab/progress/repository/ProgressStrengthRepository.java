package com.formlab.progress.repository;

import com.formlab.workout.entity.WorkoutSet;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public interface ProgressStrengthRepository
        extends Repository<WorkoutSet, UUID> {

    @Query(value = """
    SELECT
        ws.completed_at AS "date",
        CASE
            WHEN e.tracking_type = 'WEIGHT'
                THEN MAX(workout_set.weight)
            ELSE MAX(workout_set.reps::numeric)
        END AS "value"

    FROM workout_set workout_set

    JOIN workout_session ws
        ON ws.id = workout_set.workout_session_id

    JOIN workout_exercise we
        ON we.id = workout_set.workout_exercise_id

    JOIN workout w
        ON w.id = ws.workout_id

    JOIN exercise e
        ON e.id = we.exercise_id

    WHERE w.user_id = :userId
      AND we.exercise_id = :exerciseId
      AND ws.status = 'COMPLETED'
      AND ws.completed_at >= :from

    GROUP BY
        ws.id,
        ws.completed_at,
        e.tracking_type

    ORDER BY
        ws.completed_at ASC
    """, nativeQuery = true)
    List<StrengthProgressProjection> findStrengthProgress(
            @Param("userId") UUID userId,
            @Param("exerciseId") UUID exerciseId,
            @Param("from") OffsetDateTime from
    );

    @Query(value = """
        SELECT e.name
        FROM exercise e
        WHERE e.id = :exerciseId
        """, nativeQuery = true)
    String findExerciseName(
            @Param("exerciseId") UUID exerciseId
    );

    @Query(value = """
        SELECT e.tracking_type
        FROM exercise e
        WHERE e.id = :exerciseId
        """, nativeQuery = true)
    String findTrackingType(
            @Param("exerciseId") UUID exerciseId
    );
}