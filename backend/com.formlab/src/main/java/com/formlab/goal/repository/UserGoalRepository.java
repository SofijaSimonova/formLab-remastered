package com.formlab.goal.repository;

import com.formlab.goal.entity.UserGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserGoalRepository extends JpaRepository<UserGoal, UUID> {

    @Query("""
    select ug
    from UserGoal ug
    join fetch ug.goal
    where ug.user.id = :userId
    order by ug.createdAt desc
""")
    List<UserGoal> findByUserIdWithGoal(
            @Param("userId") UUID userId
    );
    boolean existsByUserIdAndGoalId(UUID userId, UUID goalId);
}