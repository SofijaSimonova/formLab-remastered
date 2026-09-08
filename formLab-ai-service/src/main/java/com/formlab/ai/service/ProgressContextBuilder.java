package com.formlab.ai.service;

import com.formlab.ai.dto.context.ExercisePerformanceData;
import com.formlab.ai.dto.context.ExercisePerformanceSession;
import com.formlab.ai.dto.context.ExerciseSetPerformance;
import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.context.ProgressTrend;
import com.formlab.ai.dto.input.ProgressDataResponse;
import com.formlab.ai.dto.input.StrengthProgressResponse;
import com.formlab.ai.dto.input.WorkoutExerciseData;
import com.formlab.ai.dto.input.WorkoutSessionData;
import com.formlab.ai.dto.input.WorkoutSetData;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class ProgressContextBuilder {

    private final TrendAnalysisService trendAnalysisService;

    public ProgressContextBuilder(
            TrendAnalysisService trendAnalysisService
    ) {
        this.trendAnalysisService =
                trendAnalysisService;
    }

    public ProgressAiContext build(
            StrengthProgressResponse strengthProgress,
            List<String> goals,
            ProgressDataResponse progressData
    ) {
        List<ProgressTrend> trends =
                trendAnalysisService.analyze(
                        strengthProgress
                );

        ExercisePerformanceData exercisePerformance =
                buildExercisePerformance(
                        strengthProgress,
                        progressData
                );

        return new ProgressAiContext(
                goals,
                strengthProgress,
                exercisePerformance,
                trends
        );
    }

    private ExercisePerformanceData buildExercisePerformance(
            StrengthProgressResponse strengthProgress,
            ProgressDataResponse progressData
    ) {
        if (strengthProgress == null ||
                strengthProgress.exerciseId() == null ||
                progressData == null ||
                progressData.sessions() == null) {
            return null;
        }

        UUID exerciseId =
                strengthProgress.exerciseId();

        List<ExercisePerformanceSession> sessions =
                progressData.sessions()
                        .stream()
                        .map(session ->
                                mapSession(
                                        session,
                                        exerciseId
                                )
                        )
                        .filter(Objects::nonNull
                        )
                        .toList();

        return new ExercisePerformanceData(
                exerciseId,
                strengthProgress.exerciseName(),
                sessions
        );
    }

    private ExercisePerformanceSession mapSession(
            WorkoutSessionData session,
            UUID exerciseId
    ) {
        if (session.exercises() == null) {
            return null;
        }

        WorkoutExerciseData exercise =
                session.exercises()
                        .stream()
                        .filter(item ->
                                exerciseId.equals(
                                        item.exerciseId()
                                )
                        )
                        .findFirst()
                        .orElse(null);

        if (exercise == null ||
                exercise.sets() == null ||
                exercise.sets().isEmpty()) {
            return null;
        }

        List<ExerciseSetPerformance> sets =
                exercise.sets()
                        .stream()
                        .map(this::mapSet)
                        .toList();

        return new ExercisePerformanceSession(
                session.sessionId(),
                session.completedAt() != null
                        ? session.completedAt()
                        : session.startedAt(),
                session.workoutName(),
                sets
        );
    }

    private ExerciseSetPerformance mapSet(
            WorkoutSetData set
    ) {
        return new ExerciseSetPerformance(
                set.setNumber(),
                set.weight(),
                set.reps()
        );
    }
}