package com.formlab.exercise.repository;

import com.formlab.exercise.entity.MovementPattern;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovementPatternRepository extends JpaRepository<MovementPattern, UUID> {
}