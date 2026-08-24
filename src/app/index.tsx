import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/auth"} />;
  // return <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/login"} />;
}
