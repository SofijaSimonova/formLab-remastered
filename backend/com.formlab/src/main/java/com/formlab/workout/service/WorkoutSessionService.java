package com.formlab.workout.service;

import com.formlab.common.exception.BadRequestException;
import com.formlab.common.exception.ResourceNotFoundException;
import com.formlab.outbox.service.OutboxEventService;
import com.formlab.workout.dto.CreateWorkoutSessionResponse;
import com.formlab.workout.dto.WorkoutSessionHistoryPageResponse;
import com.formlab.workout.dto.WorkoutSessionHistoryResponse;
import com.formlab.workout.dto.WorkoutSessionSummaryResponse;
import com.formlab.workout.dto.WorkoutSessionExerciseSummaryResponse;
import com.formlab.workout.entity.Workout;
import com.formlab.workout.entity.WorkoutSession;
import com.formlab.workout.entity.enums.WorkoutSessionStatus;
import com.formlab.workout.event.WorkoutSessionCompletedEvent;
import com.formlab.workout.mapper.WorkoutSessionMapper;
import com.formlab.workout.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneOffset;
import java.util.*;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.stream.Collectors;

@Service
public class WorkoutSessionService {

    private final WorkoutSessionRepository workoutSessionRepository;
    private final WorkoutRepository workoutRepository;
    private final WorkoutSessionMapper workoutSessionMapper;
    private final WorkoutSetRepository workoutSetRepository;
    private final OutboxEventService outboxEventService;

    public WorkoutSessionService(
            WorkoutSessionRepository workoutSessionRepository,
            WorkoutRepository workoutRepository,
            WorkoutSessionMapper workoutSessionMapper,
            WorkoutSetRepository workoutSetRepository,
            OutboxEventService outboxEventService
    ) {
        this.workoutSessionRepository = workoutSessionRepository;
        this.workoutRepository = workoutRepository;
        this.workoutSessionMapper = workoutSessionMapper;
        this.workoutSetRepository = workoutSetRepository;
        this.outboxEventService = outboxEventService;
    }

