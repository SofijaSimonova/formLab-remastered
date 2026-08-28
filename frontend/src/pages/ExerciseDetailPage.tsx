import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useExercise } from '../features/exercises/hooks/useExercise'
import { useExerciseAlternatives } from '../features/exercises/hooks/useExerciseAlternatives'

import '../features/exercises/ExerciseDetailPage.css'

export function ExerciseDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [selectedVariationId, setSelectedVariationId] =
        useState<string | null>(null)

    const {
        data: exercise,
        isLoading,
        isError,
    } = useExercise(id ?? '')

    const {
        data: alternatives,
        isLoading: isLoadingAlternatives,
    } = useExerciseAlternatives(id ?? '')

    if (isLoading) {
        return <p>Loading exercise...</p>
    }

    if (isError || !exercise) {
        return <p>Failed to load exercise.</p>
    }

    const selectedVariation =
        exercise?.focusVariations.find(
            (variation) => variation.id === selectedVariationId,
        ) ?? exercise?.focusVariations[0]

    return (
        <div className="exercise-detail-page">

            {/* TOP BAR */}
            <div className="exercise-detail-header">
                <button
                    type="button"
                    className="exercise-detail-back"
                    onClick={() => navigate('/exercises')}
                >
                    ← Back to Exercises
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="exercise-detail-layout">

                {/* LEFT / CENTER */}
                <div className="exercise-detail-main">

                    {/* PREVIEW */}
                    <section className="exercise-detail-preview">
                        <div className="exercise-detail-preview-placeholder">
                            <span>EXERCISE PREVIEW</span>
                        </div>
                    </section>

                    {/* INSTRUCTIONS */}
                    <section className="exercise-detail-section">
                        <div className="exercise-detail-section-header">
                            <span>01</span>
                            <h2>Instructions</h2>
                        </div>

                        <div className="exercise-detail-instructions">
                            {exercise.instructions
                                .split('\n')
                                .filter(Boolean)
                                .map((instruction, index) => (
                                    <div
                                        key={index}
                                        className="exercise-instruction"
                                    >
                                        <span>
                                            {String(index + 1).padStart(
                                                2,
                                                '0',
                                            )}
                                        </span>

                                        <p>{instruction}</p>
                                    </div>
                                ))}
                        </div>
                    </section>

                    {/* FOCUS VARIATIONS */}
                    {exercise.focusVariations.length > 0 && (
                        <section className="exercise-detail-section">
                            <div className="exercise-detail-section-header">
                                <span>02</span>
                                <h2>Focus Variations</h2>
                            </div>

                            <div className="focus-variation-toggle">
                                {exercise.focusVariations.map((variation) => (
                                    <button
                                        key={variation.id}
                                        type="button"
                                        className={
                                            selectedVariation?.id === variation.id
                                                ? 'active'
                                                : ''
                                        }
                                        onClick={() =>
                                            setSelectedVariationId(variation.id)
                                        }
                                    >
                                        {variation.name}
                                    </button>
                                ))}
                            </div>

                            {selectedVariation && (
                                <div className="focus-variation-content">
                                    <h3>{selectedVariation.name}</h3>

                                    <p>
                                        {selectedVariation.description}
                                    </p>
                                </div>
                            )}
                        </section>
                    )}
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="exercise-detail-sidebar">

                    {/* TITLE */}
                    <section className="exercise-detail-title">
                        <h1>{exercise.name}</h1>

                        <p>{exercise.description}</p>
                    </section>


                    {/* DETAILS */}
                    <section className="exercise-detail-info">
                        <div className="exercise-detail-info-group">
                            <span className="exercise-detail-label">
                                TARGET MUSCLES
                            </span>

                            <div className="exercise-detail-tags">
                                {exercise.bodyParts.map((bodyPart) => (
                                    <span key={bodyPart.id}>
                                        {bodyPart.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="exercise-detail-info-group">
                            <span className="exercise-detail-label">
                                EQUIPMENT
                            </span>

                            <div className="exercise-detail-tags">
                                {exercise.equipment.length > 0 ? (
                                    exercise.equipment.map((equipment) => (
                                        <span key={equipment.id}>
                                            {equipment.name}
                                        </span>
                                    ))
                                ) : (
                                    <span>Bodyweight</span>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ALTERNATIVES */}
                    <section className="exercise-alternatives">
                        <div className="exercise-alternatives-header">
                            <div>
                                <span>03</span>
                                <h2>Alternative Exercises</h2>
                            </div>

                            <span className="exercise-alternatives-count">
                                {alternatives?.length ?? 0}
                            </span>
                        </div>

                        {isLoadingAlternatives ? (
                            <p className="exercise-alternatives-status">
                                Loading alternatives...
                            </p>
                        ) : alternatives &&
                        alternatives.length > 0 ? (
                            <div className="exercise-alternatives-list">
                                {alternatives.map((alternative) => (
                                    <button
                                        key={alternative.id}
                                        type="button"
                                        className="exercise-alternative-card"
                                        onClick={() =>
                                            navigate(
                                                `/exercises/${alternative.alternativeExerciseId}`,
                                            )
                                        }
                                    >
                                        <div>
                                            <strong>
                                                {
                                                    alternative.alternativeExerciseName
                                                }
                                            </strong>

                                            <p>
                                                {alternative.reason}
                                            </p>
                                        </div>

                                        <span>→</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="exercise-alternatives-status">
                                No alternative exercises.
                            </p>
                        )}
                    </section>
                </aside>
            </div>
        </div>
    )
}