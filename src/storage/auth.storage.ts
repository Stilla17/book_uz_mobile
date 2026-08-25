import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authStorage = {
  // Tokenni saqlash
  saveTokens: async (accessToken: string, refreshToken?: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);

    if (refreshToken) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    }
  },
  // Tokenni olib kelmoqdamiz
  getAccessToken: async () => {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },
  // Refresh token olib kelindi
  getRefreshToken: async () => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },
  // Tokenlarni tozalash
  removeTokens: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },
};
