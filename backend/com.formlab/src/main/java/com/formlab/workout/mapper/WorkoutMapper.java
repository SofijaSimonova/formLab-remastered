package com.formlab.workout.mapper;

import com.formlab.workout.dto.WorkoutResponse;
import com.formlab.workout.entity.Workout;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WorkoutMapper {

    @Mapping(target = "userId", source = "user.id")
    WorkoutResponse toResponse(Workout workout);
}