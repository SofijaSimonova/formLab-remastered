package com.formlab.workout.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.workout.dto.CreateWorkoutSetRequest;
import com.formlab.workout.dto.WorkoutSetResponse;
import com.formlab.workout.entity.WorkoutExercise;
import com.formlab.workout.entity.WorkoutSet;
import com.formlab.workout.mapper.WorkoutSetMapper;
import com.formlab.workout.repository.WorkoutExerciseRepository;
import com.formlab.workout.repository.WorkoutSetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkoutSetService {

    private final WorkoutSetRepository workoutSetRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutSetMapper workoutSetMapper;

    public WorkoutSetService(
            WorkoutSetRepository workoutSetRepository,
            WorkoutExerciseRepository workoutExerciseRepository,
            WorkoutSetMapper workoutSetMapper
    ) {
        this.workoutSetRepository = workoutSetRepository;
        this.workoutExerciseRepository = workoutExerciseRepository;
        this.workoutSetMapper = workoutSetMapper;
    }

    public List<WorkoutSetResponse> getSets(UUID workoutExerciseId) {
        if (!workoutExerciseRepository.existsById(workoutExerciseId)) {
            throw new ResourceNotFoundException(
                    "Workout exercise not found"
            );
        }

        return workoutSetRepository
                .findByWorkoutExerciseIdOrderBySetNumber(workoutExerciseId)
                .stream()
                .map(workoutSetMapper::toResponse)
                .toList();
    }

    public WorkoutSetResponse addSet(
            UUID workoutExerciseId,
            CreateWorkoutSetRequest request
    ) {
        WorkoutExercise workoutExercise = workoutExerciseRepository
                .findById(workoutExerciseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout exercise not found"
                        )
                );

        boolean setExists =
                workoutSetRepository
                        .existsByWorkoutExerciseIdAndSetNumber(
                                workoutExerciseId,
                                request.setNumber()
                        );

        if (setExists) {
            throw new BadRequestException(
                    "Set number is already used for this exercise"
            );
        }

        WorkoutSet workoutSet = new WorkoutSet();

        workoutSet.setWorkoutExercise(workoutExercise);
        workoutSet.setSetNumber(request.setNumber());
        workoutSet.setWeight(request.weight());
        workoutSet.setReps(request.reps());

        return workoutSetMapper.toResponse(
                workoutSetRepository.save(workoutSet)
        );
    }

    public void deleteSet(
            UUID workoutExerciseId,
            UUID setId
    ) {
        WorkoutSet workoutSet = workoutSetRepository.findById(setId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout set not found"
                        )
                );

        if (!workoutSet.getWorkoutExercise()
                .getId()
                .equals(workoutExerciseId)) {

            throw new BadRequestException(
                    "Set does not belong to this workout exercise"
            );
        }

        workoutSetRepository.delete(workoutSet);
    }
}