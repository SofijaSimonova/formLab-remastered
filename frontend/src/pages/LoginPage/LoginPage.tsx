import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../../features/auth/AuthContext'
import { loginSchema } from '../../features/schemas/login.schema'

import './LoginPage.css'

type LoginFormValues = {
    email: string
    password: string
}

export function LoginPage() {
    const navigate = useNavigate()
    const location = useLocation()

    const { login } = useAuth()

    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: '',
            password: '',
        },
    })

    const redirect =
        new URLSearchParams(location.search).get('redirect')

    const from =
        location.state?.from?.pathname ||
        redirect ||
        '/exercises'

    async function onSubmit(data: LoginFormValues) {
        setError('')

        try {
            await login(data.email, data.password)

            navigate(from, {
                replace: true,
            })
        } catch {
            setError('Invalid email or password.')
        }
    }

    return (
        <div className="login-page">
            <header className="login-header">
                <Link
                    to="/"
                    className="login-logo"
                >
                    FormLab
                </Link>

                <Link
                    to="/"
                    className="login-back"
                >
                    Back to home
                </Link>
            </header>

            <main className="login-main">
                <div className="login-container">
                    <div className="login-heading">
                        <span className="login-eyebrow">
                            FORM<span>LAB</span> / AUTH
                        </span>

                        <h1>
                            Welcome back.
                        </h1>

                        <p>
                            Sign in to access your training system.
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <div className="login-form-field">
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
                                <span className="login-field-error">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="login-form-field">
                            <div className="login-form-field-header">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <a href="#">
                                    Forgot password?
                                </a>
                            </div>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                {...register('password')}
                            />

                            {errors.password && (
                                <span className="login-field-error">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Signing in...'
                                : 'Sign in'}
                        </button>
                    </form>

                    <div className="login-divider">
                        <span />
                        <span>NEW TO FORMLAB?</span>
                        <span />
                    </div>

                    <p className="login-register">
                        Don't have an account?{' '}
                        <Link to="/register">
                            Create your account
                        </Link>
                    </p>

                    <div className="login-status">
                        <span className="login-status-dot" />
                        SECURE TRAINING ENVIRONMENT
                    </div>
                </div>
            </main>
        </div>
    )
}