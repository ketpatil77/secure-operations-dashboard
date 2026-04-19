import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { cn } from "@/lib/utils";
import { fadeSlide, pop } from "@/lib/motion";
import { Button } from "./button";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
};

export function Modal({ open, title, description, onClose, children, primaryAction }: ModalProps) {
  const labelId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useLockBodyScroll(open);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            aria-describedby={description ? descriptionId : undefined}
            variants={pop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "glass-surface relative w-full max-w-xl rounded-2xl border border-white/15 p-6 shadow-2xl",
              "bg-gradient-to-br from-surface via-surface-alt to-surface/90",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id={labelId} className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="mt-2 text-sm text-muted">
                    {description}
                  </p>
                ) : null}
              </div>
              <Button
                aria-label="Close modal"
                variant="ghost"
                className="h-9 w-9 rounded-full border border-white/10 text-muted hover:text-foreground"
                onClick={onClose}
              >
                <X size={16} />
              </Button>
            </div>

            <motion.div variants={fadeSlide} className="mt-5 space-y-3 text-sm leading-relaxed text-slate-200">
              {children}
            </motion.div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={onClose} className="px-3 py-2 text-sm">
                Dismiss
              </Button>
              {primaryAction ? (
                <Button onClick={primaryAction.onClick} className="px-4 py-2 text-sm">
                  {primaryAction.label}
                </Button>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
