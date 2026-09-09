import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCurrentUser } from '../../features/user/hooks/useCurrentUser'
import { useUpdateCurrentUser } from '../../features/user/hooks/useUpdateCurrentUser'

import { useGoals } from '../../features/goals/hooks/useGoals'
import { useUserGoals } from '../../features/goals/hooks/useUserGoals'
import { useAddUserGoal } from '../../features/goals/hooks/useAddUserGoal'
import { useRemoveUserGoal } from '../../features/goals/hooks/useRemoveUserGoal'

import { useChangePassword } from '../../features/auth/hooks/useChangePassword'
import { removeToken } from '../../features/auth/authStorage'

import './ProfilePage.css'

export function ProfilePage() {
    const navigate = useNavigate()

    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useCurrentUser()

    const {
        data: goals = [],
    } = useGoals()

    const {
        data: userGoals = [],
        isLoading: isUserGoalsLoading,
    } = useUserGoals()

    const updateUserMutation =
        useUpdateCurrentUser()

    const addGoalMutation =
        useAddUserGoal()

    const removeGoalMutation =
        useRemoveUserGoal()

    const changePasswordMutation =
        useChangePassword()

    const [isEditing, setIsEditing] =
        useState(false)

    const [firstName, setFirstName] =
        useState('')

    const [lastName, setLastName] =
        useState('')

    const [selectedGoalId, setSelectedGoalId] =
        useState('')

    const [currentPassword, setCurrentPassword] =
        useState('')

    const [newPassword, setNewPassword] =
        useState('')

    const [confirmPassword, setConfirmPassword] =
        useState('')

    const [passwordMessage, setPasswordMessage] =
        useState('')

    function handleEdit() {
        if (!user) {
            return
        }

        setFirstName(user.firstName)
        setLastName(user.lastName)
        setIsEditing(true)
    }

    async function handleSaveProfile() {
        if (
            !firstName.trim() ||
            !lastName.trim()
        ) {
            return
        }

        await updateUserMutation.mutateAsync({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        })

        setIsEditing(false)
    }

    async function handleAddGoal() {
        if (!selectedGoalId) {
            return
        }

        await addGoalMutation.mutateAsync({
            goalId: selectedGoalId,
        })

        setSelectedGoalId('')
    }

    async function handleRemoveGoal(
        userGoalId: string,
    ) {
        await removeGoalMutation.mutateAsync(
            userGoalId,
        )
    }

    async function handleChangePassword() {
        setPasswordMessage('')

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setPasswordMessage(
                'Please fill in all password fields.',
            )
            return
        }

        if (newPassword.length < 8) {
            setPasswordMessage(
                'New password must be at least 8 characters.',
            )
            return
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage(
                'New passwords do not match.',
            )
            return
        }

        try {
            await changePasswordMutation.mutateAsync({
                currentPassword,
                newPassword,
            })

            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')

            setPasswordMessage(
                'Password changed successfully.',
            )

            setTimeout(() => {
                removeToken()
                navigate('/login')
            }, 1500)
        } catch {
            setPasswordMessage(
                'Unable to change password. Please check your current password.',
            )
        }
    }

    if (isUserLoading) {
        return (
            <main className="profile-page">
                <div className="profile-page-state">
                    Loading profile...
                </div>
            </main>
        )
    }

    if (isUserError || !user) {
        return (
            <main className="profile-page">
                <div className="profile-page-state">
                    Unable to load your profile.
                </div>
            </main>
        )
    }

    const selectedGoalIds = new Set(
        userGoals.map(
            (userGoal) => userGoal.goalId,
        ),
    )

    const availableGoals =
        goals.filter(
            (goal) =>
                !selectedGoalIds.has(goal.id),
        )

    const initials =
        `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
            .toUpperCase()

    return (
        <main className="profile-page">
            <div className="profile-container">

                <header className="profile-header">
                    <div>
                        <span className="profile-eyebrow">
                            FORMLAB / ACCOUNT
                        </span>

                        <h1>
                            Profile
                        </h1>

                        <p>
                            Manage your personal information
                            and training goals.
                        </p>
                    </div>
                </header>

                <section className="profile-section">
                    <div className="profile-section-header">
                        <div>
                            <span className="profile-section-eyebrow">
                                PERSONAL INFORMATION
                            </span>

                            <h2>
                                Your profile
                            </h2>
                        </div>

                        {!isEditing && (
                            <button
                                type="button"
                                className="profile-edit-button"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    <div className="profile-card">

                        <div className="profile-avatar">
                            {initials}
                        </div>

                        {isEditing ? (
                            <div className="profile-edit-form">

                                <div className="profile-field">
                                    <label htmlFor="first-name">
                                        First Name
                                    </label>

                                    <input
                                        id="first-name"
                                        type="text"
                                        value={firstName}
                                        onChange={(event) =>
                                            setFirstName(
                                                event.target.value,
                                            )
                                        }
                                    />
                                </div>

                                <div className="profile-field">
                                    <label htmlFor="last-name">
                                        Last Name
                                    </label>

                                    <input
                                        id="last-name"
                                        type="text"
                                        value={lastName}
                                        onChange={(event) =>
                                            setLastName(
                                                event.target.value,
                                            )
                                        }
                                    />
                                </div>

                                <div className="profile-edit-actions">
                                    <button
                                        type="button"
                                        className="profile-cancel-button"
                                        onClick={() =>
                                            setIsEditing(false)
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="profile-save-button"
                                        onClick={handleSaveProfile}
                                        disabled={
                                            updateUserMutation.isPending
                                        }
                                    >
                                        {updateUserMutation.isPending
                                            ? 'Saving...'
                                            : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="profile-details">

                                <div className="profile-detail">
                                    <span>
                                        Full Name
                                    </span>

                                    <strong>
                                        {user.firstName}{' '}
                                        {user.lastName}
                                    </strong>
                                </div>

                                <div className="profile-detail">
                                    <span>
                                        Email
                                    </span>

                                    <strong>
                                        {user.email}
                                    </strong>
                                </div>

                                <div className="profile-detail">
                                    <span>
                                        Member Since
                                    </span>

                                    <strong>
                                        {new Date(
                                            user.createdAt,
                                        ).toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'long',
                                                year: 'numeric',
                                            },
                                        )}
                                    </strong>
                                </div>

                            </div>
                        )}
                    </div>
                </section>

                <section className="profile-section">
                    <div className="profile-section-header">
                        <div>
                            <span className="profile-section-eyebrow">
                                TRAINING
                            </span>

                            <h2>
                                Your goals
                            </h2>

                            <p>
                                Set goals to help FormLab
                                personalize your training.
                            </p>
                        </div>
                    </div>

                    <div className="profile-goals-card">

                        {isUserGoalsLoading ? (
                            <div className="profile-goals-state">
                                Loading goals...
                            </div>
                        ) : (
                            <>
                                <div className="profile-user-goals-list">
                                    {userGoals.length === 0 ? (
                                        <div className="profile-goals-empty">
                                            No goals selected yet.
                                        </div>
                                    ) : (
                                        userGoals.map(
                                            (userGoal) => (
                                                <div
                                                    key={
                                                        userGoal.id
                                                    }
                                                    className="profile-user-goal"
                                                >
                                                    <div>
                                                        <strong>
                                                            {
                                                                userGoal.goalName
                                                            }
                                                        </strong>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="profile-goal-remove-button"
                                                        onClick={() =>
                                                            handleRemoveGoal(
                                                                userGoal.id,
                                                            )
                                                        }
                                                        disabled={
                                                            removeGoalMutation.isPending
                                                        }
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ),
                                        )
                                    )}
                                </div>

                                <div className="profile-goal-add-row">
                                    <select
                                        value={selectedGoalId}
                                        onChange={(event) =>
                                            setSelectedGoalId(
                                                event.target.value,
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select a goal
                                        </option>

                                        {availableGoals.map(
                                            (goal) => (
                                                <option
                                                    key={goal.id}
                                                    value={goal.id}
                                                >
                                                    {goal.name}
                                                </option>
                                            ),
                                        )}
                                    </select>

                                    <button
                                        type="button"
                                        className="profile-goal-add-button"
                                        onClick={handleAddGoal}
                                        disabled={
                                            !selectedGoalId ||
                                            addGoalMutation.isPending
                                        }
                                    >
                                        {addGoalMutation.isPending
                                            ? 'Adding...'
                                            : 'Add Goal'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                <section className="profile-section">
                    <div className="profile-section-header">
                        <div>
                            <span className="profile-section-eyebrow">
                                SECURITY
                            </span>

                            <h2>
                                Change password
                            </h2>

                            <p>
                                Keep your FormLab account secure.
                            </p>
                        </div>
                    </div>

                    <div className="profile-password-card">

                        <div className="profile-password-form">

                            <div className="profile-password-field">
                                <label htmlFor="current-password">
                                    Current Password
                                </label>

                                <input
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(event) =>
                                        setCurrentPassword(
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="current-password"
                                />
                            </div>

                            <div className="profile-password-field">
                                <label htmlFor="new-password">
                                    New Password
                                </label>

                                <input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(event) =>
                                        setNewPassword(
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                />
                            </div>

                            <div className="profile-password-field">
                                <label htmlFor="confirm-password">
                                    Confirm New Password
                                </label>

                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                />
                            </div>

                            {passwordMessage && (
                                <p className="profile-password-message">
                                    {passwordMessage}
                                </p>
                            )}

                            <div className="profile-password-actions">
                                <button
                                    type="button"
                                    className="profile-save-button"
                                    onClick={
                                        handleChangePassword
                                    }
                                    disabled={
                                        changePasswordMutation.isPending
                                    }
                                >
                                    {changePasswordMutation.isPending
                                        ? 'Changing...'
                                        : 'Change Password'}
                                </button>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </main>
    )
}

