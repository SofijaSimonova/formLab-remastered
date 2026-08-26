-- ============================================
-- SQUAT / LUNGE - QUAD FOCUS
-- ============================================

UPDATE exercise_focus_variation efv
SET description =
        'Use a more upright torso and allow greater knee flexion to increase quadriceps emphasis.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Quad Focus'
  AND e.name IN (
    'Bodyweight Squat',
    'Barbell Back Squat',
    'Goblet Squat'
    );


UPDATE exercise_focus_variation efv
SET description =
        'Keep the torso relatively upright and allow the front knee to travel forward to increase quadriceps emphasis.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Quad Focus'
  AND e.name IN (
    'Bulgarian Split Squat',
    'Backwards Lunge'
    );


UPDATE exercise_focus_variation efv
SET description =
        'Use a more upright torso and emphasize knee extension through the working leg to increase quadriceps emphasis.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Quad Focus'
  AND e.name = 'Dumbbell Step-Up';


-- ============================================
-- SQUAT / LUNGE - GLUTE FOCUS
-- ============================================

UPDATE exercise_focus_variation efv
SET description =
        'Use a more hip-dominant movement with greater hip flexion to increase glute contribution.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Glute Focus'
  AND e.name IN (
    'Bodyweight Squat',
    'Barbell Back Squat',
    'Goblet Squat'
    );


UPDATE exercise_focus_variation efv
SET description =
        'Use a slight forward torso lean and emphasize hip extension through the working leg to increase glute contribution.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Glute Focus'
  AND e.name IN (
    'Bulgarian Split Squat',
    'Backwards Lunge'
    );


UPDATE exercise_focus_variation efv
SET description =
        'Use a slightly greater hip contribution and drive through the working leg to increase glute emphasis.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Glute Focus'
  AND e.name = 'Dumbbell Step-Up';


-- ============================================
-- RDL - HAMSTRING FOCUS
-- ============================================

UPDATE exercise_focus_variation efv
SET description =
        'Increase the hip hinge and maintain a controlled eccentric phase to increase hamstring loading.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Hamstring Focus'
  AND e.name IN (
    'Barbell Romanian Deadlift',
    'Dumbbell Romanian Deadlift'
    );


-- ============================================
-- RDL - GLUTE FOCUS
-- ============================================

UPDATE exercise_focus_variation efv
SET description =
        'Use a strong hip hinge and emphasize hip extension to increase glute contribution.'
    FROM exercise e
WHERE efv.exercise_id = e.id
  AND efv.name = 'Glute Focus'
  AND e.name IN (
    'Barbell Romanian Deadlift',
    'Dumbbell Romanian Deadlift'
    );