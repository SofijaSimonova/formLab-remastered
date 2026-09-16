package com.formlab.ai.common.exception;

public record ErrorResponse(
        int status,
        String message
) {
}
