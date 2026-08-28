interface ExerciseToolbarProps {
    selectedBodyPartName: string | null
    onClearBodyPart: () => void
}

export function ExerciseToolbar({
                                    selectedBodyPartName,
                                    onClearBodyPart,
                                }: ExerciseToolbarProps) {
    return (
        <div className="exercise-toolbar">
            <div className="targeting-label">
                <span>⌖</span>

                <strong>Targeting:</strong>

                <span className="targeting-value">
                    {selectedBodyPartName ?? 'All'}
                </span>

                {selectedBodyPartName && (
                    <button
                        type="button"
                        className="clear-filter-button"
                        onClick={onClearBodyPart}
                    >
                        ×
                    </button>
                )}
            </div>

            <button
                type="button"
                className="filter-button"
            >
                Equipment
            </button>

            <button
                type="button"
                className="filter-button"
            >
                Movement
            </button>
        </div>
    )
}