-- A workout can have at most one active session at a time
create unique index uq_workout_session_active_workout
    on workout_session(workout_id)
    where status = 'IN_PROGRESS';