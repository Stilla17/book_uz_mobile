import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

export default function SearchInput() {
  return (
    <View className="relative mt-6">
      <TextInput
        placeholder="Kitob nomi, muallif..."
        placeholderTextColor="#9CA3AF"
        className="h-12 rounded-2xl bg-white pl-12 pr-4 h-[45px] text-gray-700"
      />
      <View
        pointerEvents="none"
        className="absolute bottom-0 left-4 top-0 z-10 items-center justify-center"
      >
        <Search color="#9CA3AF" size={22} />
      </View>
    </View>
  );
}
