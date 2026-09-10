import { FormFieldProps } from "@/types/props.types";
import { Text, TextInput, View } from "react-native";

export default function FormField({ icon, label, ...props }: FormFieldProps) {
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
