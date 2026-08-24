export interface LoginPayload {
  phone: string;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  birthdate: string;
  region: string;
  district: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  image: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
  clearAuth: () => void;
};

// Auth OTP

export interface SendOtpPayload {
  phone: string;
}

export interface VerifyOtpPayload {
  phone: string;
  code: string;
}

export interface SendOtpResponse {
  message: string;
  expiresIn: number;
}
