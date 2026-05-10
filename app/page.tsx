"use client";

import { useState } from "react";

type Language = "es" | "en";

const copy = {
  es: {
    nav: ["Academia", "Módulos", "Meta", "Planes"],
    pro: "Pro",
    ticker: [
      "Patch 14.9",
      "Meta: control + early tempo",
      "Winrate promedio: 51.8%",
      "Comps calientes: Sentinel Flex, Duelist Burst, Eco Lock",
    ],
    eyebrow: "The Tactic Lab Academy",
    headline: "Deja de perder. Empieza a ganar.",
    subhead:
      "Entrena decisiones, builds y adaptación al meta con una academia táctica diseñada para jugadores que quieren subir con método.",
    ctaPrimary: "Entrar al Lab",
    ctaSecondary: "Ver diagnóstico",
    problemsTitle: "Problemas frecuentes",
    problems: [
      "Copias builds sin entender el tempo.",
      "Pierdes cajas por mala lectura de riesgo.",
      "Cambias tarde cuando el lobby ya te castigó.",
    ],
    solutionTitle: "Preview TTL AI",
    solution:
      "Analiza tu lobby, detecta tu patrón de derrota y propone una ruta de mejora para las próximas 3 partidas.",
    modulesTitle: "Módulos de entrenamiento",
    modules: [
      ["¿Por qué pierdo?", "Diagnóstico de errores repetidos por fase, economía y toma de peleas."],
      ["Build Planner", "Rutas de composición con pivots, condiciones de entrada y timing."],
      ["Coach IA", "Feedback accionable después de cada partida para corregir una cosa a la vez."],
      ["Lab de cajas", "Simulador de decisiones para rollear, guardar, subir nivel o pivotar."],
      ["Player DNA", "Perfil de estilo: greed, tempo, scouting, flexibilidad y gestión de tilt."],
      ["Anti-meta", "Respuestas prácticas contra las composiciones más jugadas del patch."],
    ],
    tableTitle: "Jugadores en análisis",
    playerHeaders: ["Jugador", "Rol", "Riesgo", "Plan"],
    players: [
      ["NOVA", "Flex", "Medio", "Tempo 2-1"],
      ["KAI", "Duelist", "Alto", "Stabilize 3-2"],
      ["MIRA", "Control", "Bajo", "Eco spike"],
      ["AXEL", "Sentinel", "Medio", "Pivot late"],
    ],
    metaTitle: "Meta Tracker",
    metaItems: ["Sentinel Flex sube 4.2%", "Burst reroll cae 2.1%", "Eco Lock domina mid game"],
    plansTitle: "Planes",
    plans: [
      ["Starter", "Diagnóstico semanal y acceso a módulos base."],
      ["Pro", "Coach IA, tracker completo y planes por sesión."],
    ],
  },
  en: {
    nav: ["Academy", "Modules", "Meta", "Plans"],
    pro: "Pro",
    ticker: [
      "Patch 14.9",
      "Meta: control + early tempo",
      "Average winrate: 51.8%",
      "Hot comps: Sentinel Flex, Duelist Burst, Eco Lock",
    ],
    eyebrow: "The Tactic Lab Academy",
    headline: "Stop losing. Start winning.",
    subhead:
      "Train decisions, builds, and meta adaptation with a tactical academy built for players who want to climb with a system.",
    ctaPrimary: "Enter the Lab",
    ctaSecondary: "View diagnosis",
    problemsTitle: "Common problems",
    problems: [
      "You copy builds without understanding tempo.",
      "You lose rounds from weak risk reading.",
      "You pivot too late after the lobby has punished you.",
    ],
    solutionTitle: "TTL AI Preview",
    solution:
      "Analyzes your lobby, detects your loss pattern, and proposes an improvement route for your next 3 games.",
    modulesTitle: "Training modules",
    modules: [
      ["Why am I losing?", "Diagnose repeated mistakes by phase, economy, and fight selection."],
      ["Build Planner", "Composition routes with pivots, entry conditions, and timing."],
      ["AI Coach", "Actionable feedback after each match to fix one thing at a time."],
      ["Box Lab", "Decision simulator for rolling, saving, leveling, or pivoting."],
      ["Player DNA", "Style profile: greed, tempo, scouting, flexibility, and tilt control."],
      ["Anti-meta", "Practical answers against the patch's most played compositions."],
    ],
    tableTitle: "Players in analysis",
    playerHeaders: ["Player", "Role", "Risk", "Plan"],
    players: [
      ["NOVA", "Flex", "Medium", "Tempo 2-1"],
      ["KAI", "Duelist", "High", "Stabilize 3-2"],
      ["MIRA", "Control", "Low", "Eco spike"],
      ["AXEL", "Sentinel", "Medium", "Late pivot"],
    ],
    metaTitle: "Meta Tracker",
    metaItems: ["Sentinel Flex up 4.2%", "Burst reroll down 2.1%", "Eco Lock owns mid game"],
    plansTitle: "Plans",
    plans: [
      ["Starter", "Weekly diagnosis and base module access."],
      ["Pro", "AI Coach, full tracker, and session plans."],
    ],
  },
} satisfies Record<Language, Record<string, string | string[] | string[][]>>;

