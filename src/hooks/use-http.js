import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        const { method, headers, body, url } = requestConfig;

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method,
                body: JSON.stringify(body),
                headers,
            });

            if (!response.ok) {
                throw new Error("Request failed!");
            }

            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
    }, []);
    return { isLoading, error, sendRequest };
};

export default useHttp;
