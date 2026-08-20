import { usePublisher } from "@/hooks/queries/usePublisher";
import { Image } from "expo-image";
import { BookOpenText } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import PublisherSkeleton from "../other/PublisherSkleton";

export default function PublisherSection() {
  const { data: publishers = [], isLoading } = usePublisher();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 px-4 mt-4"
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <PublisherSkeleton key={index} />
          ))
        : publishers.map((publisher) => (
            <View
              key={publisher._id}
              className="w-[260px] flex-row items-center gap-3 rounded-2xl bg-white p-3"
            >
              {publisher.image?.trim() ? (
                <Image
                  source={{ uri: publisher.image }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                  }}
                  contentFit="contain"
                />
              ) : (
                <View
                  className="items-center justify-center rounded-xl bg-slate-100"
                  style={{
                    width: 80,
                    height: 80,
                  }}
                >
                  <BookOpenText color={"#F87F00"} />
                </View>
              )}

              <View className="flex-1">
                <Text
                  numberOfLines={2}
                  className="text-base font-bold text-slate-950"
                >
                  {publisher.name}
                </Text>

                <Text className="mt-1 text-sm text-slate-500">
                  {publisher.booksCount} ta kitob
                </Text>
              </View>
            </View>
          ))}
    </ScrollView>
  );
}
