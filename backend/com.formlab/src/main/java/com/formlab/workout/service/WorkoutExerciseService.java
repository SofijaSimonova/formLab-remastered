package com.formlab.workout.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.entity.Exercise;
import com.formlab.exercise.repository.ExerciseRepository;
import com.formlab.workout.dto.AddWorkoutExerciseRequest;
import com.formlab.workout.dto.WorkoutExerciseResponse;
import com.formlab.workout.entity.Workout;
import com.formlab.workout.entity.WorkoutExercise;
import com.formlab.workout.mapper.WorkoutExerciseMapper;
import com.formlab.workout.repository.WorkoutExerciseRepository;
import com.formlab.workout.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkoutExerciseService {

    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutExerciseMapper workoutExerciseMapper;

    public WorkoutExerciseService(
            WorkoutExerciseRepository workoutExerciseRepository,
            WorkoutRepository workoutRepository,
            ExerciseRepository exerciseRepository,
            WorkoutExerciseMapper workoutExerciseMapper
    ) {
        this.workoutExerciseRepository = workoutExerciseRepository;
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
        this.workoutExerciseMapper = workoutExerciseMapper;
    }

    public List<WorkoutExerciseResponse> getWorkoutExercises(
            UUID workoutId
    ) {
        if (!workoutRepository.existsById(workoutId)) {
            throw new ResourceNotFoundException("Workout not found");
        }

        return workoutExerciseRepository
                .findByWorkoutIdOrderByExerciseOrder(workoutId)
                .stream()
                .map(workoutExerciseMapper::toResponse)
                .toList();
    }

    public WorkoutExerciseResponse addExercise(
            UUID workoutId,
            AddWorkoutExerciseRequest request
    ) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout not found"
                        )
                );

        Exercise exercise = exerciseRepository.findById(request.exerciseId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Exercise not found"
                        )
                );

        boolean orderExists =
                workoutExerciseRepository
                        .existsByWorkoutIdAndExerciseOrder(
                                workoutId,
                                request.exerciseOrder()
                        );

        if (orderExists) {
            throw new BadRequestException(
                    "Exercise order is already used in this workout"
            );
        }

        WorkoutExercise workoutExercise = new WorkoutExercise();

        workoutExercise.setWorkout(workout);
        workoutExercise.setExercise(exercise);
        workoutExercise.setExerciseOrder(request.exerciseOrder());
        workoutExercise.setTargetSets(request.targetSets());
        workoutExercise.setTargetReps(request.targetReps());

        return workoutExerciseMapper.toResponse(
                workoutExerciseRepository.save(workoutExercise)
        );
    }

    public void removeExercise(
            UUID workoutId,
            UUID workoutExerciseId
    ) {
        WorkoutExercise workoutExercise =
                workoutExerciseRepository.findById(workoutExerciseId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Workout exercise not found"
                                )
                        );

        if (!workoutExercise.getWorkout()
                .getId()
                .equals(workoutId)) {

            throw new BadRequestException(
                    "Exercise does not belong to this workout"
            );
        }

        workoutExerciseRepository.delete(workoutExercise);
    }
}