import { useMemo, useState } from 'react'

import { useExercises } from '../features/exercises/hooks/useExercises'
import { BodyExplorer } from '../features/exercises/components/BodyExplorer'
import { ExerciseCard } from '../features/exercises/components/ExerciseCard'
import { ExerciseToolbar } from '../features/exercises/components/ExerciseToolbar'
import '../features/exercises/exercises.css'

export function ExercisesPage() {
    const { data, isLoading, isError } = useExercises()

    const [selectedBodyPartId, setSelectedBodyPartId] =
        useState<string | null>(null)

    const [search, setSearch] = useState('')

    const bodyParts = useMemo(() => {
        if (!data) {
            return []
        }

        const uniqueBodyParts = new Map<
            string,
            (typeof data)[number]['bodyParts'][number]
        >()

        data.forEach((exercise) => {
            exercise.bodyParts.forEach((bodyPart) => {
                uniqueBodyParts.set(bodyPart.id, bodyPart)
            })
        })

        return Array.from(uniqueBodyParts.values())
    }, [data])

    const selectedBodyPartName = useMemo(() => {
        if (!selectedBodyPartId) {
            return null
        }

        return (
            bodyParts.find(
                (bodyPart) => bodyPart.id === selectedBodyPartId,
            )?.name ?? null
        )
    }, [bodyParts, selectedBodyPartId])

    const filteredExercises = useMemo(() => {
        if (!data) {
            return []
        }

        const normalizedSearch = search.trim().toLowerCase()

        return data.filter((exercise) => {
            const matchesBodyPart =
                !selectedBodyPartId ||
                exercise.bodyParts.some(
                    (bodyPart) => bodyPart.id === selectedBodyPartId,
                )

            const matchesSearch =
                !normalizedSearch ||
                exercise.name
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                exercise.description
                    .toLowerCase()
                    .includes(normalizedSearch)

            return matchesBodyPart && matchesSearch
        })
    }, [data, selectedBodyPartId, search])

    if (isLoading) {
        return <p>Loading exercises...</p>
    }

    if (isError) {
        return <p>Failed to load exercises.</p>
    }

    return (
        <div className="exercises-page">
            <div className="exercises-page-header">
                <div>
                    <h1>Exercises</h1>

                    <p>
                        Library • {data?.length ?? 0} entries
                    </p>
                </div>
            </div>

            <ExerciseToolbar
                search={search}
                onSearchChange={setSearch}
                selectedBodyPartName={selectedBodyPartName}
                onClearBodyPart={() =>
                    setSelectedBodyPartId(null)
                }
            />

            <div className="exercises-layout">
                <BodyExplorer
                    bodyParts={bodyParts}
                    selectedBodyPartId={selectedBodyPartId}
                    onSelectBodyPart={setSelectedBodyPartId}
                />

                <main className="exercise-results">
                    <div className="exercise-grid">
                        {filteredExercises.map((exercise) => (
                            <ExerciseCard
                                key={exercise.id}
                                exercise={exercise}
                            />
                        ))}
                    </div>

                    {filteredExercises.length === 0 && (
                        <div className="empty-exercises">
                            No exercises found.
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}