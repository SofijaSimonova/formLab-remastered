ALTER TABLE exercise
    DROP CONSTRAINT IF EXISTS fk_exercise_movement_pattern;

DROP INDEX IF EXISTS idx_exercise_movement_pattern;

ALTER TABLE exercise
    DROP COLUMN IF EXISTS movement_pattern_id;

DROP TABLE IF EXISTS movement_pattern;
