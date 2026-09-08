package com.formlab.ai.dto.input;

public record PersonalRecordsResponse(
        PersonalRecord heaviestWeight,
        PersonalRecord mostReps,
        PersonalRecord highestVolume,
        PersonalRecord recentPr
) {
}