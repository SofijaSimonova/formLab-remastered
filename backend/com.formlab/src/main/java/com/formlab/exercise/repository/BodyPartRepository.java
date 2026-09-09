package com.formlab.exercise.repository;

import com.formlab.exercise.entity.BodyPart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface BodyPartRepository extends JpaRepository<BodyPart, UUID> {
    @Query("""
    SELECT bp
    FROM Exercise e
    JOIN e.bodyParts bp
    WHERE e.id = :exerciseId
    """)
    List<BodyPart> findByExerciseId(
            @Param("exerciseId") UUID exerciseId
    );
}