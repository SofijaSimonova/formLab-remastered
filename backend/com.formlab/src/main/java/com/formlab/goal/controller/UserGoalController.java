package com.formlab.goal.controller;

import com.formlab.goal.dto.AddUserGoalRequest;
import com.formlab.goal.dto.UserGoalResponse;
import com.formlab.goal.service.UserGoalService;
import com.formlab.security.AuthorizationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/me/goals")
public class UserGoalController {

    private final UserGoalService userGoalService;
    private final AuthorizationService authorizationService;

    public UserGoalController(
            UserGoalService userGoalService,
            AuthorizationService authorizationService
    ) {
        this.userGoalService = userGoalService;
        this.authorizationService = authorizationService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public List<UserGoalResponse> getUserGoals(
            Authentication authentication
    ) {
        return userGoalService.getUserGoals(
                authorizationService.getCurrentUserId(authentication)
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("isAuthenticated()")
    public UserGoalResponse addGoal(
            Authentication authentication,
            @Valid @RequestBody AddUserGoalRequest request
    ) {
        return userGoalService.addGoal(
                authorizationService.getCurrentUserId(authentication),
                request
        );
    }

    @DeleteMapping("/{userGoalId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("isAuthenticated()")
    public void removeGoal(
            Authentication authentication,
            @PathVariable java.util.UUID userGoalId
    ) {
        userGoalService.removeGoal(
                authorizationService.getCurrentUserId(authentication),
                userGoalId
        );
    }
}