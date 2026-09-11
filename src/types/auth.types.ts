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
  avatar: string;
  email: string;
  birthDate: string;
  addresses: Array<{
    city: string;
    region: string;
    district: string;
    street: string;
    isDefault: boolean;
  }>;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGuest: boolean;
  pendingRegistration: PendingRegistration | null;

  setPendingRegistration: (data: PendingRegistration | null) => void;
  continueAsGuest: () => void;
  setUser: (user: User | null) => void;
  setLoading: (value: boolean) => void;
  clearAuth: () => void;
};

// Auth OTP

export interface SendOtpPayload {
  phone: string;
  name?: string;
  birthDate?: string;
  mode?: "auto" | "login" | "register";
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
  name?: string;
  birthDate?: string;
  wishlist?: string[];
}

export interface SendOtpResponse {
  phone: string;
  isNewUser: boolean;
}

export type ApiErrorResponse = {
  message?: string;
};

export type OtpFormValues = {
  code: string[];
};

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  stack?: string | null;
}

export interface AuthData {
  user: User;
  accessToken?: string;
  token?: string;
  refreshToken?: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export type AuthResponse = ApiResponse<AuthData>;
export type AuthProvider = "phone" | "google" | "telegram";

// IsRegistration
export interface RegistrationProfile {
  name?: string;
  phone?: string;
  image?: string;
  email?: string;
}

export type AuthFlowData =
  | {
      isNewUser: false;
      session: AuthSession;
    }
  | {
      isNewUser: true;
      provider: AuthProvider;
      registrationToken: string;
      profile: RegistrationProfile;
    };

export type AuthFlowResponse = ApiResponse<AuthFlowData>;

export interface PendingRegistration {
  provider: AuthProvider;
  registrationToken: string;
  profile: RegistrationProfile;
}

export interface CompleteRegistrationPayload {
  registrationToken: string;
  name: string;
  phone: string;
  birthDate: string;
  addresses: Array<{
    city: string;
    region: string;
    district: string;
    street: string;
    isDefault: boolean;
  }>;
}
