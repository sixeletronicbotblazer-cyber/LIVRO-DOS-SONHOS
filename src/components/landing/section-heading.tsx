import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 font-serif text-3xl leading-tight font-semibold text-[#f3ecff] sm:text-4xl md:text-5xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-purple-200/70 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}
