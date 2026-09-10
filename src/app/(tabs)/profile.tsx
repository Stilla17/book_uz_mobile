import Container from "@/components/Container";
import AlertModal from "@/components/other/AlertModal";
import MenuRow from "@/components/other/MenuRow";
import { profileMenu, stats } from "@/data/profileData";
import { useLogout } from "@/hooks/mutations/useLogout";
import { useAuthStore } from "@/store/useAuthStore";
import { Image } from "expo-image";
import {
  ChevronRight,
  Headset,
  Info,
  LogOut,
  ShoppingBag,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, StatusBar, Text, View, type ViewStyle } from "react-native";

const ORANGE = "#FF7900";
const TEXT = "#302A26";
const MUTED = "#867A72";

const cardShadow: ViewStyle = {
  shadowColor: "#8A4B13",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.08,
  shadowRadius: 14,
  elevation: 3,
};

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const [hide, setHide] = useState(false);

  const handleLogout = () => {
    setHide(!hide);
  };

  return (
    <View className="flex-1 bg-[#FFF9F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />

      <Container className="pt-1">
        <View className="flex-row items-start justify-between">
          <View>
            <Text
              className="text-[25px] font-extrabold"
              style={{ color: TEXT }}
            >
              Sahifam
            </Text>
            <Text className="mt-1 text-[12px]" style={{ color: MUTED }}>
              Kitoblar olamiga xush kelibsiz!
            </Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          className="mt-4 flex-row items-center rounded-3xl border border-[#F5E9DC] bg-white px-4 py-4 active:opacity-80"
          style={cardShadow}
        >
          <Image
            source={require("@/assets/images/Avatar.png")}
            contentFit="cover"
            style={{
              width: 75,
              height: 75,
              borderRadius: 35,
            }}
          />

          <View className="ml-4 flex-1">
            <Text className="text-[16px] font-bold" style={{ color: TEXT }}>
              {user?.name || "Foydalanuvchi"}
            </Text>
            <Text className="mt-1 text-[12px]" style={{ color: MUTED }}>
              {user?.phone || "Telefon raqami kiritilmagan"}
            </Text>
          </View>

          <ChevronRight color="#A79D96" size={20} />
        </Pressable>

        <View className="mt-3 flex-row gap-2">
          {stats.map(({ title, value, icon: Icon }) => (
            <View
              key={title}
              className="min-w-0 flex-1 rounded-2xl border border-[#F5E9DC] bg-white py-4"
              style={cardShadow}
            >
              <Pressable
                accessibilityRole="button"
                className="w-full items-center active:opacity-60"
              >
                <Icon color={ORANGE} size={22} strokeWidth={1.8} />

                <Text
                  className="mt-2 text-[14px] font-bold"
                  style={{ color: TEXT }}
                >
                  {value}
                </Text>

                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                  className="mt-1 w-full px-1 text-center text-[9px]"
                  style={{ color: MUTED }}
                >
                  {title}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        <View
          className="mt-3 overflow-hidden rounded-3xl border border-[#F5E9DC] bg-white py-1"
          style={cardShadow}
        >
          {profileMenu.map((item, index) => (
            <View key={item.title}>
              <MenuRow item={item} />
              {index < profileMenu.length - 1 ? (
                <View className="ml-12 h-px bg-[#F3EDE7]" />
              ) : null}
            </View>
          ))}
        </View>

        <View
          className="mt-3 overflow-hidden rounded-3xl border border-[#F5E9DC] bg-white py-1"
          style={cardShadow}
        >
          <MenuRow
            item={{ title: "Yordam va qo‘llab-quvvatlash", icon: Headset }}
          />
          <View className="ml-12 h-px bg-[#F3EDE7]" />
          <MenuRow item={{ title: "Ilova haqida", icon: Info }} />
          <View className="ml-12 h-px bg-[#F3EDE7]" />

          <AlertModal
            visible={hide}
            title="Ilovadan chiqish"
            description="Haqiqatan ham profilingizdan chiqmoqchimisiz?"
            onClose={setHide}
            onConfirm={() => logout.mutate()}
          />

          <MenuRow
            danger
            item={{
              title: "Chiqish",
              icon: LogOut,
            }}
            onPress={handleLogout}
          />
        </View>

        <View className="mt-4 flex-row items-center justify-center">
          <ShoppingBag color="#C8B7A9" size={14} />
          <Text className="ml-1 text-[10px] text-[#B09F92]">
            Book.uz mobil ilovasi
          </Text>
        </View>
      </Container>
    </View>
  );
}
