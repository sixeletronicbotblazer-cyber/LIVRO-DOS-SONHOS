import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  diamondClassName?: string;
}

/** Linha divisória ornamentada: linha dourada com losango central. */
export function Divider({ className, diamondClassName }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("mx-auto flex w-full max-w-xs items-center gap-3", className)}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60" />
      <span
        className={cn(
          "inline-block size-2 rotate-45 border border-amber-300/80 bg-amber-400/20",
          diamondClassName
        )}
      />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60" />
    </div>
  );
}
