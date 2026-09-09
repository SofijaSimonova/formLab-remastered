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
import { WorkoutSetPage } from '../pages/WorkoutSetPage/WorkoutSetPage'
import {WorkoutCompletePage} from "../pages/WorkoutCompletePage/WorkoutCompletePage";
import { WorkoutDetailPage } from '../pages/WorkoutDetailPage/WorkoutDetailPage'
import {ProfilePage} from "../pages/ProfilePage/ProfilePage";
import ProgressPage from "../pages/ProgressPage/ProgressPage";
import {HistoryPage} from "../pages/HistoryPage/HistoryPage";
import { AdminRoute } from '../features/auth/AdminRoute'
import {AdminDashboardPage} from "../pages/AdminDashboardPage/AdminDashboardPage";


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

                    <Route
                        path="/workouts/:workoutId"
                        element={<WorkoutDetailPage />}
                    />

                    <Route
                        path="/workouts/:workoutId/session/:workoutSessionId/exercises/:workoutExerciseId"
                        element={<WorkoutSetPage />}
                    />

                    <Route
                        path="/workouts/:workoutId/session/:workoutSessionId/complete"
                        element={<WorkoutCompletePage />}
                    />
                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />
                    <Route
                        path="/progress"
                        element={<ProgressPage />}
                    />
                    <Route
                        path="/history"
                        element={<HistoryPage />}
                    />

                    {/* Admin-only pages */}
                    <Route element={<AdminRoute />}>
                        <Route
                            path="/admin"
                            element={<AdminDashboardPage />}
                        />
                    </Route>

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
