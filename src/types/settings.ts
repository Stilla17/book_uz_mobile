import { ReactNode } from "react";

export type InfoFieldProps = {
  icon: ReactNode;
  label: string;
  value: string;
  withChevron?: boolean;
};

export type EditFieldModalProps = {
  visible: boolean;
  label: string;
  type?: "text" | "date";
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export type FieldKey = "name" | "phone" | "email" | "birthDate";

export type Props = InfoFieldProps & {
  onEdit?: () => void;
};

export type FieldConfig = Record<
  FieldKey,
  { label: string; value: string; keyboardType?: "email-address" | "phone-pad" }
>;
