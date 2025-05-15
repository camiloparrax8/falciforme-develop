import React, { useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import { serviceLogin } from "@/views/api/serviceLogin";
import { useSessionUser, useToken } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { AuthResult, SignInCredential } from "@/@types/auth";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const setUser = useSessionUser((state) => state.setUser);
  const setSessionSignedIn = useSessionUser(
    (state) => state.setSessionSignedIn
  );
  const { setToken } = useToken();

  const authenticated = Boolean(useToken().token);

  const expiresIn = useSessionUser((state) => state.expiresIn);

  // Restaurar expiresIn desde localStorage al montar la app
  useEffect(() => {
    const expiration = localStorage.getItem("sessionExpiration");
    if (expiration) {
      const expirationTime = parseInt(expiration, 10);
      const now = Date.now();
      const remaining = Math.floor((expirationTime - now) / 1000);
      if (remaining > 0) {
        useSessionUser.setState({ expiresIn: remaining });
      } else {
        // Si ya expiró, cerrar sesión
        signOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Obtiene el expiresIn
  const signOut = useCallback(() => {
    setToken("");
    setUser(null);
    setSessionSignedIn(false);
    localStorage.removeItem("ultimoPacienteConsultado");
    localStorage.removeItem("sessionExpiration");
    navigate("/login");
  }, [setToken, setUser, setSessionSignedIn, navigate]);

  useEffect(() => {
    if (expiresIn) {
      const expirationTime = new Date().getTime() + expiresIn * 1000; // Tiempo en ms
      const remainingTime = expirationTime - new Date().getTime();

      const timer = setTimeout(() => {
        signOut();
      }, remainingTime);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [expiresIn, signOut]);

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
          apellidos: resp.apellidos,
          cedula: resp.cedula,
          correo: resp.correo,
          celular: resp.celular,
          user: resp.user,
          password: resp.password,
          id_rol: resp.id_rol,
          estado: resp.estado,
          is_deleted: resp.is_deleted,
          deleted_at: resp.deleted_at,
          createdAt: resp.createdAt,
          updatedAt: resp.updatedAt,
        });

        useSessionUser.setState({ expiresIn: resp.expiresIn });

        // NUEVO: guardar la fecha/hora absoluta de expiración
        const expirationTimestamp = Date.now() + resp.expiresIn * 1000;
        localStorage.setItem(
          "sessionExpiration",
          expirationTimestamp.toString()
        );

        // Redirige al usuario a la ruta predeterminada
        navigate("/home");

        console.log(resp);

        return {
          status: "success",
          message: "",
        };
      }

      return {
        status: "failed",
        message: "Unable to sign in",
      };
    } catch (errors: any) {
      // Manejo de errores en caso de que la API falle
      return {
        status: "failed",
        message: errors?.message || "Error during login",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user: useSessionUser((state) => state.user),
        signIn,
        signOut,
        oAuthSignIn: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
