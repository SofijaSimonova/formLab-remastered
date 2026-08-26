package com.formlab.exercise.repository;

import com.formlab.exercise.entity.ExerciseAlternative;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExerciseAlternativeRepository
        extends JpaRepository<ExerciseAlternative, UUID> {

    @Query("""
            SELECT ea
            FROM ExerciseAlternative ea
            JOIN FETCH ea.alternativeExercise
            WHERE ea.exercise.id = :exerciseId
            """)
    List<ExerciseAlternative> findByExerciseId(
            @Param("exerciseId") UUID exerciseId
    );

    boolean existsByExerciseIdAndAlternativeExerciseId(
            UUID exerciseId,
            UUID alternativeExerciseId
    );

    Optional<ExerciseAlternative> findByExerciseIdAndAlternativeExerciseId(
            UUID exerciseId,
            UUID alternativeExerciseId
    );
}