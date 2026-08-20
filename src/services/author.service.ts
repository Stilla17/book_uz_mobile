import { api } from "@/api/client";
import { Author } from "@/types/author.types";

export const getAuthor = async (): Promise<Author[]> => {
  const { data } = await api.get("/authors/top", {
    params: {
      limit: 10,
    },
    timeout: 30000,
  });

  return data?.data?.authors ?? [];
};
