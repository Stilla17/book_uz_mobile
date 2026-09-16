import { User } from "@/types/auth.types";
import { FieldConfig, FieldKey } from "@/types/settings";

export function getFieldConfig(user: User | null): FieldConfig {
  return {
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
