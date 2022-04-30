import React from "react";
import { getCookie } from 'cookies-next';

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = React.useState({
        token: "",
    });

    const setUserAuthInfo = ({ data }) => {

        const token = getCookie('refreshToken', { req, res });

        setAuthState({
            token,
        });
    };

    // checks if the user is authenticated or not
    const isUserAuthenticated = () => {
        if (!authState.token) {
            return false;
        }
    };

    return (
        <Provider
            value={{
                authState,
                setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
                isUserAuthenticated,
            }}
        >
            {children}
        </Provider>
    );
};

export { AuthContext, AuthProvider };