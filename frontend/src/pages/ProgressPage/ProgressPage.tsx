import { useProgressPage } from '../../features/progress/hooks/useProgressPage'

import { AiCoachCard } from '../../features/progress/components/AiCoachCard'
import { PersonalRecordsCard } from '../../features/progress/components/PersonalRecordsCard'
import { ProgressMetrics } from '../../features/progress/components/ProgressMetrics'
import { StrengthProgressCard } from '../../features/progress/components/StrengthProgressCard'
import { WeeklyVolumeCard } from '../../features/progress/components/WeeklyVolumeCard'

import './ProgressPage.css'

export default function ProgressPage() {
    const {
        progressQuery,
        personalRecordsQuery,

        range,

        selectedQuestion,
        aiAnswer,

        exerciseOptions,
        activeExerciseId,

        strengthQuery,
        analysisQuery,
        progressQuestionMutation,

        totalWorkouts,
        totalSets,
        totalVolume,
        currentStreak,
        weeklyVolume,

        chartData,
        trackingType,
        unit,
        chartLabel,
        maximumVolume,

        analysis,

        handleExerciseChange,
        handleRangeChange,
        handleAskQuestion,
    } = useProgressPage()

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

            <ProgressMetrics
                totalWorkouts={totalWorkouts}
                totalVolume={totalVolume}
                totalSets={totalSets}
                currentStreak={currentStreak}
            />

            <section className="progress-main-grid">
                <div className="progress-left-column">
                    <StrengthProgressCard
                        range={range}
                        exerciseOptions={exerciseOptions}
                        activeExerciseId={
                            activeExerciseId
                        }
                        strengthQuery={
                            strengthQuery
                        }
                        chartData={chartData}
                        trackingType={
                            trackingType
                        }
                        unit={unit}
                        chartLabel={
                            chartLabel
                        }
                        onExerciseChange={
                            handleExerciseChange
                        }
                        onRangeChange={
                            handleRangeChange
                        }
                    />

                    <WeeklyVolumeCard
                        weeklyVolume={
                            weeklyVolume
                        }
                        maximumVolume={
                            maximumVolume
                        }
                    />

                    <PersonalRecordsCard
                        query={
                            personalRecordsQuery
                        }
                    />
                </div>

                <AiCoachCard
                    analysisQuery={
                        analysisQuery
                    }
                    analysis={analysis}
                    selectedQuestion={
                        selectedQuestion
                    }
                    aiAnswer={aiAnswer}
                    isQuestionPending={
                        progressQuestionMutation.isPending
                    }
                    isQuestionError={
                        progressQuestionMutation.isError
                    }
                    onAskQuestion={
                        handleAskQuestion
                    }
                />
            </section>
        </main>
    )
}
