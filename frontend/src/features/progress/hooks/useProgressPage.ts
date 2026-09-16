import { useState } from 'react'

import { usePersonalRecords } from './usePersonalRecords'
import { useProgressAnalysis } from './useProgressAnalysis'
import { useProgressData } from './useProgressData'
import { useProgressMetrics } from './useProgressMetrics'
import { useProgressQuestion } from './useProgressQuestion'
import { useStrengthProgress } from './useStrengthProgress'

import {
    getExerciseOptions,
} from '../utils/utils'

import type {
    StrengthProgressRange,
} from '../types/progress.types'

const DEFAULT_RANGE: StrengthProgressRange =
    'THREE_MONTHS'

export function useProgressPage() {
    const progressQuery = useProgressData()
    const metricsQuery = useProgressMetrics()
    const personalRecordsQuery =
        usePersonalRecords()

    const [selectedExerciseId, setSelectedExerciseId] =
        useState<string>()

    const [range, setRange] =
        useState<StrengthProgressRange>(
            DEFAULT_RANGE,
        )

    const [selectedQuestion, setSelectedQuestion] =
        useState<string>()

    const [aiAnswer, setAiAnswer] =
        useState<string>()

    const progressQuestion =
        useProgressQuestion()

    const sessions =
        progressQuery.data?.sessions ?? []

    const exerciseOptions =
        getExerciseOptions(sessions)

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

    const chartData =
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

    function clearAiQuestion() {
        setSelectedQuestion(undefined)
        setAiAnswer(undefined)
        progressQuestion.reset()
    }

    function handleExerciseChange(
        exerciseId: string,
    ) {
        setSelectedExerciseId(exerciseId)
        clearAiQuestion()
    }

    function handleRangeChange(
        nextRange: StrengthProgressRange,
    ) {
        setRange(nextRange)
        clearAiQuestion()
    }

    function handleAskQuestion(
        question: string,
    ) {
        if (!activeExerciseId) {
            return
        }

        const cachedResponse =
            progressQuestion.getCachedAnswer(
                activeExerciseId,
                range,
                question,
            )

        setSelectedQuestion(question)

        if (cachedResponse) {
            setAiAnswer(
                cachedResponse.answer,
            )
            progressQuestion.reset()
            return
        }

        setAiAnswer(undefined)

        progressQuestion.mutate(
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

    return {
        progressQuery,
        metricsQuery,
        personalRecordsQuery,

        selectedExerciseId,
        setSelectedExerciseId,

        range,
        setRange,

        selectedQuestion,
        aiAnswer,

        exerciseOptions,
        activeExerciseId,

        strengthQuery,
        analysisQuery,
        progressQuestionMutation:
        progressQuestion,

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
    }
}
