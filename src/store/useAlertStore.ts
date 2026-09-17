import type { AlertAction, AlertVariant } from "@/components/other/AlertModal";
import { create } from "zustand";

type AlertMessage = {
  title: string;
  description?: string;
  buttons?: AlertAction[];
  variant: AlertVariant;
};

export const useAlertStore = create<{
  message: AlertMessage | null;
  close: () => void;
}>((set) => ({ message: null, close: () => set({ message: null }) }));

export function showAlert(title: string, description?: string, buttons?: AlertAction[]) {
  const variant: AlertVariant = buttons?.some((button) => button.style === "destructive")
    ? "delete"
    : /xato/i.test(title) ? "error" : title === "Yuborildi" ? "success" : "info";
  useAlertStore.setState({ message: { title, description, buttons, variant } });
}