const moduleGradients = [
  "from-[#00F0B5]/20 to-cyan-500/5",
  "from-emerald-300/15 to-sky-400/10",
  "from-[#00F0B5]/15 to-fuchsia-400/10",
  "from-cyan-300/15 to-[#00F0B5]/5",
  "from-white/10 to-[#00F0B5]/10",
  "from-rose-300/10 to-[#00F0B5]/10",
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <div className="border-b border-white/10 bg-[#00F0B5] py-2 text-xs font-semibold text-[#05070A]">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-hidden px-4 sm:px-6 lg:px-8">
          {[...t.ticker, ...t.ticker].map((item, index) => (
            <span key={`${item}-${index}`} className="shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#05070A]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="TTLA home">
            <span className="grid h-10 w-10 place-items-center rounded border border-[#00F0B5]/50 bg-[#00F0B5]/10 font-black text-[#00F0B5]">
              T
            </span>
            <span className="text-lg font-black tracking-wide">TTLA</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
            {t.nav.map((item) => (
              <a key={item} href="#" className="transition hover:text-[#00F0B5]">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-white/10 bg-white/5 p-1 text-xs font-bold">
              {(["es", "en"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  className={`rounded-full px-3 py-1.5 transition ${
                    language === option ? "bg-[#00F0B5] text-[#05070A]" : "text-white/60 hover:text-white"
                  }`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>
            <button className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#05070A] transition hover:bg-[#00F0B5]">
              {t.pro}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#00F0B5]">{t.eyebrow}</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">{t.headline}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/[0.68] sm:text-lg">{t.subhead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-lg bg-[#00F0B5] px-6 py-3 text-sm font-black text-[#05070A] shadow-[0_0_30px_rgba(0,240,181,0.28)] transition hover:bg-white">
              {t.ctaPrimary}
            </button>
            <button className="rounded-lg border border-white/[0.14] px-6 py-3 text-sm font-bold text-white/80 transition hover:border-[#00F0B5]/70 hover:text-[#00F0B5]">
              {t.ctaSecondary}
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-black">{t.problemsTitle}</h2>
            <div className="mt-5 space-y-4">
              {t.problems.map((problem, index) => (
                <div key={problem} className="flex gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded border border-red-300/20 bg-red-300/10 text-xs font-black text-red-200">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/70">{problem}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-[#00F0B5]/25 bg-[#00F0B5]/10 p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black">{t.solutionTitle}</h2>
              <span className="rounded-full bg-[#00F0B5] px-3 py-1 text-xs font-black text-[#05070A]">LIVE</span>
            </div>
            <div className="mt-5 rounded border border-white/10 bg-[#05070A]/70 p-4">
              <div className="mb-4 h-2 rounded-full bg-white/10">
                <div className="h-2 w-3/4 rounded-full bg-[#00F0B5]" />
              </div>
              <p className="text-sm leading-6 text-white/[0.76]">{t.solution}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black sm:text-3xl">{t.modulesTitle}</h2>
          <div className="hidden h-px flex-1 bg-white/10 sm:block" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.modules.map(([title, description], index) => (
            <article
              key={title}
              className={`rounded-lg border border-white/10 bg-gradient-to-br ${moduleGradients[index]} p-5 transition hover:-translate-y-1 hover:border-[#00F0B5]/50`}
            >
              <div className="mb-8 flex h-10 w-10 items-center justify-center rounded border border-white/10 bg-[#05070A]/60 text-sm font-black text-[#00F0B5]">
                0{index + 1}
              </div>
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/[0.64]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
        <article className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-2xl font-black">{t.tableTitle}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.18em] text-white/[0.46]">
                <tr>
                  {t.playerHeaders.map((header) => (
                    <th key={header} className="px-5 py-4 font-bold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.players.map((player) => (
                  <tr key={player[0]} className="border-t border-white/8">
                    {player.map((cell, index) => (
                      <td key={cell} className="px-5 py-4 text-white/[0.74]">
                        <span className={index === 0 ? "font-black text-white" : ""}>{cell}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <aside className="grid gap-5">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-black">{t.metaTitle}</h2>
            <div className="mt-5 space-y-3">
              {t.metaItems.map((item) => (
                <div key={item} className="flex items-center justify-between gap-4 rounded border border-white/[0.08] bg-[#05070A]/60 px-4 py-3">
                  <span className="text-sm text-white/[0.72]">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-[#00F0B5] shadow-[0_0_16px_rgba(0,240,181,0.9)]" />
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-[#00F0B5]/25 bg-[#00F0B5]/10 p-5">
            <h2 className="text-xl font-black">{t.plansTitle}</h2>
            <div className="mt-5 space-y-4">
              {t.plans.map(([name, description]) => (
                <div key={name} className="rounded border border-white/10 bg-[#05070A]/70 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black">{name}</h3>
                    {name === "Pro" && (
                      <span className="rounded-full bg-[#00F0B5] px-2.5 py-1 text-xs font-black text-[#05070A]">
                        TTLA
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/[0.64]">{description}</p>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
