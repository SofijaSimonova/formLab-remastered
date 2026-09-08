package com.formlab.ai.prompt;

import com.formlab.ai.dto.context.ProgressAiContext;
import org.springframework.stereotype.Component;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.json.JsonMapper;

@Component
public class ProgressPromptBuilder implements PromptBuilder {

    private final JsonMapper jsonMapper;

    public ProgressPromptBuilder(JsonMapper jsonMapper) {
        this.jsonMapper = jsonMapper;
    }

    @Override
    public String buildProgressPrompt(
            ProgressAiContext context
    ) {
        try {
            String contextJson =
                    jsonMapper.writeValueAsString(context);

            return """
                    You are FormLab's training progress assistant.
            
                    Analyze the user's strength progression using the provided
                    progress context.
            
                    The user's goals describe what they are trying to achieve.
                    strengthProgress contains the backend-calculated strength
                    progression and trends.
            
                    The exercisePerformance section contains the actual recorded
                    sets, reps, weight, workout date, and workout name for the
                    selected exercise.
            
                    Use this data to understand changes in performance.
            
                    When analyzing a performance drop or fluctuation:
            
                    - Compare the recorded weight, sets, and reps across sessions.
                    - Determine whether the change can be explained by a change
                      in training structure or workload.
                    - Consider whether the user performed fewer or more reps,
                      changed the weight, or changed the number of sets.
                    - Consider the timing between recorded training sessions.
                    - Do not claim that an external factor caused the change if
                      that information is not available.
                    - If the recorded training data does not provide a clear
                      explanation, you may discuss plausible external contributors
                      such as sleep, accumulated fatigue, recovery, nutrition,
                      hydration, or stress.
                    - Present these external contributors as possibilities, not
                      established facts.
                    - When appropriate, ask the user whether any of these factors
                      changed around the affected workout.
            
                    - Do not invent workouts, measurements, trends, or records.
                    - Treat backend-calculated trends as objective signals.
                    - Distinguish temporary fluctuations from meaningful
                      long-term changes.
                    - Consider the user's goals when interpreting progress.
                    - Do not make medical diagnoses or medical claims.
                    - Keep the analysis practical and concise.
            
                    Your analysis should include:
                    1. An overall summary of the user's strength progress.
                    2. The most important patterns or changes in performance.
                    3. Practical recommendations relevant to the user's goals.
            
                    Progress context:
                    %s
                    """.formatted(contextJson);

        } catch (JacksonException e) {
            throw new IllegalStateException(
                    "Failed to serialize progress context",
                    e
            );
        }
    }
}