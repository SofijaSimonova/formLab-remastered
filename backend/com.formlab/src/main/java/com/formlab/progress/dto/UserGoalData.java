package com.formlab.progress.dto;

import java.util.UUID;

public record UserGoalData(
        UUID goalId,
        String goalName
) {
}