import { forwardRef, useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-medium tracking-tight whitespace-nowrap rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 overflow-hidden group",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:shadow-[var(--shadow-glow-electric)] hover:-translate-y-0.5",
        gold:
          "bg-[var(--gradient-gold)] text-gold-foreground hover:shadow-[var(--shadow-glow-gold)] hover:-translate-y-0.5",
        glass:
          "glass text-foreground hover:bg-white/10 hover:border-white/20",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:border-primary hover:text-primary hover:bg-primary/5",
        ghost:
          "bg-transparent text-foreground hover:bg-white/5",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
  shine?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = false, shine = false, children, onMouseMove, onMouseLeave, ...props }, ref) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });
    const tx = useTransform(sx, (v) => `${v}px`);
    const ty = useTransform(sy, (v) => `${v}px`);

    function handleMove(e: MouseEvent<HTMLButtonElement>) {
      if (magnetic) {
        const el = localRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const mx = e.clientX - rect.left - rect.width / 2;
          const my = e.clientY - rect.top - rect.height / 2;
          x.set(mx * 0.25);
          y.set(my * 0.35);
        }
      }
      onMouseMove?.(e);
    }
    function handleLeave(e: MouseEvent<HTMLButtonElement>) {
      x.set(0); y.set(0);
      onMouseLeave?.(e);
    }

    return (
      <motion.button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        style={magnetic ? { x: tx, y: ty } : undefined}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {shine && (
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
