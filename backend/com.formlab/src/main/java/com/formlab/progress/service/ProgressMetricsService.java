package com.formlab.progress.service;

import com.formlab.progress.dto.ProgressMetricsResponse;
import com.formlab.progress.dto.WeeklyVolumeData;
import com.formlab.progress.repository.ProgressDailyVolumeProjection;
import com.formlab.progress.repository.ProgressMetricsProjection;
import com.formlab.progress.repository.ProgressMetricsRepository;
import com.formlab.progress.repository.ProgressWorkoutDateProjection;
import com.formlab.workout.entity.enums.WorkoutSessionStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ProgressMetricsService {

    private static final ZoneOffset UTC = ZoneOffset.UTC;

    private final ProgressMetricsRepository progressMetricsRepository;

    public ProgressMetricsService(
            ProgressMetricsRepository progressMetricsRepository
    ) {
        this.progressMetricsRepository = progressMetricsRepository;
    }

    public ProgressMetricsResponse getMetrics(UUID userId) {
        ProgressMetricsProjection projection =
                progressMetricsRepository.getMetrics(
                        userId,
                        WorkoutSessionStatus.COMPLETED
                );

        String completedStatus =
                WorkoutSessionStatus.COMPLETED.name();

        List<WeeklyVolumeData> weeklyVolume =
                buildWeeklyVolume(userId, completedStatus);

        int currentStreak =
                calculateCurrentStreak(userId, completedStatus);

        return new ProgressMetricsResponse(
                projection.getTotalWorkouts(),
                projection.getTotalSets(),
                projection.getTotalVolume(),
                weeklyVolume,
                currentStreak
        );
    }

    private List<WeeklyVolumeData> buildWeeklyVolume(
            UUID userId,
            String status
    ) {
        LocalDate today = LocalDate.now(UTC);

        Instant from = today
                .minusDays(6)
                .atStartOfDay()
                .toInstant(UTC);

        Instant to = today
                .plusDays(1)
                .atStartOfDay()
                .toInstant(UTC);

        List<ProgressDailyVolumeProjection> projections =
                progressMetricsRepository.getDailyVolume(
                        userId,
                        status,
                        from,
                        to
                );

        Map<LocalDate, BigDecimal> volumeByDate =
                projections.stream()
                        .collect(Collectors.groupingBy(
                                projection ->
                                        projection.getDate()
                                                .atZone(UTC)
                                                .toLocalDate(),
                                Collectors.reducing(
                                        BigDecimal.ZERO,
                                        ProgressDailyVolumeProjection::getVolume,
                                        BigDecimal::add
                                )
                        ));

        return IntStream.range(0, 7)
                .mapToObj(index -> {
                    LocalDate date =
                            today.minusDays(6L - index);

                    return new WeeklyVolumeData(
                            date,
                            volumeByDate.getOrDefault(
                                    date,
                                    BigDecimal.ZERO
                            )
                    );
                })
                .toList();
    }

    private int calculateCurrentStreak(
            UUID userId,
            String status
    ) {
        List<ProgressWorkoutDateProjection> projections =
                progressMetricsRepository.getWorkoutDates(
                        userId,
                        status
                );

        if (projections.isEmpty()) {
            return 0;
        }

        List<LocalDate> dates =
                projections.stream()
                        .map(projection ->
                                projection.getDate()
                                        .atZone(UTC)
                                        .toLocalDate()
                        )
                        .distinct()
                        .sorted()
                        .toList();

        LocalDate today = LocalDate.now(UTC);
        LocalDate latestDate = dates.getLast();

        long daysSinceLatest =
                ChronoUnit.DAYS.between(
                        latestDate,
                        today
                );

        if (daysSinceLatest > 1) {
            return 0;
        }

        int streak = 1;

        for (int i = dates.size() - 2; i >= 0; i--) {
            LocalDate currentDate = dates.get(i);
            LocalDate nextDate = dates.get(i + 1);

            if (currentDate.plusDays(1).equals(nextDate)) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }
}