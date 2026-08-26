package com.formlab.exercise.mapper;

import com.formlab.exercise.dto.CreateExerciseFocusVariationRequest;
import com.formlab.exercise.dto.ExerciseFocusVariationResponse;
import com.formlab.exercise.dto.UpdateExerciseFocusVariationRequest;
import com.formlab.exercise.entity.ExerciseFocusVariation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
@Mapper(componentModel = "spring")
public interface ExerciseFocusVariationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "exercise", ignore = true)
    @Mapping(target = "focusBodyPart", ignore = true)
    ExerciseFocusVariation toEntity(
            CreateExerciseFocusVariationRequest request
    );

    @Mapping(target = "exerciseId", source = "exercise.id")
    @Mapping(target = "focusBodyPartId", source = "focusBodyPart.id")
    ExerciseFocusVariationResponse toResponse(
            ExerciseFocusVariation variation
    );

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "exercise", ignore = true)
    @Mapping(target = "focusBodyPart", ignore = true)
    void updateEntity(
            UpdateExerciseFocusVariationRequest request,
            @MappingTarget ExerciseFocusVariation variation
    );
}