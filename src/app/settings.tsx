import Container from "@/components/Container";
import { EditFieldModal } from "@/components/other/EditFieldModal";
import { InfoField } from "@/components/other/InfoField";
import { ProfileAvatar } from "@/components/sections/ProfileAvatar";
import { getFieldConfig } from "@/data/settings";
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";
import { useDistricts, useRegions } from "@/hooks/queries/useLocation";
import { useAuthStore } from "@/store/useAuthStore";
import { FieldKey } from "@/types/settings";
import { router } from "expo-router";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, StatusBar, Text, View } from "react-native";
import { cardShadow, MUTED, ORANGE, TEXT } from "./(tabs)/profile";

export default function Settings() {
  const user = useAuthStore((state) => state.user);
  const fieldConfig = getFieldConfig(user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { mutate, isPending } = useUpdateProfile();

  const address =
    user?.addresses?.find((item) => item.isDefault) ?? user?.addresses?.[0];
  const regionsQuery = useRegions();
  const regions = regionsQuery.data ?? [];
  const selectedRegion = regions.find(
    (item) =>
      item.name.uz === address?.region || String(item.id) === address?.region,
  );
  const districtsQuery = useDistricts(selectedRegion?.id);
  const formattedBirthDate = user?.birthDate
    ? new Date(user.birthDate).toLocaleDateString("ru-RU")
    : "Tug'ilgan sana tanlanmagan";
  const [editingField, setEditingField] = useState<FieldKey | null>(null);

  const handleSave = (field: FieldKey, value: string) => {
    if (!user) return;

    if (field === "region" || field === "district" || field === "city") {
      const addresses = [...(user.addresses ?? [])];
      const defaultIndex = addresses.findIndex((item) => item.isDefault);
      const index = defaultIndex >= 0 ? defaultIndex : 0;
      const currentAddress = addresses[index] ?? {
        region: "",
        district: "",
        city: "",
        street: "",
        isDefault: true,
      };
      addresses[index] = { ...currentAddress, [field]: value.trim() };
      if (field === "region" && currentAddress.region !== value.trim()) {
        addresses[index].district = "";
      }
      updateUser({ addresses });
    } else {
      updateUser({ [field]: value });
    }
    setEditingField(null);
  };

  const handleSaveProfile = () => {
    if (!user || isPending) return;
    const { name, phone, email, birthDate, addresses } = user;
    console.log("Yuborilayotgan birthDate:", birthDate);
    mutate(
      {
        name,
        phone,
        email,
        birthDate: birthDate?.slice(0, 10) || undefined,
        addresses,
      },
      {
        onSuccess: () => {
          router.back();
        },
        onError: () => {
          Alert.alert(
            "Xatolik",
            "Ma'lumotlar saqlanmadi. Qayta urinib ko'ring.",
          );
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-[#FFF9F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />

      <Container className="pt-1 pb-0">
        <View className="flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Orqaga"
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-2xl border border-[#F1E5D9] bg-white active:opacity-70"
            style={cardShadow}
          >
            <ArrowLeft color={TEXT} size={21} strokeWidth={2} />
          </Pressable>

          <View className="items-center">
            <Text
              className="text-[18px] font-extrabold"
              style={{ color: TEXT }}
            >
              Shaxsiy ma&apos;lumotlar
            </Text>
            <Text className="mt-0.5 text-[10px]" style={{ color: MUTED }}>
              Profilingizni boshqaring
            </Text>
          </View>

          <View className="h-11 w-11" />
        </View>

        <ProfileAvatar />

        <View className="mt-5">
          <Text
            className="mb-2.5 ml-1 text-[14px] font-extrabold"
            style={{ color: TEXT }}
          >
            Shaxsiy ma&apos;lumotlar
          </Text>
          <View
            className="gap-2.5 rounded-3xl border border-[#F3E5D8] bg-white p-3"
            style={cardShadow}
          >
            <InfoField
              icon={<UserRound color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Ism va familiya"
              value={user?.name || "Ism familiya kiritilmagan"}
              onEdit={() => setEditingField("name")}
            />
            <InfoField
              icon={<Phone color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Telefon raqami"
              value={user?.phone || "+998 00 000 00 00"}
              onEdit={() => setEditingField("phone")}
            />
            <InfoField
              icon={<Mail color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Elektron pochta"
              value={user?.email || "Elektron pochta kiritilmagan"}
              onEdit={() => setEditingField("email")}
            />
          </View>
        </View>

        <View className="mt-5">
          <Text
            className="mb-2.5 ml-1 text-[14px] font-extrabold"
            style={{ color: TEXT }}
          >
            Tug&apos;ilgan sana
          </Text>
          <View
            className="rounded-3xl border border-[#F3E5D8] bg-white p-3"
            style={cardShadow}
          >
            <InfoField
              icon={<CalendarDays color={ORANGE} size={19} strokeWidth={1.9} />}
              label="Sana"
              value={formattedBirthDate}
              onEdit={() => setEditingField("birthDate")}
            />
          </View>
        </View>

        <View className="mt-5">
          <View className="mb-2.5 flex-row items-center justify-between px-1">
            <Text
              className="text-[15px] font-extrabold"
              style={{ color: TEXT }}
            >
              Manzil
            </Text>
          </View>

          <View
            className="rounded-3xl border border-[#F3E5D8] bg-white p-3"
            style={cardShadow}
          >
            <View className="gap-2.5">
              <InfoField
                icon={<MapPin color={ORANGE} size={18} strokeWidth={1.8} />}
                label="Viloyat"
                value={address?.region || "Viloyat tanlanmagan"}
                onEdit={() => setEditingField("region")}
              />
              <InfoField
                icon={<MapPin color={ORANGE} size={18} strokeWidth={1.8} />}
                label="Tuman"
                value={address?.district || "Tuman tanlanmagan"}
                onEdit={() => setEditingField("district")}
              />
              <InfoField
                icon={<MapPin color={ORANGE} size={18} strokeWidth={1.8} />}
                label="Davlat"
                onEdit={() => setEditingField("city")}
                value={
                  [address?.city].filter(Boolean).join(", ") ||
                  "Manzil kiritilmagan"
                }
              />
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Saqlash"
            onPress={handleSaveProfile}
            disabled={!user || isPending}
            className="mt-6 h-14 items-center justify-center rounded-2xl bg-[#FF7900] active:opacity-80"
          >
            <Text className="text-[16px] font-bold text-white">
              {isPending ? "Saqlanmoqda..." : "Saqlash"}
            </Text>
          </Pressable>
        </View>
      </Container>

      {editingField && (
        <EditFieldModal
          visible={!!editingField}
          type={
            editingField === "birthDate"
              ? "date"
              : editingField === "region" || editingField === "district"
                ? "select"
                : "text"
          }
          items={
            editingField === "region" ? regions : (districtsQuery.data ?? [])
          }
          loading={
            editingField === "region"
              ? regionsQuery.isLoading
              : districtsQuery.isLoading
          }
          selectionDisabled={editingField === "district" && !selectedRegion}
          selectionPlaceholder={
            editingField === "region"
              ? "Viloyatni tanlang"
              : selectedRegion
                ? "Tumanni tanlang"
                : "Avval viloyatni tanlang"
          }
          selectionError={
            editingField === "region"
              ? regionsQuery.isError
              : districtsQuery.isError
          }
          onRetry={() => {
            void (editingField === "region"
              ? regionsQuery.refetch()
              : districtsQuery.refetch());
          }}
          label={fieldConfig[editingField].label}
          value={fieldConfig[editingField].value}
          keyboardType={fieldConfig[editingField].keyboardType}
          onClose={() => setEditingField(null)}
          onSave={(value) => handleSave(editingField, value)}
        />
      )}
    </View>
  );
}
