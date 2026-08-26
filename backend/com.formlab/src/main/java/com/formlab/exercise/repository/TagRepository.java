package com.formlab.exercise.repository;

import com.formlab.exercise.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {

    boolean existsByNameIgnoreCase(String name);
}