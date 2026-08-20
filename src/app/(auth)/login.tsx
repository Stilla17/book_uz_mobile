import Container from "@/components/Container";
import Button from "@/components/other/Button";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ArrowRight, ChevronRight, Phone } from "lucide-react-native";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLogin() {
  const [phone, setPhone] = useState("");

  return (
    <ImageBackground
      source={require("../../../assets/back.png")}
      resizeMode="stretch"
      className="flex-1 h-full w-full"
    >
      <View className="mt-6">
        <Container>
          <View className="relative shrink-0 overflow-hidden px-6 pb-7 ">
            <Link href="/(tabs)/home" asChild>
              <Pressable className="flex-row items-center justify-end gap-2">
                <Text className="text-[#1685E5] font-bold">
                  O'tkazib yuborish
                </Text>
                <ChevronRight size={20} color={"#1685E5"} />
              </Pressable>
            </Link>
          </View>
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
          </View>

          {/* Input tel raqam */}
          <View className="min-h-[58px] flex-row items-center rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white px-4">
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
          <Button title="Kirish" />

          <View className="mt-8 flex-row items-center gap-4">
            <View className="h-px flex-1 bg-[#B78A5E]" />
            <Text className="text-base text-[#8A6038]">Yoki</Text>
            <View className="h-px flex-1 bg-[#B78A5E]" />
          </View>

          <View className="mt-7 flex-row items-center justify-center gap-3">
            <Link href="/register" asChild>
              <Pressable className="flex-row items-center gap-2 active:opacity-70">
                <Text className="text-base font-extrabold text-[#1685E5]">
                  Ro‘yxatdan o‘tish
                </Text>
                <ArrowRight color="#1685E5" size={18} strokeWidth={2.3} />
              </Pressable>
            </Link>
          </View>
        </Container>
      </View>
    </ImageBackground>
  );
}
