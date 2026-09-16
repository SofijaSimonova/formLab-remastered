import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {createWorkoutSetSchema, WorkoutSetFormValues} from "../../schemas/workoutSet.schema";


interface WorkoutSetFormProps {
    isWeightBased: boolean
    nextSetNumber: number
    isSubmitting: boolean
    onSubmit: (
        values: WorkoutSetFormValues,
    ) => Promise<void>
    onFocusRequest?: (
        focus: () => void,
    ) => void
}

export function WorkoutSetForm({
                                   isWeightBased,
                                   nextSetNumber,
                                   isSubmitting,
                                   onSubmit,
                               }: WorkoutSetFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<WorkoutSetFormValues>({
        resolver: zodResolver(
            createWorkoutSetSchema(
                isWeightBased,
            ),
        ),

        defaultValues: {
            weight: '',
            reps: '',
        },
    })

    useEffect(() => {
        reset({
            weight: '',
            reps: '',
        })
    }, [
        isWeightBased,
        reset,
    ])

    async function handleFormSubmit(
        values: WorkoutSetFormValues,
    ) {
        await onSubmit(values)

        reset({
            weight: '',
            reps: '',
        })
    }

    return (
        <>
            <form
                className={[
                    'workout-set-add-form',
                    !isWeightBased
                        ? 'workout-set-add-form-reps-only'
                        : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                onSubmit={handleSubmit(
                    handleFormSubmit,
                )}
                noValidate
            >
                <span className="workout-set-next-set-number">
                    {nextSetNumber}
                </span>

                {isWeightBased && (
                    <div className="workout-set-form-control">
                        <input
                            className="workout-set-input"
                            type="number"
                            min="0"
                            step="0.5"
                            placeholder="Weight"
                            aria-label="Weight in kilograms"
                            aria-invalid={
                                !!errors.weight
                            }
                            {...register(
                                'weight',
                            )}
                        />

                        {errors.weight && (
                            <span className="workout-set-form-error">
                                {
                                    errors
                                        .weight
                                        .message
                                }
                            </span>
                        )}
                    </div>
                )}

                <div className="workout-set-form-control">
                    <input
                        className="workout-set-input"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Reps"
                        aria-label="Repetitions"
                        aria-invalid={
                            !!errors.reps
                        }
                        {...register(
                            'reps',
                        )}
                    />

                    {errors.reps && (
                        <span className="workout-set-form-error">
                            {
                                errors
                                    .reps
                                    .message
                            }
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="workout-set-save-button"
                    disabled={
                        isSubmitting
                    }
                >
                    {isSubmitting
                        ? '...'
                        : 'Add'}
                </button>
            </form>

            <button
                type="button"
                className="workout-set-add-button"
                onClick={() => {
                    const input =
                        document.querySelector<HTMLInputElement>(
                            isWeightBased
                                ? '.workout-set-add-form input[name="weight"]'
                                : '.workout-set-add-form input[name="reps"]',
                        )

                    input?.focus()
                }}
            >
                + Add Set
            </button>
        </>
    )
}