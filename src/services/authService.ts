import axiosInstance from '@/lib/axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  raw: unknown;
  token?: string;
  user?: unknown;
}

// You can override this per environment (e.g. "/login", "/auth/login", "/users/login")
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
