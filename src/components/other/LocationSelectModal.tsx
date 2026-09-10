import { LocationSelectModalProps } from "@/types/location.types";
import { Check, X } from "lucide-react-native";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

export default function LocationSelectModal({
  items,
  loading = false,
  onClose,
  onSelect,
  selectedId,
  title,
  visible,
}: LocationSelectModalProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <Pressable className="flex-1 justify-end bg-black/40" onPress={onClose}>
        <Pressable
          className="max-h-[70%] rounded-t-[28px] bg-[#FFF9F1] px-5 pb-7 pt-4"
          onPress={(event) => event.stopPropagation()}
        >
          <View className="mb-3 h-1 w-12 self-center rounded-full bg-[#D8C8B8]" />

          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-[#382319]">{title}</Text>
            <Pressable
              accessibilityLabel="Yopish"
              accessibilityRole="button"
              className="h-10 w-10 items-center justify-center rounded-full bg-white"
              onPress={onClose}
            >
              <X color="#754515" size={20} />
            </Pressable>
          </View>

          {loading ? (
            <Text className="py-8 text-center text-[#8A786C]">
              Yuklanmoqda...
            </Text>
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => `${item.id}-${item.externalId}`}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const selected = item.id === selectedId;

                return (
                  <Pressable
                    className={`mb-2 flex-row items-center justify-between rounded-2xl border px-4 py-4 active:opacity-70 ${
                      selected
                        ? "border-[#FF7900] bg-[#FFF0DE]"
                        : "border-[#EFE2D5] bg-white"
                    }`}
                    onPress={() => {
                      onSelect(item.id);
                      onClose();
                    }}
                  >
                    <Text
                      className={`flex-1 pr-3 text-[15px] ${
                        selected ? "font-bold text-[#FF7900]" : "text-[#382319]"
                      }`}
                    >
                      {item.name.uz}
                    </Text>
                    {selected ? (
                      <Check color="#FF7900" size={20} strokeWidth={2.4} />
                    ) : null}
                  </Pressable>
                );
              }}
            />
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
