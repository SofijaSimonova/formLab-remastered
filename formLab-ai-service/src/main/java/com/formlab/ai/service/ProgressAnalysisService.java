package com.formlab.ai.service;

import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.input.StrengthProgressRange;
import com.formlab.ai.dto.output.GeminiProgressAnalysisResponse;
import com.formlab.ai.dto.output.ProgressAnalysisResponse;
import com.formlab.ai.prompt.ProgressPromptSuggestionBuilder;
import com.formlab.ai.security.JwtUserIdentityService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProgressAnalysisService {

    private final AiModel aiModel;
    private final ProgressAnalysisCacheService cacheService;
    private final JwtUserIdentityService jwtUserIdentityService;
    private final ProgressPromptSuggestionBuilder promptSuggestionBuilder;
    private final ProgressService progressService;

    public ProgressAnalysisService(
            AiModel aiModel,
            ProgressAnalysisCacheService cacheService,
            JwtUserIdentityService jwtUserIdentityService,
            ProgressPromptSuggestionBuilder promptSuggestionBuilder,
            ProgressService progressService
    ) {
        this.aiModel = aiModel;
        this.cacheService = cacheService;
        this.jwtUserIdentityService =
                jwtUserIdentityService;
        this.promptSuggestionBuilder =
                promptSuggestionBuilder;
        this.progressService =
                progressService;
    }

    public ProgressAnalysisResponse analyze(
            String accessToken,
            UUID exerciseId,
            StrengthProgressRange range
    ) {
        UUID userId =
                jwtUserIdentityService.extractUserId(
                        accessToken
                );

        ProgressAnalysisResponse cached =
                cacheService.get(
                        userId,
                        exerciseId,
                        range
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

        GeminiProgressAnalysisResponse geminiAnalysis =
                aiModel.analyze(context);

        List<String> suggestedPrompts =
                promptSuggestionBuilder.build(context);

        ProgressAnalysisResponse response =
                new ProgressAnalysisResponse(
                        geminiAnalysis.summary(),
                        geminiAnalysis.insights(),
                        geminiAnalysis.recommendations(),
                        suggestedPrompts
                );

        cacheService.save(
                userId,
                exerciseId,
                range,
                response
        );

        return response;
    }
}