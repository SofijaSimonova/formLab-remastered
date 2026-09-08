package com.formlab.progress.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProgressMetricsResponse(
        long totalWorkouts,
        long totalSets,
        BigDecimal totalVolume,
        List<WeeklyVolumeData> weeklyVolume,
        int currentStreak
) {}