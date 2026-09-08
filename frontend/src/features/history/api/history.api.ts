import {WorkoutSessionHistoryPage} from "../types/history.types";
import {apiClient} from "../../../api/client";


export async function getWorkoutHistory(
    page: number,
    size: number,
): Promise<WorkoutSessionHistoryPage> {
    const response = await apiClient.get<WorkoutSessionHistoryPage>(
        '/api/me/workout-sessions',
        {
            params: {
                page,
                size,
            },
        },
    )

    return response.data
}