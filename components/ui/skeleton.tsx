import { cn } from "@/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "shimmer rounded-md bg-gradient-to-r from-white/5 via-white/10 to-white/5",
        className,
      )}
      aria-hidden
      {...props}
    />
  );
}
