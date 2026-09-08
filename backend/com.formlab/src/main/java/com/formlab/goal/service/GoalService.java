package com.formlab.goal.service;

import com.formlab.goal.dto.GoalResponse;
import com.formlab.goal.mapper.GoalMapper;
import com.formlab.goal.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;

    public GoalService(
            GoalRepository goalRepository,
            GoalMapper goalMapper
    ) {
        this.goalRepository = goalRepository;
        this.goalMapper = goalMapper;
    }

    public List<GoalResponse> getGoals() {
        return goalRepository.findAll()
                .stream()
                .map(goalMapper::toResponse)
                .toList();
    }
}