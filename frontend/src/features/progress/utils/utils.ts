import type {
    StrengthProgressRange,
    WorkoutSessionData,
} from '../types/progress.types'

export function formatDate(
    date: string,
) {
    return new Intl.DateTimeFormat(
        'en',
        {
            month: 'short',
            day: 'numeric',
        },
    ).format(new Date(date))
}

export function formatDateTime(
    date: string,
) {
    return new Intl.DateTimeFormat(
        'en',
        {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        },
    ).format(new Date(date))
}

export function formatChartDate(
    date: string,
    range: StrengthProgressRange,
) {
    const parsedDate = new Date(date)

    if (range === 'ONE_YEAR') {
        return new Intl.DateTimeFormat(
            'en',
            {
                month: 'short',
                year: 'numeric',
            },
        ).format(parsedDate)
    }

    return new Intl.DateTimeFormat(
        'en',
        {
            month: 'short',
            day: 'numeric',
        },
    ).format(parsedDate)
}

export function getExerciseOptions(
    sessions: WorkoutSessionData[],
) {
    const exercises = new Map<
        string,
        string
    >()

    sessions.forEach((session) => {
        session.exercises.forEach(
            (exercise) => {
                exercises.set(
                    exercise.exerciseId,
                    exercise.exerciseName,
                )
            },
        )
    })

    return [...exercises.entries()].map(
        ([exerciseId, exerciseName]) => ({
            exerciseId,
            exerciseName,
        }),
    )
}