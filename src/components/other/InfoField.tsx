import { MUTED, ORANGE, TEXT } from "@/app/(tabs)/profile";
import { InfoFieldProps, Props } from "@/types/settings";
import { Pencil } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";

export function InfoField({ icon, label, value, onEdit }: Props) {
  return (
    <View className="flex-row items-center rounded-2xl border border-[#F1E7DD] bg-[#FFFCF8] px-3.5 py-3">
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E2]">
        {icon}
      </View>

      <View className="ml-3 flex-1">
        <Text className="text-[10px] font-medium" style={{ color: MUTED }}>
          {label}
        </Text>
        <Text
          numberOfLines={1}
          className="mt-0.5 text-[14px] font-semibold"
          style={{ color: TEXT }}
        >
          {value}
        </Text>
      </View>
      {/* onPress={() => setEditVisible(true)} */}
      <Pressable onPress={onEdit}>
        <Pencil size={14} color={ORANGE} />
      </Pressable>
    </View>
  );
}
