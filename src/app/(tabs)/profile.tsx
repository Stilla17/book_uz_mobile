import Container from "@/components/Container";
import { useLogout } from "@/hooks/mutations/useLogout";
import { useAuthStore } from "@/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  BookOpen,
  Bookmark,
  ChevronRight,
  Clock3,
  Crown,
  Download,
  Headphones,
  Headset,
  Heart,
  Info,
  ListOrdered,
  LogOut,
  MessageSquareText,
  Settings,
  ShoppingBag,
  TicketPercent,
  UserRound,
  type LucideIcon,
} from "lucide-react-native";
import {
  Alert,
  Pressable,
  StatusBar,
  Text,
  View,
  type ViewStyle,
} from "react-native";

const ORANGE = "#FF7900";
const TEXT = "#302A26";
const MUTED = "#867A72";

const cardShadow: ViewStyle = {
  shadowColor: "#8A4B13",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.08,
  shadowRadius: 14,
  elevation: 3,
};

type MenuItem = {
  title: string;
  icon: LucideIcon;
};

const stats = [
  { title: "Kitoblarim", value: 24, icon: BookOpen },
  { title: "Audio kitoblar", value: 12, icon: Headphones },
  { title: "Saqlanganlar", value: 7, icon: Bookmark },
];

const profileMenu: MenuItem[] = [
  { title: "O‘qish tarixi", icon: Clock3 },
  { title: "Yuklab olinganlar", icon: Download },
  { title: "Buyurtmalarim", icon: ListOrdered },
];

function IconButton({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      className="h-10 w-10 items-center justify-center rounded-full active:bg-orange-100"
    >
      <Icon color={TEXT} size={21} strokeWidth={1.8} />
    </Pressable>
  );
}

