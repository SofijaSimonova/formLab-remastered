export const exerciseKeys = {
    all: ['exercises'] as const,

    lists: () => [...exerciseKeys.all, 'list'] as const,

    list: (search?: string, bodyPartId?: string) => [...exerciseKeys.lists(), { search, bodyPartId }] as const,

    details: () => [...exerciseKeys.all, 'detail'] as const,

    detail: (id: string) => [...exerciseKeys.details(), id] as const,

    alternatives: (id: string) => [...exerciseKeys.all, 'alternatives', id] as const,
}