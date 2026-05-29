import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-surface-elevated/60",
        className,
      )}
      {...props}
    >
      <div className="shimmer absolute inset-0" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  );
}
