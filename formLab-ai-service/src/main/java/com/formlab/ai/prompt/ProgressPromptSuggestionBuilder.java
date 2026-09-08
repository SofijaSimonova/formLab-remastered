package com.formlab.ai.prompt;

import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.context.ProgressTrend;
import com.formlab.ai.dto.context.TrendDirection;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProgressPromptSuggestionBuilder {

    public List<String> build(
            ProgressAiContext context
    ) {
        if (context == null ||
                context.trends() == null ||
                context.trends().isEmpty()) {

            return List.of();
        }

        ProgressTrend trend =
                context.trends().getFirst();

        if (trend == null ||
                trend.direction() == null ||
                trend.exerciseName() == null ||
                trend.exerciseName().isBlank()) {

            return List.of();
        }

        String exerciseName =
                trend.exerciseName();

        return switch (trend.direction()) {

            case IMPROVING -> List.of(
                    "How can I keep improving my "
                            + exerciseName + "?",

                    "How can I continue progressing my "
                            + exerciseName + "?",

                    "What should I focus on next for my "
                            + exerciseName + "?"
            );

            case DECLINING -> List.of(
                    "What could be causing my "
                            + exerciseName + " to decline?",

                    "How can I improve my "
                            + exerciseName + " performance?",

                    "What should I change to reverse this trend?"
            );

            case STABLE -> List.of(
                    "How can I break through my "
                            + exerciseName + " plateau?",

                    "What can I do to start progressing again?",

                    "How can I improve my "
                            + exerciseName + " from here?"
            );

            case FLUCTUATING -> List.of(
                    "Why is my "
                            + exerciseName
                            + " performance fluctuating?",

                    "How can I make my "
                            + exerciseName
                            + " progress more consistent?",

                    "What could be causing these fluctuations?"
            );

            case INSUFFICIENT_DATA -> List.of(
                    "How can I build enough "
                            + exerciseName
                            + " data to track my progress?",

                    "How often should I train "
                            + exerciseName
                            + " to track progress?",

                    "What should I focus on while building my "
                            + exerciseName + " baseline?"
            );
        };
    }
}