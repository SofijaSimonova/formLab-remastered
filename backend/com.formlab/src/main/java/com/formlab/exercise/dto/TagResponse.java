package com.formlab.exercise.dto;

import java.util.UUID;

public record TagResponse(
        UUID id,
        String name
) {
}