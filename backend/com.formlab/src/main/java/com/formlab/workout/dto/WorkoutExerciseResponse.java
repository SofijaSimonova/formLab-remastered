package com.formlab.workout.dto;

import com.formlab.exercise.entity.ExerciseTrackingType;

import java.util.UUID;

public record WorkoutExerciseResponse(
        UUID id,
        UUID workoutId,
        UUID exerciseId,
        String exerciseName,
        ExerciseTrackingType trackingType,
        Integer exerciseOrder,
        Integer targetSets,
        Integer targetReps
) {
}