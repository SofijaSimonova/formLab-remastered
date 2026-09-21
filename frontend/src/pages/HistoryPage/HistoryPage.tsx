import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useWorkoutHistory } from '../../features/history/hooks/useWorkoutHistory'
import type {
    WorkoutSessionHistoryResponse,
} from '../../features/history/types/history.types'
import { HISTORY_COMPLETED_DISPLAY_SIZE } from '../../constraints/app.constants'
import { LoadingState } from '../../components/LoadingState'

import './history.css'
import '../../components/shared.css'

export function HistoryPage() {
    const navigate = useNavigate()

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useWorkoutHistory()

    const [visibleCompletedCount, setVisibleCompletedCount] = useState(
        HISTORY_COMPLETED_DISPLAY_SIZE,
    )

    const sessions = useMemo(
        () => data?.pages.flatMap((page) => page.content) ?? [],
        [data],
    )

    // Always shown in full - a user only ever has a handful of active
    // sessions at once, so this never needs its own pagination gate.
    const inProgressSessions = sessions.filter(
        (session) => session.status === 'IN_PROGRESS',
    )

    const completedSessions = sessions.filter(
        (session) => session.status === 'COMPLETED',
    )

    const visibleCompletedSessions = completedSessions.slice(
        0,
        visibleCompletedCount,
    )

    const canShowMoreCompleted =
        visibleCompletedCount < completedSessions.length ||
        hasNextPage

    function handleLoadMoreCompleted() {
        if (visibleCompletedCount < completedSessions.length) {
            setVisibleCompletedCount(
                (count) => count + HISTORY_COMPLETED_DISPLAY_SIZE,
            )

            return
        }

        fetchNextPage()
    }

    if (isLoading) {
        return (
            <div className="history-page">
                <LoadingState message="Loading history..." />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="history-page">
                <div className="history-page-state history-page-state-error">
                    Failed to load workout history.
                </div>
            </div>
        )
    }

    return (
        <div className="history-page">
            <header className="history-page-header">
                <div>
                    <h1>History</h1>
                    <p>Your workout sessions</p>
                </div>
            </header>

            {inProgressSessions.length > 0 && (
                <HistorySection
                    title="In Progress"
                    description="The workout is waiting! Continue working out where you left off?"
                    sessions={inProgressSessions}
                    onSessionClick={handleSessionClick}
                    actionLabel="Continue workout"
                />
            )}

            {completedSessions.length > 0 && (
                <HistorySection
                    title="Completed"
                    sessions={visibleCompletedSessions}
                    onSessionClick={handleSessionClick}
                    actionLabel="View summary"
                />
            )}

            {sessions.length === 0 && (
                <div className="history-page-state">
                    No workout history yet.
                </div>
            )}

            {canShowMoreCompleted && (
                <button
                    type="button"
                    className="load-more-button"
                    onClick={handleLoadMoreCompleted}
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading...'
                        : 'Load More'}

                    <span>⌄</span>
                </button>
            )}
        </div>
    )

    function handleSessionClick(
        session: WorkoutSessionHistoryResponse,
    ) {
        if (session.status === 'IN_PROGRESS') {
            if (!session.resumeWorkoutExerciseId) {
                return
            }

            navigate(
                `/workouts/${session.workoutId}/session/${session.sessionId}/exercises/${session.resumeWorkoutExerciseId}`,
            )

            return
        }

        navigate(
            `/workouts/${session.workoutId}/session/${session.sessionId}/complete`,
        )
    }
}


interface HistorySectionProps {
    title: string
    description?: string
    sessions: WorkoutSessionHistoryResponse[]
    onSessionClick: (
        session: WorkoutSessionHistoryResponse,
    ) => void
    actionLabel: string
}

function HistorySection({
                            title,
                            description,
                            sessions,
                            onSessionClick,
                            actionLabel,
                        }: HistorySectionProps) {
    return (
        <section className="history-page-section">
            <div className="history-page-section-header">
                <h2>{title}</h2>

                {description && (
                    <p>{description}</p>
                )}
            </div>

            <div className="history-page-grid">
                {sessions.map((session) => (
                    <HistoryCard
                        key={session.sessionId}
                        session={session}
                        onClick={() => onSessionClick(session)}
                        actionLabel={actionLabel}
                    />
                ))}
            </div>
        </section>
    )
}


interface HistoryCardProps {
    session: WorkoutSessionHistoryResponse
    onClick: () => void
    actionLabel: string
}

function HistoryCard({
                         session,
                         onClick,
                         actionLabel,
                     }: HistoryCardProps) {
    const isInProgress = session.status === 'IN_PROGRESS'

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLElement>,
    ) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick()
        }
    }

    return (
        <article
            className={`history-page-card ${
                isInProgress
                    ? 'history-page-card-in-progress'
                    : ''
            }`}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <div className="history-page-card-content">
                <span
                    className={`history-page-status history-page-status-${session.status.toLowerCase()}`}
                >
                    {isInProgress
                        ? 'IN PROGRESS'
                        : 'COMPLETED'}
                </span>

                <h3>{session.workoutName}</h3>

                <p>{formatDate(session.startedAt)}</p>

                {session.durationSeconds !== null && (
                    <p>
                        {formatDuration(
                            session.durationSeconds,
                        )}
                    </p>
                )}
            </div>

            <span className="history-page-card-action">
                {actionLabel} →
            </span>
        </article>
    )
}


function formatDate(value: string) {
    return new Date(value).toLocaleDateString()
}


function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)

    if (minutes < 60) {
        return `${minutes} min`
    }

    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`
}