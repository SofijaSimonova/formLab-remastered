import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'

import { askProgressQuestion } from '../api/progress.api'

import type {
    ProgressQuestionResponse,
    StrengthProgressRange,
} from '../types/progress.types'

import { progressKeys } from '../progress.keys'

interface AskProgressQuestionVariables {
    exerciseId: string
    range: StrengthProgressRange
    question: string
}

export function useProgressQuestion() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({
                         exerciseId,
                         range,
                         question,
                     }: AskProgressQuestionVariables) =>
            askProgressQuestion(
                exerciseId,
                range,
                question,
            ),

        onSuccess: (
            response: ProgressQuestionResponse,
            variables: AskProgressQuestionVariables,
        ) => {
            queryClient.setQueryData(
                progressKeys.question(
                    variables.exerciseId,
                    variables.range,
                    variables.question,
                ),
                response,
            )
        },
    })

    function getCachedAnswer(
        exerciseId: string,
        range: StrengthProgressRange,
        question: string,
    ) {
        return queryClient.getQueryData<ProgressQuestionResponse>(
            progressKeys.question(
                exerciseId,
                range,
                question,
            ),
        )
    }

    return {
        ...mutation,
        getCachedAnswer,
    }
}