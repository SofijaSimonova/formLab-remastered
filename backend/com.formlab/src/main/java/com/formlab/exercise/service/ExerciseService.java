package com.formlab.exercise.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.exercise.dto.*;
import com.formlab.exercise.entity.BodyPart;
import com.formlab.exercise.entity.Equipment;
import com.formlab.exercise.entity.Exercise;
import com.formlab.exercise.entity.MovementPattern;
import com.formlab.exercise.entity.Tag;
import com.formlab.exercise.mapper.ExerciseMapper;
import com.formlab.exercise.projection.ExerciseDetailProjection;
import com.formlab.exercise.projection.ExerciseReferenceByExerciseProjection;
import com.formlab.exercise.repository.BodyPartRepository;
import com.formlab.exercise.repository.EquipmentRepository;
import com.formlab.exercise.repository.ExerciseFocusVariationRepository;
import com.formlab.exercise.repository.ExerciseRepository;
import com.formlab.exercise.repository.MovementPatternRepository;
import com.formlab.exercise.repository.TagRepository;
import com.formlab.exercise.specification.ExerciseSpecification;
import com.formlab.workout.repository.WorkoutExerciseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;
    private final MovementPatternRepository movementPatternRepository;
    private final BodyPartRepository bodyPartRepository;
    private final EquipmentRepository equipmentRepository;
    private final TagRepository tagRepository;
    private final ExerciseFocusVariationRepository variationRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;

    public ExerciseService(
            ExerciseRepository exerciseRepository,
            ExerciseMapper exerciseMapper,
            MovementPatternRepository movementPatternRepository,
            BodyPartRepository bodyPartRepository,
            EquipmentRepository equipmentRepository,
            TagRepository tagRepository,
            ExerciseFocusVariationRepository variationRepository,
            WorkoutExerciseRepository workoutExerciseRepository
    ) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
        this.movementPatternRepository = movementPatternRepository;
        this.bodyPartRepository = bodyPartRepository;
        this.equipmentRepository = equipmentRepository;
        this.tagRepository = tagRepository;
        this.variationRepository = variationRepository;
        this.workoutExerciseRepository = workoutExerciseRepository;
    }

    @Transactional(readOnly = true)
    public ExercisePageResponse getAllExercises(
            Pageable pageable,
            String search,
            UUID bodyPartId
    ) {
        Specification<Exercise> specification =
                Specification.where(
                        ExerciseSpecification.search(search)
                ).and(
                        ExerciseSpecification.hasBodyPart(bodyPartId)
                );

        Page<Exercise> exercisePage =
                exerciseRepository.findAll(
                        specification,
                        pageable
                );

        List<UUID> exerciseIds = exercisePage.getContent()
                .stream()
                .map(Exercise::getId)
                .toList();

        if (exerciseIds.isEmpty()) {
            return new ExercisePageResponse(
                    List.of(),
                    exercisePage.getNumber(),
                    exercisePage.getSize(),
                    exercisePage.getTotalElements(),
                    exercisePage.getTotalPages(),
                    exercisePage.isLast()
            );
        }

        List<ExerciseReferenceByExerciseProjection> bodyParts =
                exerciseRepository.findBodyPartsForExercises(exerciseIds);

        List<ExerciseReferenceByExerciseProjection> tags =
                exerciseRepository.findTagsForExercises(exerciseIds);

        Map<UUID, List<ReferenceResponse>> bodyPartsByExercise =
                bodyParts.stream()
                        .collect(Collectors.groupingBy(
                                ExerciseReferenceByExerciseProjection::getExerciseId,
                                Collectors.mapping(
                                        reference -> new ReferenceResponse(
                                                reference.getId(),
                                                reference.getName()
                                        ),
                                        Collectors.toList()
                                )
                        ));

        Map<UUID, List<ReferenceResponse>> tagsByExercise =
                tags.stream()
                        .collect(Collectors.groupingBy(
                                ExerciseReferenceByExerciseProjection::getExerciseId,
                                Collectors.mapping(
                                        reference -> new ReferenceResponse(
                                                reference.getId(),
                                                reference.getName()
                                        ),
                                        Collectors.toList()
                                )
                        ));

        List<ExerciseListResponse> content =
                exercisePage.getContent()
                        .stream()
                        .map(exercise -> new ExerciseListResponse(
                                exercise.getId(),
                                exercise.getName(),
                                exercise.getDescription(),
                                exercise.getMovementPattern() == null
                                        ? null
                                        : exercise.getMovementPattern().getId(),
                                bodyPartsByExercise.getOrDefault(
                                        exercise.getId(),
                                        List.of()
                                ),
                                tagsByExercise.getOrDefault(
                                        exercise.getId(),
                                        List.of()
                                ),
                                exercise.getTrackingType()
                        ))
                        .toList();

        return new ExercisePageResponse(
                content,
                exercisePage.getNumber(),
                exercisePage.getSize(),
                exercisePage.getTotalElements(),
                exercisePage.getTotalPages(),
                exercisePage.isLast()
        );
    }

    @Transactional(readOnly = true)
    public ExerciseResponse getExerciseById(UUID id) {

        ExerciseDetailProjection exercise =
                exerciseRepository.findDetailProjectionById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Exercise not found"
                                )
                        );

        List<ReferenceResponse> bodyParts =
                exerciseRepository.findBodyPartProjections(id)
                        .stream()
                        .map(reference ->
                                new ReferenceResponse(
                                        reference.getId(),
                                        reference.getName()
                                )
                        )
                        .toList();

        List<ReferenceResponse> equipment =
                exerciseRepository.findEquipmentProjections(id)
                        .stream()
                        .map(reference ->
                                new ReferenceResponse(
                                        reference.getId(),
                                        reference.getName()
                                )
                        )
                        .toList();

        List<ExerciseFocusVariationResponse> focusVariations =
                variationRepository.findProjectionsByExerciseId(id)
                        .stream()
                        .map(variation ->
                                new ExerciseFocusVariationResponse(
                                        variation.getId(),
                                        variation.getExerciseId(),
                                        variation.getFocusBodyPartId(),
                                        variation.getName(),
                                        variation.getDescription(),
                                        variation.getAnimationReference()
                                )
                        )
                        .toList();

        return new ExerciseResponse(
                exercise.getId(),
                exercise.getName(),
                exercise.getDescription(),
                exercise.getInstructions(),
                exercise.getMovementPatternId(),
                bodyParts,
                equipment,
                exercise.getTrackingType(),
                focusVariations
        );
    }

    @Transactional
    public ExerciseResponse createExercise(CreateExerciseRequest request) {
        Exercise exercise = exerciseMapper.toEntity(request);

        setMovementPattern(
                exercise,
                request.movementPatternId()
        );

        exercise.setBodyParts(
                new HashSet<>(resolveBodyParts(request.bodyPartIds()))
        );

        exercise.setEquipment(
                new HashSet<>(resolveEquipment(request.equipmentIds()))
        );

        exercise.setTags(
                new HashSet<>(resolveTags(request.tagIds()))
        );

        Exercise savedExercise = exerciseRepository.save(exercise);

        return getExerciseById(savedExercise.getId());
    }

    @Transactional
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

        setMovementPattern(
                exercise,
                request.movementPatternId()
        );

        replaceBodyParts(
                exercise,
                resolveBodyParts(request.bodyPartIds())
        );

        replaceEquipment(
                exercise,
                resolveEquipment(request.equipmentIds())
        );

        replaceTags(
                exercise,
                resolveTags(request.tagIds())
        );

        return getExerciseById(id);
    }

    @Transactional
    public void deleteExercise(UUID id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Exercise not found"
                        )
                );

        if (workoutExerciseRepository.existsByExerciseId(id)) {
            throw new BadRequestException(
                    "Exercise cannot be deleted because it is used in a workout"
            );
        }

        exerciseRepository.delete(exercise);
    }

    private void setMovementPattern(
            Exercise exercise,
            UUID movementPatternId
    ) {
        if (movementPatternId == null) {
            exercise.setMovementPattern(null);
            return;
        }

        MovementPattern movementPattern =
                movementPatternRepository.findById(movementPatternId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Movement pattern not found"
                                )
                        );

        exercise.setMovementPattern(movementPattern);
    }

    private Set<BodyPart> resolveBodyParts(Set<UUID> bodyPartIds) {
        List<BodyPart> bodyParts =
                bodyPartRepository.findAllById(bodyPartIds);

        validateAllIdsExist(
                bodyPartIds,
                bodyParts.stream()
                        .map(BodyPart::getId)
                        .collect(Collectors.toSet()),
                "body part"
        );

        return new HashSet<>(bodyParts);
    }

    private Set<Equipment> resolveEquipment(Set<UUID> equipmentIds) {
        List<Equipment> equipment =
                equipmentRepository.findAllById(equipmentIds);

        validateAllIdsExist(
                equipmentIds,
                equipment.stream()
                        .map(Equipment::getId)
                        .collect(Collectors.toSet()),
                "equipment"
        );

        return new HashSet<>(equipment);
    }

    private Set<Tag> resolveTags(Set<UUID> tagIds) {
        List<Tag> tags =
                tagRepository.findAllById(tagIds);

        validateAllIdsExist(
                tagIds,
                tags.stream()
                        .map(Tag::getId)
                        .collect(Collectors.toSet()),
                "tag"
        );

        return new HashSet<>(tags);
    }

    private void replaceBodyParts(
            Exercise exercise,
            Set<BodyPart> bodyParts
    ) {
        exercise.getBodyParts().clear();
        exercise.getBodyParts().addAll(bodyParts);
    }

    private void replaceEquipment(
            Exercise exercise,
            Set<Equipment> equipment
    ) {
        exercise.getEquipment().clear();
        exercise.getEquipment().addAll(equipment);
    }

    private void replaceTags(
            Exercise exercise,
            Set<Tag> tags
    ) {
        exercise.getTags().clear();
        exercise.getTags().addAll(tags);
    }

    private void validateAllIdsExist(
            Set<UUID> requestedIds,
            Set<UUID> foundIds,
            String resourceName
    ) {
        if (requestedIds.size() != foundIds.size()
                || !foundIds.containsAll(requestedIds)) {

            Set<UUID> missingIds = requestedIds.stream()
                    .filter(id -> !foundIds.contains(id))
                    .collect(Collectors.toSet());

            throw new ResourceNotFoundException(
                    "One or more " + resourceName
                            + " IDs were not found: " + missingIds
            );
        }
    }
}