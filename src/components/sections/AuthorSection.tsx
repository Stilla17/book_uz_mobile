import { useAuthor } from "@/hooks/queries/useAuthor";
import { Image } from "expo-image";
import { UserRound } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import AuthorSkeleton from "../other/AuthorSkeleton";

export default function AuthorSection() {
  const { data: authors = [], isLoading, isError } = useAuthor();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 px-4 mt-4"
    >
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <AuthorSkeleton key={index} />
        ))
      ) : isError ? (
        <Text className="text-sm text-red-500">
          Mualliflarni yuklashda xatolik yuz berdi
        </Text>
      ) : (
        authors.map((author) => (
          <View
            key={author._id}
            className="w-[140px] items-center rounded-3xl bg-white p-4"
          >
            {author.image?.trim() ? (
              <Image
                source={{ uri: author.image }}
                style={{ width: 88, height: 88, borderRadius: 44 }}
                contentFit="cover"
              />
            ) : (
              <View className="h-[88px] w-[88px] items-center justify-center rounded-full bg-orange-50">
                <UserRound color="#F87F00" size={38} strokeWidth={1.8} />
              </View>
            )}

            <Text
              numberOfLines={2}
              className="mt-3 text-center text-sm font-bold text-slate-950"
            >
              {author.name}
            </Text>

            <Text className="mt-1 text-center text-xs text-slate-500">
              {author.booksCount} ta kitob
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
