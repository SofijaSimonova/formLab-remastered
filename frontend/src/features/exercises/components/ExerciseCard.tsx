import type { ExerciseListResponse } from '../types/exercise.types'

interface ExerciseCardProps {
    exercise: ExerciseListResponse
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
    return (
        <article className="exercise-card">
            <div className="exercise-card-image">
                <div className="exercise-card-badges">
                    {exercise.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="exercise-card-badge"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="exercise-card-content">
                <div className="exercise-card-header">
                    <h3>{exercise.name}</h3>

                    <button
                        type="button"
                        aria-label={`Options for ${exercise.name}`}
                    >
                        ⋮
                    </button>
                </div>

                <p>{exercise.description}</p>

                <div className="exercise-card-body-parts">
                    {exercise.bodyParts.map((bodyPart) => (
                        <span key={bodyPart.id}>
                            {bodyPart.name}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    )
}