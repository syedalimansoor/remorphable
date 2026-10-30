import type { ReactNode } from "react";

export function InteractiveBlock({ children }: { children?: ReactNode }) {
  return (
    <section className="bg-background-200 px-6 py-5 rounded-xl my-8 animate-slide-in">
      {children}
    </section>
  );
}
