import { newBooks } from "@/services/book.service";
import { useQuery } from "@tanstack/react-query";

export const useNewBooks = () => {
  return useQuery({
    queryKey: ["new-books"],
    queryFn: newBooks,
    retry: 2,
  });
};
