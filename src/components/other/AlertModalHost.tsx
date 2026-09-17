import { useAlertStore } from "@/store/useAlertStore";
import AlertModal from "./AlertModal";

export default function AlertModalHost() {
  const message = useAlertStore((state) => state.message);
  const close = useAlertStore((state) => state.close);
  return (
    <AlertModal
      visible={!!message}
      title={message?.title ?? ""}
      description={message?.description}
      buttons={message?.buttons}
      variant={message?.variant}
      onClose={close}
    />
  );
}
