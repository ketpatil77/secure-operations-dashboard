import { motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { pop, softGlow } from "@/lib/motion";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  padding?: "sm" | "md" | "lg";
};

const paddingMap = {
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, interactive = true, padding = "md", ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={pop}
      initial="hidden"
      animate="visible"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? { scale: 0.995 } : undefined}
      className={cn(
        "glass-surface relative overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-xl",
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      <motion.span
        variants={softGlow}
        initial="rest"
        animate="rest"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        aria-hidden
      />
      {children}
    </motion.div>
  ),
);

Card.displayName = "Card";
