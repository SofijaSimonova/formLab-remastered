package com.formlab.progress.dto;

public record PersonalRecordsResponse(
        PersonalRecord heaviestWeight,
        PersonalRecord mostReps,
        PersonalRecord highestVolume,
        PersonalRecord recentPr
) {
}