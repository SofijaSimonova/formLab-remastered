interface ErrorStateProps {
    title?: string
    message?: string
    onBack?: () => void
    backLabel?: string
}

export function ErrorState({
                               title = 'Something went wrong',
                               message = 'We couldn’t load this content.',
                               onBack,
                               backLabel = '← Back',
                           }: ErrorStateProps) {
    return (
        <div className="error-state">
            <h2>{title}</h2>

            <p>{message}</p>

            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                >
                    {backLabel}
                </button>
            )}
        </div>
    )
}