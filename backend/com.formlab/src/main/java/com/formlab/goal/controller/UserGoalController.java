package com.formlab.goal.controller;

import com.formlab.goal.dto.AddUserGoalRequest;
import com.formlab.goal.dto.UserGoalResponse;
import com.formlab.goal.service.UserGoalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users/{userId}/goals")
public class UserGoalController {

    private final UserGoalService userGoalService;

    public UserGoalController(UserGoalService userGoalService) {
        this.userGoalService = userGoalService;
    }

    @GetMapping
    public List<UserGoalResponse> getUserGoals(
            @PathVariable UUID userId
    ) {
        return userGoalService.getUserGoals(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserGoalResponse addGoal(
            @PathVariable UUID userId,
            @Valid @RequestBody AddUserGoalRequest request
    ) {
        return userGoalService.addGoal(userId, request);
    }

    @DeleteMapping("/{userGoalId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeGoal(
            @PathVariable UUID userId,
            @PathVariable UUID userGoalId
    ) {
        userGoalService.removeGoal(userId, userGoalId);
    }
}