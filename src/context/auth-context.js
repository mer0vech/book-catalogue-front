import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, expirationTime, user) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    const remainingTime = adjustedExpirationTime - currentTime;

    return remainingTime;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationTime = localStorage.getItem("expirationTime");
    const storedUsername = localStorage.getItem("username");

    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if(remainingTime <= 60000) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("username");
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
        user: storedUsername
    };
};

export function AuthContextProvider(props) {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if(tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("username");

        if(logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime, user) => {
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("username", user)
        
        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if(tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;