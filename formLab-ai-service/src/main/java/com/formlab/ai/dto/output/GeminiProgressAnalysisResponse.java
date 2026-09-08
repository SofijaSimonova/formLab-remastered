package com.formlab.ai.dto.output;

import java.util.List;

public record GeminiProgressAnalysisResponse(
        String summary,
        List<String> insights,
        List<String> recommendations
) {
}