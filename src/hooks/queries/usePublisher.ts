import { getPublishers } from "@/services/publisher.service";
import { useQuery } from "@tanstack/react-query";

export const usePublisher = () => {
  return useQuery({
    queryKey: ["publisher"],
    queryFn: getPublishers,
  });
};
