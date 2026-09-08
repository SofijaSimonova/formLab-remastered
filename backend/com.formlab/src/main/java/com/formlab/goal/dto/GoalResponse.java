package com.formlab.goal.dto;

import java.util.UUID;

public record GoalResponse(
        UUID id,
        String name,
        String description
) {
}