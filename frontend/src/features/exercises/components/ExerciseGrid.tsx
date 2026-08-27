import type { ExerciseListResponse } from '../types/exercise.types'
import { ExerciseCard } from './ExerciseCard'

interface ExerciseGridProps {
    exercises: ExerciseListResponse[]
}

export function ExerciseGrid({ exercises }: ExerciseGridProps) {
    return (
        <div className="exercise-grid">
            {exercises.map((exercise) => (
                <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                />
            ))}
        </div>
    )
}