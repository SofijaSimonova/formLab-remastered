import type { WeeklyVolumeData } from '../types/progress.types'

interface WeeklyVolumeCardProps {
    weeklyVolume: WeeklyVolumeData[]
    maximumVolume: number
}

const WEEKDAY_FORMATTER =
    new Intl.DateTimeFormat('en', {
        weekday: 'short',
    })

export function WeeklyVolumeCard({
    weeklyVolume,
    maximumVolume,
}: WeeklyVolumeCardProps) {
    return (
        <section className="progress-card weekly-volume-card">
            <div className="card-header">
                <div>
                    <p className="card-eyebrow">
                        ACTIVITY
                    </p>

                    <h2>
                        Weekly Volume
                    </h2>
                </div>
            </div>

            <div className="weekly-volume">
                {weeklyVolume.map((day) => {
                    const height =
                        day.volume === 0 ||
                        maximumVolume === 0
                            ? 4
                            : Math.max(
                                8,
                                Math.min(
                                    100,
                                    (day.volume /
                                        maximumVolume) *
                                        100,
                                ),
                            )

                    return (
                        <div
                            className="volume-day"
                            key={day.date}
                        >
                            <div className="volume-bar-container">
                                <div
                                    className="volume-bar"
                                    style={{
                                        height: `${height}%`,
                                    }}
                                />
                            </div>

                            <span>
                                {WEEKDAY_FORMATTER.format(
                                    new Date(
                                        day.date,
                                    ),
                                )}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
