package com.formlab.progress.service;

import com.formlab.progress.dto.PersonalRecord;
import com.formlab.progress.dto.PersonalRecordsResponse;
import com.formlab.progress.repository.HeaviestWeightProjection;
import com.formlab.progress.repository.HighestVolumeProjection;
import com.formlab.progress.repository.MostRepsProjection;
import com.formlab.progress.repository.ProgressPersonalRecordsRepository;
import com.formlab.progress.repository.RecentPrProjection;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.ZoneOffset;
import java.util.UUID;

@Service
public class ProgressPersonalRecordsService {

    private final ProgressPersonalRecordsRepository repository;

    public ProgressPersonalRecordsService(
            ProgressPersonalRecordsRepository repository
    ) {
        this.repository = repository;
    }

    public PersonalRecordsResponse getPersonalRecords(
            UUID userId
    ) {
        HeaviestWeightProjection heaviestWeight =
                repository.findHeaviestWeight(userId);

        MostRepsProjection mostReps =
                repository.findMostReps(userId);

        HighestVolumeProjection highestVolume =
                repository.findHighestVolume(userId);

        RecentPrProjection recentPr =
                repository.findRecentPr(userId);

        return new PersonalRecordsResponse(
                toHeaviestWeight(heaviestWeight),
                toMostReps(mostReps),
                toHighestVolume(highestVolume),
                toRecentPr(recentPr)
        );
    }

    private PersonalRecord toHeaviestWeight(
            HeaviestWeightProjection projection
    ) {
        if (projection == null) {
            return null;
        }

        return new PersonalRecord(
                projection.getExerciseId(),
                projection.getExerciseName(),
                projection.getWeight(),
                null,
                projection.getAchievedAt().atOffset(ZoneOffset.UTC),
                projection.getWorkoutSessionId(),
                projection.getWorkoutName()
        );
    }

    private PersonalRecord toMostReps(
            MostRepsProjection projection
    ) {
        if (projection == null) {
            return null;
        }

        return new PersonalRecord(
                projection.getExerciseId(),
                projection.getExerciseName(),
                null,
                projection.getReps(),
                projection.getAchievedAt().atOffset(ZoneOffset.UTC),
                projection.getWorkoutSessionId(),
                projection.getWorkoutName()
        );
    }

    private PersonalRecord toHighestVolume(
            HighestVolumeProjection projection
    ) {
        if (projection == null) {
            return null;
        }

        return new PersonalRecord(
                null,
                null,
                projection.getVolume(),
                null,
                projection.getAchievedAt().atOffset(ZoneOffset.UTC),
                projection.getWorkoutSessionId(),
                projection.getWorkoutName()
        );
    }

    private PersonalRecord toRecentPr(
            RecentPrProjection projection
    ) {
        if (projection == null) {
            return null;
        }

        return new PersonalRecord(
                projection.getExerciseId(),
                projection.getExerciseName(),
                projection.getWeight(),
                projection.getReps(),
                projection.getAchievedAt().atOffset(ZoneOffset.UTC),
                projection.getWorkoutSessionId(),
                projection.getWorkoutName()
        );
    }
}