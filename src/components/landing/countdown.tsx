"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ls_deadline";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

function getDeadline(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    const parsed = stored ? Number.parseInt(stored, 10) : NaN;
    if (Number.isFinite(parsed) && parsed > now) return parsed;
    const fresh = now + TWENTY_FOUR_HOURS;
    window.localStorage.setItem(STORAGE_KEY, String(fresh));
    return fresh;
  } catch {
    return Date.now() + TWENTY_FOUR_HOURS;
  }
}

function format(remaining: number) {
  const total = Math.max(0, Math.floor(remaining / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

interface CountdownBoxProps {
  value: string;
  label: string;
}

function CountdownBox({ value, label }: CountdownBoxProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-amber-400/30 bg-[#160d26]/80 shadow-[0_0_30px_-12px_rgba(245,197,66,0.4)] sm:h-[4.5rem] sm:w-[4.5rem]">
        <span className="font-serif text-3xl font-bold tabular-nums text-amber-300 sm:text-4xl">
          {value}
        </span>
      </div>
      <span className="text-[0.65rem] font-medium uppercase tracking-widest text-purple-200/60">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const deadline = getDeadline();
      const left = deadline - Date.now();
      if (left <= 0) {
        // Oferta evergreen: expirou — reinicia 24h silenciosamente.
        const fresh = Date.now() + TWENTY_FOUR_HOURS;
        try {
          window.localStorage.setItem(STORAGE_KEY, String(fresh));
        } catch {
          /* ignore */
        }
        setRemaining(fresh - Date.now());
      } else {
        setRemaining(left);
      }
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const parts = format(remaining ?? 0);
  const mounted = remaining !== null;

  return (
    <div
      className="flex items-start justify-center gap-2.5 sm:gap-4"
      role="timer"
      aria-label={
        mounted
          ? `A oferta expira em ${parts.hours} horas, ${parts.minutes} minutos e ${parts.seconds} segundos`
          : "Contagem regressiva da oferta carregando"
      }
    >
      <CountdownBox
        value={mounted ? parts.hours : "--"}
        label="Horas"
      />
      <span className="pt-4 font-serif text-3xl font-bold text-amber-400/50 sm:pt-5">
        :
      </span>
      <CountdownBox
        value={mounted ? parts.minutes : "--"}
        label="Minutos"
      />
      <span className="pt-4 font-serif text-3xl font-bold text-amber-400/50 sm:pt-5">
        :
      </span>
      <CountdownBox
        value={mounted ? parts.seconds : "--"}
        label="Segundos"
      />
    </div>
  );
}
