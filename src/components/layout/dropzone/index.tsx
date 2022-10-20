import { useDropzone } from "react-dropzone";
import { DropzoneProps } from "./types";

export function Dropzone({ disabled, onDrop, accept }: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled,
    accept,
  });

  return (
    <div
      className={`rounded-xl p-8 border-gray-700 flex items-center justify-center border-2 border-dashed h-48 disabled:bg-gray-700 transition ${
        disabled ? "bg-gray-700" : "bg-gray-900 cursor-pointer"
      }`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p className="text-sm text-gray-600">
        Drag &apos;n&apos; drop some files here, or click to select files
      </p>
    </div>
  );
}
