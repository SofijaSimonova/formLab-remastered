package com.formlab.exercise.service;

import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.dto.CreateExerciseFocusVariationRequest;
import com.formlab.exercise.dto.ExerciseFocusVariationResponse;
import com.formlab.exercise.dto.UpdateExerciseFocusVariationRequest;
import com.formlab.exercise.entity.BodyPart;
import com.formlab.exercise.entity.Exercise;
import com.formlab.exercise.entity.ExerciseFocusVariation;
import com.formlab.exercise.mapper.ExerciseFocusVariationMapper;
import com.formlab.exercise.repository.BodyPartRepository;
import com.formlab.exercise.repository.ExerciseFocusVariationRepository;
import com.formlab.exercise.repository.ExerciseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ExerciseFocusVariationService {

    private final ExerciseFocusVariationRepository variationRepository;
    private final ExerciseRepository exerciseRepository;
    private final BodyPartRepository bodyPartRepository;
    private final ExerciseFocusVariationMapper variationMapper;

    public ExerciseFocusVariationService(
            ExerciseFocusVariationRepository variationRepository,
            ExerciseRepository exerciseRepository,
            BodyPartRepository bodyPartRepository,
            ExerciseFocusVariationMapper variationMapper
    ) {
        this.variationRepository = variationRepository;
        this.exerciseRepository = exerciseRepository;
        this.bodyPartRepository = bodyPartRepository;
        this.variationMapper = variationMapper;
    }

    @Transactional(readOnly = true)
    public List<ExerciseFocusVariationResponse> getByExercise(
            UUID exerciseId
    ) {
        if (!exerciseRepository.existsById(exerciseId)) {
            throw new ResourceNotFoundException("Exercise not found");
        }

        return variationRepository.findByExerciseId(exerciseId)
                .stream()
                .map(variationMapper::toResponse)
                .toList();
    }

    @Transactional
    public ExerciseFocusVariationResponse create(
            UUID exerciseId,
            CreateExerciseFocusVariationRequest request
    ) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exercise not found")
                );

        BodyPart bodyPart = bodyPartRepository
                .findById(request.focusBodyPartId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Body part not found")
                );

        ExerciseFocusVariation variation =
                variationMapper.toEntity(request);

        variation.setExercise(exercise);
        variation.setFocusBodyPart(bodyPart);

        ExerciseFocusVariation savedVariation =
                variationRepository.save(variation);

        return variationMapper.toResponse(savedVariation);
    }

    @Transactional
    public ExerciseFocusVariationResponse update(
            UUID exerciseId,
            UUID variationId,
            UpdateExerciseFocusVariationRequest request
    ) {
        ExerciseFocusVariation variation =
                variationRepository.findById(variationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Focus variation not found"
                                )
                        );

        if (!variation.getExercise().getId().equals(exerciseId)) {
            throw new ResourceNotFoundException(
                    "Focus variation not found"
            );
        }

        variationMapper.updateEntity(request, variation);

        return variationMapper.toResponse(variation);
    }

    @Transactional
    public void delete(
            UUID exerciseId,
            UUID variationId
    ) {
        ExerciseFocusVariation variation =
                variationRepository.findById(variationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Focus variation not found"
                                )
                        );

        if (!variation.getExercise().getId().equals(exerciseId)) {
            throw new ResourceNotFoundException(
                    "Focus variation not found"
            );
        }

        variationRepository.delete(variation);
    }
}