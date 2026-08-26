package com.formlab.goal.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AddUserGoalRequest(
        @NotNull
        UUID goalId
) {
}