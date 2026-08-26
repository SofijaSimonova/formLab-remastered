package com.formlab.exercise.dto;

import java.util.UUID;

public record ReferenceResponse(
        UUID id,
        String name
) {
}