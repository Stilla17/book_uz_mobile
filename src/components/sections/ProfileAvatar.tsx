import { cardShadow } from "@/app/(tabs)/profile";
import { useAuthStore } from "@/store/useAuthStore";
import { Image, ImageBackground } from "expo-image";
import { requireOptionalNativeModule } from "expo";
import { Camera } from "lucide-react-native";
import { useState } from "react";
import { Alert, Platform, Pressable, View } from "react-native";

export function ProfileAvatar() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const [isPicking, setIsPicking] = useState(false);

  const pickImage = async () => {
    if (isPicking) return;
    if (
      Platform.OS !== "web" &&
      !requireOptionalNativeModule("ExponentImagePicker")
    ) {
      Alert.alert(
        "Rasm tanlash mavjud emas",
        "Hozirgi ilovada rasm tanlash moduli mavjud emas. SDK 57 ga mos Expo Go yoki yangi development build orqali oching.",
      );
      return;
    }

    setIsPicking(true);
    try {
      const ImagePicker = await import("expo-image-picker");
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const image = result.assets[0];
      if (image?.uri) {
        updateUser({ avatar: image.uri, image: image.uri });
      }
    } catch {
      Alert.alert("Xato", "Rasmni tanlab bo'lmadi. Qayta urinib ko'ring.");
    } finally {
      setIsPicking(false);
    }
  };

  return (
    <View
      className="mt-5 rounded-[28px] border border-[#F3E5D8] bg-white"
      style={cardShadow}
    >
      <ImageBackground
        source={
          user?.image || user?.avatar
            ? { uri: user.image || user.avatar }
            : require("@/assets/images/Avatar.png")
        }
        resizeMode="cover"
        imageStyle={{ borderRadius: 28 }}
        style={{
          height: 180,
          borderRadius: 28,
          overflow: "hidden",
        }}
      >
        {/* Avatar */}
        <View className="absolute bottom-3 left-3 h-30 w-30 items-center justify-center">
          <View className="h-full w-full rounded-full border-[3px] border-[#FFE2C7] bg-[#FFF2E6] p-1">
            <Image
              source={user?.avatar || require("@/assets/images/Avatar.png")}
              contentFit="cover"
              style={{ width: "100%", height: "100%", borderRadius: 999 }}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profil rasmini o‘zgartirish"
            hitSlop={8}
            onPress={pickImage}
            disabled={isPicking}
            className="absolute bottom-0 right-0 h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-[#FF7900]"
          >
            <Camera color="white" size={16} strokeWidth={2.2} />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
