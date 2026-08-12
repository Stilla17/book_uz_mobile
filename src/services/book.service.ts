import { api } from "@/api/client";

export const getBooks = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const newBooks = async () => {
  const { data } = await api.get("/products/new-arrivals");
  return data;
};
