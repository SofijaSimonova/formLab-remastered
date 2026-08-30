import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'

import { login as loginApi } from './authApi'
import {
    getToken,
    removeToken,
    setToken,
} from './authStorage'

interface AuthContextValue {
    token: string | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(
    undefined
)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({
                                 children,
                             }: AuthProviderProps) {
    const [token, setTokenState] = useState<string | null>(
        getToken()
    )

    const isAuthenticated = token !== null

    useEffect(() => {
        if (!token) {
            removeToken()
        }
    }, [token])

    async function login(
        email: string,
        password: string
    ): Promise<void> {
        const response = await loginApi({
            email,
            password,
        })

        setToken(response.token)
        setTokenState(response.token)
    }

    function logout(): void {
        removeToken()
        setTokenState(null)
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error(
            'useAuth must be used within an AuthProvider'
        )
    }

    return context
}