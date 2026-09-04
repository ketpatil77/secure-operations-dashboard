import { motion } from "framer-motion";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<typeof motion.button> & {
  variant?: ButtonVariant;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 text-black shadow-[0_10px_40px_rgba(61,209,246,0.25)] hover:from-cyan-300 hover:to-emerald-300",
  secondary:
    "bg-surface/80 text-foreground border border-white/10 hover:border-white/25 hover:bg-surface-alt/80",
  ghost:
    "bg-transparent text-muted border border-transparent hover:border-white/15 hover:bg-white/5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      loading = false,
      leadingIcon,
      trailingIcon,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        {...(!isDisabled
          ? { whileHover: { y: -1 }, whileTap: { scale: 0.98 } }
          : {})}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "ring-0 focus-visible:ring-[rgba(61,209,246,0.6)]",
          styles[variant],
          isDisabled && "opacity-60 cursor-not-allowed",
          className,
        )}
        type={type}
        disabled={isDisabled}
        {...props}
      >
        {leadingIcon ? <span className="text-base">{leadingIcon}</span> : null}
        <span className="whitespace-nowrap">{children}</span>
        {trailingIcon ? <span className="text-base">{trailingIcon}</span> : null}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
