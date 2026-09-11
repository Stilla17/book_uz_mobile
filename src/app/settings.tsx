import Container from "@/components/Container";
import { useAuthStore } from "@/store/useAuthStore";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ArrowLeft,
  CalendarDays,
  Camera,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, StatusBar, Text, View, type ViewStyle } from "react-native";

const ORANGE = "#FF7900";
const TEXT = "#302A26";
const MUTED = "#8D8179";

const cardShadow: ViewStyle = {
  shadowColor: "#8A4B13",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.07,
  shadowRadius: 14,
  elevation: 3,
};

type InfoFieldProps = {
  icon: ReactNode;
  label: string;
  value: string;
  withChevron?: boolean;
};

function InfoField({ icon, label, value, withChevron }: InfoFieldProps) {
  return (
    <View className="flex-row items-center rounded-2xl border border-[#F1E7DD] bg-[#FFFCF8] px-3.5 py-3">
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E2]">
        {icon}
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-[10px] font-medium" style={{ color: MUTED }}>
          {label}
        </Text>
        <Text
          numberOfLines={1}
          className="mt-0.5 text-[14px] font-semibold"
          style={{ color: TEXT }}
        >
          {value}
        </Text>
      </View>

      {withChevron ? (
        <ChevronDown color="#B8AAA0" size={18} strokeWidth={1.8} />
      ) : null}
    </View>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Text
      className="mb-2.5 ml-1 text-[15px] font-extrabold"
      style={{ color: TEXT }}
    >
      {children}
    </Text>
  );
}

export default function Settings() {
  const user = useAuthStore((state) => state.user);
  const address =
    user?.addresses?.find((item) => item.isDefault) ?? user?.addresses?.[0];
  const formattedBirthDate = user?.birthDate
    ? new Date(user.birthDate).toLocaleDateString("ru-RU")
    : "Tug'ilgan sana tanlanmagan";

  return (
    <View className="flex-1 bg-[#FFF9F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />

      <Container className="pt-1 pb-0">
        <View className="flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Orqaga"
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-2xl border border-[#F1E5D9] bg-white active:opacity-70"
            style={cardShadow}
          >
            <ArrowLeft color={TEXT} size={21} strokeWidth={2} />
          </Pressable>

          <View className="items-center">
            <Text
              className="text-[18px] font-extrabold"
              style={{ color: TEXT }}
            >
              Shaxsiy ma&apos;lumotlar
            </Text>
            <Text className="mt-0.5 text-[10px]" style={{ color: MUTED }}>
              Profilingizni boshqaring
            </Text>
          </View>

          <View className="h-11 w-11" />
        </View>

        <View
          className="mt-5 items-center rounded-[28px] border border-[#F3E5D8] bg-white px-4 py-5"
          style={cardShadow}
        >
          <View className="relative">
            <View className="h-[104px] w-[104px] rounded-full border-[3px] border-[#FFE2C7] bg-[#FFF2E6] p-1">
              <Image
                source={user?.avatar || require("@/assets/images/Avatar.png")}
                contentFit="cover"
                style={{ width: "100%", height: "100%", borderRadius: 999 }}
              />
            </View>

            <View className="absolute -bottom-1 -right-1 h-9 w-9 items-center justify-center rounded-full border-[3px] border-white bg-[#FF7900]">
              <Camera color="white" size={16} strokeWidth={2.2} />
            </View>
          </View>

          <Text
            className="mt-3 text-[17px] font-extrabold"
            style={{ color: TEXT }}
          >
            {user?.name || "Foydalanuvchi"}
          </Text>
          <Text className="mt-1 text-[11px]" style={{ color: MUTED }}>
            JPG yoki PNG, maksimal 5 MB
          </Text>

          <Pressable className="mt-3 rounded-xl bg-[#FFF0E2] px-5 py-2.5 active:opacity-70">
            <Text className="text-[12px] font-bold" style={{ color: ORANGE }}>
              Rasmni almashtirish
            </Text>
          </Pressable>
        </View>

        <View className="mt-5">
          <SectionTitle>Shaxsiy ma&apos;lumotlar</SectionTitle>
          <View
            className="gap-2.5 rounded-[24px] border border-[#F3E5D8] bg-white p-3"
            style={cardShadow}
          >
            <InfoField
              icon={<UserRound color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Ism va familiya"
              value={user?.name || "Ism familiya kiritilmagan"}
            />
            <InfoField
              icon={<Phone color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Telefon raqami"
              value={user?.phone || "+998 00 000 00 00"}
            />
            <InfoField
              icon={<Mail color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Elektron pochta"
              value={user?.email || "Elektron pochta kiritilmagan"}
            />
          </View>
        </View>

        <View className="mt-5">
          <SectionTitle>Tug&apos;ilgan sana</SectionTitle>
          <View
            className="rounded-[24px] border border-[#F3E5D8] bg-white p-3"
            style={cardShadow}
          >
            <InfoField
              icon={<CalendarDays color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Sana"
              value={formattedBirthDate}
              withChevron
            />
          </View>
        </View>

        <View className="mt-5">
          <View className="mb-2.5 flex-row items-center justify-between px-1">
            <Text
              className="text-[15px] font-extrabold"
              style={{ color: TEXT }}
            >
              Manzil
            </Text>
          </View>

          <View
            className="rounded-[24px] border border-[#F3E5D8] bg-white p-3"
            style={cardShadow}
          >
            <View className="mb-3 flex-row items-center rounded-2xl bg-[#FFF7EF] p-3">
              <View className="h-11 w-11 items-center justify-center rounded-2xl bg-[#FFE6CE]">
                <MapPin color={ORANGE} size={21} strokeWidth={2} />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[13px] font-bold" style={{ color: TEXT }}>
                  Yetkazib berish manzili
                </Text>
                <Text className="mt-0.5 text-[10px]" style={{ color: MUTED }}>
                  Buyurtmalaringiz shu manzilga yetkaziladi
                </Text>
              </View>
            </View>

            <View className="gap-2.5">
              <InfoField
                icon={<MapPin color={ORANGE} size={18} strokeWidth={1.8} />}
                label="Viloyat"
                value={address?.region || "Viloyat tanlanmagan"}
                withChevron
              />
              <InfoField
                icon={<MapPin color={ORANGE} size={18} strokeWidth={1.8} />}
                label="Tuman"
                value={address?.district || "Tuman tanlanmagan"}
                withChevron
              />
              <InfoField
                icon={<MapPin color={ORANGE} size={18} strokeWidth={1.8} />}
                label="Shahar"
                value={
                  [address?.city].filter(Boolean).join(", ") ||
                  "Manzil kiritilmagan"
                }
              />
            </View>
          </View>
        </View>

        <Pressable className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#FF7900] active:opacity-80">
          <Text className="text-[14px] font-extrabold text-white">
            O&apos;zgarishlarni saqlash
          </Text>
        </Pressable>
      </Container>
    </View>
  );
}
