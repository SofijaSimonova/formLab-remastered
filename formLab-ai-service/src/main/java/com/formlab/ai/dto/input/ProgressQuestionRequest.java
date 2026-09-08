package com.formlab.ai.dto.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProgressQuestionRequest(

        @NotBlank
        @Size(max = 500)
        String question
) {
}