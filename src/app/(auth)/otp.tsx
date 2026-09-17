import { showAlert } from "@/store/useAlertStore";
import Container from "@/components/Container";
import Button from "@/components/other/Button";
import { useResend } from "@/hooks/mutations/useResend";
import { useCheckOtp } from "@/hooks/mutations/useVerifyOtp";
import { authService } from "@/services/auth.service";
import { OtpFormValues } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, MessageSquareText } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { ImageBackground, Pressable, Text, TextInput, View } from "react-native";

const OTP_LENGTH = 4;

export default function OtpScreen() {
  const verifyOtp = useCheckOtp();
  const { phone: phoneParam } = useLocalSearchParams<{
    phone?: string | string[];
  }>();
  const phone = Array.isArray(phoneParam) ? phoneParam[0] : phoneParam;
  const { control, handleSubmit } = useForm<OtpFormValues>({
    defaultValues: {
      code: Array.from({ length: OTP_LENGTH }, () => ""),
    },
  });

  const resendOtp = useResend();

  const handleVerify = ({ code }: OtpFormValues) => {
    const otpCode = code.join("");

    if (!phone) {
      showAlert("Xato", "Telefon raqami topilmadi. Qaytadan urinib ko'ring");
      return;
    }

    if (otpCode.length !== OTP_LENGTH) {
      showAlert("Xato", "4 xonali kodni kiriting");
      return;
    }

    verifyOtp.mutate({
      phone,
      otp: otpCode,
    });
  };

  const handleResend = () => {
    if (!phone) {
      showAlert("Xato", "Telefon raqami topilmadi. Qaytadan urinib ko'ring");
      return;
    }

    resendOtp.mutate({ phone });
  };

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
            className="h-10.5 w-10.5 items-center justify-center rounded-[14px] border border-[#FFFFFF26] bg-[#F88000] active:opacity-70"
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

          <View className="mt-5 h-18 w-18 items-center justify-center rounded-3xl border border-[#FFD2A8] bg-[#FFF3E6]">
            <MessageSquareText color="#F57A00" size={34} strokeWidth={1.8} />
          </View>

          <Text className="mt-6 text-center text-[26px] font-extrabold text-[#382319]">
            Tasdiqlash kodi
          </Text>

          <Text className="mt-3 max-w-77.5 text-center text-[15px] leading-6 text-[#806B60]">
            Telefon raqamingizga yuborilgan 4 xonali tasdiqlash kodini kiriting
          </Text>

          <View className="mt-8 w-full flex-row justify-between gap-2">
            <Controller
              control={control}
              name="code"
              rules={{
                validate: (value) =>
                  (value.length === OTP_LENGTH &&
                    value.every((digit) => /^\d$/.test(digit))) ||
                  "4 xonali kodni kiriting",
              }}
              render={({ field: { value, onChange } }) => (
                <View className="flex-row items-center justify-center w-full gap-8">
                  {Array.from({ length: OTP_LENGTH }, (_, index) => (
                    <TextInput
                      key={index}
                      value={value[index] ?? ""}
                      accessibilityLabel={`${index + 1}-kod raqami`}
                      autoComplete={index === 0 ? "one-time-code" : "off"}
                      inputMode="numeric"
                      keyboardType="number-pad"
                      textContentType="oneTimeCode"
                      maxLength={1}
                      selectTextOnFocus
                      className="h-14.5 flex-1 rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white text-[23px] font-bold text-[#382319]"
                      style={{ textAlign: "center" }}
                      onChangeText={(text) => {
                        const codeArray = [...value];
                        codeArray[index] = text.replace(/\D/g, "");
                        onChange(codeArray);
                      }}
                    />
                  ))}
                </View>
              )}
            />
          </View>

          <View className="mt-7 flex-row items-center justify-center">
            <Text className="text-[14px] text-[#806B60]">Kod kelmadimi? </Text>
            <Pressable
              accessibilityRole="button"
              disabled={resendOtp.isPending}
              onPress={handleResend}
            >
              <Text className="text-[14px] font-extrabold text-[#F57A00]">
                {resendOtp.isPending ? "Yuborilmoqda..." : "Qayta yuborish"}
              </Text>
            </Pressable>
          </View>

          <View className="w-full">
            <Button
              title={verifyOtp.isPending ? "Tekshirilmoqda..." : "Tasdiqlash"}
              isActive
              onPress={handleSubmit(handleVerify)}
            />
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
