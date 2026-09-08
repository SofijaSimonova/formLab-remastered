export const goalKeys = {
    all: ['goals'] as const,

    list: () =>
        [...goalKeys.all, 'list'] as const,

    myGoals: () =>
        [...goalKeys.all, 'my-goals'] as const,
}