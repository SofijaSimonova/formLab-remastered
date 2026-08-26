package com.formlab.exercise.mapper;

import com.formlab.exercise.dto.ExerciseAlternativeResponse;
import com.formlab.exercise.entity.ExerciseAlternative;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ExerciseAlternativeMapper {

    @Mapping(target = "exerciseId", source = "exercise.id")
    @Mapping(target = "alternativeExerciseId", source = "alternativeExercise.id")
    @Mapping(target = "alternativeExerciseName", source = "alternativeExercise.name")
    ExerciseAlternativeResponse toResponse(ExerciseAlternative alternative);
}