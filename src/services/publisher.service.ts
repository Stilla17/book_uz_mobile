import { api } from "@/api/client";
import { Publisher } from "@/types/publisher.types";

export const getPublishers = async (): Promise<Publisher[]> => {
  const { data } = await api.get("/publishers/top", {
    params: {
      limit: 10,
    },
    timeout: 30000,
  });

  return data?.data?.publishers ?? [];
};
