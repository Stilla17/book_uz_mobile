import Container from "@/components/Container";
import Button from "@/components/other/Button";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { ArrowLeft, MessageSquareText } from "lucide-react-native";
import {
    ImageBackground,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

const OTP_LENGTH = 4;

export default function OtpScreen() {
  return (
    <ImageBackground
      source={require("../../../assets/back.png")}
      resizeMode="stretch"
      className="h-full w-full flex-1"
    >
      <Container
        centered
        fixedHeader={
          <Pressable
            accessibilityLabel="Orqaga qaytish"
            accessibilityRole="button"
            onPress={() => router.back()}
            hitSlop={10}
            className="h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-[#FFFFFF26] bg-[#F88000] active:opacity-70"
          >
            <ArrowLeft color="white" size={22} />
          </Pressable>
        }
      >
        <View className="items-center">
          <Image
            source={require("../../../assets/logo_book_uz.png")}
            contentFit="contain"
            style={{ width: 190, height: 115 }}
          />

          <View className="mt-5 h-[72px] w-[72px] items-center justify-center rounded-[24px] border border-[#FFD2A8] bg-[#FFF3E6]">
            <MessageSquareText color="#F57A00" size={34} strokeWidth={1.8} />
          </View>

          <Text className="mt-6 text-center text-[26px] font-extrabold text-[#382319]">
            Tasdiqlash kodi
          </Text>

          <Text className="mt-3 max-w-[310px] text-center text-[15px] leading-6 text-[#806B60]">
            Telefon raqamingizga yuborilgan 4 xonali tasdiqlash kodini kiriting
          </Text>

          <View className="mt-8 w-full flex-row justify-between gap-2">
            {Array.from({ length: OTP_LENGTH }, (_, index) => (
              <TextInput
                key={index}
                accessibilityLabel={`${index + 1}-kod raqami`}
                autoComplete={index === 0 ? "one-time-code" : "off"}
                inputMode="numeric"
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                className="h-[58px] flex-1 rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white text-[23px] font-bold text-[#382319]"
                style={{ textAlign: "center" }}
              />
            ))}
          </View>

          <View className="mt-7 flex-row items-center justify-center">
            <Text className="text-[14px] text-[#806B60]">Kod kelmadimi? </Text>
            <Text className="text-[14px] font-extrabold text-[#F57A00]">
              <Link href={"/(auth)/otp"}>Qayta yuborish</Link>
            </Text>
          </View>

          <View className="w-full">
            <Button title="Tasdiqlash" isActive />
          </View>

          <View className="mt-6 rounded-2xl bg-[#FFFFFF8C] px-5 py-3">
            <Text className="text-center text-[13px] leading-5 text-[#8A7569]">
              Xavfsizligingiz uchun tasdiqlash kodini hech kimga bermang
            </Text>
          </View>
        </View>
      </Container>
    </ImageBackground>
  );
}
