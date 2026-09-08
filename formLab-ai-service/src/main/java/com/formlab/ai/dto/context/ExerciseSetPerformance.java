package com.formlab.ai.dto.context;

import java.math.BigDecimal;

public record ExerciseSetPerformance(
        Integer setNumber,
        BigDecimal weight,
        Integer reps
) {
}