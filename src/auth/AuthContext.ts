import { createContext } from "react";
import { serviceLogin } from "@/views/api/serviceLogin";
import type {
    SignInCredential,
    SignUpCredential,
    AuthResult,
    User,
    OauthSignInCallbackPayload,
} from "@/@types/auth";

type Auth = {
    authenticated: boolean;
    user: User | null;
    signIn: (values: SignInCredential) => Promise<AuthResult>;
    signUp: (values: SignUpCredential) => Promise<AuthResult>;
    signOut: () => void;
    oAuthSignIn: (
        callback: (payload: OauthSignInCallbackPayload) => void
    ) => void;
};

const AuthContext = createContext<Auth>({
    authenticated: false,
    user: null,
    signIn: async () => ({
        status: "failed",
        message: "Default sign-in placeholder",
    }),
    signUp: async () => ({
        status: "failed",
        message: "Default sign-up placeholder",
    }),
    signOut: () => {},
    oAuthSignIn: () => {},
});

export default AuthContext;