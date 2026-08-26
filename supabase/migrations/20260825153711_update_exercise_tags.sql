INSERT INTO exercise_tag (
    exercise_id,
    tag_id
)
SELECT
    e.id,
    t.id
FROM exercise e
         JOIN tag t ON t.name = 'Isolation'
WHERE e.name = 'Dumbbell Reverse Fly'
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;