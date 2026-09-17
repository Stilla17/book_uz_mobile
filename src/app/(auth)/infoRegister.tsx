import { showAlert } from "@/store/useAlertStore";
import Container from "@/components/Container";
import Button from "@/components/other/Button";
import FormField from "@/components/other/FormField";
import LocationSelectModal from "@/components/other/LocationSelectModal";
import { useCompleteRegistration } from "@/hooks/mutations/useCompleteRegistration";
import { useDistricts, useRegions } from "@/hooks/queries/useLocation";
import { useAuthStore } from "@/store/useAuthStore";
import { InfoRegistrationForm } from "@/types/location.types";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import {
  Building,
  CalendarDays,
  ChevronDown,
  Phone,
  UserRound,
} from "lucide-react-native";
import { useState } from "react";
import { Controller, FieldErrors, useForm, useWatch } from "react-hook-form";
import { ImageBackground, Pressable, Text, TextInput, View } from "react-native";

export default function AuthRegister() {
  const pendingRegistration = useAuthStore(
    (state) => state.pendingRegistration,
  );
  const initialPhone =
    pendingRegistration?.profile.phone?.replace(/^\+998/, "") ?? "";

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InfoRegistrationForm>({
    mode: "onTouched",
    defaultValues: {
      name: pendingRegistration?.profile.name ?? "",
      phone: initialPhone,
      city: "",
      birthdate: "",
      region: "",
      district: "",
    },
  });

  const completeRegistration = useCompleteRegistration();
  const selectedRegionId = useWatch({
    control,
    name: "region",
  });
  const selectedDistrictId = useWatch({
    control,
    name: "district",
  });
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [districtModalVisible, setDistrictModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const { data: regions = [], isLoading: regionsLoading } = useRegions();
  const { data: districts = [], isLoading: districtsLoading } =
    useDistricts(selectedRegionId);
  const selectedRegion = regions.find(
    (region) => String(region.id) === String(selectedRegionId),
  );
  const selectedDistrict = districts.find(
    (district) => String(district.id) === String(selectedDistrictId),
  );

  const selectRegion = (regionId: string) => {
    setValue("region", String(regionId), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // Region o'zgarsa oldingi district tozalanadi
    setValue("district", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  if (!pendingRegistration) {
    return <Redirect href="/(auth)/auth" />;
  }

  const handleRegister = (values: InfoRegistrationForm) => {
    if (!pendingRegistration) {
      return;
    }

    const cleanPhone = values.phone.replace(/\D/g, "");
    completeRegistration.mutate({
      registrationToken: pendingRegistration.registrationToken,
      name: values.name.trim(),
      phone: `+998${cleanPhone}`,
      birthDate: values.birthdate,
      addresses: [
        {
          city: values.city.trim(),
          region: selectedRegion?.name.uz ?? values.region,
          district: selectedDistrict?.name.uz ?? values.district,
          street: "",
          isDefault: true,
        },
      ],
    });
  };

  const handleInvalid = (formErrors: FieldErrors<InfoRegistrationForm>) => {
    const message =
      formErrors.name?.message ||
      formErrors.phone?.message ||
      formErrors.birthdate?.message ||
      formErrors.city?.message ||
      formErrors.region?.message ||
      formErrors.district?.message ||
      "Maydonlarni to'g'ri to'ldiring";

    showAlert("Xato", message);
  };

  return (
    <ImageBackground
      source={require("../../../assets/back.png")}
      resizeMode="stretch"
      className="flex-1 h-full w-full"
    >
      <Container>
        <View className="mt-6 ">
          <View className="items-center">
            <Image
              source={require("./../../../assets/logo_book_uz.png")}
              contentFit="contain"
              style={{ width: 250, height: 160 }}
            />
            <Text className="text-[#A05A27] font-bold mt-2 mb-4">
              Kitob — eng yaxshi sovg'a
            </Text>
          </View>

          <Text className="my-4 text-[24px] text-[#A05A27] font-bold text-center">
            So'rovnoma
          </Text>

          {/* Name */}
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Ism va familiya kiriting",
              minLength: {
                value: 2,
                message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
              },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <FormField
                autoCapitalize="words"
                autoComplete="name"
                icon={<UserRound color="#A05A27" size={20} />}
                label="Ism va familiya"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Masalan, Aziz Karimov"
                value={value}
              />
            )}
          />

          <View className="mb-[17px]">
            <Text className="mb-2 text-[13px] font-bold text-[#554137]">
              Telefon raqam
            </Text>
            <View className="min-h-14 flex-row items-center rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white px-[15px]">
              <Phone color="#A05A27" size={20} />
              <View className="ml-2.5 border-r border-[#E8DDD4] pr-[11px]">
                <Text className="text-sm font-bold text-[#382319]">+998</Text>
              </View>

              {/* Phone */}
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: "Telefon raqamni kiriting",
                  validate: (value) =>
                    value.replace(/\D/g, "").length === 9 ||
                    "Telefon raqam 9 ta raqamdan iborat bo'lishi kerak",
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    autoComplete="tel"
                    keyboardType="phone-pad"
                    maxLength={9}
                    editable={pendingRegistration?.provider !== "phone"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder="90 123 45 67"
                    placeholderTextColor="#A99B90"
                    className="flex-1 px-[11px] py-3.5 text-[15px] text-[#382319]"
                    value={value}
                  />
                )}
              />
            </View>
          </View>

          {/* Birthday */}
          <Controller
            control={control}
            name="birthdate"
            rules={{
              required: "Tug'ilgan sanani tanlang",
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: "Tug'ilgan sana noto'g'ri",
              },
            }}
            render={({ field: { value, onChange } }) => {
              const pickerDate = value
                ? new Date(`${value}T12:00:00`)
                : new Date(2000, 0, 1, 12);
              const displayDate = value
                ? value.split("-").reverse().join(".")
                : "";

              return (
                <View className="mb-[17px]">
                  <Text className="mb-2 text-[13px] font-bold text-[#554137]">
                    Tug'ilgan sana
                  </Text>
                  <Pressable
                    accessibilityLabel="Tug'ilgan sanani tanlash"
                    accessibilityRole="button"
                    className={`min-h-14 flex-row items-center rounded-2xl border-[1.5px] bg-white px-[15px] active:opacity-70 ${
                      errors.birthdate ? "border-red-500" : "border-[#E6D7CA]"
                    }`}
                    onPress={() => setDatePickerVisible(true)}
                  >
                    <CalendarDays color="#A05A27" size={20} />
                    <Text
                      className={`flex-1 px-[11px] text-[15px] ${
                        value ? "text-[#382319]" : "text-[#A99B90]"
                      }`}
                    >
                      {displayDate || "Tug'ilgan sanani tanlang"}
                    </Text>
                  </Pressable>

                  {datePickerVisible ? (
                    <DateTimePicker
                      accentColor="#FF7900"
                      display="calendar"
                      locale="uz_UZ"
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 0, 1)}
                      mode="date"
                      negativeButton={{ label: "Bekor qilish" }}
                      onDismiss={() => setDatePickerVisible(false)}
                      onValueChange={(_, selectedDate) => {
                        const year = selectedDate.getFullYear();
                        const month = String(
                          selectedDate.getMonth() + 1,
                        ).padStart(2, "0");
                        const day = String(selectedDate.getDate()).padStart(
                          2,
                          "0",
                        );

                        onChange(`${year}-${month}-${day}`);
                        setDatePickerVisible(false);
                      }}
                      positiveButton={{ label: "Tanlash" }}
                      presentation="dialog"
                      value={pickerDate}
                    />
                  ) : null}
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name="city"
            rules={{
              required: "Shahringizni kiriting",
              minLength: {
                value: 2,
                message: "Davlat nomi",
              },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <FormField
                autoCapitalize="words"
                autoComplete="name"
                icon={<Building color="#A05A27" size={20} />}
                label="Shahar"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Masalan, Toshkent"
                value={value}
              />
            )}
          />

          <View className="flex-row gap-3">
            <Controller
              control={control}
              name="region"
              rules={{
                required: "Viloyatni tanlang",
              }}
              render={() => (
                <View className="mb-[17px] flex-1">
                  <Text className="mb-2 text-[13px] font-bold text-[#554137]">
                    Viloyat
                  </Text>
                  <Pressable
                    className="min-h-14 flex-row items-center justify-between rounded-2xl border-[1.5px] border-[#E6D7CA] bg-white px-4 active:opacity-70"
                    onPress={() => setRegionModalVisible(true)}
                  >
                    <Text
                      className={`flex-1 pr-2 text-[14px] ${
                        selectedRegion ? "text-[#382319]" : "text-[#A99B90]"
                      }`}
                      numberOfLines={1}
                    >
                      {selectedRegion?.name.uz ?? "Viloyatni tanlang"}
                    </Text>
                    <ChevronDown color="#A05A27" size={18} />
                  </Pressable>
                </View>
              )}
            />

            <Controller
              control={control}
              name="district"
              rules={{
                required: "Tumanni tanlang",
              }}
              render={() => (
                <View className="mb-[17px] flex-1">
                  <Text className="mb-2 text-[13px] font-bold text-[#554137]">
                    Tuman
                  </Text>
                  <Pressable
                    className={`min-h-14 flex-row items-center justify-between rounded-2xl border-[1.5px] px-4 active:opacity-70 ${
                      selectedRegionId
                        ? "border-[#E6D7CA] bg-white"
                        : "border-[#EEE5DC] bg-[#F5F1ED]"
                    }`}
                    disabled={!selectedRegionId}
                    onPress={() => setDistrictModalVisible(true)}
                  >
                    <Text
                      className={`flex-1 pr-2 text-[14px] ${
                        selectedDistrict ? "text-[#382319]" : "text-[#A99B90]"
                      }`}
                      numberOfLines={1}
                    >
                      {selectedDistrict?.name.uz ??
                        (selectedRegionId
                          ? "Tumanni tanlang"
                          : "Avval viloyat")}
                    </Text>
                    <ChevronDown
                      color={selectedRegionId ? "#A05A27" : "#BEB2A8"}
                      size={18}
                    />
                  </Pressable>
                </View>
              )}
            />
          </View>

          <LocationSelectModal
            items={regions}
            loading={regionsLoading}
            onClose={() => setRegionModalVisible(false)}
            onSelect={(regionId) => selectRegion(String(regionId))}
            selectedId={selectedRegionId}
            title="Viloyatni tanlang"
            visible={regionModalVisible}
          />

          <LocationSelectModal
            items={districts}
            loading={districtsLoading}
            onClose={() => setDistrictModalVisible(false)}
            onSelect={(districtId) =>
              setValue("district", String(districtId), {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              })
            }
            selectedId={selectedDistrictId}
            title="Tumanni tanlang"
            visible={districtModalVisible}
          />

          <Button
            title={
              completeRegistration.isPending
                ? "Saqlanmoqda..."
                : "Ro'yxatdan o'tish"
            }
            onPress={handleSubmit(handleRegister, handleInvalid)}
          />
        </View>
      </Container>
    </ImageBackground>
  );
}
