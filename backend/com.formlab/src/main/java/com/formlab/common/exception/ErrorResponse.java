package com.formlab.common.exception;

public record ErrorResponse(
        int status,
        String message
) {
}