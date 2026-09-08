import axios from 'axios'

import { getToken, removeToken } from '../features/auth/authStorage'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

apiClient.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

apiClient.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {
            const isLoginPage =
                window.location.pathname === '/login'

            if (!isLoginPage) {
                const currentPath =
                    window.location.pathname +
                    window.location.search +
                    window.location.hash

                removeToken()

                window.location.href =
                    `/login?redirect=${encodeURIComponent(currentPath)}`
            } else {
                removeToken()
            }
        }

        return Promise.reject(error)
    },
)

export const aiClient = axios.create({
    baseURL: import.meta.env.VITE_AI_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

aiClient.interceptors.request.use((config) => {
    const token = getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})