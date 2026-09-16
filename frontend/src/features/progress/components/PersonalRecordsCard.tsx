import type { PersonalRecordsResponse } from '../types/progress.types'

interface PersonalRecordsCardProps {
    query: {
        isLoading: boolean
        isError: boolean
        data:
            | PersonalRecordsResponse
            | undefined
    }
}

export function PersonalRecordsCard({
    query,
}: PersonalRecordsCardProps) {
    const records = [
        {
            label: 'Heaviest Weight',
            value: query.data?.heaviestWeight?.value,
            suffix: 'kg',
            description:
                query.data?.heaviestWeight
                    ?.exerciseName,
        },
        {
            label: 'Most Reps',
            value: query.data?.mostReps?.reps,
            suffix: 'reps',
            description:
                query.data?.mostReps?.exerciseName,
        },
        {
            label: 'Highest Volume',
            value:
                query.data?.highestVolume?.value,
            suffix: 'kg',
            description:
                query.data?.highestVolume
                    ?.workoutName,
        },
        {
            label: 'Recent PR',
            value: query.data?.recentPr?.value,
            suffix: '',
            description:
                query.data?.recentPr?.exerciseName,
        },
    ]

    return (
        <section className="progress-card records-card">
            <div className="card-header">
                <div>
                    <p className="card-eyebrow">
                        ACHIEVEMENTS
                    </p>

                    <h2>
                        Personal Records
                    </h2>
                </div>
            </div>

            {query.isLoading ? (
                <div className="card-state">
                    Loading personal
                    records...
                </div>
            ) : query.isError ? (
                <div className="card-state">
                    Unable to load
                    personal records.
                </div>
            ) : (
                <div className="records-grid">
                    {records.map((item) => (
                        <div
                            className="record-item"
                            key={item.label}
                        >
                            <span>
                                {item.label}
                            </span>

                            <strong>
                                {item.value ?? '—'}

                                {item.value != null &&
                                item.suffix
                                    ? ` ${item.suffix}`
                                    : ''}
                            </strong>

                            <small>
                                {item.description ??
                                    'No record yet'}
                            </small>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
