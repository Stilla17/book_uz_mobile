import { User } from "@/types/auth.types";
import { FieldConfig } from "@/types/settings";

export function getFieldConfig(user: User | null): FieldConfig {
  const address = user?.addresses?.find((item) => item.isDefault) ?? user?.addresses?.[0];
  return {
    region: { label: "Viloyat", value: address?.region ?? "" },
    district: { label: "Tuman", value: address?.district ?? "" },
    city: { label: "Shahar", value: address?.city ?? "" },
    name: {
      label: "Ism va familiya",
      value: user?.name ?? "",
    },

    phone: {
      label: "Telefon raqami",
      value: user?.phone ?? "",
      keyboardType: "phone-pad",
    },

    email: {
      label: "Elektron pochta",
      value: user?.email ?? "",
      keyboardType: "email-address",
    },

    birthDate: {
      label: "Tug'ilgan sana",
      value: user?.birthDate?.slice(0, 10) ?? "",
    },
  };
}
