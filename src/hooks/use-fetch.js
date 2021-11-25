import { useState, useCallback } from 'react';

function useFetch() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (request, responseHandler) => {
        setIsLoading(true);

        try {
            const response = await fetch(
                request.url, {
                    method: request.method ? request.method : 'GET',
                    headers: request.headers ? request.headers : {},
                    body: request.body ? JSON.stringify(request.body) : null
                }
            );

            if(!response.ok) {
                throw new Error(JSON.stringify({
                    message: 'Request failed!',
                    status: response.status,
                    text: response.statusText
                }));
            }

            const json = await response.json();
            responseHandler(json);

        } catch(err) {
            setError(err.message);
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    };
      
}

export default useFetch;