CREATE TABLE workout_set (
                             id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                             workout_exercise_id UUID NOT NULL,
                             set_number INTEGER NOT NULL,
                             weight DECIMAL(8,2),
                             reps INTEGER NOT NULL,
                             completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                             CONSTRAINT fk_workout_set_workout_exercise
                                 FOREIGN KEY (workout_exercise_id)
                                     REFERENCES workout_exercise(id)
                                     ON DELETE CASCADE,

                             CONSTRAINT uk_workout_set_number
                                 UNIQUE (workout_exercise_id, set_number),

                             CONSTRAINT chk_workout_set_number
                                 CHECK (set_number > 0),

                             CONSTRAINT chk_workout_set_reps
                                 CHECK (reps > 0),

                             CONSTRAINT chk_workout_set_weight
                                 CHECK (weight IS NULL OR weight >= 0)
);