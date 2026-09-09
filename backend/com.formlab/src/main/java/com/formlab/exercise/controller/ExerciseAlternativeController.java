package com.formlab.exercise.controller;

import com.formlab.exercise.dto.CreateExerciseAlternativeRequest;
import com.formlab.exercise.dto.ExerciseAlternativeResponse;
import com.formlab.exercise.service.ExerciseAlternativeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/exercises/{exerciseId}/alternatives")
public class ExerciseAlternativeController {

    private final ExerciseAlternativeService alternativeService;

    public ExerciseAlternativeController(
            ExerciseAlternativeService alternativeService
    ) {
        this.alternativeService = alternativeService;
    }

    @GetMapping
    public List<ExerciseAlternativeResponse> getAlternatives(
            @PathVariable UUID exerciseId
    ) {
        return alternativeService.getAlternatives(exerciseId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseAlternativeResponse createAlternative(
            @PathVariable UUID exerciseId,
            @Valid @RequestBody CreateExerciseAlternativeRequest request
    ) {
        return alternativeService.createAlternative(exerciseId, request);
    }

    @DeleteMapping("/{alternativeId}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAlternative(
            @PathVariable UUID exerciseId,
            @PathVariable UUID alternativeId
    ) {
        alternativeService.deleteAlternative(exerciseId, alternativeId);
    }
}