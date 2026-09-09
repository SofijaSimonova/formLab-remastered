package com.formlab.exercise.controller;

import com.formlab.exercise.dto.CreateExerciseRequest;
import com.formlab.exercise.dto.ExercisePageResponse;
import com.formlab.exercise.dto.ExerciseResponse;
import com.formlab.exercise.dto.UpdateExerciseRequest;
import com.formlab.exercise.service.ExerciseService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public ExercisePageResponse getAllExercises(Pageable pageable, @RequestParam(required = false) String search, @RequestParam(required = false) UUID bodyPartId) {
        return exerciseService.getAllExercises(pageable, search, bodyPartId);
    }

    @GetMapping("/{id}")
    public ExerciseResponse getExerciseById(@PathVariable UUID id) {
        return exerciseService.getExerciseById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseResponse createExercise(
            @Valid @RequestBody CreateExerciseRequest request
    ) {
        return exerciseService.createExercise(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ExerciseResponse updateExercise(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateExerciseRequest request
    ) {
        return exerciseService.updateExercise(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable UUID id) {
        exerciseService.deleteExercise(id);
    }
}