package com.formlab.ai.dto.input;

import java.util.List;

public record ProgressDataResponse(
        List<WorkoutSessionData> sessions,
        List<UserGoalData> goals
) {
}