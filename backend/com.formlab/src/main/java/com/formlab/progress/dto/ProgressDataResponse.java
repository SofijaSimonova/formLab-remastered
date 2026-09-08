package com.formlab.progress.dto;

import java.util.List;

public record ProgressDataResponse(
        List<WorkoutSessionData> sessions,
        List<UserGoalData> goals
) {
}