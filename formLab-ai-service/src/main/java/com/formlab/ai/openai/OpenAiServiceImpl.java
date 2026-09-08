//package com.formlab.ai.openai;
//
//import com.formlab.ai.dto.context.ProgressAiContext;
//import com.formlab.ai.dto.output.ProgressAnalysisResponse;
//import com.formlab.ai.prompt.ProgressPromptBuilder;
//import com.openai.client.OpenAIClient;
//import com.openai.models.ChatModel;
//import com.openai.models.responses.ResponseCreateParams;
//import com.openai.models.responses.StructuredResponse;
//import org.springframework.stereotype.Service;
//
//@Service
//public class OpenAiServiceImpl implements OpenAiService {
//
//    private final OpenAIClient client;
//    private final ProgressPromptBuilder promptBuilder;
//
//    public OpenAiServiceImpl(
//            OpenAIClient client,
//            ProgressPromptBuilder promptBuilder
//    ) {
//        this.client = client;
//        this.promptBuilder = promptBuilder;
//    }
//
//    @Override
//    public ProgressAnalysisResponse analyzeProgress(
//            ProgressAiContext context
//    ) {
//        String prompt =
//                promptBuilder.buildProgressPrompt(context);
//
//        var params = ResponseCreateParams.builder()
//                .input(prompt)
//                .text(ProgressAnalysisResponse.class)
//                .model(ChatModel.GPT_5_2)
//                .build();
//
//        StructuredResponse<ProgressAnalysisResponse> response =
//                client.responses().create(params);
//
//        return response.output()
//                .stream()
//                .flatMap(item -> item.message().stream())
//                .flatMap(message -> message.content().stream())
//                .flatMap(content -> content.outputText().stream())
//                .findFirst()
//                .orElseThrow(() ->
//                        new IllegalStateException(
//                                "OpenAI returned no structured progress analysis"
//                        )
//                );
//    }
//}