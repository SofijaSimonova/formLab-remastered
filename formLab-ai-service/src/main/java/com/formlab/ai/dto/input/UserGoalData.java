package com.formlab.ai.dto.input;

import java.util.UUID;

public record UserGoalData(
        UUID goalId,
        String goalName
) {
}