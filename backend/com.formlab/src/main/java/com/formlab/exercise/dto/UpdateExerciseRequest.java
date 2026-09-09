package com.formlab.exercise.dto;

import com.formlab.exercise.entity.ExerciseTrackingType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;
import java.util.UUID;

public record UpdateExerciseRequest(
        @NotBlank
        @Size(max = 150)
        String name,

        @Size(max = 10000)
        String description,

        @Size(max = 10000)
        String instructions,

        UUID movementPatternId,

        @NotNull
        ExerciseTrackingType trackingType,

        Set<UUID> bodyPartIds,

        Set<UUID> equipmentIds,

        Set<UUID> tagIds
) {}