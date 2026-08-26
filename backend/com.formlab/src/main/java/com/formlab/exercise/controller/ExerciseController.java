package com.formlab.exercise.controller;

import com.formlab.exercise.dto.CreateExerciseRequest;
import com.formlab.exercise.dto.ExerciseListResponse;
import com.formlab.exercise.dto.ExerciseResponse;
import com.formlab.exercise.dto.UpdateExerciseRequest;
import com.formlab.exercise.service.ExerciseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "http://localhost:5173")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<ExerciseListResponse> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public ExerciseResponse getExerciseById(@PathVariable UUID id) {
        return exerciseService.getExerciseById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExerciseResponse createExercise(
            @RequestBody CreateExerciseRequest request
    ) {
        return exerciseService.createExercise(request);
    }

    @PutMapping("/{id}")
    public ExerciseResponse updateExercise(
            @PathVariable UUID id,
            @RequestBody UpdateExerciseRequest request
    ) {
        return exerciseService.updateExercise(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExercise(@PathVariable UUID id) {
        exerciseService.deleteExercise(id);
    }
}