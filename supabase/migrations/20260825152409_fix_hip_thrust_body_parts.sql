DELETE FROM exercise_body_part
WHERE exercise_id = (
    SELECT id
    FROM exercise
    WHERE name = 'Barbell Hip Thrust'
)
  AND body_part_id = (
    SELECT id
    FROM body_part
    WHERE name = 'Hamstrings'
);