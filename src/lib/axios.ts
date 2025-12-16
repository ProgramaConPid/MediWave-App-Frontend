import axios, { AxiosHeaders } from 'axios';

// Remove trailing slashes from a URL
const normalizeBaseUrl = (url: string): string => {
    return url.replace(/\/+$/, '');
};

// Get the API base URL from environment or default to localhost
const getBaseUrl = (): string => {
    const env = process.env.NEXT_PUBLIC_API_URL;
    console.log('[Debug] NEXT_PUBLIC_API_URL:', env);
    return normalizeBaseUrl(env || 'http://localhost:8000');
};

// Retrieve the access token from localStorage (client-side only)
const getToken = (): string | null => {
    if (typeof window === 'undefined') return null;

    try {
        return localStorage.getItem('token'); // consistent with login
    } catch {
        return null;
    }
};

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include Authorization header if token exists
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
    (error) => Promise.reject(error) // reject request errors
);

// Add response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('Response error:', error.response.data);

            // Handle unauthorized (401) responses
            if (error.response.status === 401) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    // Optionally redirect to login: window.location.href = '/login';
                }
            }
        } else if (error.request) {
            console.error('Network error:', error.request);
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error); // propagate error to caller
    }
);

export default axiosInstance;
