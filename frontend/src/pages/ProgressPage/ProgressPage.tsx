import { useEffect, useMemo, useState } from 'react'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { useProgressData } from '../../features/progress/hooks/useProgressData'
import { useProgressMetrics } from '../../features/progress/hooks/useProgressMetrics'
import { usePersonalRecords } from '../../features/progress/hooks/usePersonalRecords'
import { useStrengthProgress } from '../../features/progress/hooks/useStrengthProgress'
import { useProgressAnalysis } from '../../features/progress/hooks/useProgressAnalysis'
import { useProgressQuestion } from '../../features/progress/hooks/useProgressQuestion'

import type {
    StrengthProgressRange,
    StrengthProgressPoint,
} from '../../features/progress/types/progress.types'

import './ProgressPage.css'

const RANGES: {
    label: string
    value: StrengthProgressRange
}[] = [
    { label: '1M', value: 'ONE_MONTH' },
    { label: '3M', value: 'THREE_MONTHS' },
    { label: '6M', value: 'SIX_MONTHS' },
    { label: '1Y', value: 'ONE_YEAR' },
]

function formatDate(date: string) {
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
    }).format(new Date(date))
}

function formatDateTime(date: string) {
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date))
}

function formatChartDate(
    date: string,
    range: StrengthProgressRange,
) {
    const parsedDate = new Date(date)

    if (range === 'ONE_YEAR') {
        return new Intl.DateTimeFormat('en', {
            month: 'short',
            year: 'numeric',
        }).format(parsedDate)
    }

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
    }).format(parsedDate)
}

function getExerciseOptions(
    sessions: {
        exercises: {
            exerciseId: string
            exerciseName: string
        }[]
    }[],
) {
    const exercises = new Map<string, string>()

    sessions.forEach((session) => {
        session.exercises.forEach((exercise) => {
            exercises.set(
                exercise.exerciseId,
                exercise.exerciseName,
            )
        })
    })

    return [...exercises.entries()].map(
        ([exerciseId, exerciseName]) => ({
            exerciseId,
            exerciseName,
        }),
    )
}

