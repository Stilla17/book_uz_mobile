import { LocalizedTitle } from "./localized.types";

type ActiveDiscount = {
  _id: string;
  name?: string;
  percentage?: number;
  startDate?: string;
  endDate?: string;
};

export interface Book {
  _id: string;
  image?: string;
  title: LocalizedTitle;
  authorName?: string;
  ratingAvg?: number;
  views?: number;
  price?: number;
  discountPrice: number;
  activeDiscount: ActiveDiscount | null;
}
