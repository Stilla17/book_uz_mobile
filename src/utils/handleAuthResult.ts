import { authStorage } from "@/storage/auth.storage";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthFlowData } from "@/types/auth.types";
import { router } from "expo-router";

export async function handleAuthResult(result: AuthFlowData) {
  const store = useAuthStore.getState();

  if (result.isNewUser) {
    store.setPendingRegistration({
      provider: result.provider,
      registrationToken: result.registrationToken,
      profile: result.profile,
    });

    router.replace("/(auth)/infoRegister");
    return;
  }

  await authStorage.saveTokens(
    result.session.accessToken,
    result.session.refreshToken,
  );

  store.setUser(result.session.user);
  store.setPendingRegistration(null);
  router.replace("/(tabs)/home");
}