export default function ProgressPage() {
    const progressQuery = useProgressData()

    const metricsQuery = useProgressMetrics()

    const personalRecordsQuery =
        usePersonalRecords()

    const [selectedExerciseId, setSelectedExerciseId] =
        useState<string>()

    const [range, setRange] =
        useState<StrengthProgressRange>(
            'THREE_MONTHS',
        )

    const [selectedQuestion, setSelectedQuestion] =
        useState<string>()

    const [aiAnswer, setAiAnswer] =
        useState<string>()

    const sessions =
        progressQuery.data?.sessions ?? []

    const exerciseOptions = useMemo(
        () =>
            getExerciseOptions(sessions),
        [sessions],
    )

    const activeExerciseId =
        selectedExerciseId ??
        exerciseOptions[0]?.exerciseId

    const strengthQuery =
        useStrengthProgress(
            activeExerciseId,
            range,
        )

    const analysisQuery =
        useProgressAnalysis(
            activeExerciseId,
            range,
        )

    const progressQuestionMutation =
        useProgressQuestion()

    const totalWorkouts =
        metricsQuery.data?.totalWorkouts ?? 0

    const totalSets =
        metricsQuery.data?.totalSets ?? 0

    const totalVolume =
        metricsQuery.data?.totalVolume ?? 0

    const currentStreak =
        metricsQuery.data?.currentStreak ?? 0

    const weeklyVolume =
        metricsQuery.data?.weeklyVolume ?? []

    const chartData: StrengthProgressPoint[] =
        strengthQuery.data?.points ?? []

    const trackingType =
        strengthQuery.data?.trackingType

    const unit =
        trackingType === 'REPS'
            ? 'reps'
            : 'kg'

    const chartLabel =
        trackingType === 'REPS'
            ? 'Reps'
            : 'Strength'

    const maximumVolume = Math.max(
        ...weeklyVolume.map(
            (day) => day.volume,
        ),
        0,
    )

    const analysis =
        analysisQuery.data

    useEffect(() => {
        setSelectedQuestion(undefined)
        setAiAnswer(undefined)
        progressQuestionMutation.reset()
    }, [
        activeExerciseId,
        range,
    ])

    function handleAskQuestion(
        question: string,
    ) {
        if (!activeExerciseId) {
            return
        }

        setSelectedQuestion(question)
        setAiAnswer(undefined)

        progressQuestionMutation.mutate(
            {
                exerciseId: activeExerciseId,
                range,
                question,
            },
            {
                onSuccess: (response) => {
                    setAiAnswer(
                        response.answer,
                    )
                },
            },
        )
    }

    if (progressQuery.isLoading) {
        return (
            <main className="progress-page">
                <div className="progress-loading">
                    Loading your progress...
                </div>
            </main>
        )
    }

    if (progressQuery.isError) {
        return (
            <main className="progress-page">
                <div className="progress-error">
                    Unable to load your progress.
                </div>
            </main>
        )
    }

    return (
        <main className="progress-page">
            <header className="progress-header">
                <div>
                    <p className="progress-eyebrow">
                        PERFORMANCE
                    </p>

                    <h1>Progress</h1>

                    <p>
                        Track your training and
                        understand how you're
                        progressing.
                    </p>
                </div>
            </header>

            <section className="progress-metrics">
                <article className="progress-metric-card">
                    <span>
                        Total Workouts
                    </span>

                    <strong>
                        {totalWorkouts}
                    </strong>
                </article>

                <article className="progress-metric-card">
                    <span>
                        Total Volume
                    </span>

                    <strong>
                        {totalVolume.toLocaleString()}{' '}
                        kg
                    </strong>
                </article>

                <article className="progress-metric-card">
                    <span>
                        Total Sets
                    </span>

                    <strong>
                        {totalSets}
                    </strong>
                </article>

                <article className="progress-metric-card">
                    <span>
                        Current Streak
                    </span>

                    <strong>
                        {currentStreak}{' '}
                        {currentStreak === 1
                            ? 'day'
                            : 'days'}
                    </strong>
                </article>
            </section>

            <section className="progress-main-grid">
                <div className="progress-left-column">
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
                                    activeExerciseId ??
                                    ''
                                }
                                onChange={(event) =>
                                    setSelectedExerciseId(
                                        event.target.value,
                                    )
                                }
                                disabled={
                                    exerciseOptions.length ===
                                    0
                                }
                            >
                                {exerciseOptions.length ===
                                0 ? (
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
                                        range ===
                                        item.value
                                            ? 'active'
                                            : ''
                                    }
                                    onClick={() =>
                                        setRange(
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
                        ) : chartData.length ===
                        0 ? (
                            <div className="chart-state">
                                No {trackingType ===
                            'REPS'
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
                                                    String(
                                                        value,
                                                    ),
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
                                                    String(
                                                        value,
                                                    ),
                                                )
                                            }
                                            formatter={(
                                                value,
                                            ) => [
                                                `${value} ${unit}`,
                                                chartLabel,
                                            ]}
                                            contentStyle={{
                                                borderRadius:
                                                    '10px',
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
                                    day.volume === 0
                                        ? 4
                                        : maximumVolume ===
                                        0
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
                                            {new Intl.DateTimeFormat(
                                                'en',
                                                {
                                                    weekday:
                                                        'short',
                                                },
                                            ).format(
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

                        {personalRecordsQuery.isLoading ? (
                            <div className="card-state">
                                Loading personal
                                records...
                            </div>
                        ) : personalRecordsQuery.isError ? (
                            <div className="card-state">
                                Unable to load
                                personal records.
                            </div>
                        ) : (
                            <div className="records-grid">
                                {[
                                    {
                                        label:
                                            'Heaviest Weight',
                                        value:
                                        personalRecordsQuery
                                            .data
                                            ?.heaviestWeight
                                            ?.value,
                                        suffix: 'kg',
                                        description:
                                        personalRecordsQuery
                                            .data
                                            ?.heaviestWeight
                                            ?.exerciseName,
                                    },
                                    {
                                        label:
                                            'Most Reps',
                                        value:
                                        personalRecordsQuery
                                            .data
                                            ?.mostReps
                                            ?.reps,
                                        suffix: 'reps',
                                        description:
                                        personalRecordsQuery
                                            .data
                                            ?.mostReps
                                            ?.exerciseName,
                                    },
                                    {
                                        label:
                                            'Highest Volume',
                                        value:
                                        personalRecordsQuery
                                            .data
                                            ?.highestVolume
                                            ?.value,
                                        suffix: 'kg',
                                        description:
                                        personalRecordsQuery
                                            .data
                                            ?.highestVolume
                                            ?.workoutName,
                                    },
                                    {
                                        label:
                                            'Recent PR',
                                        value:
                                        personalRecordsQuery
                                            .data
                                            ?.recentPr
                                            ?.value,
                                        suffix: '',
                                        description:
                                        personalRecordsQuery
                                            .data
                                            ?.recentPr
                                            ?.exerciseName,
                                    },
                                ].map((item) => (
                                    <div
                                        className="record-item"
                                        key={item.label}
                                    >
                                        <span>
                                            {
                                                item.label
                                            }
                                        </span>

                                        <strong>
                                            {item.value ??
                                                '—'}

                                            {item.value !=
                                            null &&
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
                </div>

                <aside className="progress-card ai-card">
                    <div className="ai-header">
                        <div>
                            <p className="card-eyebrow">
                                FORMLAB AI
                            </p>

                            <h2>
                                AI Coach
                            </h2>
                        </div>

                        <span className="ai-badge">
                            GEMINI
                        </span>
                    </div>

                    {analysisQuery.isLoading ? (
                        <div className="ai-state">
                            <div className="ai-pulse" />

                            <p>
                                Analyzing your
                                progress...
                            </p>
                        </div>
                    ) : analysisQuery.isError ? (
                        <div className="ai-state">
                            <p>
                                AI analysis is
                                currently
                                unavailable.
                            </p>
                        </div>
                    ) : analysis ? (
                        <>
                            <div className="ai-summary">
                                <h3>
                                    Summary
                                </h3>

                                <p>
                                    {
                                        analysis.summary
                                    }
                                </p>
                            </div>

                            <div className="ai-section">
                                <h3>
                                    Insights
                                </h3>

                                <ul>
                                    {analysis.insights.map(
                                        (insight) => (
                                            <li
                                                key={
                                                    insight
                                                }
                                            >
                                                {
                                                    insight
                                                }
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>

                            <div className="ai-section">
                                <h3>
                                    Recommendations
                                </h3>

                                <ul>
                                    {analysis.recommendations.map(
                                        (
                                            recommendation,
                                        ) => (
                                            <li
                                                key={
                                                    recommendation
                                                }
                                            >
                                                {
                                                    recommendation
                                                }
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>

                            <div className="ai-prompts">
                                <p>
                                    Ask your coach
                                </p>

                                {analysis.suggestedPrompts.map(
                                    (prompt) => (
                                        <button
                                            key={prompt}
                                            type="button"
                                            onClick={() =>
                                                handleAskQuestion(
                                                    prompt,
                                                )
                                            }
                                            disabled={
                                                progressQuestionMutation.isPending
                                            }
                                            className={
                                                selectedQuestion ===
                                                prompt
                                                    ? 'selected'
                                                    : ''
                                            }
                                        >
                                            {prompt}
                                        </button>
                                    ),
                                )}
                            </div>

                            {progressQuestionMutation.isPending && (
                                <div className="ai-answer">
                                    <h3>
                                        AI Coach
                                    </h3>

                                    <div className="ai-answer-loading">
                                        <div className="ai-pulse" />

                                        <p>
                                            Thinking about
                                            your progress...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {progressQuestionMutation.isError && (
                                <div className="ai-answer ai-answer-error">
                                    <h3>
                                        AI Coach
                                    </h3>

                                    <p>
                                        Unable to answer
                                        this question
                                        right now.
                                    </p>
                                </div>
                            )}

                            {aiAnswer &&
                                !progressQuestionMutation.isPending && (
                                    <div className="ai-answer">
                                        <h3>
                                            AI Coach
                                        </h3>

                                        {selectedQuestion && (
                                            <p className="ai-question">
                                                {
                                                    selectedQuestion
                                                }
                                            </p>
                                        )}

                                        <p>
                                            {aiAnswer}
                                        </p>
                                    </div>
                                )}
                        </>
                    ) : (
                        <div className="ai-state">
                            <p>
                                Select an exercise
                                to get your AI
                                analysis.
                            </p>
                        </div>
                    )}
                </aside>
            </section>
        </main>
    )
}