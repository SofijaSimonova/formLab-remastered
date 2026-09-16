package com.formlab.exercise.repository;

import com.formlab.exercise.entity.ExerciseFocusVariation;
import com.formlab.exercise.projection.ExerciseFocusVariationProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ExerciseFocusVariationRepository
        extends JpaRepository<ExerciseFocusVariation, UUID> {

    List<ExerciseFocusVariation> findByExerciseId(UUID exerciseId);

    @Query("""
    SELECT
        variation.id AS id,
        variation.exercise.id AS exerciseId,
        variation.focusBodyPart.id AS focusBodyPartId,
        variation.name AS name,
        variation.description AS description,
        variation.animationReference AS animationReference
    FROM ExerciseFocusVariation variation
    WHERE variation.exercise.id = :exerciseId
    ORDER BY variation.name
    """)
    List<ExerciseFocusVariationProjection> findProjectionsByExerciseId(
            @Param("exerciseId") UUID exerciseId
    );
}