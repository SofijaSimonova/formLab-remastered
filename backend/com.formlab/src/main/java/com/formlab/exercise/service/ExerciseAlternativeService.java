package com.formlab.exercise.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.dto.CreateExerciseAlternativeRequest;
import com.formlab.exercise.dto.ExerciseAlternativeResponse;
import com.formlab.exercise.entity.Exercise;
import com.formlab.exercise.entity.ExerciseAlternative;
import com.formlab.exercise.mapper.ExerciseAlternativeMapper;
import com.formlab.exercise.repository.ExerciseAlternativeRepository;
import com.formlab.exercise.repository.ExerciseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ExerciseAlternativeService {

    private final ExerciseAlternativeRepository alternativeRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseAlternativeMapper alternativeMapper;

    public ExerciseAlternativeService(
            ExerciseAlternativeRepository alternativeRepository,
            ExerciseRepository exerciseRepository,
            ExerciseAlternativeMapper alternativeMapper
    ) {
        this.alternativeRepository = alternativeRepository;
        this.exerciseRepository = exerciseRepository;
        this.alternativeMapper = alternativeMapper;
    }

    @Transactional(readOnly = true)
    public List<ExerciseAlternativeResponse> getAlternatives(
            UUID exerciseId
    ) {
        if (!exerciseRepository.existsById(exerciseId)) {
            throw new ResourceNotFoundException("Exercise not found");
        }

        return alternativeRepository.findByExerciseId(exerciseId)
                .stream()
                .map(alternativeMapper::toResponse)
                .toList();
    }

    @Transactional
    public ExerciseAlternativeResponse createAlternative(
            UUID exerciseId,
            CreateExerciseAlternativeRequest request
    ) {
        if (exerciseId.equals(request.alternativeExerciseId())) {
            throw new BadRequestException(
                    "An exercise cannot be an alternative to itself"
            );
        }

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exercise not found")
                );

        Exercise alternativeExercise = exerciseRepository
                .findById(request.alternativeExerciseId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Alternative exercise not found"
                        )
                );

        boolean relationshipExists =
                alternativeRepository
                        .existsByExerciseIdAndAlternativeExerciseId(
                                exerciseId,
                                request.alternativeExerciseId()
                        )
                        ||
                        alternativeRepository
                                .existsByExerciseIdAndAlternativeExerciseId(
                                        request.alternativeExerciseId(),
                                        exerciseId
                                );

        if (relationshipExists) {
            throw new BadRequestException(
                    "These exercises are already alternatives"
            );
        }

        ExerciseAlternative alternative = new ExerciseAlternative();
        alternative.setExercise(exercise);
        alternative.setAlternativeExercise(alternativeExercise);
        alternative.setReason(request.reason());

        ExerciseAlternative reverseAlternative =
                new ExerciseAlternative();

        reverseAlternative.setExercise(alternativeExercise);
        reverseAlternative.setAlternativeExercise(exercise);
        reverseAlternative.setReason(request.reverseReason());

        alternativeRepository.save(alternative);
        alternativeRepository.save(reverseAlternative);

        return alternativeMapper.toResponse(alternative);
    }

    @Transactional
    public void deleteAlternative(
            UUID exerciseId,
            UUID alternativeId
    ) {
        ExerciseAlternative alternative =
                alternativeRepository.findById(alternativeId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Alternative exercise relationship not found"
                                )
                        );

        if (!alternative.getExercise().getId().equals(exerciseId)) {
            throw new BadRequestException(
                    "Alternative does not belong to this exercise"
            );
        }

        UUID alternativeExerciseId =
                alternative.getAlternativeExercise().getId();

        alternativeRepository.delete(alternative);

        alternativeRepository
                .findByExerciseIdAndAlternativeExerciseId(
                        alternativeExerciseId,
                        exerciseId
                )
                .ifPresent(alternativeRepository::delete);
    }
}