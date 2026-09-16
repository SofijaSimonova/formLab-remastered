import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    workoutDetailsSchema,
    type WorkoutDetailsFormValues,
} from '../../schemas/workout.schema'

import './WorkoutDetailsForm.css'

interface WorkoutDetailsFormProps {
    isSubmitting: boolean
    serverError: boolean
    onSubmit: (
        values: WorkoutDetailsFormValues,
    ) => Promise<void>
}

export function WorkoutDetailsForm({
                                       isSubmitting,
                                       serverError,
                                       onSubmit,
                                   }: WorkoutDetailsFormProps) {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<WorkoutDetailsFormValues>({
        resolver: zodResolver(
            workoutDetailsSchema,
        ),

        defaultValues: {
            name: '',
            description: '',
        },
    })

    return (
        <form
            id="create-workout-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <div className="workout-details-form-field">
                <label htmlFor="workout-name">
                    Workout name
                </label>

                <input
                    id="workout-name"
                    type="text"
                    placeholder="Upper Body"
                    maxLength={150}
                    autoComplete="off"
                    aria-invalid={!!errors.name}
                    aria-describedby={
                        errors.name
                            ? 'workout-name-error'
                            : undefined
                    }
                    {...register('name')}
                />

                {errors.name && (
                    <span
                        id="workout-name-error"
                        className="workout-details-form-field-error"
                    >
                        {errors.name.message}
                    </span>
                )}
            </div>

            <div className="workout-details-form-field">
                <label htmlFor="workout-description">
                    Description
                </label>

                <textarea
                    id="workout-description"
                    placeholder="Describe your workout..."
                    rows={5}
                    {...register('description')}
                />
            </div>

            {serverError && (
                <div
                    className="create-workout-page-error"
                    role="alert"
                >
                    Failed to create workout.
                    Please try again.
                </div>
            )}

            {isSubmitting && (
                <span
                    className="workout-details-form-status"
                    aria-live="polite"
                >
                    Creating workout...
                </span>
            )}
        </form>
    )
}