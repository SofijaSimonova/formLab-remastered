INSERT INTO body_part (name)
VALUES
    ('Chest'),
    ('Back'),
    ('Shoulders'),
    ('Biceps'),
    ('Triceps'),
    ('Forearms'),
    ('Quadriceps'),
    ('Hamstrings'),
    ('Glutes'),
    ('Calves'),
    ('Abdominals'),
    ('Obliques');


INSERT INTO movement_pattern (name)
VALUES
    ('Horizontal Push'),
    ('Horizontal Pull'),
    ('Vertical Push'),
    ('Squat'),
    ('Lunge'),
    ('Hinge'),
    ('Isolation'),
    ('Calf Raise'),
    ('Core');


INSERT INTO equipment (name)
VALUES
    ('Barbell'),
    ('Dumbbell'),
    ('Bench'),
    ('Box');


INSERT INTO exercise (
    name,
    description,
    instructions,
    movement_pattern_id
)
VALUES

    (
        'Push-Up',
        'A bodyweight horizontal pushing exercise.',
        'Start in a high plank position. Lower your body toward the floor while keeping your body straight, then push yourself back up.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Push')
    ),

    (
        'Bench Press',
        'A barbell pressing exercise performed on a flat bench.',
        'Lie on the bench with your feet firmly on the floor. Lower the bar toward your chest and press it back up.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Push')
    ),

    (
        'Incline Bench Press',
        'A barbell pressing exercise performed on an incline bench.',
        'Lie on the incline bench. Lower the bar toward the upper chest and press it back to the starting position.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Push')
    ),

    (
        'Dumbbell Bench Press',
        'A dumbbell pressing exercise performed on a flat bench.',
        'Lie on the bench holding a dumbbell in each hand. Lower the dumbbells toward your chest and press them back up.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Push')
    ),

    (
        'Incline Dumbbell Press',
        'A dumbbell pressing exercise performed on an incline bench.',
        'Lie on the incline bench holding dumbbells. Lower them toward the upper chest and press them back up.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Push')
    ),

    (
        'Chest-Supported Dumbbell Row',
        'A horizontal pulling exercise performed with the chest supported on a bench.',
        'Lie chest-down on the bench while holding dumbbells. Pull the dumbbells toward your torso and lower them under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Pull')
    ),

    (
        'Barbell Row',
        'A barbell horizontal pulling exercise.',
        'Hinge forward at the hips while maintaining a stable back. Pull the bar toward your torso and lower it under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Pull')
    ),

    (
        'Pendlay Row',
        'A barbell row performed from a bent-over position with the bar returning to the floor between repetitions.',
        'Position the bar on the floor. Hinge forward, pull the bar toward your torso, then return it to the floor.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Pull')
    ),

    (
        'Overhead Press',
        'A barbell vertical pressing exercise.',
        'Start with the bar at shoulder level. Press it overhead while keeping your body stable, then lower it under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Vertical Push')
    ),

    (
        'Dumbbell Shoulder Press',
        'A dumbbell vertical pressing exercise.',
        'Hold the dumbbells at shoulder level. Press them overhead and lower them under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Vertical Push')
    ),

    (
        'Seated Dumbbell Shoulder Press',
        'A seated dumbbell shoulder pressing exercise performed on a bench.',
        'Sit on the bench with dumbbells at shoulder level. Press them overhead and lower them under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Vertical Push')
    ),

    (
        'Dumbbell Lateral Raise',
        'A dumbbell shoulder isolation exercise.',
        'Stand with dumbbells at your sides. Raise your arms outward until approximately shoulder height, then lower them under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Isolation')
    ),

    (
        'Dumbbell Reverse Fly',
        'A dumbbell exercise targeting the rear shoulders and upper back.',
        'With your chest supported on the bench, raise the dumbbells outward and backward, then lower them under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Isolation')
    ),

    (
        'Barbell Curl',
        'A barbell elbow flexion exercise targeting the biceps.',
        'Hold the barbell with your palms facing upward. Curl the bar toward your shoulders while keeping your elbows stable.',
        (SELECT id FROM movement_pattern WHERE name = 'Isolation')
    ),

    (
        'Dumbbell Curl',
        'A dumbbell elbow flexion exercise targeting the biceps.',
        'Hold dumbbells at your sides with your palms facing forward. Curl the dumbbells toward your shoulders and lower them under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Isolation')
    ),

    (
        'Hammer Curl',
        'A dumbbell curl performed with a neutral grip.',
        'Hold the dumbbells with your palms facing each other. Curl them toward your shoulders while keeping your elbows close to your body.',
        (SELECT id FROM movement_pattern WHERE name = 'Isolation')
    ),

    (
        'Close-Grip Push-Up',
        'A bodyweight push-up variation emphasizing the triceps.',
        'Start in a high plank with your hands positioned closer together. Lower your body and push back up while keeping your elbows relatively close to your body.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Push')
    ),

    (
        'Close-Grip Bench Press',
        'A barbell bench press variation emphasizing the triceps.',
        'Lie on the bench with a narrower grip than a standard bench press. Lower the bar toward your chest and press it back up.',
        (SELECT id FROM movement_pattern WHERE name = 'Horizontal Push')
    ),

    (
        'Dumbbell Overhead Triceps Extension',
        'A dumbbell exercise targeting the triceps.',
        'Hold a dumbbell overhead with both hands. Lower it behind your head by bending your elbows, then extend your arms.',
        (SELECT id FROM movement_pattern WHERE name = 'Isolation')
    ),

    (
        'Lying Dumbbell Triceps Extension',
        'A dumbbell triceps exercise performed while lying on a bench.',
        'Lie on the bench holding dumbbells above your chest. Bend your elbows to lower the dumbbells and extend them back up.',
        (SELECT id FROM movement_pattern WHERE name = 'Isolation')
    ),

    (
        'Standing Calf Raise',
        'A bodyweight calf exercise.',
        'Stand upright and raise your heels from the floor by pushing through the balls of your feet. Lower your heels under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Calf Raise')
    ),

    (
        'Single-Leg Calf Raise',
        'A single-leg bodyweight calf exercise.',
        'Stand on one leg and raise your heel as high as possible. Lower it under control and repeat.',
        (SELECT id FROM movement_pattern WHERE name = 'Calf Raise')
    ),

    (
        'Bodyweight Squat',
        'A bodyweight squat exercise.',
        'Stand with your feet approximately shoulder-width apart. Lower your hips by bending your knees and hips, then return to standing.',
        (SELECT id FROM movement_pattern WHERE name = 'Squat')
    ),

    (
        'Barbell Back Squat',
        'A barbell squat performed with the bar positioned across the upper back.',
        'Place the barbell across your upper back. Squat down while maintaining control and then drive through your feet to return to standing.',
        (SELECT id FROM movement_pattern WHERE name = 'Squat')
    ),

    (
        'Bulgarian Split Squat',
        'A unilateral squat variation performed with the rear foot supported on a box.',
        'Place the rear foot on the box and position the front foot firmly on the floor. Lower your body toward the floor and drive through the front leg to return upward.',
        (SELECT id FROM movement_pattern WHERE name = 'Lunge')
    ),

    (
        'Goblet Squat',
        'A squat performed while holding a dumbbell in front of the chest.',
        'Hold a dumbbell close to your chest. Squat down while keeping your torso controlled, then return to standing.',
        (SELECT id FROM movement_pattern WHERE name = 'Squat')
    ),

    (
        'Barbell Romanian Deadlift',
        'A barbell hip hinge emphasizing the hamstrings and glutes.',
        'Hold the barbell in front of your thighs. Push your hips backward while keeping the bar close to your body, then drive your hips forward to return to standing.',
        (SELECT id FROM movement_pattern WHERE name = 'Hinge')
    ),

    (
        'Dumbbell Romanian Deadlift',
        'A dumbbell hip hinge emphasizing the hamstrings and glutes.',
        'Hold dumbbells in front of your thighs. Push your hips backward while keeping the dumbbells close to your body, then return to standing.',
        (SELECT id FROM movement_pattern WHERE name = 'Hinge')
    ),

    (
        'Barbell Hip Thrust',
        'A barbell hip extension exercise emphasizing the glutes.',
        'Position your upper back against the bench with the barbell across your hips. Drive your hips upward and lower them under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Hinge')
    ),

    (
        'Dumbbell Step-Up',
        'A unilateral leg exercise performed by stepping onto a box while holding dumbbells.',
        'Stand in front of the box holding dumbbells. Step onto the box with one leg and drive through that leg to stand on top, then step down under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Lunge')
    ),

    (
        'Backwards Lunge',
        'A unilateral lunge performed by stepping backward.',
        'Stand upright and step one leg backward. Lower your body until the front leg is bent, then drive through the front foot to return to standing.',
        (SELECT id FROM movement_pattern WHERE name = 'Lunge')
    ),

    (
        'Plank',
        'A bodyweight isometric core exercise.',
        'Support your body on your forearms and toes while keeping your body in a straight line. Hold the position.',
        (SELECT id FROM movement_pattern WHERE name = 'Core')
    ),

    (
        'Crunch',
        'A bodyweight abdominal exercise.',
        'Lie on your back with your knees bent. Contract your abdominal muscles to lift your upper back slightly from the floor, then lower under control.',
        (SELECT id FROM movement_pattern WHERE name = 'Core')
    ),

    (
        'Bicycle Crunch',
        'A bodyweight abdominal exercise involving alternating trunk rotation.',
        'Lie on your back and alternate bringing each elbow toward the opposite knee while extending the other leg.',
        (SELECT id FROM movement_pattern WHERE name = 'Core')
    ),

    (
        'Russian Twist',
        'A rotational core exercise.',
        'Sit with your knees bent and torso slightly reclined. Rotate your torso from side to side while maintaining control.',
        (SELECT id FROM movement_pattern WHERE name = 'Core')
    );


