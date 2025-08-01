import * as React from "react";

import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
};

function Input({ className, type, icon, ...props }: Props) {
  return (
    <div
      className={cn(
        "flex items-center rounded-sm border-input bg-muted-foreground shadow-xs transition-[color,box-shadow] ",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]"
      )}
    >
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-background/50 selection:bg-foreground selection:text-background flex h-9 w-full min-w-0 rounded-sm px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {icon && <span className="h-9 p-2">{icon}</span>}
    </div>
  );
}

export { Input };
