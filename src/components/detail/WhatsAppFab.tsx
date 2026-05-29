import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab({ href, label = "Tanya via WhatsApp" }: { href: string; label?: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
      className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-[oklch(0.72_0.18_150)] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_-10px_oklch(0.72_0.18_150/0.7)] hover:shadow-[0_25px_80px_-10px_oklch(0.72_0.18_150/0.9)]"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[oklch(0.72_0.18_150)] opacity-60 blur-xl" />
      <motion.span
        className="absolute inset-0 -z-10 rounded-full ring-2 ring-[oklch(0.72_0.18_150)]"
        animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{label}</span>
    </motion.a>
  );
}
