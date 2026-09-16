interface ProgressMetricsProps {
    totalWorkouts: number
    totalVolume: number
    totalSets: number
    currentStreak: number
}

export function ProgressMetrics({
    totalWorkouts,
    totalVolume,
    totalSets,
    currentStreak,
}: ProgressMetricsProps) {
    return (
        <section className="progress-metrics">
            <article className="progress-metric-card">
                <span>Total Workouts</span>

                <strong>
                    {totalWorkouts}
                </strong>
            </article>

            <article className="progress-metric-card">
                <span>Total Volume</span>

                <strong>
                    {totalVolume.toLocaleString()}{' '}
                    kg
                </strong>
            </article>

            <article className="progress-metric-card">
                <span>Total Sets</span>

                <strong>
                    {totalSets}
                </strong>
            </article>

            <article className="progress-metric-card">
                <span>Current Streak</span>

                <strong>
                    {currentStreak}{' '}
                    {currentStreak === 1
                        ? 'day'
                        : 'days'}
                </strong>
            </article>
        </section>
    )
}
