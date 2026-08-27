interface ExerciseToolbarProps {
    search: string
    onSearchChange: (value: string) => void
    selectedBodyPartName: string | null
    onClearBodyPart: () => void
}

export function ExerciseToolbar({
                                    search,
                                    onSearchChange,
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

            <div className="exercise-toolbar-spacer" />

            <div className="exercise-search">
                <span>⌕</span>

                <input
                    type="text"
                    placeholder="Search exercises..."
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                />
            </div>

            <button
                type="button"
                className="add-custom-button"
            >
                Add Custom
            </button>
        </div>
    )
}