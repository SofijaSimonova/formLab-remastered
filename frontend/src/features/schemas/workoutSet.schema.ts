import { z } from 'zod'

export function createWorkoutSetSchema(
    isWeightBased: boolean,
) {
    return z.object({
        weight: isWeightBased
            ? z
                .string()
                .trim()
                .min(1, 'Weight is required.')
                .refine(
                    (value) =>
                        Number.isFinite(
                            Number(value),
                        ),
                    'Weight must be a valid number.',
                )
                .refine(
                    (value) =>
                        Number(value) >= 0,
                    'Weight cannot be negative.',
                )
            : z.string(),

        reps: z
            .string()
            .trim()
            .min(1, 'Reps are required.')
            .refine(
                (value) =>
                    Number.isFinite(
                        Number(value),
                    ),
                'Reps must be a valid number.',
            )
            .refine(
                (value) =>
                    Number(value) >= 1 &&
                    Number.isInteger(
                        Number(value),
                    ),
                'Reps must be a whole number of at least 1.',
            ),
    })
}

export type WorkoutSetFormValues = {
    weight: string
    reps: string
}