import Container from "@/components/Container";
import Button from "@/components/other/Button";
import { Image } from "expo-image";
import { ImageBackground, StatusBar } from "react-native";
import { Link } from "expo-router";
import { ArrowRight, MessageSquareText } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Auth() {
  return (
    <ImageBackground
      source={require("../../../assets/back.png")}
      resizeMode="stretch"
      style={{ flex: 1, width: "100%", height: "100%" }}
    >
      <StatusBar barStyle={"dark-content"} />
      <Container centered className="mt-6">
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

        <Button title="Telefon raqam" isActive={false} href={"/(auth)/login"}>
          <MessageSquareText color={"white"} size={20} />
        </Button>
        <Button title="Google" isActive={false} href={"/(auth)/auth"}>
          <Image
            source={require("./../../../assets/logo_google.png")}
            style={{ width: 20, height: 20 }}
          />
        </Button>
        <Button title="Telegram" isActive={false} href={"/(auth)/auth"}>
          <Image
            source={require("./../../../assets/logo_tg.webp")}
            style={{ width: 20, height: 20 }}
          />
        </Button>

        <View className="mt-8 flex-row items-center gap-4">
          <View className="h-px flex-1 bg-[#B78A5E]" />
          <Text className="text-base text-[#8A6038]">Yoki</Text>
          <View className="h-px flex-1 bg-[#B78A5E]" />
        </View>

        <View className=" mt-7 flex-row items-center justify-center gap-3 ">
          <Link href="/(tabs)/home" asChild>
            <Pressable className="flex-row items-center justify-end gap-2">
              <Text className="text-[#1685E5] font-bold">
                O'tkazib yuborish
              </Text>
              <ArrowRight color="#1685E5" size={18} strokeWidth={2.3} />
            </Pressable>
          </Link>
        </View>
      </Container>
    </ImageBackground>
  );
}
