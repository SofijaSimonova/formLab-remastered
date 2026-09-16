import ReactMarkdown from 'react-markdown'

import type { ProgressAnalysisResponse } from '../types/progress.types'

interface AiCoachCardProps {
    analysisQuery: {
        isLoading: boolean
        isError: boolean
    }
    analysis:
        | ProgressAnalysisResponse
        | undefined
    selectedQuestion: string | undefined
    aiAnswer: string | undefined
    isQuestionPending: boolean
    isQuestionError: boolean
    onAskQuestion: (question: string) => void
}

export function AiCoachCard({
    analysisQuery,
    analysis,
    selectedQuestion,
    aiAnswer,
    isQuestionPending,
    isQuestionError,
    onAskQuestion,
}: AiCoachCardProps) {
    return (
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
                        <h3>Summary</h3>

                        <p>
                            {analysis.summary}
                        </p>
                    </div>

                    <div className="ai-section">
                        <h3>Insights</h3>

                        <ul>
                            {analysis.insights.map(
                                (insight) => (
                                    <li
                                        key={
                                            insight
                                        }
                                    >
                                        {insight}
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
                                        onAskQuestion(
                                            prompt,
                                        )
                                    }
                                    disabled={
                                        isQuestionPending
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

                    {isQuestionPending && (
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

                    {isQuestionError && (
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
                        !isQuestionPending && (
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

                                <div className="ai-answer-content">
                                    <ReactMarkdown>
                                        {aiAnswer}
                                    </ReactMarkdown>
                                </div>
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
    )
}
