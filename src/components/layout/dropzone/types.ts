import { Accept } from "react-dropzone";

export type DropzoneProps = {
  disabled?: boolean;
  accept?: Accept;
  onDrop: (acceptedFiles: File[]) => void;
};
