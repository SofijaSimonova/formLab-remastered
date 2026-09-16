import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import type {
    StrengthProgressRange,
    StrengthProgressPoint,
    ExerciseTrackingType,
} from '../types/progress.types'

import {
    formatChartDate,
    formatDateTime,
} from '../utils/utils'

interface ExerciseOption {
    exerciseId: string
    exerciseName: string
}

interface StrengthProgressCardProps {
    range: StrengthProgressRange
    exerciseOptions: ExerciseOption[]
    activeExerciseId: string | undefined
    strengthQuery: {
        isLoading: boolean
        isError: boolean
    }
    chartData: StrengthProgressPoint[]
    trackingType: ExerciseTrackingType | undefined
    unit: string
    chartLabel: string
    onExerciseChange: (exerciseId: string) => void
    onRangeChange: (
        range: StrengthProgressRange,
    ) => void
}

const RANGES: {
    label: string
    value: StrengthProgressRange
}[] = [
    {
        label: '1M',
        value: 'ONE_MONTH',
    },
    {
        label: '3M',
        value: 'THREE_MONTHS',
    },
    {
        label: '6M',
        value: 'SIX_MONTHS',
    },
    {
        label: '1Y',
        value: 'ONE_YEAR',
    },
]

export function StrengthProgressCard({
    range,
    exerciseOptions,
    activeExerciseId,
    strengthQuery,
    chartData,
    trackingType,
    unit,
    chartLabel,
    onExerciseChange,
    onRangeChange,
}: StrengthProgressCardProps) {
    return (
        <section className="progress-card strength-card">
            <div className="card-header">
                <div>
                    <p className="card-eyebrow">
                        STRENGTH
                    </p>

                    <h2>
                        Strength Progress
                    </h2>
                </div>

                <select
                    value={
                        activeExerciseId ?? ''
                    }
                    onChange={(event) =>
                        onExerciseChange(
                            event.target.value,
                        )
                    }
                    disabled={
                        exerciseOptions.length === 0
                    }
                >
                    {exerciseOptions.length === 0 ? (
                        <option value="">
                            No exercises
                        </option>
                    ) : (
                        exerciseOptions.map(
                            (exercise) => (
                                <option
                                    key={
                                        exercise.exerciseId
                                    }
                                    value={
                                        exercise.exerciseId
                                    }
                                >
                                    {
                                        exercise.exerciseName
                                    }
                                </option>
                            ),
                        )
                    )}
                </select>
            </div>

            <div className="range-selector">
                {RANGES.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        className={
                            range === item.value
                                ? 'active'
                                : ''
                        }
                        onClick={() =>
                            onRangeChange(
                                item.value,
                            )
                        }
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {strengthQuery.isLoading ? (
                <div className="chart-state">
                    Loading strength data...
                </div>
            ) : strengthQuery.isError ? (
                <div className="chart-state">
                    Unable to load strength
                    data.
                </div>
            ) : chartData.length === 0 ? (
                <div className="chart-state">
                    No{' '}
                    {trackingType === 'REPS'
                        ? 'rep'
                        : 'strength'}{' '}
                    data available for
                    this exercise.
                </div>
            ) : (
                <div className="strength-chart">
                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: 0,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--border)"
                            />

                            <XAxis
                                dataKey="date"
                                tickFormatter={(
                                    value,
                                ) =>
                                    formatChartDate(
                                        String(value),
                                        range,
                                    )
                                }
                                tick={{
                                    fill: 'var(--text-secondary)',
                                }}
                                tickMargin={8}
                                interval="preserveStartEnd"
                            />

                            <YAxis
                                domain={[
                                    'dataMin - 5',
                                    'dataMax + 5',
                                ]}
                                tickFormatter={(
                                    value,
                                ) =>
                                    `${value} ${unit}`
                                }
                                tick={{
                                    fill: 'var(--text-secondary)',
                                }}
                            />

                            <Tooltip
                                labelFormatter={(
                                    value,
                                ) =>
                                    formatDateTime(
                                        String(value),
                                    )
                                }
                                formatter={(
                                    value,
                                ) => [
                                    `${value} ${unit}`,
                                    chartLabel,
                                ]}
                                contentStyle={{
                                    borderRadius: '10px',
                                    backgroundColor:
                                        'var(--bg-surface)',
                                    border: '1px solid var(--border)',
                                }}
                                labelStyle={{
                                    color: 'var(--text-primary)',
                                }}
                                itemStyle={{
                                    color: 'var(--text-primary)',
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="currentColor"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    )
}
