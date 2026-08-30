import { Navigate, Route, Routes } from 'react-router-dom'

import { PublicLayout } from '../layouts/PublicLayout'
import { AppLayout } from '../layouts/AppLayout'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'

import { LandingPage } from '../pages/LandingPage/LandingPage'
import { ExercisesPage } from '../pages/ExercisePage/ExercisesPage'
import { ExerciseDetailPage } from '../pages/ExerciseDetailPage/ExerciseDetailPage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { RegisterPage } from '../pages/RegisterPage/RegisterPage'
import {WorkoutsPage} from "../pages/WorkoutPage/WorkoutsPage";
import {CreateWorkoutPage} from "../pages/CreateWorkoutPage/CreateWorkoutPage";


export function AppRoutes() {
    return (
        <Routes>

            {/* Public pages */}
            <Route element={<PublicLayout />}>
                <Route
                    path="/"
                    element={<LandingPage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
            </Route>

            {/* Authenticated application */}
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>

                    <Route
                        path="/exercises"
                        element={<ExercisesPage />}
                    />

                    <Route
                        path="/exercises/:id"
                        element={<ExerciseDetailPage />}
                    />

                    <Route
                        path="/me/workouts"
                        element={<WorkoutsPage />}
                    />

                    <Route
                        path="/workouts/new"
                        element={<CreateWorkoutPage />}
                    />

                </Route>
            </Route>

            {/* Fallback */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    )
}