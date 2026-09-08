package com.formlab.workout.mapper;

import com.formlab.workout.dto.CreateWorkoutSessionResponse;
import com.formlab.workout.entity.WorkoutSession;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutSessionMapper {

    @Mapping(target = "workoutId", source = "workout.id")
    CreateWorkoutSessionResponse toResponse(WorkoutSession workoutSession);
}