import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ open, onOpenChange, title, description, children, footer, size = "md", className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-background/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 grid place-items-center p-4"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={cn(
                    "glass-strong relative w-full rounded-2xl p-8 shadow-[var(--shadow-xl)]",
                    sizeMap[size],
                    className,
                  )}
                >
                  <Dialog.Close
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                  {title && (
                    <Dialog.Title className="font-display text-2xl text-foreground">{title}</Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                      {description}
                    </Dialog.Description>
                  )}
                  {children && <div className="mt-6">{children}</div>}
                  {footer && <div className="mt-8 flex items-center justify-end gap-3">{footer}</div>}
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
