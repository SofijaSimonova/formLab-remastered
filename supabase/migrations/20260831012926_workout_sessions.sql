-- Create workout_session table
create table workout_session (
                                 id uuid primary key default gen_random_uuid(),

                                 workout_id uuid not null,

                                 status varchar(20) not null,

                                 started_at timestamptz not null default now(),

                                 completed_at timestamptz,

                                 constraint fk_workout_session_workout
                                     foreign key (workout_id)
                                         references workout(id)
                                         on delete cascade
);


-- Index for finding sessions belonging to a workout
create index idx_workout_session_workout_id
    on workout_session(workout_id);


-- Add session reference to workout_set
alter table workout_set
    add column workout_session_id uuid;


-- Foreign key from workout_set to workout_session
alter table workout_set
    add constraint fk_workout_set_session
        foreign key (workout_session_id)
            references workout_session(id)
            on delete cascade;


-- Index for workout_set session lookups
create index idx_workout_set_session_id
    on workout_set(workout_session_id);