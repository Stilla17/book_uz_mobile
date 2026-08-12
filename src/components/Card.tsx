import { CardProps } from "@/types/props.types";
import { Image } from "expo-image";
import { BookOpen, Eye, Headphones, Heart, Star } from "lucide-react-native";
import { Text, View } from "react-native";

export default function Card({
  coverSource,
  discount = "-20%",
  title = "Joyland",
  author = "Stiven King",
  rating = "4.8",
  reviews = "120",
}: CardProps) {
  return (
    <View className="w-full p-4 bg-white rounded-[24px]">
      <View className="flex-row gap-4 relative ">
        <View className="w-full overflow-hidden bg-slate-100">
          {coverSource ? (
            <View
              className="overflow-hidden bg-slate-100"
              style={{ width: "100%", aspectRatio: "0.65" }}
            >
              <Image
                source={coverSource}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
          ) : (
            <View className="flex-1 w-full items-center justify-center bg-slate-100 px-4">
              <BookOpen color="#94A3B8" size={38} strokeWidth={1.6} />
              <Text className="mt-2 text-center text-xs text-slate-400">
                Muqova rasmi
              </Text>
            </View>
          )}
        </View>

        <View className="self-start rounded-xl bg-[#FF5C63] outline-2 outline-red-600 px-2.5 py-1 absolute">
          <Text className="text-[12px] font-semibold text-white">
            {discount}
          </Text>
        </View>

        <View
          className="absolute right-0 top-0 h-8 w-8 items-center justify-center rounded-full bg-white"
          style={{
            shadowColor: "#64748B",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Heart color="#FF454D" size={18} strokeWidth={2} />
        </View>
      </View>

      {/* <View className="mt-4 mb-2 h-px bg-slate-200" /> */}
      <View className="flex-1 ">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-[16px] font-bold leading-7 text-slate-950 leading-7"
        >
          {title}
        </Text>
        <Text className=" text-[12px] font-medium text-slate-500">
          {author}
        </Text>

        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Star color="#FFB000" fill="#FFB000" size={12} strokeWidth={2} />
            <Text className="ml-2 text-[12px] font-semibold text-slate-900">
              {rating}
            </Text>
          </View>
          <View className="flex-row items-center ">
            <Eye size={14} color={"#94A3B8"} />
            <Text className="ml-1 text-sm text-slate-500">{reviews}</Text>
          </View>
        </View>
      </View>

      <View className="mt-2 flex-row">
        <View className="h-8 w-8 flex-1 flex-row items-center justify-center ">
          <Headphones color="#5B21E8" size={16} strokeWidth={2.2} />
        </View>

        <View className="h-8 w-8 flex-[1.15] flex-row items-center justify-center border-l border-[#94A3B8] ">
          <BookOpen color="#15945B" size={16} strokeWidth={2.2} />
        </View>
      </View>
    </View>
  );
}
