import { AnimatePresence, motion } from "framer-motion";
import React, { cloneElement, isValidElement, useId, useState } from "react";
import { cn } from "@/lib/utils";

type TooltipProps = {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  children: React.ReactElement;
};

const offsets: Record<NonNullable<TooltipProps["side"]>, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2 origin-bottom",
  bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2 origin-top",
  left: "right-full top-1/2 -translate-y-1/2 -translate-x-2 origin-right",
  right: "left-full top-1/2 -translate-y-1/2 translate-x-2 origin-left",
};

export function Tooltip({ content, side = "top", className, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  if (!isValidElement(children)) {
    throw new Error("Tooltip expects a single valid React element as a child.");
  }

  const trigger = cloneElement(children, {
    onMouseEnter: (event: React.MouseEvent) => {
      children.props.onMouseEnter?.(event);
      setOpen(true);
    },
    onMouseLeave: (event: React.MouseEvent) => {
      children.props.onMouseLeave?.(event);
      setOpen(false);
    },
    onFocus: (event: React.FocusEvent) => {
      children.props.onFocus?.(event);
      setOpen(true);
    },
    onBlur: (event: React.FocusEvent) => {
      children.props.onBlur?.(event);
      setOpen(false);
    },
    "aria-describedby": open ? id : undefined,
  });

  return (
    <div className="relative inline-flex">
      {trigger}
      <AnimatePresence>
        {open ? (
          <motion.div
            id={id}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-white/10 bg-surface/95 px-3 py-1 text-xs text-foreground shadow-lg backdrop-blur",
              offsets[side],
              className,
            )}
          >
            {content}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
