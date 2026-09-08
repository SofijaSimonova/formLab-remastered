package com.formlab.ai.prompt;

import com.formlab.ai.dto.context.ProgressAiContext;

public interface PromptBuilder {

    String buildProgressPrompt(
            ProgressAiContext context
    );
}