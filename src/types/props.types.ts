import { type Href } from "expo-router";
import { PropsWithChildren, type ReactNode } from "react";
import { ViewProps } from "react-native";
import { LocalizedTitle } from "./localized.types";

export type ContainerProps = PropsWithChildren<
  {} & ViewProps & {
      className?: string;
      fixedHeader?: ReactNode;
    }
>;

export type TitleProps = {
  title: string;
  path: Href;
};

export type CardProps = {
  image?: string;
  discount?: number;
  title: string;
  author?: string;
  rating?: number;
  reviews?: number;
  price?: number;
};

export type BtnProps = {
  title: string;
};