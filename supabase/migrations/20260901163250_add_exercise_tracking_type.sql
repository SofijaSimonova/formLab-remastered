-- ============================================
-- EXERCISE TRACKING TYPE
-- ============================================

ALTER TABLE exercise
    ADD COLUMN tracking_type VARCHAR(20);


-- ============================================
-- REPS-BASED EXERCISES
-- ============================================

UPDATE exercise
SET tracking_type = 'REPS'
WHERE name IN (
               'Push-Up',
               'Close-Grip Push-Up',
               'Bodyweight Squat',
               'Plank',
               'Crunch',
               'Bicycle Crunch',
               'Russian Twist'
    );


-- ============================================
-- WEIGHT-BASED EXERCISES
-- ============================================

UPDATE exercise
SET tracking_type = 'WEIGHT'
WHERE name IN (
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
               'Close-Grip Bench Press',
               'Dumbbell Overhead Triceps Extension',
               'Lying Dumbbell Triceps Extension',
               'Standing Calf Raise',
               'Single-Leg Calf Raise',
               'Barbell Back Squat',
               'Bulgarian Split Squat',
               'Goblet Squat',
               'Barbell Romanian Deadlift',
               'Dumbbell Romanian Deadlift',
               'Barbell Hip Thrust',
               'Dumbbell Step-Up',
               'Backwards Lunge'
    );


-- ============================================
-- CONSTRAINTS
-- ============================================

ALTER TABLE exercise
    ALTER COLUMN tracking_type SET NOT NULL;

ALTER TABLE exercise
    ADD CONSTRAINT exercise_tracking_type_check
        CHECK (
            tracking_type IN ('WEIGHT', 'REPS')
            );