import Card from "@/components/Card";
import { useNewBooks } from "@/hooks/queries/useNewBooks";
import { Book } from "@/types/book.types";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CardSkeleton from "../other/CardSkeleton";

export default function NewBookSection() {
  const { data: books = [], isLoading } = useNewBooks();
  const latestBooks = books.slice(0, 10);

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
        : latestBooks.map((book) => (
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