-- ============================================
-- EXERCISE → BODY PARTS
-- ============================================

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Chest'
WHERE e.name IN (
                 'Push-Up',
                 'Bench Press',
                 'Incline Bench Press',
                 'Dumbbell Bench Press',
                 'Incline Dumbbell Press',
                 'Close-Grip Push-Up',
                 'Close-Grip Bench Press'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Triceps'
WHERE e.name IN (
                 'Push-Up',
                 'Bench Press',
                 'Incline Bench Press',
                 'Dumbbell Bench Press',
                 'Incline Dumbbell Press',
                 'Close-Grip Push-Up',
                 'Close-Grip Bench Press',
                 'Overhead Press',
                 'Dumbbell Shoulder Press',
                 'Seated Dumbbell Shoulder Press',
                 'Dumbbell Overhead Triceps Extension',
                 'Lying Dumbbell Triceps Extension'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Shoulders'
WHERE e.name IN (
                 'Incline Bench Press',
                 'Incline Dumbbell Press',
                 'Overhead Press',
                 'Dumbbell Shoulder Press',
                 'Seated Dumbbell Shoulder Press',
                 'Dumbbell Lateral Raise',
                 'Dumbbell Reverse Fly'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Back'
WHERE e.name IN (
                 'Chest-Supported Dumbbell Row',
                 'Barbell Row',
                 'Pendlay Row',
                 'Dumbbell Reverse Fly'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Biceps'
WHERE e.name IN (
                 'Chest-Supported Dumbbell Row',
                 'Barbell Row',
                 'Pendlay Row',
                 'Barbell Curl',
                 'Dumbbell Curl',
                 'Hammer Curl'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Forearms'
WHERE e.name = 'Hammer Curl';

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Quadriceps'
WHERE e.name IN (
                 'Bodyweight Squat',
                 'Barbell Back Squat',
                 'Bulgarian Split Squat',
                 'Goblet Squat',
                 'Dumbbell Step-Up',
                 'Backwards Lunge'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Glutes'
WHERE e.name IN (
                 'Bodyweight Squat',
                 'Barbell Back Squat',
                 'Bulgarian Split Squat',
                 'Goblet Squat',
                 'Barbell Romanian Deadlift',
                 'Dumbbell Romanian Deadlift',
                 'Barbell Hip Thrust',
                 'Dumbbell Step-Up',
                 'Backwards Lunge'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Hamstrings'
WHERE e.name IN (
                 'Barbell Back Squat',
                 'Barbell Romanian Deadlift',
                 'Dumbbell Romanian Deadlift',
                 'Barbell Hip Thrust'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Calves'
WHERE e.name IN (
                 'Standing Calf Raise',
                 'Single-Leg Calf Raise'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Abdominals'
WHERE e.name IN (
                 'Plank',
                 'Crunch',
                 'Bicycle Crunch',
                 'Russian Twist'
    );

INSERT INTO exercise_body_part (exercise_id, body_part_id)
SELECT e.id, bp.id
FROM exercise e
         JOIN body_part bp ON bp.name = 'Obliques'
WHERE e.name IN (
                 'Bicycle Crunch',
                 'Russian Twist'
    );


-- ============================================
-- EXERCISE → EQUIPMENT
-- ============================================

INSERT INTO exercise_equipment (exercise_id, equipment_id)
SELECT e.id, eq.id
FROM exercise e
         JOIN equipment eq ON eq.name = 'Barbell'
WHERE e.name IN (
                 'Bench Press',
                 'Incline Bench Press',
                 'Barbell Row',
                 'Pendlay Row',
                 'Overhead Press',
                 'Barbell Curl',
                 'Close-Grip Bench Press',
                 'Barbell Back Squat',
                 'Barbell Romanian Deadlift',
                 'Barbell Hip Thrust'
    );

INSERT INTO exercise_equipment (exercise_id, equipment_id)
SELECT e.id, eq.id
FROM exercise e
         JOIN equipment eq ON eq.name = 'Dumbbell'
WHERE e.name IN (
                 'Dumbbell Bench Press',
                 'Incline Dumbbell Press',
                 'Chest-Supported Dumbbell Row',
                 'Dumbbell Shoulder Press',
                 'Seated Dumbbell Shoulder Press',
                 'Dumbbell Lateral Raise',
                 'Dumbbell Reverse Fly',
                 'Dumbbell Curl',
                 'Hammer Curl',
                 'Dumbbell Overhead Triceps Extension',
                 'Lying Dumbbell Triceps Extension',
                 'Bulgarian Split Squat',
                 'Goblet Squat',
                 'Dumbbell Romanian Deadlift',
                 'Dumbbell Step-Up'
    );

INSERT INTO exercise_equipment (exercise_id, equipment_id)
SELECT e.id, eq.id
FROM exercise e
         JOIN equipment eq ON eq.name = 'Bench'
WHERE e.name IN (
                 'Bench Press',
                 'Incline Bench Press',
                 'Dumbbell Bench Press',
                 'Incline Dumbbell Press',
                 'Chest-Supported Dumbbell Row',
                 'Seated Dumbbell Shoulder Press',
                 'Dumbbell Reverse Fly',
                 'Close-Grip Bench Press',
                 'Lying Dumbbell Triceps Extension',
                 'Barbell Hip Thrust'
    );

INSERT INTO exercise_equipment (exercise_id, equipment_id)
SELECT e.id, eq.id
FROM exercise e
         JOIN equipment eq ON eq.name = 'Box'
WHERE e.name IN (
                 'Bulgarian Split Squat',
                 'Dumbbell Step-Up'
    );


-- ============================================
-- FOCUS VARIATIONS
-- ============================================

INSERT INTO exercise_focus_variation (
    exercise_id,
    focus_body_part_id,
    name,
    description
)
SELECT
    e.id,
    bp.id,
    'Quad Focus',
    'Variation emphasizing the quadriceps.'
FROM exercise e
         JOIN body_part bp ON bp.name = 'Quadriceps'
WHERE e.name IN (
                 'Bodyweight Squat',
                 'Barbell Back Squat',
                 'Goblet Squat',
                 'Bulgarian Split Squat',
                 'Backwards Lunge'
    );

INSERT INTO exercise_focus_variation (
    exercise_id,
    focus_body_part_id,
    name,
    description
)
SELECT
    e.id,
    bp.id,
    'Glute Focus',
    'Variation emphasizing the glutes.'
FROM exercise e
         JOIN body_part bp ON bp.name = 'Glutes'
WHERE e.name IN (
                 'Bodyweight Squat',
                 'Barbell Back Squat',
                 'Goblet Squat',
                 'Bulgarian Split Squat',
                 'Backwards Lunge'
    );

INSERT INTO exercise_focus_variation (
    exercise_id,
    focus_body_part_id,
    name,
    description
)
SELECT
    e.id,
    bp.id,
    'Hamstring Focus',
    'Variation emphasizing the hamstrings.'
FROM exercise e
         JOIN body_part bp ON bp.name = 'Hamstrings'
WHERE e.name IN (
                 'Barbell Romanian Deadlift',
                 'Dumbbell Romanian Deadlift'
    );

INSERT INTO exercise_focus_variation (
    exercise_id,
    focus_body_part_id,
    name,
    description
)
SELECT
    e.id,
    bp.id,
    'Glute Focus',
    'Variation emphasizing the glutes.'
FROM exercise e
         JOIN body_part bp ON bp.name = 'Glutes'
WHERE e.name IN (
                 'Barbell Romanian Deadlift',
                 'Dumbbell Romanian Deadlift'
    );