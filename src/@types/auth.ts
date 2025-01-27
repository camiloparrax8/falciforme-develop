export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    data: {
        id: number;
        nombres: string;
        apellidos: string;
        cedula: string;
        correo: string;
        celular: string;
        user: string;
        password: string;
        id_rol: number;
        estado: boolean;
        is_deleted: boolean;
        deleted_at: string | null;
        deleted_by: string | null;
        createdAt: string; // Fecha en formato ISO
        updatedAt: string; // Fecha en formato ISO
    }
    token: string;
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    id?: number | null
    nombres?: string | null
    apellidos?: string | null
    cedula?: string | null
    correo?: string | null
    celular?: string | null
    user?: string | null
    password?: string | null
    id_rol?: number | null
    estado?: boolean
    is_deleted?: boolean
    deleted_at?: string | null
    deleted_by?: string | null
    createdAt?: string
    updatedAt?: string
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}
