"use client";

import { useState } from "react";
import { Loader2, Mail, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/landing/section-heading";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      toast.warning("Digite seu nome (pelo menos 2 letras) para receber o capítulo.");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      toast.warning("Digite um e-mail válido para receber o capítulo.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok: boolean; message?: string; error?: string }
        | null;

      if (response.ok && data?.ok) {
        setSuccess(true);
        toast.success(data.message ?? "Capítulo 1 enviado para o seu e-mail!");
      } else {
        toast.error(
          data?.error ??
            "Não foi possível enviar o capítulo. Tente novamente em instantes."
        );
      }
    } catch {
      toast.error(
        "Falha de conexão. Verifique sua internet e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      aria-label="Receba o primeiro capítulo grátis"
      className="relative overflow-hidden border-t border-white/5 bg-[#1f1433] py-20 sm:py-24"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,197,66,0.08)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Comece grátis"
          title="Receba o primeiro capítulo sem pagar nada"
        />
        <p className="mt-4 text-center text-base text-purple-200/70 sm:text-lg">
          Digite seu e-mail e enviamos agora o Capítulo 1 — A linguagem secreta
          dos sonhos — direto na sua caixa de entrada.
        </p>

        {success ? (
          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-8 text-center backdrop-blur">
            <span className="flex size-14 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/15">
              <CircleCheckBig className="size-7 text-amber-300" aria-hidden="true" />
            </span>
            <p className="font-serif text-xl font-semibold text-amber-100 sm:text-2xl">
              Capítulo a caminho!
            </p>
            <p className="text-sm text-purple-100/80 sm:text-base">
              Verifique sua caixa de entrada e o spam.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-end"
            noValidate
          >
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              <div className="flex flex-1 flex-col gap-2">
                <Label
                  htmlFor="lead-name"
                  className="text-xs font-medium uppercase tracking-wider text-purple-200/70"
                >
                  Seu nome
                </Label>
                <Input
                  id="lead-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                  minLength={2}
                  maxLength={80}
                  className="h-12 rounded-xl border-white/15 bg-[#160d26]/80 text-[#f3ecff] placeholder:text-purple-200/40 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Label
                  htmlFor="lead-email"
                  className="text-xs font-medium uppercase tracking-wider text-purple-200/70"
                >
                  Seu e-mail
                </Label>
                <Input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="h-12 rounded-xl border-white/15 bg-[#160d26]/80 text-[#f3ecff] placeholder:text-purple-200/40 focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="h-12 shrink-0 rounded-xl bg-amber-400 px-6 text-sm font-bold text-[#1a1128] shadow-[0_0_30px_-10px_rgba(245,197,66,0.5)] transition-all hover:bg-amber-300 sm:h-12 sm:text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="size-5" aria-hidden="true" />
                  Enviar meu capítulo grátis
                </>
              )}
            </Button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-purple-200/50">
          Sem spam. Você pode sair da lista quando quiser.
        </p>
      </div>
    </section>
  );
}
