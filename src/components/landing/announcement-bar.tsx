import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="relative z-[60] flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-400 px-4 py-2 text-center">
      <Sparkles className="size-3.5 shrink-0 text-[#1a1128]" aria-hidden="true" />
      <p className="text-xs font-semibold tracking-wide text-[#1a1128] sm:text-sm">
        Oferta de lançamento: 50% OFF — por tempo limitado
      </p>
    </div>
  );
}
