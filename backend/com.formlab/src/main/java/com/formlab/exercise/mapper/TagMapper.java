package com.formlab.exercise.mapper;

import com.formlab.exercise.dto.CreateTagRequest;
import com.formlab.exercise.dto.TagResponse;
import com.formlab.exercise.dto.UpdateTagRequest;
import com.formlab.exercise.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TagMapper {

    @Mapping(target = "id", ignore = true)
    Tag toEntity(CreateTagRequest request);

    TagResponse toResponse(Tag tag);

    @Mapping(target = "id", ignore = true)
    void updateEntity(
            UpdateTagRequest request,
            @MappingTarget Tag tag
    );
}