import { ReactNode } from "react";
import { LocationOption } from "./location.types";

export type InfoFieldProps = {
  icon: ReactNode;
  label: string;
  value: string;
  withChevron?: boolean;
};

export type EditFieldModalProps = {
  visible: boolean;
  label: string;
  type?: "text" | "date" | "select";
  items?: LocationOption[];
  loading?: boolean;
  selectionDisabled?: boolean;
  selectionPlaceholder?: string;
  selectionError?: boolean;
  onRetry?: () => void;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export type FieldKey = "name" | "phone" | "email" | "birthDate" | "region" | "district" | "city";

export type Props = InfoFieldProps & {
  onEdit?: () => void;
};

export type FieldConfig = Record<
  FieldKey,
  { label: string; value: string; keyboardType?: "email-address" | "phone-pad" }
>;
