import { useMutation } from '@tanstack/react-query'

import { askProgressQuestion } from '../api/progress.api'
import type {
    StrengthProgressRange,
} from '../types/progress.types'

export function useProgressQuestion() {
    return useMutation({
        mutationFn: ({
                         exerciseId,
                         range,
                         question,
                     }: {
            exerciseId: string
            range: StrengthProgressRange
            question: string
        }) =>
            askProgressQuestion(
                exerciseId,
                range,
                question,
            ),
    })
}