    @Transactional
    public CreateWorkoutSessionResponse startSession(UUID workoutId) {

        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Workout not found"
                        )
                );

        boolean activeSessionExists =
                workoutSessionRepository.existsByWorkoutIdAndStatus(
                        workoutId,
                        WorkoutSessionStatus.IN_PROGRESS
                );

        if (activeSessionExists) {
            throw new BadRequestException(
                    "Workout already has an active session"
            );
        }

        WorkoutSession session = new WorkoutSession();
        session.setWorkout(workout);
        session.setStatus(WorkoutSessionStatus.IN_PROGRESS);

        return workoutSessionMapper.toResponse(
                workoutSessionRepository.save(session)
        );
    }

    public CreateWorkoutSessionResponse getSession(UUID sessionId) {

        WorkoutSession session =
                workoutSessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Workout session not found"
                                )
                        );

        return workoutSessionMapper.toResponse(session);
    }

    @Transactional(readOnly = true)
    public WorkoutSessionHistoryPageResponse getHistory(
            UUID userId,
            Pageable pageable
    ) {
        Page<WorkoutSessionHistoryResponse> historyPage =
                workoutSessionRepository
                        .findHistoryByUserId(userId, pageable)
                        .map(projection -> {

                            OffsetDateTime startedAt =
                                    projection.getStartedAt()
                                            .atOffset(ZoneOffset.UTC);

                            OffsetDateTime completedAt =
                                    projection.getCompletedAt() != null
                                            ? projection.getCompletedAt()
                                            .atOffset(ZoneOffset.UTC)
                                            : null;

                            Long durationSeconds =
                                    completedAt != null
                                            ? Duration.between(
                                            startedAt,
                                            completedAt
                                    ).getSeconds()
                                            : null;

                            return new WorkoutSessionHistoryResponse(
                                    projection.getSessionId(),
                                    projection.getWorkoutId(),
                                    projection.getWorkoutName(),
                                    projection.getStatus(),
                                    startedAt,
                                    completedAt,
                                    durationSeconds,
                                    projection.getResumeWorkoutExerciseId()
                            );
                        });

        return new WorkoutSessionHistoryPageResponse(
                historyPage.getContent(),
                historyPage.getNumber(),
                historyPage.getSize(),
                historyPage.getTotalElements(),
                historyPage.getTotalPages(),
                historyPage.isLast()
        );
    }

    @Transactional
    public CreateWorkoutSessionResponse completeSession(UUID sessionId) {

        WorkoutSession session =
                workoutSessionRepository.findByIdWithWorkout(sessionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Workout session not found"
                                )
                        );

        if (session.getStatus() != WorkoutSessionStatus.IN_PROGRESS) {
            throw new BadRequestException(
                    "Workout session is not in progress"
            );
        }

        List<UUID> exerciseIds =
                workoutSessionRepository.findExerciseIdsBySessionId(
                        sessionId
                );

        session.setStatus(WorkoutSessionStatus.COMPLETED);
        session.setCompletedAt(OffsetDateTime.now());

        CreateWorkoutSessionResponse response =
                workoutSessionMapper.toResponse(
                        workoutSessionRepository.save(session)
                );

        outboxEventService.saveEvent(
                "WORKOUT_SESSION_COMPLETED",
                new WorkoutSessionCompletedEvent(
                        session.getWorkout().getUser().getId(),
                        exerciseIds
                )
        );

        return response;
    }

    public CreateWorkoutSessionResponse abandonSession(UUID sessionId) {

        WorkoutSession session =
                workoutSessionRepository.findById(sessionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Workout session not found"
                                )
                        );

        if (session.getStatus() != WorkoutSessionStatus.IN_PROGRESS) {
            throw new BadRequestException(
                    "Workout session is not in progress"
            );
        }

        session.setStatus(WorkoutSessionStatus.ABANDONED);
        session.setCompletedAt(OffsetDateTime.now());

        return workoutSessionMapper.toResponse(
                workoutSessionRepository.save(session)
        );
    }

    public WorkoutSessionSummaryResponse getSessionSummary(
            UUID workoutId,
            UUID sessionId
    ) {
        WorkoutSession session =
                workoutSessionRepository
                        .findByIdAndWorkoutId(sessionId, workoutId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Workout session not found"
                                )
                        );

        if (session.getStatus() != WorkoutSessionStatus.COMPLETED) {
            throw new BadRequestException(
                    "Workout session is not completed"
            );
        }

        List<WorkoutSessionExerciseAggregationProjection> aggregations =
                workoutSetRepository.findSessionExerciseAggregations(
                        sessionId
                );

        List<WorkoutSessionBestSetProjection> bestSets =
                workoutSetRepository.findBestSetsBySessionId(
                        sessionId
                );

        Map<UUID, WorkoutSessionBestSetProjection> bestSetByExercise =
                bestSets.stream()
                        .collect(Collectors.toMap(
                                WorkoutSessionBestSetProjection::getWorkoutExerciseId,
                                projection -> projection
                        ));

        List<WorkoutSessionExerciseSummaryResponse> exercises =
                aggregations.stream()
                        .map(aggregation -> {
                            WorkoutSessionBestSetProjection bestSet =
                                    bestSetByExercise.get(
                                            aggregation.getWorkoutExerciseId()
                                    );

                            return new WorkoutSessionExerciseSummaryResponse(
                                    aggregation.getWorkoutExerciseId(),
                                    aggregation.getExerciseName(),
                                    aggregation.getExerciseOrder(),
                                    aggregation.getTotalSets().intValue(),
                                    aggregation.getTotalVolume(),
                                    bestSet != null
                                            ? bestSet.getBestSetWeight()
                                            : null,
                                    bestSet != null
                                            ? bestSet.getBestSetReps()
                                            : null
                            );
                        })
                        .toList();

        WorkoutSessionTotalsProjection totals =
                workoutSetRepository.findSessionTotals(sessionId);

        long durationSeconds =
                Duration.between(
                        session.getStartedAt(),
                        session.getCompletedAt()
                ).getSeconds();

        return new WorkoutSessionSummaryResponse(
                session.getId(),
                session.getWorkout().getId(),
                session.getWorkout().getName(),
                session.getStatus(),
                session.getStartedAt(),
                session.getCompletedAt(),
                durationSeconds,
                totals.getExerciseCount().intValue(),
                totals.getTotalSets().intValue(),
                totals.getTotalVolume(),
                exercises
        );
    }
}