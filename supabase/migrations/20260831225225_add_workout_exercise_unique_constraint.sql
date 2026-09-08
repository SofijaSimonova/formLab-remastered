ALTER TABLE workout_exercise
    ADD CONSTRAINT uk_workout_exercise_exercise
        UNIQUE (workout_id, exercise_id);