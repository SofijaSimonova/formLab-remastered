INSERT INTO exercise_alternative (
    exercise_id,
    alternative_exercise_id,
    reason
)
SELECT
    e1.id,
    e2.id,
    v.reason
FROM (
         VALUES

             -- ============================================
             -- BENCH PRESS
             -- ============================================

             (
                 'Bench Press',
                 'Dumbbell Bench Press',
                 'Greater freedom of movement and more independent loading of each arm'
             ),
             (
                 'Dumbbell Bench Press',
                 'Bench Press',
                 'Greater loading potential and a more stable bilateral pressing setup'
             ),

             (
                 'Bench Press',
                 'Close-Grip Bench Press',
                 'Narrower grip increases triceps emphasis'
             ),
             (
                 'Close-Grip Bench Press',
                 'Bench Press',
                 'Wider grip shifts emphasis more toward the chest'
             ),


             -- ============================================
             -- INCLINE BENCH PRESS
             -- ============================================

             (
                 'Incline Bench Press',
                 'Incline Dumbbell Press',
                 'Greater freedom of movement and more independent loading of each arm'
             ),
             (
                 'Incline Dumbbell Press',
                 'Incline Bench Press',
                 'Greater loading potential and a more stable bilateral pressing setup'
             ),


             -- ============================================
             -- PUSH-UP
             -- ============================================

             (
                 'Push-Up',
                 'Close-Grip Push-Up',
                 'Narrower hand position increases triceps emphasis'
             ),
             (
                 'Close-Grip Push-Up',
                 'Push-Up',
                 'Standard hand position provides a more balanced chest and triceps contribution'
             ),


             -- ============================================
             -- BARBELL ROW
             -- ============================================

             (
                 'Barbell Row',
                 'Chest-Supported Dumbbell Row',
                 'Chest support reduces trunk stabilization demands and allows greater focus on the pulling movement'
             ),
             (
                 'Chest-Supported Dumbbell Row',
                 'Barbell Row',
                 'Removes chest support and increases the demand for trunk stabilization'
             ),

             (
                 'Barbell Row',
                 'Pendlay Row',
                 'Each repetition starts from the floor, emphasizing forceful concentric pulling'
             ),
             (
                 'Pendlay Row',
                 'Barbell Row',
                 'Allows a more continuous rowing motion without resetting the bar between repetitions'
             ),


             -- ============================================
             -- OVERHEAD PRESS
             -- ============================================

             (
                 'Overhead Press',
                 'Dumbbell Shoulder Press',
                 'Allows more independent movement of each arm'
             ),
             (
                 'Dumbbell Shoulder Press',
                 'Overhead Press',
                 'Provides greater loading potential and a more stable bilateral movement'
             ),

             (
                 'Dumbbell Shoulder Press',
                 'Seated Dumbbell Shoulder Press',
                 'Back support reduces whole-body stabilization demands'
             ),
             (
                 'Seated Dumbbell Shoulder Press',
                 'Dumbbell Shoulder Press',
                 'Standing execution increases whole-body stabilization demands'
             ),


             -- ============================================
             -- BICEPS
             -- ============================================

             (
                 'Barbell Curl',
                 'Dumbbell Curl',
                 'Allows each arm to move and be loaded independently'
             ),
             (
                 'Dumbbell Curl',
                 'Barbell Curl',
                 'Provides a more stable bilateral setup and greater loading potential'
             ),

             (
                 'Dumbbell Curl',
                 'Hammer Curl',
                 'Neutral grip increases the contribution of the brachialis and brachioradialis'
             ),
             (
                 'Hammer Curl',
                 'Dumbbell Curl',
                 'Supinated grip increases the mechanical contribution of the biceps brachii'
             ),


             -- ============================================
             -- SQUATS
             -- ============================================

             (
                 'Bodyweight Squat',
                 'Goblet Squat',
                 'Adds external resistance while maintaining a relatively simple squat setup'
             ),
             (
                 'Goblet Squat',
                 'Bodyweight Squat',
                 'Removes external resistance and reduces the loading requirement'
             ),

             (
                 'Barbell Back Squat',
                 'Goblet Squat',
                 'Reduces loading and setup demands, making the movement more accessible'
             ),
             (
                 'Goblet Squat',
                 'Barbell Back Squat',
                 'Provides substantially greater loading potential for progressive overload'
             ),

             (
                 'Barbell Back Squat',
                 'Bodyweight Squat',
                 'Removes external loading and simplifies the exercise setup'
             ),
             (
                 'Bodyweight Squat',
                 'Barbell Back Squat',
                 'Provides substantially greater loading potential for progressive overload'
             ),


             -- ============================================
             -- BULGARIAN SPLIT SQUAT
             -- ============================================

             (
                 'Bulgarian Split Squat',
                 'Backwards Lunge',
                 'Keeps both feet on the floor and reduces balance and stability demands'
             ),
             (
                 'Backwards Lunge',
                 'Bulgarian Split Squat',
                 'Elevating the rear foot increases the balance and postural-control challenge'
             ),

             (
                 'Bulgarian Split Squat',
                 'Dumbbell Step-Up',
                 'Provides a unilateral leg exercise without requiring the rear foot to remain elevated'
             ),
             (
                 'Dumbbell Step-Up',
                 'Bulgarian Split Squat',
                 'Provides a more fixed unilateral stance and greater continuous loading of the working leg'
             ),


             -- ============================================
             -- ROMANIAN DEADLIFT
             -- ============================================

             (
                 'Barbell Romanian Deadlift',
                 'Dumbbell Romanian Deadlift',
                 'Allows more independent hand and load positioning and can be easier when a barbell is unavailable'
             ),
             (
                 'Dumbbell Romanian Deadlift',
                 'Barbell Romanian Deadlift',
                 'Provides greater loading potential for progressive overload'
             ),


             -- ============================================
             -- CALVES
             -- ============================================

             (
                 'Standing Calf Raise',
                 'Single-Leg Calf Raise',
                 'Transfers the resistance to one leg, increasing unilateral loading'
             ),
             (
                 'Single-Leg Calf Raise',
                 'Standing Calf Raise',
                 'Distributes the load between both legs and provides a simpler bilateral variation'
             ),


             -- ============================================
             -- CORE
             -- ============================================

             (
                 'Crunch',
                 'Bicycle Crunch',
                 'Adds alternating trunk rotation and a more dynamic movement pattern'
             ),
             (
                 'Bicycle Crunch',
                 'Crunch',
                 'Removes the rotational component and simplifies the movement'
             )

     ) AS v(exercise_name, alternative_name, reason)
         JOIN exercise e1
              ON e1.name = v.exercise_name
         JOIN exercise e2
              ON e2.name = v.alternative_name
    ON CONFLICT (exercise_id, alternative_exercise_id) DO NOTHING;