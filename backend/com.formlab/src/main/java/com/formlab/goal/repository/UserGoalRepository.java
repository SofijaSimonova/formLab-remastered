package com.formlab.goal.repository;

import com.formlab.goal.entity.UserGoal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserGoalRepository extends JpaRepository<UserGoal, UUID> {

    List<UserGoal> findByUserId(UUID userId);
    boolean existsByUserIdAndGoalId(UUID userId, UUID goalId);
}