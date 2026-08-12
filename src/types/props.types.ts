import { type Href } from "expo-router";
import { PropsWithChildren, type ReactNode } from "react";
import { ViewProps } from "react-native";
import { type ImageProps } from "expo-image";

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
  coverSource?: ImageProps["source"];
  discount?: string;
  title?: string;
  author?: string;
  rating?: string;
  reviews?: string;
  price?: string;
};
