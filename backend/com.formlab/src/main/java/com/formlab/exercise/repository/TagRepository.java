package com.formlab.exercise.repository;

import com.formlab.exercise.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
    @Query("""
    SELECT t
    FROM Exercise e
    JOIN e.tags t
    WHERE e.id = :exerciseId
    """)
    List<Tag> findByExerciseId(
            @Param("exerciseId") UUID exerciseId
    );

    boolean existsByNameIgnoreCase(String name);
}