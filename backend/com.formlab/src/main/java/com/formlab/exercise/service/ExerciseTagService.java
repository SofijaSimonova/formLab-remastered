package com.formlab.exercise.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.dto.AddExerciseTagRequest;
import com.formlab.exercise.dto.ExerciseTagResponse;
import com.formlab.exercise.entity.Exercise;
import com.formlab.exercise.entity.Tag;
import com.formlab.exercise.repository.ExerciseRepository;
import com.formlab.exercise.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ExerciseTagService {

    private final ExerciseRepository exerciseRepository;
    private final TagRepository tagRepository;

    public ExerciseTagService(
            ExerciseRepository exerciseRepository,
            TagRepository tagRepository
    ) {
        this.exerciseRepository = exerciseRepository;
        this.tagRepository = tagRepository;
    }

    @Transactional(readOnly = true)
    public List<ExerciseTagResponse> getTags(UUID exerciseId) {

        Exercise exercise = exerciseRepository.findByIdWithTags(exerciseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exercise not found")
                );

        return exercise.getTags()
                .stream()
                .map(tag -> new ExerciseTagResponse(
                        tag.getId(),
                        tag.getName()
                ))
                .toList();
    }

    @Transactional
    public ExerciseTagResponse addTag(
            UUID exerciseId,
            AddExerciseTagRequest request
    ) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exercise not found")
                );

        Tag tag = tagRepository.findById(request.tagId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tag not found")
                );

        if (exercise.getTags().contains(tag)) {
            throw new BadRequestException(
                    "Tag is already assigned to this exercise"
            );
        }

        exercise.getTags().add(tag);

        return new ExerciseTagResponse(
                tag.getId(),
                tag.getName()
        );
    }

    @Transactional
    public void removeTag(
            UUID exerciseId,
            UUID tagId
    ) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exercise not found")
                );

        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Tag not found")
                );

        if (!exercise.getTags().contains(tag)) {
            throw new BadRequestException(
                    "Tag is not assigned to this exercise"
            );
        }

        exercise.getTags().remove(tag);
    }
}