import { MUTED, TEXT } from "@/app/(tabs)/profile";
import { EditFieldModalProps } from "@/types/settings";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import LocationSelectModal from "./LocationSelectModal";

export function EditFieldModal({
  label,
  visible,
  onClose,
  value,
  onSave,
  type = "text",
  keyboardType = "default",
  items = [],
  loading = false,
  selectionDisabled = false,
  selectionPlaceholder = "Tanlang",
  selectionError = false,
  onRetry,
}: EditFieldModalProps) {
  const [write, setWrite] = useState(value);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectionVisible, setSelectionVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setWrite(value);
      setDatePickerVisible(false);
      setSelectionVisible(false);
    }
  }, [value, visible]);

  const parsedDate = write
    ? new Date(`${write.slice(0, 10)}T12:00:00`)
    : new Date();

  const pickerDate = Number.isNaN(parsedDate.getTime())
    ? new Date()
    : parsedDate;

  const handleSave = () => {
    onSave(write.trim());
    onClose();
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent
        statusBarTranslucent
        onRequestClose={onClose}
        visible={visible && !selectionVisible}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "#0000009d",
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
            <View
              className="rounded-t-3xl bg-white px-5 pb-8 pt-3"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: -6 },
              }}
            >
              <View className="mb-4 items-center">
                <View className="h-1.5 w-10 rounded-full bg-[#EFE3D6]" />
              </View>

              <View className="mb-5 flex-row items-center justify-between">
                <Text
                  className="text-[16px] font-extrabold"
                  style={{ color: TEXT }}
                >
                  {label}
                </Text>
              </View>

              {type === "select" ? (
                <>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={label}
                    disabled={selectionDisabled}
                    onPress={() => setSelectionVisible(true)}
                    className={`min-h-14 flex-row items-center justify-between rounded-2xl border-[1.5px] px-4 active:opacity-70 ${selectionDisabled ? "border-[#EEE5DC] bg-[#F5F1ED]" : "border-[#E6D7CA] bg-white"}`}
                  >
                    <Text
                      numberOfLines={1}
                      className={`flex-1 pr-2 text-[14px] ${write ? "text-[#382319]" : "text-[#A99B90]"}`}
                    >
                      {selectionDisabled
                        ? selectionPlaceholder
                        : write || selectionPlaceholder}
                    </Text>
                    <ChevronDown
                      color={selectionDisabled ? "#BEB2A8" : "#A05A27"}
                      size={18}
                    />
                  </Pressable>
                  {selectionError && (
                    <Pressable onPress={onRetry} className="mt-3 py-2">
                      <Text className="text-red-600">
                        Ro'yxat yuklanmadi. Qayta urinish
                      </Text>
                    </Pressable>
                  )}
                </>
              ) : type === "date" ? (
                <>
                  <Pressable
                    onPress={() => setDatePickerVisible(true)}
                    className="rounded-2xl border border-[#F1E7DD] bg-[#FFFCF8] px-4 py-3.5"
                  >
                    <Text style={{ color: TEXT }}>
                      {write
                        ? pickerDate.toLocaleDateString("ru-RU")
                        : "Sanani tanlang"}
                    </Text>
                  </Pressable>

                  {datePickerVisible && (
                    <DateTimePicker
                      value={pickerDate}
                      mode="date"
                      display="calendar"
                      presentation="dialog"
                      minimumDate={new Date(1900, 0, 1)}
                      maximumDate={new Date()}
                      onDismiss={() => setDatePickerVisible(false)}
                      onValueChange={(_, date) => {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0",
                        );
                        const day = String(date.getDate()).padStart(2, "0");

                        setWrite(`${year}-${month}-${day}`);
                        setDatePickerVisible(false);
                      }}
                    />
                  )}
                </>
              ) : (
                <TextInput
                  value={write}
                  onChangeText={setWrite}
                  keyboardType={keyboardType}
                  placeholderTextColor={MUTED}
                  autoFocus
                  className="rounded-2xl border border-[#F1E7DD] bg-[#FFFCF8] px-4 py-3.5 text-[15px] font-semibold"
                  style={{ color: TEXT }}
                />
              )}

              <View className="mt-6 flex-row gap-3">
                <Pressable
                  onPress={onClose}
                  className="flex-1 h-13 items-center justify-center rounded-2xl border border-[#F1E7DD] bg-white active:opacity-70"
                >
                  <Text
                    className="text-[14px] font-bold"
                    style={{ color: MUTED }}
                  >
                    Bekor qilish
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSave}
                  disabled={
                    type === "select" &&
                    (selectionDisabled ||
                      !items.some((item) => item.name.uz === write))
                  }
                  className="flex-1 h-13 items-center justify-center rounded-2xl bg-[#FF7900] active:opacity-80"
                >
                  <Text className="text-[14px] font-bold text-white">
                    Saqlash
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <LocationSelectModal
        visible={visible && selectionVisible}
        title={label}
        items={items}
        loading={loading}
        selectedId={items.find((item) => item.name.uz === write)?.id}
        onClose={() => setSelectionVisible(false)}
        onSelect={(id) => {
          const selected = items.find((item) => item.id === id);
          if (selected) setWrite(selected.name.uz);
        }}
      />
    </>
  );
}
