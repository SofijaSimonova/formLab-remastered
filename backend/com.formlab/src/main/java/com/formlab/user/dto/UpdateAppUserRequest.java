package com.formlab.user.dto;

import jakarta.validation.constraints.Size;

public record UpdateAppUserRequest(
        @Size(max = 100)
        String firstName,

        @Size(max = 100)
        String lastName
) {
}