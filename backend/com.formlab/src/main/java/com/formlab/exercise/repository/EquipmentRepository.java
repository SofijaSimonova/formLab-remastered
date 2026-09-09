package com.formlab.exercise.repository;

import com.formlab.exercise.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface EquipmentRepository extends JpaRepository<Equipment, UUID> {
    @Query("""
    SELECT eq
    FROM Exercise e
    JOIN e.equipment eq
    WHERE e.id = :exerciseId
    """)
    List<Equipment> findByExerciseId(
            @Param("exerciseId") UUID exerciseId
    );
}