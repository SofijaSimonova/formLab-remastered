package com.formlab.workout.mapper;

import com.formlab.workout.dto.WorkoutSetResponse;
import com.formlab.workout.entity.WorkoutSet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutSetMapper {

    @Mapping(
            target = "workoutSessionId",
            source = "workoutSession.id"
    )
    @Mapping(
            target = "workoutExerciseId",
            source = "workoutExercise.id"
    )
    WorkoutSetResponse toResponse(WorkoutSet workoutSet);
}