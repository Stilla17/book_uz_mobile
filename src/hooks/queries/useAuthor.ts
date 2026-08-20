import { getAuthor } from "@/services/author.service";
import { useQuery } from "@tanstack/react-query";

export const useAuthor = () => {
  return useQuery({
    queryKey: ["authors", "top"],
    queryFn: getAuthor,
  });
};
