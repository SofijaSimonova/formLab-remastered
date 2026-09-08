import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { useRegister } from '../../features/auth/hooks/useRegister'
import { registerSchema } from '../../features/schemas/register.schema'

import './RegisterPage.css'

interface RegisterFormValues {
    email: string
    password: string
    firstName: string
    lastName: string
}

export function RegisterPage() {
    const navigate = useNavigate()
    const registerMutation = useRegister()

    const [serverError, setServerError] = useState('')

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
    })

    async function onSubmit(data: RegisterFormValues) {
        setServerError('')

        try {
            await registerMutation.mutateAsync(data)

            navigate('/login', {
                replace: true,
            })
        } catch {
            setServerError(
                'Registration failed. Please check your information and try again.',
            )
        }
    }

    return (
        <div className="register-page">
            <header className="register-header">
                <Link
                    to="/"
                    className="register-logo"
                >
                    FormLab
                </Link>

                <Link
                    to="/"
                    className="register-back"
                >
                    Back to home
                </Link>
            </header>

            <main className="register-main">
                <div className="register-container">
                    <div className="register-heading">
                        <span className="register-eyebrow">
                            FORM<span>LAB</span> / AUTH
                        </span>

                        <h1>
                            Create your account.
                        </h1>

                        <p>
                            Set up your account and start training with
                            precision.
                        </p>
                    </div>

                    <form
                        className="register-form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <div className="register-name-row">
                            <div className="register-form-field">
                                <label htmlFor="firstName">
                                    First name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    autoComplete="given-name"
                                    {...register('firstName')}
                                />

                                {errors.firstName && (
                                    <span className="register-field-error">
                                        {errors.firstName.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-field">
                                <label htmlFor="lastName">
                                    Last name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    autoComplete="family-name"
                                    {...register('lastName')}
                                />

                                {errors.lastName && (
                                    <span className="register-field-error">
                                        {errors.lastName.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="form-field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                {...register('email')}
                            />

                            {errors.email && (
                                <span className="register-field-error">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="form-field">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="At least 8 characters"
                                autoComplete="new-password"
                                {...register('password')}
                            />

                            {errors.password && (
                                <span className="register-field-error">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {serverError && (
                            <div className="register-error">
                                {serverError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="register-submit"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending
                                ? 'Creating account...'
                                : 'Create account'}
                        </button>
                    </form>

                    <div className="register-divider">
                        <span />
                        <span>ALREADY HAVE AN ACCOUNT?</span>
                        <span />
                    </div>

                    <p className="register-login">
                        Already registered?{' '}
                        <Link to="/login">
                            Sign in
                        </Link>
                    </p>

                    <div className="register-status">
                        <span className="register-status-dot" />
                        SECURE TRAINING ENVIRONMENT
                    </div>
                </div>
            </main>
        </div>
    )
}