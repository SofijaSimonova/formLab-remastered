interface ExerciseToolbarProps {
    selectedBodyPartName: string | null
    onClearBodyPart: () => void
}

export function ExerciseToolbar({
                                    selectedBodyPartName,
                                    onClearBodyPart,
                                }: ExerciseToolbarProps) {
    return (
        <div className="exercises-toolbar">
            <div className="exercises-toolbar-targeting-label">
                <span>⌖</span>

                <strong>Targeting:</strong>

                <span className="exercises-toolbar-targeting-value">
                    {selectedBodyPartName ?? 'All'}
                </span>

                {selectedBodyPartName && (
                    <button
                        type="button"
                        className="exercises-toolbar-clear-filter"
                        onClick={onClearBodyPart}
                    >
                        ×
                    </button>
                )}
            </div>

            <button
                type="button"
                className="exercises-toolbar-filter"
            >
                Equipment
            </button>

            <button
                type="button"
                className="exercises-toolbar-filter"
            >
                Movement
            </button>
        </div>
    )
}