import { useCallback, useRef, useState, useEffect } from "react";

export default function useHttpClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setIsLoading(true);
            const httpAbortController = new AbortController();
            activeHttpRequests.current.push(httpAbortController);
            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortController.signal
                });

                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(reqController => reqController !== httpAbortController)

                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                return responseData;
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                throw error;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
      return () => {
        // component will unmount
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
      };
    }, []);
    return { isLoading, error, sendRequest, clearError };
}
