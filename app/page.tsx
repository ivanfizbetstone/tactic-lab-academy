export default function TTLAacademyMockup() {
  const cards = [
    {
      title: "Tactical AI",
      desc: "Lectura de formación rival, presión, automatismos y ajustes minuto a minuto.",
      status: "Premium",
      accent: "border-[#00F0B5]/45",
    },
    {
      title: "Meta Tracker",
      desc: "Tendencias del parche, counters por estilo y señales de cambio competitivo.",
      status: "Live",
      accent: "border-[#42A5FF]/45",
    },
    {
      title: "Build Lab",
      desc: "Sweet spots, biomecánica, roles híbridos y builds probadas por contexto.",
      status: "Active",
      accent: "border-[#F7C948]/45",
    },
    {
      title: "Player DNA",
      desc: "Arquetipos, stride, estabilidad, motor advantage y compatibilidad táctica.",
      status: "Classified",
      accent: "border-[#FF5C7A]/45",
    },
  ];

  const feed = [
    ["4-2-2-2", "Dominando División 1", "+18% win rate"],
    ["Wide Striders", "Buffeados en bandas", "High impact"],
    ["Auto press", "Pierde eficiencia", "-9% recovery"],
    ["Microdribblers", "Subiendo en meta", "Rising"],
  ];

  const metrics = [
    ["41K+", "Jugadores indexados"],
    ["22", "Arquetipos TTL"],
    ["5.4", "Meta actual"],
    ["∞", "Builds simuladas"],
  ];

  const checklist = [
    "Baja un interior para crear triángulo.",
    "Activa lateral ofensivo solo por izquierda.",
    "Usa falso extremo para atacar intervalo central.",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#05070A] text-[#EDF6F8] font-sans">
      <div className="pointer-events-none fixed inset-0 opacity-[0.14]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,181,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(66,165,255,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.35),rgba(5,7,10,0.95))]" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-[#060A0E]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[#00F0B5]/45 bg-[#07151A] shadow-[0_0_24px_rgba(0,240,181,0.18)]">
              <span className="text-sm font-black text-[#00F0B5]">TTL</span>
            </div>

            <div className="min-w-0">
              <div className="truncate text-lg font-black text-[#F4FBFC]">
                The Tactic Lab
              </div>
              <div className="text-xs uppercase text-[#65E7CA]">
                Tactical Command Center
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-[#95A5AD] lg:flex">
            <span className="text-[#00F0B5]">Database</span>
            <span>Meta Lab</span>
            <span>Build System</span>
            <span>Tactical AI</span>
            <span>Academy</span>
          </nav>

          <button className="rounded-lg bg-[#00F0B5] px-5 py-2.5 text-sm font-black text-[#03100D] shadow-[0_0_28px_rgba(0,240,181,0.28)] transition hover:-translate-y-0.5 hover:bg-[#6FFFE0]">
            Enter Lab
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        <section className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="relative overflow-hidden rounded-lg border border-[#214551] bg-[#071016]/95 shadow-[0_28px_120px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00F0B5] via-[#42A5FF] to-[#F7C948]" />
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px] lg:p-10">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#00F0B5]/35 bg-[#00F0B5]/10 px-3 py-1.5 text-xs font-bold uppercase text-[#6FFFE0]">
                  <span className="h-2 w-2 rounded-full bg-[#00F0B5]" />
                  Engine analysis active
                </div>

                <h1 className="max-w-3xl text-5xl font-black leading-none text-[#F7FEFF] sm:text-6xl lg:text-7xl">
                  Win the meta
                  <span className="block text-[#00F0B5]">before kickoff</span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#A7B6BE]">
                  No solo veas stats. Entiende biomecánica, engine advantage,
                  counters y decisiones tácticas reales desde un centro de mando
                  pensado para competir.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="rounded-lg bg-[#00F0B5] px-5 py-3 text-sm font-black text-[#03100D] shadow-[0_0_28px_rgba(0,240,181,0.24)] transition hover:-translate-y-0.5 hover:bg-[#6FFFE0]">
                    Analizar mi equipo
                  </button>
                  <button className="rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-[#E6F1F3] transition hover:border-[#00F0B5]/50 hover:text-[#00F0B5]">
                    Abrir coach IA
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/25 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#8FA1AA]">
                    Match scanner
                  </span>
                  <span className="rounded-full bg-[#03F15B]/15 px-2 py-1 text-xs font-bold text-[#6BFF96]">
                    Online
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    ["Threat lanes", "82%"],
                    ["Press break", "68%"],
                    ["Half-space access", "41%"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-xs text-[#B8C5CB]">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[#00F0B5]"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-lg border border-[#FF5C7A]/30 bg-[#FF5C7A]/10 p-4">
                  <div className="text-xs font-bold uppercase text-[#FF8CA2]">
                    Tactical warning
                  </div>
                  <div className="mt-2 text-sm leading-6 text-[#F4D5DC]">
                    Tus interiores abandonan el pivote demasiado pronto. El
                    rival está ganando transición central.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-lg border border-[#1F3C47] bg-[#071016]/95 p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-black text-[#F4FBFC]">
                  Live Meta Feed
                </h2>
                <span className="h-2.5 w-2.5 rounded-full bg-[#03F15B] shadow-[0_0_18px_rgba(3,241,91,0.7)]" />
              </div>

              <div className="space-y-3">
                {feed.map(([title, item, signal]) => (
                  <div
                    key={title}
                    className="rounded-lg border border-white/10 bg-black/25 p-4 transition hover:border-[#42A5FF]/45"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-black text-[#EAF2F5]">
                          {title}
                        </div>
                        <div className="mt-1 text-sm text-[#95A5AD]">{item}</div>
                      </div>
                      <span className="shrink-0 rounded-full border border-[#42A5FF]/35 bg-[#42A5FF]/10 px-2 py-1 text-xs font-bold text-[#8CCBFF]">
                        {signal}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {metrics.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-[#071016]/95 p-4"
                >
                  <div className="text-3xl font-black text-[#00F0B5]">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase text-[#7F9098]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`group rounded-lg border bg-[#071016]/95 p-5 transition hover:-translate-y-1 hover:bg-[#0A151C] ${card.accent}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#94A7AF]">
                  {card.status}
                </span>
                <span className="h-2 w-2 rounded-full bg-[#00F0B5] opacity-70" />
              </div>

              <h3 className="text-2xl font-black text-[#F1FAFC] transition group-hover:text-[#00F0B5]">
                {card.title}
              </h3>

              <p className="mt-3 min-h-20 text-sm leading-6 text-[#93A4AE]">
                {card.desc}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm font-bold text-[#C9D6DB]">
                  Open module
                </span>
                <span className="text-lg text-[#00F0B5]">→</span>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-lg border border-[#1F3C47] bg-[#071016]/95">
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="border-b border-white/10 bg-black/20 p-6 lg:border-b-0 lg:border-r lg:p-8">
              <div className="text-xs font-bold uppercase text-[#00F0B5]">
                Tactical AI
              </div>

              <h2 className="mt-3 text-4xl font-black leading-tight text-[#F4FBFC]">
                Coach intelligence
              </h2>

              <p className="mt-4 leading-7 text-[#9BAAB2]">
                Analiza formación rival, problemas ofensivos, counters y
                biomecánica en tiempo real para convertir observaciones en
                ajustes ejecutables.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Análisis de screenshots",
                  "Counters automáticos",
                  "Diagnóstico táctico",
                  "Ajustes minuto 60",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#00F0B5]" />
                    <span className="text-sm text-[#DCE6EA]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="max-w-xl rounded-lg border border-white/10 bg-black/25 p-5">
                <div className="text-xs font-bold uppercase text-[#8FA1AA]">
                  User
                </div>
                <div className="mt-2 text-lg text-[#EAF2F5]">
                  No puedo generar goles contra una 5-3-2.
                </div>
              </div>

              <div className="mt-5 max-w-2xl rounded-lg border border-[#00F0B5]/30 bg-[#08181B]/80 p-6 shadow-[0_0_38px_rgba(0,240,181,0.09)]">
                <div className="text-xs font-bold uppercase text-[#00F0B5]">
                  TTL AI Response
                </div>

                <div className="mt-4 space-y-4 text-[#DDE7EC]">
                  <p className="leading-7">
                    Tu problema no es el delantero. Tus extremos están demasiado
                    abiertos y no estás atacando el half-space. El rival tiene
                    superioridad central porque tu AMF recibe muy lejos del área.
                  </p>

                  <div className="rounded-lg border border-[#2A4D58] bg-black/25 p-4">
                    <div className="mb-3 font-black text-[#00F0B5]">
                      TTL Solution
                    </div>
                    <ul className="space-y-2 text-sm leading-6 text-[#C5D0D5]">
                      {checklist.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F7C948]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
