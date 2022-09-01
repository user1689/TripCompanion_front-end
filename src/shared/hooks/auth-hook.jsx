import { useCallback, useEffect, useState } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [tokenExpirationDate2, setTokenExpirationDate2] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate2(tokenExpirationDate);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString(),
            })
        );
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate2(null);
        setUserId(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(
                storedData.userId,
                storedData.token,
                new Date(storedData.expiration)
            );
        }
    }, [login]);

    useEffect(() => {
        if (token && tokenExpirationDate2) {
            console.log("setTimer1");
            const remainingTime =
                tokenExpirationDate2.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            console.log("setTimer2");
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate2]);

    return {token, login, logout, userId};
};

 