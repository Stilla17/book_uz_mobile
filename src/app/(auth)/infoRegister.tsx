import Container from "@/components/Container";
import Button from "@/components/other/Button";
import { Link, router } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react-native";
import { ReactNode, useState } from "react";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type FormFieldProps = TextInputProps & {
  icon: ReactNode;
  label: string;
};

function FormField({ icon, label, ...props }: FormFieldProps) {
  return (
    <View className="mb-[17px] flex-1">
      <Text className="mb-2 text-[13px] font-bold text-[#554137]">{label}</Text>
      <View className="min-h-14 flex-row items-center rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white px-[15px]">
        {icon}
        <TextInput
          placeholderTextColor="#A99B90"
          className="flex-1 px-[11px] py-3.5 text-[15px] text-[#382319]"
          {...props}
        />
      </View>
    </View>
  );
}

export default function AuthRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");

  return (
    <ImageBackground
      source={require("../../../assets/back.png")}
      resizeMode="stretch"
      className="flex-1 h-full w-full"
    >
      <Container>
        <View className="mt-6 ">
          <View className="relative  shrink-0 overflow-hidden px-6 pb-7 ">
            <Pressable
              accessibilityLabel="Orqaga qaytish"
              accessibilityRole="button"
              hitSlop={10}
              onPress={() => router.back()}
              className="h-[42px] w-[42px] items-center justify-center rounded-[14px] border border-[rgba(255,255,255,0.15)] bg-[#f88000] active:opacity-70"
            >
              <ArrowLeft color="white" size={22} />
            </Pressable>
          </View>

          <FormField
            autoCapitalize="words"
            autoComplete="name"
            icon={<UserRound color="#A05A27" size={20} />}
            label="Ism va familiya"
            onChangeText={setName}
            placeholder="Masalan, Aziz Karimov"
            value={name}
          />

          <View className="mb-[17px]">
            <Text className="mb-2 text-[13px] font-bold text-[#554137]">
              Telefon raqam
            </Text>
            <View className="min-h-14 flex-row items-center rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white px-[15px]">
              <Phone color="#A05A27" size={20} />
              <View className="ml-2.5 border-r border-[#E8DDD4] pr-[11px]">
                <Text className="text-sm font-bold text-[#382319]">+998</Text>
              </View>
              <TextInput
                autoComplete="tel"
                keyboardType="phone-pad"
                maxLength={9}
                onChangeText={setPhone}
                placeholder="90 123 45 67"
                placeholderTextColor="#A99B90"
                className="flex-1 px-[11px] py-3.5 text-[15px] text-[#382319]"
                value={phone}
              />
            </View>
          </View>

          <FormField
            icon={<CalendarDays color="#A05A27" size={20} />}
            keyboardType="numbers-and-punctuation"
            label="Tug‘ilgan sana"
            maxLength={10}
            onChangeText={setBirthdate}
            placeholder="KK.OO.YYYY"
            value={birthdate}
          />

          <View className="flex-row gap-3">
            <FormField
              autoCapitalize="words"
              icon={<MapPin color="#A05A27" size={20} />}
              label="Viloyat"
              onChangeText={setRegion}
              placeholder="Toshkent"
              value={region}
            />
            <FormField
              autoCapitalize="words"
              icon={<Building2 color="#A05A27" size={20} />}
              label="Tuman"
              onChangeText={setDistrict}
              placeholder="Chilonzor"
              value={district}
            />
          </View>

          <Button title="Ro'yxatdan o'tish" />

          <View className="mt-7 flex-row items-center justify-center gap-3">
            <Link href="/login" asChild>
              <Pressable className="flex-row items-center gap-2 active:opacity-70">
                <Text className="text-base font-extrabold text-[#1685E5]">
                  Kirish
                </Text>
                <ArrowRight color="#1685E5" size={18} strokeWidth={2.3} />
              </Pressable>
            </Link>
          </View>
        </View>
      </Container>
    </ImageBackground>
  );
}
