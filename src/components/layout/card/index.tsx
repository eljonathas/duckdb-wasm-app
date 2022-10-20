import { CardProps } from "./types";

export function Card({ children, onClick, isSelected }: CardProps) {
  return (
    <div
      className={`flex flex-col rounded-xl bg-gray-800 border-2 p-4 cursor-pointer hover:brightness-110 active:brightness-90 transition select-none ${
        isSelected ? "border-blue-500" : "border-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
