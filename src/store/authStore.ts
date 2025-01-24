import cookiesStorage from '@/utils/cookiesStorage'
import appConfig from '@/configs/app.config'
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/@types/auth'

type Session = {
    signedIn: boolean
}

type AuthState = {
    session: {
        signedIn: boolean; // Indica si el usuario está autenticado
    };
    user: {
        id?: number; // ID del usuario
        nombres?: string; // Nombres del usuario
    };
};

type AuthAction = {
    setSessionSignedIn: (payload: boolean) => void
    setUser: (payload: User) => void
}

const getPersistStorage = () => {
    if (appConfig.accessTokenPersistStrategy === 'localStorage') {
        return localStorage
    }

    if (appConfig.accessTokenPersistStrategy === 'sessionStorage') {
        return sessionStorage
    }

    return cookiesStorage
}

const initialState: AuthState = {
    session: {
        signedIn: false,
    },
    user: {}, // Estado inicial vacío
};

export const useSessionUser = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            ...initialState,
            setSessionSignedIn: (payload) =>
                set((state) => ({
                    session: {
                        ...state.session,
                        signedIn: payload,
                    },
                })),
            setUser: (payload) =>
                set((state) => ({
                    user: {
                        ...state.user, // Mantiene las propiedades existentes
                        ...payload,    // Agrega o sobrescribe las nuevas propiedades
                    },
                })),
        }),
        { name: 'sessionUser', storage: createJSONStorage(() => localStorage) },
    ),
)

export const useToken = () => {
    const storage = getPersistStorage()

    const setToken = (token: string) => {
        storage.setItem(TOKEN_NAME_IN_STORAGE, token)
    }

    return {
        setToken,
        token: storage.getItem(TOKEN_NAME_IN_STORAGE),
    }
}
