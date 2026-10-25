import { cn } from "cn";
import type { ComponentProps } from "react";

type Variant = "blue" | "teal";
type Size = "sm" | "md" | "lg" | "icon";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">;

export function Button({
  variant = "blue",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex gap-2 items-center justify-center not-disabled:cursor-pointer disabled:opacity-50",
        {
          "bg-blue-500 text-white": variant === "blue",
          "bg-teal-100 text-teal-500": variant === "teal",
        },
        {
          "py-1 px-2 text-sm rounded-sm": size === "sm",
          "py-2 px-4 text-base rounded-lg": size === "md",
          "py-2 px-5 text-xl rounded-lg": size === "lg",
          "p-2 size-10 rounded-lg": size === "icon",
        },
        className,
      )}
    />
  );
}
