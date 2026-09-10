import { authService } from "@/services/auth.service";
import { ApiErrorResponse } from "@/types/auth.types";
import { handleAuthResult } from "@/utils/handleAuthResult";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from "react-native";
import {
  GoogleOneTapSignIn,
  useGoogleSignInFromButton,
} from "react-native-nitro-google-signin";

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

if (!webClientId) {
  throw new Error(
    "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not defined in the environment variables.",
  );
}

GoogleOneTapSignIn.configure({
  webClientId,
  //   autoSelectOnSignIn: false,
});

export const useGoogleAuth = () => {
  const googleLogin = useMutation({
    mutationFn: authService.googleLogin,
    onSuccess: async (result) => {
      await handleAuthResult(result);
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError<ApiErrorResponse>(error)
        ? (error.response?.data?.message ?? error.message)
        : error instanceof Error
          ? error.message
          : "Google orqali kirishda xatolik yuz berdi";

      Alert.alert("Xato", message);
    },
  });
  const googleSignIn = useGoogleSignInFromButton({
    behavior: "credentialManager",

    onSuccess: ({ idToken }) => {
      googleLogin.mutate(idToken);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof Error
          ? error.message
          : "Google oynasini ochib bo'lmadi";

      Alert.alert("Xato", message);
    },
  });
  const signIn = () => {
    void googleSignIn.onPress().catch(() => undefined);
  };
  return {
    signIn,
    isPending: googleSignIn.loading || googleLogin.isPending,
  };
};
