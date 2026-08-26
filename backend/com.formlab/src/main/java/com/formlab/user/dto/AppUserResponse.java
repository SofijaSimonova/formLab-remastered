package com.formlab.user.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public record AppUserResponse(
        UUID id,
        String email,
        String firstName,
        String lastName,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
}