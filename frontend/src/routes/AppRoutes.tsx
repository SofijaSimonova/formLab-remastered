import { Routes, Route, Navigate } from 'react-router-dom'

import { ExercisesPage } from '../pages/ExercisesPage'
import { ExerciseDetailPage } from '../pages/ExerciseDetailPage'

export function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/exercises"
                element={<ExercisesPage />}
            />

            <Route
                path="/exercises/:id"
                element={<ExerciseDetailPage />}
            />

            <Route
                path="*"
                element={<Navigate to="/exercises" replace />}
            />
        </Routes>
    )
}