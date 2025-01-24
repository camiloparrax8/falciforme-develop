import React, { useRef, useImperativeHandle, forwardRef } from "react";
import AuthContext from "./AuthContext";
import { serviceLogin } from "@/views/api/serviceLogin";
import { useSessionUser, useToken } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { AuthResult, SignInCredential } from "@/@types/auth";

function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    const setUser = useSessionUser((state) => state.setUser);
    const setSessionSignedIn = useSessionUser((state) => state.setSessionSignedIn);
    const { setToken } = useToken();

    const authenticated = Boolean(useToken().token);

    const signIn = async (values: SignInCredential): Promise<AuthResult> => {
        try {
            // Llama a la API de login
            const resp = await serviceLogin(values);
    
            if (resp) {
                // Guarda el token en el estado
                setToken(resp.token);
    
                // Marca la sesión como activa
                setSessionSignedIn(true);
    
                // Guarda los datos del usuario (id y nombres) en el estado
                setUser({
                    id: resp.id,
                    nombres: resp.nombres,
                });
    
                // Redirige al usuario a la ruta predeterminada
                navigate("/home");

                console.log(resp);
    
                return {
                    status: 'success',
                    message: '',
                };
            }
    
            return {
                status: 'failed',
                message: 'Unable to sign in',
            };
        } catch (errors: any) {
            // Manejo de errores en caso de que la API falle
            return {
                status: 'failed',
                message: errors?.message || 'Error during login',
            };
        }
    };
    

    const signOut = () => {
        // Limpiar datos del usuario y token
        setToken("");
        setUser(null);
        setSessionSignedIn(false);

        // Redirigir a la página de inicio de sesión
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user: useSessionUser((state) => state.user),
                signIn,
                signUp: async () => ({ status: "failed", message: "Not implemented" }),
                signOut,
                oAuthSignIn: () => {},
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

