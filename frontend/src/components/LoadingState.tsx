interface LoadingStateProps {
    message?: string
}

export function LoadingState({
                                 message = 'Loading...',
                             }: LoadingStateProps) {
    return (
        <div className="loading-state">
            <div className="loading-spinner" />
            <span>{message}</span>
        </div>
    )
}