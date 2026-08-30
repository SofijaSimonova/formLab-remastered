package com.formlab.workout.service;

import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.user.entity.AppUser;
import com.formlab.user.repository.AppUserRepository;
import com.formlab.workout.dto.CreateWorkoutRequest;
import com.formlab.workout.dto.UpdateWorkoutRequest;
import com.formlab.workout.dto.WorkoutResponse;
import com.formlab.workout.entity.Workout;
import com.formlab.workout.mapper.WorkoutMapper;
import com.formlab.workout.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final AppUserRepository appUserRepository;
    private final WorkoutMapper workoutMapper;

    public WorkoutService(
            WorkoutRepository workoutRepository,
            AppUserRepository appUserRepository,
            WorkoutMapper workoutMapper
    ) {
        this.workoutRepository = workoutRepository;
        this.appUserRepository = appUserRepository;
        this.workoutMapper = workoutMapper;
    }

    public List<WorkoutResponse> getUserWorkouts(UUID userId) {
        if (!appUserRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found");
        }

        return workoutRepository.findByUserId(userId)
                .stream()
                .map(workoutMapper::toResponse)
                .toList();
    }

    public WorkoutResponse getWorkoutById(UUID workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Workout not found")
                );

        return workoutMapper.toResponse(workout);
    }

    public WorkoutResponse createWorkout(
            UUID userId,
            CreateWorkoutRequest request
    ) {
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        Workout workout = new Workout();

        workout.setUser(user);
        workout.setName(request.name());
        workout.setDescription(request.description());

        return workoutMapper.toResponse(
                workoutRepository.save(workout)
        );
    }

    public WorkoutResponse updateWorkout(
            UUID workoutId,
            UpdateWorkoutRequest request
    ) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Workout not found")
                );

        workout.setName(request.name());
        workout.setDescription(request.description());

        return workoutMapper.toResponse(
                workoutRepository.save(workout)
        );
    }

    public void deleteWorkout(UUID workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Workout not found")
                );

        workoutRepository.delete(workout);
    }
}