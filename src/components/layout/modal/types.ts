import { GlobalComponentProps } from "@/shared/types/react";

export type ModalProps = GlobalComponentProps & {
  onClose: () => void;
  title?: string;
};
