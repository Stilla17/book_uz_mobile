import Card from "@/components/Card";
import { useViewedBooks } from "@/hooks/queries/useViewedBooks";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CardSkeleton from "../other/CardSkeleton";

export default function ViewBookSection() {
  const { data: books = [], isLoading } = useViewedBooks();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-4 px-4"
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        : books.map((book) => (
            <View key={book._id} className="mt-4 w-[180px]">
              <Card
                image={book.image}
                title={book.title.uz}
                author={book.authorName}
                rating={book.ratingAvg}
                reviews={book.views}
                discount={book.activeDiscount?.percentage}
              />
            </View>
          ))}
    </ScrollView>
  );
}
