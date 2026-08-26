package com.formlab.exercise.repository;

import com.formlab.exercise.entity.ExerciseFocusVariation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ExerciseFocusVariationRepository
        extends JpaRepository<ExerciseFocusVariation, UUID> {

    List<ExerciseFocusVariation> findByExerciseId(UUID exerciseId);
}