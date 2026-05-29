import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? `in-${Math.random().toString(36).slice(2, 9)}`;
    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </label>
        )}
        <div
          className={cn(
            "group relative flex items-center rounded-xl border border-border bg-input/60 backdrop-blur-sm transition-all duration-300",
            "focus-within:border-primary/60 focus-within:bg-input focus-within:shadow-[0_0_0_4px_oklch(0.72_0.19_240_/_0.12)]",
            error && "border-destructive/60 focus-within:shadow-[0_0_0_4px_oklch(0.62_0.24_25_/_0.15)]",
          )}
        >
          {leftIcon && <span className="pl-4 text-muted-foreground">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-12 w-full bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none",
              leftIcon && "pl-2",
              rightIcon && "pr-2",
              className,
            )}
            {...props}
          />
          {rightIcon && <span className="pr-4 text-muted-foreground">{rightIcon}</span>}
        </div>
        {(hint || error) && (
          <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
