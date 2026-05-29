import type { HTMLAttributes, ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  container?: "default" | "wide" | "narrow" | "full";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[88rem]",
  full: "max-w-none",
};
const padding = {
  sm: "py-16",
  md: "py-24",
  lg: "py-32",
  xl: "py-40",
};

export function Section({
  eyebrow,
  title,
  description,
  align = "left",
  container = "default",
  spacing = "lg",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(padding[spacing], className)} {...props}>
      <div className={cn("mx-auto px-6", widths[container])}>
        {(eyebrow || title || description) && (
          <div className={cn("mb-14 space-y-5", align === "center" && "mx-auto max-w-3xl text-center")}>
            {eyebrow && (
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-primary">{eyebrow}</p>
            )}
            {title && <h2 className="text-balance text-4xl md:text-5xl lg:text-6xl">{title}</h2>}
            {description && (
              <p className="text-balance text-lg text-muted-foreground md:text-xl">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export interface StaggerProps extends HTMLMotionProps<"div"> {
  delay?: number;
  stagger?: number;
}
export function Stagger({ delay = 0, stagger = 0.08, children, ...props }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

