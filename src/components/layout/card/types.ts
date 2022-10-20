import { GlobalComponentProps } from "@/shared/types/react";

export type CardProps = GlobalComponentProps & {
  onClick?: () => void;
  isSelected?: boolean;
};
