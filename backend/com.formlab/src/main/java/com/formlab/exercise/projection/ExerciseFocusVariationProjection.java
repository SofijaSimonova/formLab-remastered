package com.formlab.exercise.projection;

import java.util.UUID;

public interface ExerciseFocusVariationProjection {

    UUID getId();

    UUID getExerciseId();

    UUID getFocusBodyPartId();

    String getName();

    String getDescription();

    String getAnimationReference();
}