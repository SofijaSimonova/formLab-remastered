CREATE TABLE workout (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         user_id UUID NOT NULL,
                         name VARCHAR(150) NOT NULL,
                         description TEXT,
                         created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                         updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                         CONSTRAINT fk_workout_user
                             FOREIGN KEY (user_id)
                                 REFERENCES app_user(id)
                                 ON DELETE CASCADE
);

CREATE TABLE workout_exercise (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  workout_id UUID NOT NULL,
                                  exercise_id UUID NOT NULL,
                                  exercise_order INTEGER NOT NULL,
                                  target_sets INTEGER,
                                  target_reps INTEGER,

                                  CONSTRAINT fk_workout_exercise_workout
                                      FOREIGN KEY (workout_id)
                                          REFERENCES workout(id)
                                          ON DELETE CASCADE,

                                  CONSTRAINT fk_workout_exercise_exercise
                                      FOREIGN KEY (exercise_id)
                                          REFERENCES exercise(id)
                                          ON DELETE RESTRICT,

                                  CONSTRAINT uk_workout_exercise_order
                                      UNIQUE (workout_id, exercise_order)
);