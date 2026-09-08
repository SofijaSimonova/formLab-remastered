package com.formlab.progress.service;

import com.formlab.progress.dto.ProgressDataResponse;
import com.formlab.progress.dto.UserGoalData;
import com.formlab.progress.dto.WorkoutExerciseData;
import com.formlab.progress.dto.WorkoutSessionData;
import com.formlab.progress.dto.WorkoutSetData;
import com.formlab.progress.repository.ProgressDataRepository;
import com.formlab.progress.repository.ProgressExerciseProjection;
import com.formlab.progress.repository.ProgressGoalProjection;
import com.formlab.progress.repository.ProgressSessionProjection;
import com.formlab.progress.repository.ProgressSetProjection;
import com.formlab.workout.entity.enums.WorkoutSessionStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ProgressDataService {

    private final ProgressDataRepository progressDataRepository;

    public ProgressDataService(
            ProgressDataRepository progressDataRepository
    ) {
        this.progressDataRepository = progressDataRepository;
    }

    public ProgressDataResponse getProgressData(
            UUID userId
    ) {
        List<ProgressSessionProjection> sessions =
                progressDataRepository.findSessions(
                        userId,
                        WorkoutSessionStatus.COMPLETED
                );

        List<ProgressExerciseProjection> exercises =
                progressDataRepository.findExercises(
                        userId,
                        WorkoutSessionStatus.COMPLETED
                );

        List<ProgressSetProjection> sets =
                progressDataRepository.findSets(
                        userId,
                        WorkoutSessionStatus.COMPLETED
                );

        List<ProgressGoalProjection> goals =
                progressDataRepository.findGoals(userId);

        return buildResponse(
                sessions,
                exercises,
                sets,
                goals
        );
    }

    private ProgressDataResponse buildResponse(
            List<ProgressSessionProjection> sessions,
            List<ProgressExerciseProjection> exercises,
            List<ProgressSetProjection> sets,
            List<ProgressGoalProjection> goals
    ) {

        Map<UUID, List<ProgressExerciseProjection>> exercisesBySession =
                new LinkedHashMap<>();

        for (ProgressExerciseProjection exercise : exercises) {
            exercisesBySession
                    .computeIfAbsent(
                            exercise.getSessionId(),
                            ignored -> new ArrayList<>()
                    )
                    .add(exercise);
        }

        Map<UUID, List<ProgressSetProjection>> setsByWorkoutExercise =
                new LinkedHashMap<>();

        for (ProgressSetProjection set : sets) {
            setsByWorkoutExercise
                    .computeIfAbsent(
                            set.getWorkoutExerciseId(),
                            ignored -> new ArrayList<>()
                    )
                    .add(set);
        }

        List<WorkoutSessionData> sessionData =
                sessions.stream()
                        .map(session ->
                                toSessionData(
                                        session,
                                        exercisesBySession,
                                        setsByWorkoutExercise
                                )
                        )
                        .toList();

        List<UserGoalData> goalData =
                goals.stream()
                        .map(goal ->
                                new UserGoalData(
                                        goal.getGoalId(),
                                        goal.getGoalName()
                                )
                        )
                        .toList();

        return new ProgressDataResponse(
                sessionData,
                goalData
        );
    }

    private WorkoutSessionData toSessionData(
            ProgressSessionProjection session,
            Map<UUID, List<ProgressExerciseProjection>> exercisesBySession,
            Map<UUID, List<ProgressSetProjection>> setsByWorkoutExercise
    ) {
        List<WorkoutExerciseData> exerciseData =
                exercisesBySession
                        .getOrDefault(
                                session.getSessionId(),
                                List.of()
                        )
                        .stream()
                        .map(exercise ->
                                new WorkoutExerciseData(
                                        exercise.getExerciseId(),
                                        exercise.getExerciseName(),
                                        exercise.getExerciseOrder(),
                                        setsByWorkoutExercise
                                                .getOrDefault(
                                                        exercise.getWorkoutExerciseId(),
                                                        List.of()
                                                )
                                                .stream()
                                                .map(set ->
                                                        new WorkoutSetData(
                                                                set.getSetId(),
                                                                set.getSetNumber(),
                                                                set.getWeight(),
                                                                set.getReps(),
                                                                set.getCompletedAt()
                                                        )
                                                )
                                                .toList()
                                )
                        )
                        .toList();

        return new WorkoutSessionData(
                session.getSessionId(),
                session.getWorkoutId(),
                session.getWorkoutName(),
                session.getStartedAt(),
                session.getCompletedAt(),
                exerciseData
        );
    }
}