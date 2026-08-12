import { TitleProps } from "@/types/props.types";
import { type Href, Link } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function CustomTitle({ title, path }: TitleProps) {
  return (
    <View className="mt-8 flex-row items-center justify-between">
      <Text className="text-xl text-blue-600 font-bold">{title}</Text>
      <Link href={path} asChild>
        <Pressable className="h-12 bg-[#f28c25b4] border-[#F28A25] border-1 px-4 items-center justify-center rounded-full flex-row gap-2">
          <Text className="font-semibold text-white">Barchasini ko'rish</Text>
          <ArrowRight color={"white"} size={16} />
        </Pressable>
      </Link>
    </View>
  );
}
