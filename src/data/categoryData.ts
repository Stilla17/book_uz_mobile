import {
  Baby,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  FlaskConical,
  GraduationCap,
  Landmark,
  Languages,
  LayoutGrid,
  Mosque,
  type LucideIcon,
} from "lucide-react-native";

export const iconMap: Record<string, LucideIcon> = {
  "Barcha Janrlar": LayoutGrid,
  "Biznes va boshqaruv": BriefcaseBusiness,
  "Chet tilidagi adabiyotlar": Languages,
  "Badiiy adabiyotlar": BookOpen,
  "Bolalar adabiyoti": Baby,
  "Psixologiya va Shaxsiy rivojlanish": Brain,
  "Diniy adabiyotlar": Mosque,
  "O'quv qo'llanmalar": GraduationCap,
  "Ilmiy-ommabop": FlaskConical,
  "Tarix va Siyosat": Landmark,
};
