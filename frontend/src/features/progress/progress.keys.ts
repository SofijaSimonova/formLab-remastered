export const progressKeys = {
    all: ['progress'] as const,

    data: () =>
        [...progressKeys.all, 'data'] as const,

    personalRecords: () =>
        [...progressKeys.all, 'personal-records'] as const,

    strength: (
        exerciseId: string,
        range: string,
    ) =>
        [
            ...progressKeys.all,
            'strength',
            exerciseId,
            range,
        ] as const,

    analysis: (
        exerciseId: string,
        range: string,
    ) =>
        [
            ...progressKeys.all,
            'analysis',
            exerciseId,
            range,
        ] as const,

    questions: () =>
        [...progressKeys.all, 'questions'] as const,

    question: (
        exerciseId: string,
        range: string,
        question: string,
    ) =>
        [
            ...progressKeys.questions(),
            exerciseId,
            range,
            question.trim().toLowerCase(),
        ] as const,

    metrics: () =>
        [...progressKeys.all, 'metrics'] as const,
}