import Container from "@/components/Container";
import Button from "@/components/other/Button";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowLeft, Phone } from "lucide-react-native";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AuthLogin() {
  const [phone, setPhone] = useState("");

  return (
    <ImageBackground
      source={require("../../../assets/back.png")}
      resizeMode="stretch"
      className="flex-1 h-full w-full"
    >
      <Container
        centered
        fixedHeader={
          <Pressable
            accessibilityLabel="Orqaga qaytish"
            accessibilityRole="button"
            hitSlop={10}
            onPress={() => router.back()}
            className="h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-[rgba(255,255,255,0.15)] bg-[#f88000] active:opacity-70"
          >
            <ArrowLeft color="white" size={22} />
          </Pressable>
        }
      >
        {/* logo */}
        <View className="items-center">
          <Image
            source={require("./../../../assets/logo_book_uz.png")}
            contentFit="contain"
            style={{ width: 250, height: 160 }}
          />
          <Text className="text-[#754515] font-bold mt-2 mb-4">
            Kitob — eng yaxshi sovg'a
          </Text>
          {/* Input tel raqam */}
          <View className="min-h-14.5 mt-6 flex-row items-center rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white px-4">
            <Phone color="#A05A27" size={20} strokeWidth={1.9} />
            <View className="ml-[11px] border-r border-[#E8DDD4] pr-3">
              <Text className="text-[15px] font-bold text-[#382319]">+998</Text>
            </View>
            <TextInput
              autoComplete="tel"
              keyboardType="phone-pad"
              maxLength={9}
              onChangeText={setPhone}
              placeholder="90 123 45 67"
              placeholderTextColor="#A99B90"
              className="flex-1 px-3 py-[15px] text-base text-[#382319]"
              value={phone}
            />
          </View>
          <Button title="Kirish" isActive={false} href={"/(auth)/otp"}>
            {""}
          </Button>
        </View>
      </Container>
    </ImageBackground>
  );
}
