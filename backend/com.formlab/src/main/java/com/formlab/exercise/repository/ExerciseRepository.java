package com.formlab.exercise.repository;

import com.formlab.exercise.entity.Exercise;
import com.formlab.exercise.projection.ExerciseDetailProjection;
import com.formlab.exercise.projection.ExerciseReferenceByExerciseProjection;
import com.formlab.exercise.projection.ExerciseReferenceProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ExerciseRepository extends JpaRepository<Exercise, UUID>, JpaSpecificationExecutor<Exercise> {


//    @Query("""
//        SELECT e
//        FROM Exercise e
//        """)
//    Page<Exercise> findAllPaginated(Pageable pageable);
//
//    @Query("""
//        SELECT DISTINCT e
//        FROM Exercise e
//        LEFT JOIN FETCH e.bodyParts
//        LEFT JOIN FETCH e.tags
//        WHERE e.id IN :ids
//        """)
//    List<Exercise> findAllWithListDetailsByIds(
//            @Param("ids") List<UUID> ids
//    );
//
//    @Query("""
//    SELECT DISTINCT e
//    FROM Exercise e
//    LEFT JOIN FETCH e.bodyParts
//    LEFT JOIN FETCH e.tags
//    """)
//    List<Exercise> findAllWithListDetails();
//
//
//    @Query("""
//        SELECT DISTINCT e
//        FROM Exercise e
//        LEFT JOIN FETCH e.bodyParts
//        LEFT JOIN FETCH e.equipment
//        WHERE e.id = :id
//        """)
//    Optional<Exercise> findByIdWithDetails(@Param("id") UUID id);

    @Query("""
        SELECT DISTINCT e
        FROM Exercise e
        LEFT JOIN FETCH e.tags
        WHERE e.id = :id
        """)
    Optional<Exercise> findByIdWithTags(@Param("id") UUID id);

    @Query("""
    SELECT
        e.id AS id,
        e.name AS name,
        e.description AS description,
        e.instructions AS instructions,
        e.trackingType AS trackingType
    FROM Exercise e
    WHERE e.id = :id
    """)
    Optional<ExerciseDetailProjection> findDetailProjectionById(
            @Param("id") UUID id
    );

    @Query("""
    SELECT
        bp.id AS id,
        bp.name AS name
    FROM Exercise e
    JOIN e.bodyParts bp
    WHERE e.id = :exerciseId
    ORDER BY bp.name
    """)
    List<ExerciseReferenceProjection> findBodyPartProjections(
            @Param("exerciseId") UUID exerciseId
    );

    @Query("""
    SELECT
        equipment.id AS id,
        equipment.name AS name
    FROM Exercise e
    JOIN e.equipment equipment
    WHERE e.id = :exerciseId
    ORDER BY equipment.name
    """)
    List<ExerciseReferenceProjection> findEquipmentProjections(
            @Param("exerciseId") UUID exerciseId
    );

    @Query("""
    SELECT
        e.id AS exerciseId,
        bp.id AS id,
        bp.name AS name
    FROM Exercise e
    JOIN e.bodyParts bp
    WHERE e.id IN :exerciseIds
    ORDER BY bp.name
    """)
    List<ExerciseReferenceByExerciseProjection> findBodyPartsForExercises(
            @Param("exerciseIds") Collection<UUID> exerciseIds
    );

    @Query("""
    SELECT
        e.id AS exerciseId,
        tag.id AS id,
        tag.name AS name
    FROM Exercise e
    JOIN e.tags tag
    WHERE e.id IN :exerciseIds
    ORDER BY tag.name
    """)
    List<ExerciseReferenceByExerciseProjection> findTagsForExercises(
            @Param("exerciseIds") Collection<UUID> exerciseIds
    );
}