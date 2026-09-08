package com.formlab.workout.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.entity.ExerciseTrackingType;
import com.formlab.workout.dto.CreateWorkoutSetRequest;
import com.formlab.workout.dto.WorkoutSetResponse;
import com.formlab.workout.entity.WorkoutExercise;
import com.formlab.workout.entity.WorkoutSet;
import com.formlab.workout.entity.WorkoutSession;
import com.formlab.workout.entity.enums.WorkoutSessionStatus;
import com.formlab.workout.mapper.WorkoutSetMapper;
import com.formlab.workout.repository.WorkoutExerciseRepository;
import com.formlab.workout.repository.WorkoutSetRepository;
import com.formlab.workout.repository.WorkoutSessionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkoutSetService {

    private final WorkoutSetRepository workoutSetRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutSessionRepository workoutSessionRepository;
    private final WorkoutSetMapper workoutSetMapper;

    public WorkoutSetService(
            WorkoutSetRepository workoutSetRepository,
            WorkoutExerciseRepository workoutExerciseRepository,
            WorkoutSessionRepository workoutSessionRepository,
            WorkoutSetMapper workoutSetMapper
    ) {
        this.workoutSetRepository = workoutSetRepository;
        this.workoutExerciseRepository = workoutExerciseRepository;
        this.workoutSessionRepository = workoutSessionRepository;
        this.workoutSetMapper = workoutSetMapper;
    }

    public List<WorkoutSetResponse> getSets(
            UUID workoutSessionId,
            UUID workoutExerciseId
    ) {
        WorkoutSession session = workoutSessionRepository
                .findByIdWithWorkout(workoutSessionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout session not found"
                        )
                );

        validateExerciseBelongsToSession(
                session,
                workoutExerciseId
        );

        return workoutSetRepository
                .findByWorkoutSessionIdAndWorkoutExerciseIdOrderBySetNumber(
                        workoutSessionId,
                        workoutExerciseId
                )
                .stream()
                .map(workoutSetMapper::toResponse)
                .toList();
    }

    public WorkoutSetResponse addSet(
            UUID workoutSessionId,
            UUID workoutExerciseId,
            CreateWorkoutSetRequest request
    ) {
        WorkoutSession session = workoutSessionRepository
                .findByIdWithWorkout(workoutSessionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout session not found"
                        )
                );

        if (session.getStatus()
                != WorkoutSessionStatus.IN_PROGRESS) {

            throw new BadRequestException(
                    "Workout session is not in progress"
            );
        }

        WorkoutExercise workoutExercise =
                workoutExerciseRepository
                        .findByIdWithExercise(workoutExerciseId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Workout exercise not found"
                                )
                        );

        validateExerciseBelongsToSession(
                session,
                workoutExerciseId
        );

        ExerciseTrackingType trackingType =
                workoutExercise.getExercise().getTrackingType();

        if (trackingType == ExerciseTrackingType.REPS
                && request.weight() != null) {

            throw new BadRequestException(
                    "Weight must not be provided for repetition-based exercises"
            );
        }

        if (trackingType == ExerciseTrackingType.WEIGHT
                && request.weight() == null) {

            throw new BadRequestException(
                    "Weight is required for weight-based exercises"
            );
        }

        boolean setExists =
                workoutSetRepository
                        .existsByWorkoutSessionIdAndWorkoutExerciseIdAndSetNumber(
                                workoutSessionId,
                                workoutExerciseId,
                                request.setNumber()
                        );

        if (setExists) {
            throw new BadRequestException(
                    "Set number is already used for this exercise in this session"
            );
        }

        WorkoutSet workoutSet = new WorkoutSet();

        workoutSet.setWorkoutSession(session);
        workoutSet.setWorkoutExercise(workoutExercise);
        workoutSet.setSetNumber(request.setNumber());
        workoutSet.setWeight(request.weight());
        workoutSet.setReps(request.reps());

        return workoutSetMapper.toResponse(
                workoutSetRepository.save(workoutSet)
        );
    }

    public void deleteSet(
            UUID workoutSessionId,
            UUID workoutExerciseId,
            UUID setId
    ) {
        WorkoutSession session = workoutSessionRepository
                .findByIdWithWorkout(workoutSessionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout session not found"
                        )
                );

        WorkoutSet workoutSet = workoutSetRepository
                .findById(setId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout set not found"
                        )
                );

        if (!workoutSet.getWorkoutSession()
                .getId()
                .equals(workoutSessionId)) {

            throw new BadRequestException(
                    "Set does not belong to this workout session"
            );
        }

        if (!workoutSet.getWorkoutExercise()
                .getId()
                .equals(workoutExerciseId)) {

            throw new BadRequestException(
                    "Set does not belong to this workout exercise"
            );
        }

        if (session.getStatus()
                != WorkoutSessionStatus.IN_PROGRESS) {

            throw new BadRequestException(
                    "Workout session is not in progress"
            );
        }

        workoutSetRepository.delete(workoutSet);
    }

    private void validateExerciseBelongsToSession(
            WorkoutSession session,
            UUID workoutExerciseId
    ) {
        boolean belongsToWorkout =
                workoutExerciseRepository.existsByIdAndWorkoutId(
                        workoutExerciseId,
                        session.getWorkout().getId()
                );

        if (!belongsToWorkout) {
            throw new BadRequestException(
                    "Workout exercise does not belong to this workout session"
            );
        }
    }
}