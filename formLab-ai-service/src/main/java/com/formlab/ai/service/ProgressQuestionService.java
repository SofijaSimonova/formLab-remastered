package com.formlab.ai.service;

import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.input.StrengthProgressRange;
import com.formlab.ai.dto.output.ProgressQuestionResponse;
import com.formlab.ai.security.JwtUserIdentityService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProgressQuestionService {

    private final AiModel aiModel;
    private final ProgressQuestionCacheService cacheService;
    private final JwtUserIdentityService jwtUserIdentityService;
    private final ProgressService progressService;

    public ProgressQuestionService(
            AiModel aiModel,
            ProgressQuestionCacheService cacheService,
            JwtUserIdentityService jwtUserIdentityService,
            ProgressService progressService
    ) {
        this.aiModel = aiModel;
        this.cacheService = cacheService;
        this.jwtUserIdentityService =
                jwtUserIdentityService;
        this.progressService =
                progressService;
    }

    public ProgressQuestionResponse answer(
            String accessToken,
            UUID exerciseId,
            StrengthProgressRange range,
            String question
    ) {
        UUID userId =
                jwtUserIdentityService.extractUserId(
                        accessToken
                );

        ProgressQuestionResponse cached =
                cacheService.get(
                        userId,
                        exerciseId,
                        range,
                        question
                );

        if (cached != null) {
            return cached;
        }

        ProgressAiContext context =
                progressService.getProgressContext(
                        accessToken,
                        exerciseId,
                        range
                );

        ProgressQuestionResponse response =
                aiModel.answerQuestion(
                        context,
                        question
                );

        cacheService.save(
                userId,
                exerciseId,
                range,
                question,
                response
        );

        return response;
    }
}