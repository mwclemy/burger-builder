import {useState, useEffect} from 'react';

const useHttpErrorHandler = axios => {
    const [error, setError] = useState(null);
    const requestInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const responseInterceptor = axios.interceptors.response.use(resp => resp,error => {
        setError(error);
    });

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        }
    }, [requestInterceptor, responseInterceptor, axios]);

    return [error, clearError]
}
export default useHttpErrorHandler; 