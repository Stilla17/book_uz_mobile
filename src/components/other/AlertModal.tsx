import { LogOut } from "lucide-react-native";
import { Modal, Pressable, Text, View } from "react-native";

type ModalType = {
  visible: boolean;
  description?: string;
  title: string;
  onClose: (visble: boolean) => void;
  onConfirm: () => void;
};

export default function AlertModal({
  visible,
  title,
  description,
  onClose,
  onConfirm,
}: ModalType) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => onClose(false)}
    >
      <View className="flex-1 justify-center items-center h-full bg-[#0000009d]">
        <Pressable
          onPress={(event) => event.stopPropagation()}
          className="w-full max-w-[330px] items-center rounded-3xl bg-white px-6 py-6"
        >
          <View className="h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <LogOut color="#E53935" size={26} />
          </View>

          <Text className="mt-4 text-[20px] font-bold text-[#302A26]">
            {title}
          </Text>

          <Text className="mt-2 text-center text-[14px] leading-5 text-[#867A72]">
            {description}
          </Text>

          <View className="mt-6 w-full flex-row gap-3">
            <Pressable
              onPress={() => onClose(false)}
              className="flex-1 items-center rounded-xl bg-[#F4EEE8] py-3.5"
            >
              <Text className="font-bold text-[#5F554E]">Bekor qilish</Text>
            </Pressable>

            <Pressable
              // disabled={logout.isPending}
              onPress={onConfirm}
              className="flex-1 items-center rounded-xl bg-[#E53935] py-3.5 active:opacity-80"
            >
              <Text className="font-bold text-white">Chiqish</Text>
            </Pressable>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}
