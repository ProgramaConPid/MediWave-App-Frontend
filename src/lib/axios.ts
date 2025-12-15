import axios, { AxiosHeaders } from 'axios';

const normalizeBaseUrl = (url: string): string => {
  // normaliza slashes y asegura el prefijo /api si no viene incluido
  const trimmed = url.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const getBaseUrl = (): string => {
  const env = process.env.NEXT_PUBLIC_API_URL;
  // IMPORTANTE: en Next, NEXT_PUBLIC_* se expone al navegador; define esta variable en tu entorno.
  return normalizeBaseUrl(env || 'http://localhost:8000/api');
};

const getToken = (): string | null => {
  // Evita errores si este módulo llega a ejecutarse en SSR
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

// Configuración base de axios
const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación si existe
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token) return config;

    // Axios v1 puede usar AxiosHeaders internamente
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

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de respuesta:', error.response.data);

      // Si el token expiró o no es válido (401)
      if (error.response.status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          // window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // La petición se hizo pero no se recibió respuesta
      console.error('Error de red:', error.request);
    } else {
      // Algo sucedió al configurar la petición
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
