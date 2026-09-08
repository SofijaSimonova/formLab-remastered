package com.formlab.ai.dto.output;

import java.util.List;

public record ProgressAnalysisResponse(
        String summary,
        List<String> insights,
        List<String> recommendations,
        List<String> suggestedPrompts
) {
}