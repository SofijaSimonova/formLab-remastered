-- workout_set must belong to a workout session
alter table workout_set
    alter column workout_session_id set not null;


-- Remove old uniqueness rule
alter table workout_set
drop constraint uk_workout_set_number;


-- A set number must be unique within
-- a specific workout session and exercise
alter table workout_set
    add constraint uk_workout_set_number
        unique (
                workout_session_id,
                workout_exercise_id,
                set_number
            );