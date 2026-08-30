const workoutKeys = {
    all: ['workouts'] as const,

    lists: () =>
        [...workoutKeys.all, 'list'] as const,

    list: () =>
        [...workoutKeys.lists()] as const,

    details: () =>
        [...workoutKeys.all, 'detail'] as const,

    detail: (workoutId: string) =>
        [...workoutKeys.details(), workoutId] as const,

    exercises: (workoutId: string) =>
        [...workoutKeys.detail(workoutId), 'exercises'] as const,

    sets: (workoutExerciseId: string) =>
        ['workout-exercise', workoutExerciseId, 'sets'] as const,
}

export { workoutKeys }