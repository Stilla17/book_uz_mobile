import { CircleAlert, CircleCheck, Info, LogOut, Trash2 } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";

export type AlertAction = {
  text: string;
  style?: "default" | "cancel" | "destructive";
  onPress?: () => void;
};
export type AlertVariant = "error" | "success" | "info" | "logout" | "delete";

type ModalType = {
  visible: boolean;
  description?: string;
  title: string;
  onClose: (visble: boolean) => void;
  onConfirm?: () => void;
  buttons?: AlertAction[];
  variant?: AlertVariant;
};

export default function AlertModal({
  visible,
  title,
  description,
  onClose,
  onConfirm,
  buttons,
  variant,
}: ModalType) {
  const kind = variant ?? (onConfirm ? "logout" : "info");
  const color = kind === "success" ? "#23834A" : kind === "info" ? "#FF7900" : "#E53935";
  const Icon = kind === "logout" ? LogOut : kind === "delete" ? Trash2 : kind === "success" ? CircleCheck : kind === "error" ? CircleAlert : Info;
  const actions: AlertAction[] = buttons?.length ? buttons : onConfirm ? [
    { text: "Bekor qilish", style: "cancel" },
    { text: "Chiqish", style: "destructive", onPress: onConfirm },
  ] : [{ text: "OK" }];
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <View className="flex-1 justify-center items-center h-full bg-[#0000009d] px-5">
        <Pressable
          onPress={(event) => event.stopPropagation()}
          className="w-full max-w-[330px] items-center rounded-3xl bg-white px-6 py-6"
        >
          <View className="h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: `${color}15` }}>
            <Icon color={color} size={26} />
          </View>

          <Text accessibilityRole="header" className="mt-4 text-center text-[20px] font-bold text-[#302A26]">
            {title}
          </Text>

          {!!description && <Text className="mt-2 text-center text-[14px] leading-5 text-[#867A72]">
            {description}
          </Text>}

          <View className="mt-6 w-full flex-row gap-3">
            {actions.map((action, index) => (
              <Pressable
                key={`${action.text}-${index}`}
                accessibilityRole="button"
                onPress={() => { onClose(false); action.onPress?.(); }}
                className="flex-1 items-center justify-center rounded-xl py-3.5 active:opacity-80"
                style={{ backgroundColor: action.style === "cancel" ? "#F4EEE8" : color }}
              >
                <Text className="text-center font-bold" style={{ color: action.style === "cancel" ? "#5F554E" : "white" }}>{action.text}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}
