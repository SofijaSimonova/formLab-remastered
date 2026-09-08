import { useNavigate } from 'react-router-dom'
import type { ExerciseListResponse } from '../types/exercise.types'

interface ExerciseCardProps {
    exercise: ExerciseListResponse
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
    const navigate = useNavigate()

    return (
        <article
            className="exercises-card"
            onClick={() => navigate(`/exercises/${exercise.id}`)}
            role="button"
            tabIndex={0}
        >
            <div className="exercises-card-image">
                <div className="exercises-card-badges">
                    {exercise.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="exercises-card-badge"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="exercises-card-content">
                <div className="exercises-card-header">
                    <h3>{exercise.name}</h3>

                    <button
                        type="button"
                        aria-label={`Options for ${exercise.name}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        ⋮
                    </button>
                </div>

                <p>{exercise.description}</p>

                <div className="exercises-card-body-parts">
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