import { GlobalComponentProps } from "@/shared/types/react";

export function Card({ children }: GlobalComponentProps) {
  return (
    <div className="flex flex-col rounded-xl bg-gray-800 border-2 border-gray-700 p-4 cursor-pointer hover:brightness-110 active:brightness-90 transition select-none">
      {children}
    </div>
  );
}
