package com.formlab.exercise.service;

import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.dto.CreateExerciseRequest;
import com.formlab.exercise.dto.ExerciseListResponse;
import com.formlab.exercise.dto.ExercisePageResponse;
import com.formlab.exercise.dto.ExerciseResponse;
import com.formlab.exercise.dto.UpdateExerciseRequest;
import com.formlab.exercise.entity.Exercise;
import com.formlab.exercise.entity.ExerciseFocusVariation;
import com.formlab.exercise.entity.MovementPattern;
import com.formlab.exercise.mapper.ExerciseMapper;
import com.formlab.exercise.repository.ExerciseFocusVariationRepository;
import com.formlab.exercise.repository.ExerciseRepository;
import com.formlab.exercise.repository.MovementPatternRepository;
import com.formlab.exercise.specification.ExerciseSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;
    private final MovementPatternRepository movementPatternRepository;
    private final ExerciseFocusVariationRepository variationRepository;

    public ExerciseService(
            ExerciseRepository exerciseRepository,
            ExerciseMapper exerciseMapper,
            MovementPatternRepository movementPatternRepository,
            ExerciseFocusVariationRepository variationRepository
    ) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
        this.movementPatternRepository = movementPatternRepository;
        this.variationRepository = variationRepository;
    }

    public ExercisePageResponse getAllExercises(
            Pageable pageable,
            String search,
            UUID bodyPartId
    ) {
        var specification = Specification
                .where(ExerciseSpecification.search(search))
                .and(ExerciseSpecification.hasBodyPart(bodyPartId));

        Page<Exercise> page =
                exerciseRepository.findAll(specification, pageable);

        List<UUID> ids = page.getContent()
                .stream()
                .map(Exercise::getId)
                .toList();

        if (ids.isEmpty()) {
            return new ExercisePageResponse(
                    List.of(),
                    page.getNumber(),
                    page.getSize(),
                    page.getTotalElements(),
                    page.getTotalPages(),
                    page.isLast()
            );
        }

        List<Exercise> exercises =
                exerciseRepository.findAllWithListDetailsByIds(ids);

        Map<UUID, Exercise> exercisesById = exercises.stream()
                .collect(Collectors.toMap(
                        Exercise::getId,
                        Function.identity()
                ));

        List<ExerciseListResponse> content = ids.stream()
                .map(exercisesById::get)
                .map(exerciseMapper::toListResponse)
                .toList();

        return new ExercisePageResponse(
                content,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    public ExerciseResponse getExerciseById(UUID id) {
        Exercise exercise = exerciseRepository.findByIdWithDetails(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Exercise not found")
                );

        List<ExerciseFocusVariation> focusVariations =
                variationRepository.findByExerciseId(id);

        exercise.setFocusVariations(focusVariations);

        return exerciseMapper.toResponse(exercise);
    }

    public ExerciseResponse createExercise(CreateExerciseRequest request) {
        Exercise exercise = exerciseMapper.toEntity(request);

        if (request.movementPatternId() != null) {
            MovementPattern movementPattern = movementPatternRepository
                    .findById(request.movementPatternId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Movement pattern not found"
                            )
                    );

            exercise.setMovementPattern(movementPattern);
        }

        return exerciseMapper.toResponse(
                exerciseRepository.save(exercise)
        );
    }

    public ExerciseResponse updateExercise(
            UUID id,
            UpdateExerciseRequest request
    ) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Exercise not found"
                        )
                );

        exerciseMapper.updateEntity(request, exercise);

        if (request.movementPatternId() != null) {
            MovementPattern movementPattern = movementPatternRepository
                    .findById(request.movementPatternId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Movement pattern not found"
                            )
                    );

            exercise.setMovementPattern(movementPattern);
        } else {
            exercise.setMovementPattern(null);
        }

        return exerciseMapper.toResponse(
                exerciseRepository.save(exercise)
        );
    }

    public void deleteExercise(UUID id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Exercise not found"
                        )
                );

        exerciseRepository.delete(exercise);
    }
}