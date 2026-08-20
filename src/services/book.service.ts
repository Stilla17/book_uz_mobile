import { api } from "@/api/client";
import { Book } from "@/types/book.types";

// export const getBooks = async () => {
//   const { data } = await api.get("/products");
//   return data;
// };

export const newBooks = async (): Promise<Book[]> => {
  const { data } = await api.get("/products/new-arrivals");
  return data?.data ?? [];
};

export const viewedBooks = async (): Promise<Book[]> => {
  const { data } = await api.get("/products/most-viewed", {
    params: { limit: 10 },
  });

  return data?.data ?? [];
};
