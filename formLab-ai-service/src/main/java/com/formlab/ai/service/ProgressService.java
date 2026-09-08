package com.formlab.ai.service;

import com.formlab.ai.client.FormLabClient;
import com.formlab.ai.dto.context.ProgressAiContext;
import com.formlab.ai.dto.input.ProgressDataResponse;
import com.formlab.ai.dto.input.StrengthProgressRange;
import com.formlab.ai.dto.input.StrengthProgressResponse;
import com.formlab.ai.dto.input.UserGoalData;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProgressService {

    private final FormLabClient formLabClient;
    private final ProgressContextBuilder progressContextBuilder;

    public ProgressService(
            FormLabClient formLabClient,
            ProgressContextBuilder progressContextBuilder
    ) {
        this.formLabClient = formLabClient;
        this.progressContextBuilder = progressContextBuilder;
    }

    public ProgressAiContext getProgressContext(
            String accessToken,
            UUID exerciseId,
            StrengthProgressRange range
    ) {
        ProgressDataResponse progressData =
                formLabClient.getProgressData(
                        accessToken
                );

        StrengthProgressResponse strengthProgress =
                formLabClient.getStrengthProgress(
                        accessToken,
                        exerciseId,
                        range
                );

        List<String> goals =
                progressData.goals()
                        .stream()
                        .map(UserGoalData::goalName)
                        .toList();

        return progressContextBuilder.build(
                strengthProgress,
                goals,
                progressData
        );
    }
}