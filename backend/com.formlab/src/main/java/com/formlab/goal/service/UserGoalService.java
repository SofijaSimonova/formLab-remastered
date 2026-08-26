package com.formlab.goal.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.goal.dto.AddUserGoalRequest;
import com.formlab.goal.dto.UserGoalResponse;
import com.formlab.goal.entity.Goal;
import com.formlab.goal.entity.UserGoal;
import com.formlab.goal.mapper.UserGoalMapper;
import com.formlab.goal.repository.GoalRepository;
import com.formlab.goal.repository.UserGoalRepository;
import com.formlab.user.entity.AppUser;
import com.formlab.user.repository.AppUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserGoalService {

    private final UserGoalRepository userGoalRepository;
    private final GoalRepository goalRepository;
    private final AppUserRepository appUserRepository;
    private final UserGoalMapper userGoalMapper;

    public UserGoalService(
            UserGoalRepository userGoalRepository,
            GoalRepository goalRepository,
            AppUserRepository appUserRepository,
            UserGoalMapper userGoalMapper
    ) {
        this.userGoalRepository = userGoalRepository;
        this.goalRepository = goalRepository;
        this.appUserRepository = appUserRepository;
        this.userGoalMapper = userGoalMapper;
    }

    public List<UserGoalResponse> getUserGoals(UUID userId) {
        if (!appUserRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }

        return userGoalRepository.findByUserId(userId)
                .stream()
                .map(userGoalMapper::toResponse)
                .toList();
    }

    public UserGoalResponse addGoal(
            UUID userId,
            AddUserGoalRequest request
    ) {
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        Goal goal = goalRepository.findById(request.goalId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Goal not found")
                );

        if (userGoalRepository.existsByUserIdAndGoalId(
                userId,
                request.goalId()
        )) {
            throw new BadRequestException(
                    "Goal is already assigned to this user"
            );
        }

        UserGoal userGoal = new UserGoal();
        userGoal.setUser(user);
        userGoal.setGoal(goal);

        return userGoalMapper.toResponse(
                userGoalRepository.save(userGoal)
        );
    }


    public void removeGoal(UUID userId, UUID userGoalId) {
        UserGoal userGoal = userGoalRepository.findById(userGoalId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User goal not found")
                );

        if (!userGoal.getUser().getId().equals(userId)) {
            throw new BadRequestException(
                    "Goal does not belong to this user"
            );
        }

        userGoalRepository.delete(userGoal);
    }
}