package com.formlab.exercise.repository;

import com.formlab.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {

    @Query("""
        SELECT DISTINCT e
        FROM Exercise e
        LEFT JOIN FETCH e.bodyParts
        LEFT JOIN FETCH e.equipment
        WHERE e.id = :id
        """)
    Optional<Exercise> findByIdWithDetails(@Param("id") UUID id);

    @Query("""
        SELECT DISTINCT e
        FROM Exercise e
        LEFT JOIN FETCH e.tags
        WHERE e.id = :id
        """)
    Optional<Exercise> findByIdWithTags(@Param("id") UUID id);
}