package com.formlab.exercise.controller;

import com.formlab.exercise.dto.CreateExerciseFocusVariationRequest;
import com.formlab.exercise.dto.ExerciseFocusVariationResponse;
import com.formlab.exercise.dto.UpdateExerciseFocusVariationRequest;
import com.formlab.exercise.service.ExerciseFocusVariationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/exercises/{exerciseId}/focus-variations")
public class ExerciseFocusVariationController {

    private final ExerciseFocusVariationService variationService;

    public ExerciseFocusVariationController(
            ExerciseFocusVariationService variationService
    ) {
        this.variationService = variationService;
    }

    @GetMapping
    public List<ExerciseFocusVariationResponse> getByExercise(
            @PathVariable UUID exerciseId
    ) {
        return variationService.getByExercise(exerciseId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseFocusVariationResponse create(
            @PathVariable UUID exerciseId,
            @Valid @RequestBody CreateExerciseFocusVariationRequest request
    ) {
        return variationService.create(exerciseId, request);
    }

    @PutMapping("/{variationId}")
    public ExerciseFocusVariationResponse update(
            @PathVariable UUID exerciseId,
            @PathVariable UUID variationId,
            @Valid @RequestBody UpdateExerciseFocusVariationRequest request
    ) {
        return variationService.update(exerciseId, variationId, request);
    }

    @DeleteMapping("/{variationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable UUID exerciseId,
            @PathVariable UUID variationId
    ) {
        variationService.delete(exerciseId, variationId);
    }
}