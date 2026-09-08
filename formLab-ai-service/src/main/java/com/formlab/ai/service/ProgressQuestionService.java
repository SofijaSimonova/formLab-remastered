package com.formlab.ai.service;

import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.output.ProgressQuestionResponse;
import org.springframework.stereotype.Service;

@Service
public class ProgressQuestionService {

    private final AiModel aiModel;

    public ProgressQuestionService(
            AiModel aiModel
    ) {
        this.aiModel = aiModel;
    }

    public ProgressQuestionResponse answer(
            ProgressAiContext context,
            String question
    ) {
        return aiModel.answerQuestion(
                context,
                question
        );
    }
}