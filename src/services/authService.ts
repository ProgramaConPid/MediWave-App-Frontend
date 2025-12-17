import axiosInstance from '@/lib/axios';

// Interfaces for authentication operations
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  raw: unknown;
  token?: string;
  user?: unknown;
}


// Authentication service functions and constants
const LOGIN_PATH = process.env.NEXT_PUBLIC_AUTH_LOGIN_PATH || '/auth/login';

export const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
  const response = await axiosInstance.post(LOGIN_PATH, credentials);
  const data: any = response.data;

  // Common token field names across APIs
  const token: string | undefined =
    data?.token ?? data?.access_token ?? data?.accessToken ?? data?.jwt;

  // Common user field names across APIs
  const user: unknown = data?.user ?? data?.data?.user;

  return { raw: data, token, user };
};
