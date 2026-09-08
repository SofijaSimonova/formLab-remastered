INSERT INTO goal (name, description)
VALUES
    (
        'Build Muscle',
        'Increase muscle mass and promote muscle growth.'
    ),
    (
        'Improve Strength',
        'Increase strength and overall lifting performance.'
    ),
    (
        'Lose Weight',
        'Reduce body weight while maintaining muscle mass.'
    ),
    (
        'Improve Endurance',
        'Improve cardiovascular and muscular endurance.'
    ),
    (
        'Improve Mobility',
        'Improve flexibility, mobility, and movement quality.'
    ),
    (
        'General Fitness',
        'Improve overall fitness, health, and physical performance.'
    )
    ON CONFLICT (name) DO NOTHING;