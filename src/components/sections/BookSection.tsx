import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import Card from "@/components/Card";

export default function BookSection() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 px-4"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <View key={index} className="w-[180px] mt-4">
          <Card coverSource={require("../../../assets/book.png")} />
        </View>
      ))}
    </ScrollView>
  );
}
