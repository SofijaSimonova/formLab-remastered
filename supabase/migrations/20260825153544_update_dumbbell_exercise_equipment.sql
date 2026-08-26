-- Add Dumbbell equipment
INSERT INTO exercise_equipment (
    exercise_id,
    equipment_id
)
SELECT
    e.id,
    eq.id
FROM exercise e
         JOIN equipment eq ON eq.name = 'Dumbbell'
WHERE e.name IN (
                 'Standing Calf Raise',
                 'Single-Leg Calf Raise',
                 'Backwards Lunge'
    )
    ON CONFLICT (exercise_id, equipment_id) DO NOTHING;


-- Remove Bodyweight tag
DELETE FROM exercise_tag
WHERE exercise_id IN (
    SELECT id
    FROM exercise
    WHERE name IN (
                   'Standing Calf Raise',
                   'Single-Leg Calf Raise',
                   'Backwards Lunge'
        )
)
  AND tag_id = (
    SELECT id
    FROM tag
    WHERE name = 'Bodyweight'
);