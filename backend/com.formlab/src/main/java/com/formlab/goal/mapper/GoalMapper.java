package com.formlab.goal.mapper;

import com.formlab.goal.dto.GoalResponse;
import com.formlab.goal.entity.Goal;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GoalMapper {

    GoalResponse toResponse(Goal goal);
}