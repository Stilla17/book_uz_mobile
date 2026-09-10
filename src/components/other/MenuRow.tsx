import { MenuItem } from "@/types/props.types";
import { ChevronRight } from "lucide-react-native";
import { Pressable, Text } from "react-native";

export default function MenuRow({
  item,
  danger = false,
  onPress,
}: {
  item: MenuItem;
  danger?: boolean;
  onPress?: () => void;
}) {
  const Icon = item.icon;
  const color = danger ? "#E53935" : "#FF7900";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="min-h-12 flex-row items-center px-4 active:bg-orange-50"
    >
      <Icon color={color} size={20} strokeWidth={1.8} />
      <Text className="ml-3 flex-1 text-[14px] font-medium">{item.title}</Text>
      {!danger ? (
        <ChevronRight color="#A79D96" size={18} strokeWidth={1.7} />
      ) : null}
    </Pressable>
  );
}
