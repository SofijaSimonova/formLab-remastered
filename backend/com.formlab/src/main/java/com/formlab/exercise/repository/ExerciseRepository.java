package com.formlab.exercise.repository;

import com.formlab.exercise.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExerciseRepository extends JpaRepository<Exercise, UUID>, JpaSpecificationExecutor<Exercise> {


    @Query("""
        SELECT e
        FROM Exercise e
        """)
    Page<Exercise> findAllPaginated(Pageable pageable);

    @Query("""
        SELECT DISTINCT e
        FROM Exercise e
        LEFT JOIN FETCH e.bodyParts
        LEFT JOIN FETCH e.tags
        WHERE e.id IN :ids
        """)
    List<Exercise> findAllWithListDetailsByIds(
            @Param("ids") List<UUID> ids
    );

    @Query("""
    SELECT DISTINCT e
    FROM Exercise e
    LEFT JOIN FETCH e.bodyParts
    LEFT JOIN FETCH e.tags
    """)
    List<Exercise> findAllWithListDetails();


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