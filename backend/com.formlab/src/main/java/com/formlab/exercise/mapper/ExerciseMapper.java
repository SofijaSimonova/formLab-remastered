package com.formlab.exercise.mapper;

import com.formlab.exercise.dto.CreateExerciseRequest;
import com.formlab.exercise.dto.ExerciseListResponse;
import com.formlab.exercise.dto.ExerciseResponse;
import com.formlab.exercise.dto.ReferenceResponse;
import com.formlab.exercise.dto.UpdateExerciseRequest;
import com.formlab.exercise.entity.BodyPart;
import com.formlab.exercise.entity.Equipment;
import com.formlab.exercise.entity.Exercise;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(
        componentModel = "spring",
        uses = ExerciseFocusVariationMapper.class
)
public interface ExerciseMapper {

    @Mapping(target = "bodyParts", ignore = true)
    @Mapping(target = "equipment", ignore = true)
    @Mapping(target = "tags", ignore = true)
    Exercise toEntity(CreateExerciseRequest request);

    ExerciseResponse toResponse(Exercise exercise);

    ExerciseListResponse toListResponse(Exercise exercise);

    @Mapping(target = "bodyParts", ignore = true)
    @Mapping(target = "equipment", ignore = true)
    @Mapping(target = "tags", ignore = true)
    void updateEntity(
            UpdateExerciseRequest request,
            @MappingTarget Exercise exercise
    );

    ReferenceResponse toReferenceResponse(BodyPart bodyPart);

    ReferenceResponse toReferenceResponse(Equipment equipment);
}