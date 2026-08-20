import { BtnProps } from "@/types/props.types";
import { ArrowRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Button({ title }: BtnProps) {
  return (
    <Pressable
      accessibilityRole="button"
      className="relative mt-7 py-4 items-center justify-center rounded-xl border border-[#FF9D35] bg-[#FF7900] shadow-xl active:scale-[0.99] active:opacity-90"
      style={{
        boxShadow:
          "inset 0 -2px 2px rgba(56, 35, 25, 0.45), inset 0 30px 40px rgba(255,255,255,0.35), 0 4px 5px rgba(0,0,0,0.35)",
      }}
    >
      <Text className="text-[20px] text-white">{title}</Text>
      <View className="absolute right-7">
        <ArrowRight color="#FFFFFF" size={28} strokeWidth={2.2} />
      </View>
    </Pressable>
  );
}
