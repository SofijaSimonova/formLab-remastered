package com.formlab.ai.dto.input;

import java.util.List;
import java.util.UUID;

public record StrengthProgressResponse(
        UUID exerciseId,
        String exerciseName,
        StrengthProgressRange range,
        List<StrengthProgressPoint> points
) {
}