export const exerciseKeys = {
    all: ['exercises'] as const,

    lists: () => [...exerciseKeys.all, 'list'] as const,

    list: () => [...exerciseKeys.lists()] as const,

    details: () => [...exerciseKeys.all, 'detail'] as const,

    detail: (id: string) => [...exerciseKeys.details(), id] as const,
}