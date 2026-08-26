package com.formlab.goal.mapper;

import com.formlab.goal.dto.UserGoalResponse;
import com.formlab.goal.entity.UserGoal;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserGoalMapper {

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "goalId", source = "goal.id")
    @Mapping(target = "goalName", source = "goal.name")
    UserGoalResponse toResponse(UserGoal userGoal);
}