package com.formlab.goal.repository;

import com.formlab.goal.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GoalRepository extends JpaRepository<Goal, UUID> {
}