package com.formlab.progress.repository;

import java.util.UUID;

public interface ProgressGoalProjection {

    UUID getGoalId();

    String getGoalName();
}