import { type Href } from "expo-router";
import { PropsWithChildren, type ReactNode } from "react";
import { TextInputProps, ViewProps } from "react-native";
import { type LucideIcon } from "lucide-react-native";
export type ContainerProps = PropsWithChildren<
  {} & ViewProps & {
      className?: string;
      fixedHeader?: ReactNode;
      centered?: boolean;
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
  children?: ReactNode;
  isActive?: boolean;
  href?: Href;
  onPress?: () => void;
};

export type MenuItem = {
  title: string;
  icon: LucideIcon;
};

export type FormFieldProps = TextInputProps & {
  icon: ReactNode;
  label: string;
};