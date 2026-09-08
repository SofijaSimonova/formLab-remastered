package com.formlab.ai.service;

import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.output.GeminiProgressAnalysisResponse;
import com.formlab.ai.dto.output.ProgressQuestionResponse;

public interface AiModel {

    GeminiProgressAnalysisResponse analyze(
            ProgressAiContext context
    );

    ProgressQuestionResponse answerQuestion(
            ProgressAiContext context,
            String question
    );
}