import { Text, View } from "react-native";
import { Bell } from "lucide-react-native";
import { Image } from "expo-image";

export default function Navbar() {
  return (
    <View className="flex-row items-center justify-between pb-4">
      <View></View>
      <View className="rounded-2xl">
        <Image
          source={require("../../../assets/images/Logo_white.png")}
          style={{
            width: "100%",
            height: 30,
          }}
          contentFit="contain"
        />
        <Text className="text-[12px] font-semibold text-center text-white">
          Kitob - eng yaxshi sovg'a!
        </Text>
      </View>
      <View className=" relative bg-[##F5B166] w-12 h-12 flex items-center justify-center rounded-[50%]">
        <Text className="w-[12px] h-[12px] bg-red-600 rounded-full absolute top-1 right-2 z-10"></Text>
        <Bell color="white" size={24} fill="white" />
      </View>
    </View>
  );
}
