package com.formlab.workout.mapper;

import com.formlab.workout.dto.WorkoutExerciseResponse;
import com.formlab.workout.entity.WorkoutExercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutExerciseMapper {

    @Mapping(target = "workoutId", source = "workout.id")
    @Mapping(target = "exerciseId", source = "exercise.id")
    @Mapping(target = "exerciseName", source = "exercise.name")
    @Mapping(target = "trackingType", source = "exercise.trackingType")
    WorkoutExerciseResponse toResponse(
            WorkoutExercise workoutExercise
    );
}