function MenuRow({
  item,
  danger = false,
  onPress,
}: {
  item: MenuItem;
  danger?: boolean;
  onPress?: () => void;
}) {
  const Icon = item.icon;
  const color = danger ? "#E53935" : ORANGE;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="min-h-12 flex-row items-center px-4 active:bg-orange-50"
    >
      <Icon color={color} size={20} strokeWidth={1.8} />
      <Text
        className="ml-3 flex-1 text-[14px] font-medium"
        style={{ color: danger ? "#E53935" : TEXT }}
      >
        {item.title}
      </Text>
      {!danger ? (
        <ChevronRight color="#A79D96" size={18} strokeWidth={1.7} />
      ) : null}
    </Pressable>
  );
}

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  const handleLogout = () => {
    Alert.alert("Chiqish", "Ilovadan chiqishni xohlaysizmi?", [
      { text: "Bekor qilish", style: "cancel" },
      {
        text: "Chiqish",
        style: "destructive",
        onPress: () => logout.mutate(),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-[#FFF9F2]">
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />

      <Container className="pt-1">
        <View className="flex-row items-start justify-between">
          <View>
            <Text
              className="text-[25px] font-extrabold"
              style={{ color: TEXT }}
            >
              Sahifam
            </Text>
            <Text className="mt-1 text-[12px]" style={{ color: MUTED }}>
              Kitoblar olamida xush kelibsiz!
            </Text>
          </View>

          <View className="flex-row gap-1">
            <IconButton label="Bildirishnomalar" icon={Bell} />
            <IconButton label="Sozlamalar" icon={Settings} />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          className="mt-4 flex-row items-center rounded-3xl border border-[#F5E9DC] bg-white px-4 py-4 active:opacity-80"
          style={cardShadow}
        >
          <LinearGradient
            colors={["#FFF1D9", "#FFE0B0"]}
            className="h-[70px] w-[70px] items-center justify-end overflow-hidden rounded-full"
          >
            <View className="mb-[-6px] h-[51px] w-[51px] items-center justify-center rounded-full bg-[#FF850D]">
              <UserRound color="#FFF7EC" size={37} strokeWidth={1.8} />
            </View>
          </LinearGradient>

          <View className="ml-4 flex-1">
            <Text className="text-[16px] font-bold" style={{ color: TEXT }}>
              {user?.name || "Foydalanuvchi"}
            </Text>
            <Text className="mt-1 text-[12px]" style={{ color: MUTED }}>
              {user?.phone || "Telefon raqami kiritilmagan"}
            </Text>
            <View className="mt-2 self-start flex-row items-center rounded-full bg-[#FFF0DD] px-2.5 py-1">
              <Crown color={ORANGE} size={13} fill="#FFB24A" />
              <Text
                className="ml-1 text-[11px] font-bold"
                style={{ color: ORANGE }}
              >
                Premium
              </Text>
            </View>
          </View>

          <ChevronRight color="#A79D96" size={20} />
        </Pressable>

        <View
          className="mt-3 flex-row rounded-3xl border border-[#F5E9DC] bg-white py-4"
          style={cardShadow}
        >
          {stats.map(({ title, value, icon: Icon }) => (
            <Pressable
              key={title}
              accessibilityRole="button"
              className="flex-1 items-center active:opacity-60"
            >
              <Icon color={ORANGE} size={23} strokeWidth={1.8} />
              <Text
                className="mt-2 text-[14px] font-bold"
                style={{ color: TEXT }}
              >
                {value}
              </Text>
              <Text
                numberOfLines={1}
                className="mt-1 px-0.5 text-center text-[9px]"
                style={{ color: MUTED }}
              >
                {title}
              </Text>
            </Pressable>
          ))}
        </View>

        <View
          className="mt-3 overflow-hidden rounded-3xl border border-[#F5E9DC] bg-white py-1"
          style={cardShadow}
        >
          {profileMenu.map((item, index) => (
            <View key={item.title}>
              <MenuRow item={item} />
              {index < profileMenu.length - 1 ? (
                <View className="ml-12 h-px bg-[#F3EDE7]" />
              ) : null}
            </View>
          ))}
        </View>

        <LinearGradient
          colors={["#FFF0DB", "#FFD4A1"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="relative mt-3 min-h-[116px] overflow-hidden rounded-3xl px-4 py-4"
          style={cardShadow}
        >
          <View className="max-w-[68%]">
            <Text
              className="text-[16px] font-extrabold"
              style={{ color: TEXT }}
            >
              Premium obuna
            </Text>
            <Text
              className="mt-1 text-[10px] leading-4"
              style={{ color: "#6E5A4E" }}
            >
              Eksklyuziv kitoblar, chegirmalar va ko‘plab imkoniyatlardan
              foydalaning
            </Text>
            <Pressable
              accessibilityRole="button"
              className="mt-2 self-start flex-row items-center rounded-lg bg-[#FF7900] px-3 py-2 active:opacity-80"
            >
              <Text className="text-[10px] font-bold text-white">
                Obunani boshlash
              </Text>
              <ChevronRight color="white" size={14} />
            </Pressable>
          </View>

          <View className="absolute -bottom-4 right-2 h-[105px] w-[105px] rotate-[-12deg] items-center justify-center rounded-full bg-[#FFFFFF40]">
            <Crown color="#F08A00" size={78} fill="#FFB11B" strokeWidth={1.4} />
          </View>
          <View className="absolute right-5 top-3 h-2 w-2 rounded-full bg-white" />
          <View className="absolute right-[116px] top-6 h-1.5 w-1.5 rounded-full bg-white" />
        </LinearGradient>

        <View
          className="mt-3 overflow-hidden rounded-3xl border border-[#F5E9DC] bg-white py-1"
          style={cardShadow}
        >
          <MenuRow
            item={{ title: "Yordam va qo‘llab-quvvatlash", icon: Headset }}
          />
          <View className="ml-12 h-px bg-[#F3EDE7]" />
          <MenuRow item={{ title: "Ilova haqida", icon: Info }} />
          <View className="ml-12 h-px bg-[#F3EDE7]" />
          <MenuRow
            danger
            item={{
              title: logout.isPending ? "Chiqilmoqda..." : "Chiqish",
              icon: LogOut,
            }}
            onPress={logout.isPending ? undefined : handleLogout}
          />
        </View>

        <View className="mt-4 flex-row items-center justify-center">
          <ShoppingBag color="#C8B7A9" size={14} />
          <Text className="ml-1 text-[10px] text-[#B09F92]">
            Book.uz mobil ilovasi
          </Text>
        </View>
      </Container>
    </View>
  );
}
