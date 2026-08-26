import { useExercises } from '../features/exercises/hooks/useExercises'

export function ExercisesPage() {
    const { data, isLoading, isError } = useExercises()

    if (isLoading) {
        return <p>Loading exercises...</p>
    }

    if (isError) {
        return <p>Failed to load exercises.</p>
    }

    return (
        <div>
            <h1>Exercises</h1>

            {data?.map((exercise) => (
                <div key={exercise.id}>
                    {exercise.name}
                </div>
            ))}
        </div>
    )
}