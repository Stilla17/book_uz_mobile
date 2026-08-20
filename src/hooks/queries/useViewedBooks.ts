import { viewedBooks } from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";

export const useViewedBooks = () => {
  return useQuery({
    queryKey: ["books-viewed"],
    queryFn: viewedBooks,
    staleTime: 10 * 60 * 1000,
  });
};
