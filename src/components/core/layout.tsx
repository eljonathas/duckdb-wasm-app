import { GlobalComponentProps } from "@/shared/types/react";

export function Layout({ children }: GlobalComponentProps) {
  return (
    <div className="container max-w-screen-2xl mx-auto min-h-screen flex flex-col p-8">
      <nav className="flex w-full items-center justify-between mb-12">
        <h1 className="font-semibold">🦆 DuckDB Application</h1>
      </nav>
      {children}
    </div>
  );
}
