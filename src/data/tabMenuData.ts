import { TabItem } from "@/types/tab.types";
import {
  Book,
  CircleUser,
  Home,
  QrCode,
  ShoppingBag,
} from "lucide-react-native";

export const tabsData: TabItem[] = [
  {
    name: "home",
    title: "Bosh sahifa",
    icon: Home,
  },
  {
    name: "market",
    title: "Market",
    icon: ShoppingBag,
  },
  {
    name: "qrcode",
    title: "QR to'lov",
    icon: QrCode,
  },
  {
    name: "library",
    title: "Kutubxonam",
    icon: Book,
  },
  {
    name: "profile",
    title: "Sahifam",
    icon: CircleUser,
  },
];
