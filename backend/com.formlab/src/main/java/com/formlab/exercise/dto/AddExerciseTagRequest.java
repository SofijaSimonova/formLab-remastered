package com.formlab.exercise.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AddExerciseTagRequest(

        @NotNull
        UUID tagId

) {
}