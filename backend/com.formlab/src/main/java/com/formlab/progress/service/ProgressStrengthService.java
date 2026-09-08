package com.formlab.progress.service;

import com.formlab.exercise.entity.ExerciseTrackingType;
import com.formlab.progress.dto.StrengthProgressPoint;
import com.formlab.progress.dto.StrengthProgressRange;
import com.formlab.progress.dto.StrengthProgressResponse;
import com.formlab.progress.repository.ProgressStrengthRepository;
import com.formlab.progress.repository.StrengthProgressProjection;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

@Service
public class ProgressStrengthService {

    private final ProgressStrengthRepository repository;

    public ProgressStrengthService(
            ProgressStrengthRepository repository
    ) {
        this.repository = repository;
    }

    public StrengthProgressResponse getStrengthProgress(
            UUID userId,
            UUID exerciseId,
            StrengthProgressRange range
    ) {
        OffsetDateTime from =
                calculateStartDate(range);

        List<StrengthProgressProjection> projections =
                repository.findStrengthProgress(
                        userId,
                        exerciseId,
                        from
                );

        String exerciseName =
                repository.findExerciseName(exerciseId);

        ExerciseTrackingType trackingType =
                ExerciseTrackingType.valueOf(
                        repository.findTrackingType(exerciseId)
                );

        List<StrengthProgressPoint> points =
                projections.stream()
                        .map(projection ->
                                new StrengthProgressPoint(
                                        projection.getDate()
                                                .atOffset(
                                                        ZoneOffset.UTC
                                                ),
                                        projection.getValue()
                                )
                        )
                        .toList();

        return new StrengthProgressResponse(
                exerciseId,
                exerciseName,
                trackingType,
                range,
                points
        );
    }

    private OffsetDateTime calculateStartDate(
            StrengthProgressRange range
    ) {
        OffsetDateTime now =
                OffsetDateTime.now(ZoneOffset.UTC);

        return switch (range) {
            case ONE_MONTH ->
                    now.minusMonths(1);

            case THREE_MONTHS ->
                    now.minusMonths(3);

            case SIX_MONTHS ->
                    now.minusMonths(6);

            case ONE_YEAR ->
                    now.minusYears(1);
        };
    }
}