import { ContainerProps } from "@/types/props.types";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
export default function Container({
  children,
  className,
  fixedHeader,
  ...props
}: ContainerProps) {
  return (
    <SafeAreaView className="flex-1">
      {fixedHeader ? <View className="w-full px-4">{fixedHeader}</View> : null}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className={`${className} w-full px-4`} {...props}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
