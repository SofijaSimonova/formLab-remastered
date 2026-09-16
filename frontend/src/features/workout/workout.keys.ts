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

    sets: (
        workoutSessionId: string,
        workoutExerciseId: string,
    ) => [
        'sets',
        workoutSessionId,
        workoutExerciseId,
    ],

    summary: (
        workoutId: string,
        workoutSessionId: string,
    ) => [
        ...workoutKeys.all,
        'summary',
        workoutId,
        workoutSessionId,
    ],

    session: (
        workoutId: string,
        workoutSessionId: string,
    ) => [
        ...workoutKeys.all,
        'session',
        workoutId,
        workoutSessionId,
    ],
}

export { workoutKeys }