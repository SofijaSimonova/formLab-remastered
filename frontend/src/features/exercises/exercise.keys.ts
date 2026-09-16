export const exerciseKeys = {
    all: ['exercises'] as const,

    lists: () =>
        [...exerciseKeys.all, 'list'] as const,

    list: (
        search?: string,
        bodyPartId?: string,
    ) =>
        [
            ...exerciseKeys.lists(),
            {
                search,
                bodyPartId,
            },
        ] as const,

    details: () =>
        [...exerciseKeys.all, 'detail'] as const,

    detail: (id: string) =>
        [...exerciseKeys.details(), id] as const,

    alternatives: (id: string) =>
        [
            ...exerciseKeys.detail(id),
            'alternatives',
        ] as const,

    focusVariations: (id: string) =>
        [
            ...exerciseKeys.detail(id),
            'focus-variations',
        ] as const,

    search: (search: string) =>
        [
            ...exerciseKeys.all,
            'search',
            search,
        ] as const,

    bodyParts: () =>
        [
            ...exerciseKeys.all,
            'body-parts',
        ] as const,

    equipment: () =>
        [
            ...exerciseKeys.all,
            'equipment',
        ] as const,

    tags: () =>
        [
            ...exerciseKeys.all,
            'tags',
        ] as const,
}