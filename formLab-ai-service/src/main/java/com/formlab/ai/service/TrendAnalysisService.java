package com.formlab.ai.service;

import com.formlab.ai.dto.context.ProgressTrend;
import com.formlab.ai.dto.context.TrendDirection;
import com.formlab.ai.dto.input.StrengthProgressPoint;
import com.formlab.ai.dto.input.StrengthProgressResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class TrendAnalysisService {

    private static final BigDecimal SIGNIFICANT_CHANGE =
            BigDecimal.valueOf(0.02);

    public List<ProgressTrend> analyze(
            StrengthProgressResponse strengthProgress
    ) {
        if (strengthProgress == null ||
                strengthProgress.points() == null) {

            return List.of();
        }

        List<StrengthProgressPoint> points =
                strengthProgress.points();

        TrendDirection direction =
                determineDirection(points);

        return List.of(
                new ProgressTrend(
                        strengthProgress.exerciseName(),
                        "STRENGTH",
                        direction
                )
        );
    }

    private TrendDirection determineDirection(
            List<StrengthProgressPoint> points
    ) {
        if (points.size() < 2) {
            return TrendDirection.INSUFFICIENT_DATA;
        }

        List<StrengthProgressPoint> validPoints =
                points.stream()
                        .filter(point -> point.value() != null)
                        .toList();

        if (validPoints.size() < 2) {
            return TrendDirection.INSUFFICIENT_DATA;
        }

        BigDecimal firstValue =
                validPoints.getFirst().value();

        BigDecimal lastValue =
                validPoints.getLast().value();

        if (firstValue.compareTo(BigDecimal.ZERO) == 0) {
            return TrendDirection.INSUFFICIENT_DATA;
        }

        BigDecimal percentageChange =
                lastValue.subtract(firstValue)
                        .divide(
                                firstValue,
                                4,
                                RoundingMode.HALF_UP
                        );

        if (percentageChange.abs()
                .compareTo(SIGNIFICANT_CHANGE) < 0) {

            return TrendDirection.STABLE;
        }

        return determineDirectionFromPoints(validPoints);
    }

    private TrendDirection determineDirectionFromPoints(
            List<StrengthProgressPoint> points
    ) {
        int increases = 0;
        int decreases = 0;

        for (int i = 1; i < points.size(); i++) {

            BigDecimal previous =
                    points.get(i - 1).value();

            BigDecimal current =
                    points.get(i).value();

            BigDecimal percentageChange =
                    current.subtract(previous)
                            .divide(
                                    previous,
                                    4,
                                    RoundingMode.HALF_UP
                            );

            if (percentageChange.abs()
                    .compareTo(SIGNIFICANT_CHANGE) < 0) {
                continue;
            }

            if (current.compareTo(previous) > 0) {
                increases++;
            } else if (current.compareTo(previous) < 0) {
                decreases++;
            }
        }

        if (increases > 0 && decreases > 0) {
            return TrendDirection.FLUCTUATING;
        }

        if (increases > 0) {
            return TrendDirection.IMPROVING;
        }

        if (decreases > 0) {
            return TrendDirection.DECLINING;
        }

        return TrendDirection.STABLE;
    }
}