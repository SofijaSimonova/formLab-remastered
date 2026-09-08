package com.formlab.ai.dto.context;

public record ProgressTrend(
        String exerciseName,
        String metric,
        TrendDirection direction
) {
}