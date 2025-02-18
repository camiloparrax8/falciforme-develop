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
        signedIn: boolean // Indica si el usuario está autenticado
    }
    user: {
        id?: number // ID del usuario
        nombres?: string // Nombres del usuario
        apellidos?: string // Apellidos del usuario
        cedula?: string // Cédula del usuario
        correo?: string // Correo electrónico del usuario
        celular?: string // Celular del usuario
        user?: string // Nombre de usuario (alias) del usuario
        password?: string // Contraseña del usuario
        id_rol?: number // ID del rol del usuario
        estado?: boolean // Estado del usuario (true: activo, false: inactivo)
        is_deleted?: boolean // Indica si el usuario ha sido eliminado (true: eliminado, false: no eliminado)
        deleted_at?: string // Fecha y hora de la eliminación del usuario
        deleted_by?: string // Usuario que ha eliminado el usuario
        createdAt?: string // Fecha y hora de creación del usuario
        updatedAt?: string // Fecha y hora de actualización del usuario
    }
    token?: string // Agregar token al estado
    expiresIn?: number
}

type AuthAction = {
    setSessionSignedIn: (payload: boolean) => void
    setUser: (payload: User) => void
    setTokenData: (data: { token: string; expiresIn: number }) => void; // Cambiar la firma

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
    user: {},
    token: null, // Agregar token al estado
    expiresIn: null, // Estado inicial vacío
}

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
                        ...payload, // Agrega o sobrescribe las nuevas propiedades
                    },
                })),
            setTokenData: ({ token, expiresIn }) => // Tomar un objeto
                set({
                    token,
                    expiresIn, // Guardamos el tiempo de expiración
                })
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
