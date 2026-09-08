package com.formlab.ai.controller;

import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.input.StrengthProgressRange;
import com.formlab.ai.dto.output.ProgressAnalysisResponse;
import com.formlab.ai.service.ProgressAnalysisService;
import com.formlab.ai.service.ProgressService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import com.formlab.ai.dto.input.ProgressQuestionRequest;
import com.formlab.ai.dto.output.ProgressQuestionResponse;
import com.formlab.ai.service.ProgressQuestionService;
import jakarta.validation.Valid;

import java.util.UUID;

@RestController
public class ProgressController {

    private final ProgressService progressService;
    private final ProgressAnalysisService progressAnalysisService;
    private final ProgressQuestionService progressQuestionService;

    public ProgressController(
            ProgressService progressService,
            ProgressAnalysisService progressAnalysisService,
            ProgressQuestionService progressQuestionService
    ) {
        this.progressService = progressService;
        this.progressAnalysisService = progressAnalysisService;
        this.progressQuestionService = progressQuestionService;
    }

    @GetMapping("/api/ai/progress/{exerciseId}")
    public ProgressAnalysisResponse analyzeProgress(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
            @PathVariable UUID exerciseId,
            @RequestParam(
                    required = false,
                    defaultValue = "THREE_MONTHS"
            )
            StrengthProgressRange range
    ) {
        String accessToken =
                authorization.substring("Bearer ".length());

        ProgressAiContext context =
                progressService.getProgressContext(
                        accessToken,
                        exerciseId,
                        range
                );

        return progressAnalysisService.analyze(
                accessToken,
                exerciseId,
                range,
                context
        );
    }
        @GetMapping("/api/ai/progress/{exerciseId}/context")
        public ProgressAiContext getProgressContext(
                @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
                @PathVariable UUID exerciseId,
                @RequestParam(
                        required = false,
                        defaultValue = "THREE_MONTHS"
                )
                StrengthProgressRange range
        ) {
            String accessToken =
                    authorization.substring("Bearer ".length());

            return progressService.getProgressContext(
                    accessToken,
                    exerciseId,
                    range
            );
        }

    @PostMapping("/api/ai/progress/{exerciseId}/questions")
    public ProgressQuestionResponse answerQuestion(
            @RequestHeader(HttpHeaders.AUTHORIZATION)
            String authorization,

            @PathVariable UUID exerciseId,

            @RequestParam(
                    required = false,
                    defaultValue = "THREE_MONTHS"
            )
            StrengthProgressRange range,

            @Valid
            @RequestBody
            ProgressQuestionRequest request
    ) {
        String accessToken =
                authorization.substring("Bearer ".length());

        ProgressAiContext context =
                progressService.getProgressContext(
                        accessToken,
                        exerciseId,
                        range
                );

        return progressQuestionService.answer(
                context,
                request.question()
        );
    }
}