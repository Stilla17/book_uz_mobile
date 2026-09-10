import { MenuItem } from "@/types/props.types";
import {
  Bookmark,
  BookOpen,
  Clock3,
  Download,
  Headphones,
  ListOrdered,
} from "lucide-react-native";

export const stats = [
  { title: "Kitoblarim", value: 24, icon: BookOpen },
  { title: "Audio kitoblar", value: 12, icon: Headphones },
  { title: "Saqlanganlar", value: 7, icon: Bookmark },
];

export const profileMenu: MenuItem[] = [
  { title: "O‘qish tarixi", icon: Clock3 },
  { title: "Yuklab olinganlar", icon: Download },
  { title: "Buyurtmalarim", icon: ListOrdered },
];
