import api from "./api";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  onboardingCompleted: boolean;
  onboardingStep: number;
  credits: number;
}

export interface AuthApiResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

export const authApi = {
  async signup(fullName: string, email: string, password: string): Promise<AuthApiResponse> {
    const res = await api.post<AuthApiResponse>("/auth/signup", {
      fullName,
      email,
      password,
    });
    return res.data;
  },

  async login(email: string, password: string): Promise<AuthApiResponse> {
    const res = await api.post<AuthApiResponse>("/auth/login", {
      email,
      password,
    });
    return res.data;
  },

  async googleAuth(payload: {
    email: string;
    name?: string;
    avatar?: string;
    googleId?: string;
  }): Promise<AuthApiResponse> {
    const res = await api.post<AuthApiResponse>("/auth/google", payload);
    return res.data;
  },

  async getMe(): Promise<{ success: boolean; data: AuthUser }> {
    const res = await api.get<{ success: boolean; data: AuthUser }>("/auth/me");
    return res.data;
  },
};
