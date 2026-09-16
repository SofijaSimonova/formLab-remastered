import { z } from 'zod'

export const workoutDetailsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Workout name is required.')
        .max(
            150,
            'Workout name must be 150 characters or fewer.',
        ),

    description: z.string(),
})

export type WorkoutDetailsFormValues = z.infer<
    typeof workoutDetailsSchema
>