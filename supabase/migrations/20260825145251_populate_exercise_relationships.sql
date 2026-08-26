-- UPPER BODY
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Upper Body'
WHERE e.name IN (
                 'Push-Up',
                 'Bench Press',
                 'Incline Bench Press',
                 'Dumbbell Bench Press',
                 'Incline Dumbbell Press',
                 'Chest-Supported Dumbbell Row',
                 'Barbell Row',
                 'Pendlay Row',
                 'Overhead Press',
                 'Dumbbell Shoulder Press',
                 'Seated Dumbbell Shoulder Press',
                 'Dumbbell Lateral Raise',
                 'Dumbbell Reverse Fly',
                 'Barbell Curl',
                 'Dumbbell Curl',
                 'Hammer Curl',
                 'Close-Grip Push-Up',
                 'Close-Grip Bench Press',
                 'Dumbbell Overhead Triceps Extension',
                 'Lying Dumbbell Triceps Extension'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- LOWER BODY
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Lower Body'
WHERE e.name IN (
                 'Standing Calf Raise',
                 'Single-Leg Calf Raise',
                 'Bodyweight Squat',
                 'Barbell Back Squat',
                 'Bulgarian Split Squat',
                 'Goblet Squat',
                 'Barbell Romanian Deadlift',
                 'Dumbbell Romanian Deadlift',
                 'Barbell Hip Thrust',
                 'Dumbbell Step-Up',
                 'Backwards Lunge'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- PUSH
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Push'
WHERE e.name IN (
                 'Push-Up',
                 'Bench Press',
                 'Incline Bench Press',
                 'Dumbbell Bench Press',
                 'Incline Dumbbell Press',
                 'Overhead Press',
                 'Dumbbell Shoulder Press',
                 'Seated Dumbbell Shoulder Press',
                 'Close-Grip Push-Up',
                 'Close-Grip Bench Press'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- PULL
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Pull'
WHERE e.name IN (
                 'Chest-Supported Dumbbell Row',
                 'Barbell Row',
                 'Pendlay Row',
                 'Dumbbell Reverse Fly',
                 'Barbell Curl',
                 'Dumbbell Curl',
                 'Hammer Curl'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- CORE
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Core'
WHERE e.name IN (
                 'Plank',
                 'Crunch',
                 'Bicycle Crunch',
                 'Russian Twist'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- UNILATERAL
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Unilateral'
WHERE e.name IN (
                 'Single-Leg Calf Raise',
                 'Bulgarian Split Squat',
                 'Dumbbell Step-Up',
                 'Backwards Lunge'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- COMPOUND
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Compound'
WHERE e.name IN (
                 'Push-Up',
                 'Bench Press',
                 'Incline Bench Press',
                 'Dumbbell Bench Press',
                 'Incline Dumbbell Press',
                 'Chest-Supported Dumbbell Row',
                 'Barbell Row',
                 'Pendlay Row',
                 'Overhead Press',
                 'Dumbbell Shoulder Press',
                 'Seated Dumbbell Shoulder Press',
                 'Close-Grip Push-Up',
                 'Close-Grip Bench Press',
                 'Bodyweight Squat',
                 'Barbell Back Squat',
                 'Bulgarian Split Squat',
                 'Goblet Squat',
                 'Barbell Romanian Deadlift',
                 'Dumbbell Romanian Deadlift',
                 'Barbell Hip Thrust',
                 'Dumbbell Step-Up',
                 'Backwards Lunge'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- ISOLATION
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Isolation'
WHERE e.name IN (
                 'Dumbbell Lateral Raise',
                 'Barbell Curl',
                 'Dumbbell Curl',
                 'Hammer Curl',
                 'Dumbbell Overhead Triceps Extension',
                 'Lying Dumbbell Triceps Extension',
                 'Standing Calf Raise',
                 'Single-Leg Calf Raise',
                 'Crunch'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;


-- BODYWEIGHT
INSERT INTO exercise_tag (exercise_id, tag_id)
SELECT e.id, t.id
FROM exercise e
         JOIN tag t ON t.name = 'Bodyweight'
WHERE e.name IN (
                 'Push-Up',
                 'Close-Grip Push-Up',
                 'Standing Calf Raise',
                 'Single-Leg Calf Raise',
                 'Bodyweight Squat',
                 'Backwards Lunge',
                 'Plank',
                 'Crunch',
                 'Bicycle Crunch',
                 'Russian Twist'
    )
    ON CONFLICT (exercise_id, tag_id) DO NOTHING;