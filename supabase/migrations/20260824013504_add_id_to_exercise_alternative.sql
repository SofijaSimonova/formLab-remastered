-- Add a surrogate UUID primary key
ALTER TABLE exercise_alternative
DROP CONSTRAINT exercise_alternative_pkey;

ALTER TABLE exercise_alternative
    ADD COLUMN id UUID DEFAULT gen_random_uuid();

UPDATE exercise_alternative
SET id = gen_random_uuid()
WHERE id IS NULL;

ALTER TABLE exercise_alternative
    ALTER COLUMN id SET NOT NULL;

ALTER TABLE exercise_alternative
    ADD CONSTRAINT exercise_alternative_pkey PRIMARY KEY (id);

-- Prevent duplicate alternative relationships
ALTER TABLE exercise_alternative
    ADD CONSTRAINT uk_exercise_alternative
        UNIQUE (exercise_id, alternative_exercise_id);