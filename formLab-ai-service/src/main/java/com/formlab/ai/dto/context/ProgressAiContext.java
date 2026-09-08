package com.formlab.ai.dto.context;

import com.formlab.ai.dto.input.StrengthProgressResponse;

import java.util.List;

public record ProgressAiContext(
        List<String> goals,
        StrengthProgressResponse strengthProgress,
        ExercisePerformanceData exercisePerformance,
        List<ProgressTrend> trends
) {
}