package com.formlab.exercise.repository;

import com.formlab.exercise.entity.BodyPart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BodyPartRepository extends JpaRepository<BodyPart, UUID> {
}