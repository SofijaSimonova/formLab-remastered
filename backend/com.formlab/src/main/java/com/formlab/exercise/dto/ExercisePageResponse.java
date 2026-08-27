package com.formlab.exercise.dto;

import java.util.List;

public record ExercisePageResponse(
        List<ExerciseListResponse> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {
}