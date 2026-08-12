import { api } from "@/api/client";

export const getCategory = async () => {
  const { data } = await api.get("/categories");
  return data;
};
