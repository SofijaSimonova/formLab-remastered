package com.formlab.ai.service;

import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.output.GeminiProgressAnalysisResponse;
import com.formlab.ai.dto.output.ProgressAnalysisResponse;
import com.formlab.ai.dto.output.ProgressQuestionResponse;
import com.formlab.ai.prompt.ProgressPromptBuilder;
import com.formlab.ai.prompt.ProgressQuestionPromptBuilder;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Schema;
import com.google.genai.types.Type;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

import java.util.List;
import java.util.Map;

@Service
public class GeminiAiModel implements AiModel {

    private final Client client;
    private final JsonMapper jsonMapper;
    private final ProgressPromptBuilder promptBuilder;
    private final String model;
    private final ProgressQuestionPromptBuilder questionPromptBuilder;

    public GeminiAiModel(
            @Value("${gemini.api-key}") String apiKey,
            @Value("${gemini.model}") String model,
            JsonMapper jsonMapper,
            ProgressPromptBuilder promptBuilder,
            ProgressQuestionPromptBuilder questionPromptBuilder
    ) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();

        this.jsonMapper = jsonMapper;
        this.promptBuilder = promptBuilder;
        this.model = model;
        this.questionPromptBuilder = questionPromptBuilder;
    }

    @Override
    public GeminiProgressAnalysisResponse analyze(
            ProgressAiContext context
    ) {
        String prompt =
                promptBuilder.buildProgressPrompt(context);

        GenerateContentConfig config =
                GenerateContentConfig.builder()
                        .responseMimeType("application/json")
                        .candidateCount(1)
                        .responseSchema(buildResponseSchema())
                        .build();

        GenerateContentResponse response =
                client.models.generateContent(
                        model,
                        prompt,
                        config
                );

        String json = response.text();

        if (json == null || json.isBlank()) {
            throw new IllegalStateException(
                    "Gemini returned an empty response"
            );
        }

        try {
            return jsonMapper.readValue(
                    json,
                    GeminiProgressAnalysisResponse.class
            );
        } catch (JacksonException e) {
            throw new IllegalStateException(
                    "Failed to parse Gemini response",
                    e
            );
        }
    }

    @Override
    public ProgressQuestionResponse answerQuestion(
            ProgressAiContext context,
            String question
    ) {
        String prompt =
                questionPromptBuilder.build(
                        context,
                        question
                );

        GenerateContentConfig config =
                GenerateContentConfig.builder()
                        .responseMimeType("application/json")
                        .candidateCount(1)
                        .responseSchema(
                                buildQuestionResponseSchema()
                        )
                        .build();

        GenerateContentResponse response =
                client.models.generateContent(
                        model,
                        prompt,
                        config
                );

        String json = response.text();

        if (json == null || json.isBlank()) {
            throw new IllegalStateException(
                    "Gemini returned an empty response"
            );
        }

        try {
            return jsonMapper.readValue(
                    json,
                    ProgressQuestionResponse.class
            );
        } catch (JacksonException e) {
            throw new IllegalStateException(
                    "Failed to parse Gemini question response",
                    e
            );
        }
    }

    private Schema buildResponseSchema() {

        Schema stringArraySchema =
                Schema.builder()
                        .type(Type.Known.ARRAY)
                        .items(
                                Schema.builder()
                                        .type(Type.Known.STRING)
                                        .build()
                        )
                        .build();

        return Schema.builder()
                .type(Type.Known.OBJECT)
                .properties(
                        Map.of(
                                "summary",
                                Schema.builder()
                                        .type(Type.Known.STRING)
                                        .description(
                                                "A concise overall interpretation of the user's progress."
                                        )
                                        .build(),

                                "insights",
                                stringArraySchema,

                                "recommendations",
                                stringArraySchema
                        )
                )
                .required(
                        List.of(
                                "summary",
                                "insights",
                                "recommendations"
                        )
                )
                .build();
    }

    private Schema buildQuestionResponseSchema() {
        return Schema.builder()
                .type(Type.Known.OBJECT)
                .properties(
                        Map.of(
                                "answer",
                                Schema.builder()
                                        .type(Type.Known.STRING)
                                        .description(
                                                "A concise, practical answer " +
                                                        "to the user's progress question."
                                        )
                                        .build()
                        )
                )
                .required(
                        List.of("answer")
                )
                .build();
    }


}