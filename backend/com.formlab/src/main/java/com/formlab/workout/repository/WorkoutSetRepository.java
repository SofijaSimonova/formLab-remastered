package com.formlab.workout.repository;

import com.formlab.workout.entity.WorkoutSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface WorkoutSetRepository
        extends JpaRepository<WorkoutSet, UUID> {

    List<WorkoutSet> findByWorkoutSessionIdAndWorkoutExerciseIdOrderBySetNumber(
            UUID workoutSessionId,
            UUID workoutExerciseId
    );

    boolean existsByWorkoutSessionIdAndWorkoutExerciseIdAndSetNumber(
            UUID workoutSessionId,
            UUID workoutExerciseId,
            Integer setNumber
    );

    @Query("""
            SELECT workoutSet
            FROM WorkoutSet workoutSet
            JOIN FETCH workoutSet.workoutExercise workoutExercise
            JOIN FETCH workoutExercise.exercise
            WHERE workoutSet.workoutSession.id = :workoutSessionId
            ORDER BY workoutExercise.exerciseOrder ASC, workoutSet.setNumber ASC
            """)
    List<WorkoutSet> findByWorkoutSessionIdOrderByWorkoutExerciseExerciseOrderAscSetNumberAsc(
            @Param("workoutSessionId") UUID workoutSessionId
    );


    @Query("""
        SELECT
            workoutExercise.id AS workoutExerciseId,
            exercise.name AS exerciseName,
            workoutExercise.exerciseOrder AS exerciseOrder,
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
        FROM WorkoutSet workoutSet
        JOIN workoutSet.workoutExercise workoutExercise
        JOIN workoutExercise.exercise exercise
        WHERE workoutSet.workoutSession.id = :sessionId
        GROUP BY
            workoutExercise.id,
            exercise.name,
            workoutExercise.exerciseOrder
        ORDER BY workoutExercise.exerciseOrder ASC
        """)
    List<WorkoutSessionExerciseAggregationProjection> findSessionExerciseAggregations(
            @Param("sessionId") UUID sessionId
    );

    @Query(value = """
        SELECT DISTINCT ON (ws.workout_exercise_id)
            ws.workout_exercise_id AS workoutExerciseId,
            ws.weight AS bestSetWeight,
            ws.reps AS bestSetReps
        FROM workout_set ws
        WHERE ws.workout_session_id = :sessionId
        ORDER BY
            ws.workout_exercise_id,
            ws.weight DESC NULLS LAST,
            ws.reps DESC,
            ws.set_number ASC
        """, nativeQuery = true)
    List<WorkoutSessionBestSetProjection> findBestSetsBySessionId(
            @Param("sessionId") UUID sessionId
    );

    @Query("""
        SELECT
            COUNT(DISTINCT workoutSet.workoutExercise.id) AS exerciseCount,
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
        FROM WorkoutSet workoutSet
        WHERE workoutSet.workoutSession.id = :sessionId
        """)
    WorkoutSessionTotalsProjection findSessionTotals(
            @Param("sessionId") UUID sessionId
    );
}
