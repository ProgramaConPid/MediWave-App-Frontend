import axios, { AxiosHeaders } from 'axios';

const normalizeBaseUrl = (url: string): string => {
    // elimina slashes finales
    return url.replace(/\/+$/, '');
};

const getBaseUrl = (): string => {
    const env = process.env.NEXT_PUBLIC_API_URL;

    // backend directo, sin /api
    return normalizeBaseUrl(env || 'http://localhost:8000');
};

const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;

    try {
        return localStorage.getItem('accessToken'); // 👈 coherente con login
    } catch {
        return null;
    }
};

const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (!token) return config;

        if (config.headers instanceof AxiosHeaders) {
            config.headers.set('Authorization', `Bearer ${token}`);
            return config;
        }

        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Error de respuesta:', error.response.data);

            if (error.response.status === 401) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    // window.location.href = '/login';
                }
            }
        } else if (error.request) {
            console.error('Error de red:', error.request);
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
