package com.formlab.exercise.controller;

import com.formlab.exercise.dto.AddExerciseTagRequest;
import com.formlab.exercise.dto.ExerciseTagResponse;
import com.formlab.exercise.service.ExerciseTagService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/exercises/{exerciseId}/tags")
public class ExerciseTagController {

    private final ExerciseTagService exerciseTagService;

    public ExerciseTagController(
            ExerciseTagService exerciseTagService
    ) {
        this.exerciseTagService = exerciseTagService;
    }

    @GetMapping
    public List<ExerciseTagResponse> getTags(
            @PathVariable UUID exerciseId
    ) {
        return exerciseTagService.getTags(exerciseId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseTagResponse addTag(
            @PathVariable UUID exerciseId,
            @Valid @RequestBody AddExerciseTagRequest request
    ) {
        return exerciseTagService.addTag(exerciseId, request);
    }

    @DeleteMapping("/{tagId}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeTag(
            @PathVariable UUID exerciseId,
            @PathVariable UUID tagId
    ) {
        exerciseTagService.removeTag(exerciseId, tagId);
    }
}