"use client";

import { useMemo, useState } from "react";

type Stat = {
  label: string;
  value: number;
};

type TrainingKey =
  | "Shooting"
  | "Passing"
  | "Dribbling"
  | "Dexterity"
  | "Lower Body Strength"
  | "Aerial Strength"
  | "Defending"
  | "GK1"
  | "GK2"
  | "GK3";

type TrainingPlan = Record<TrainingKey, number>;

type PlayerModelMetric = {
  label: string;
  value: number;
  level: "high" | "medium" | "low";
};

const maxTrainingPoints = 62;

const player = {
  name: "Vinícius Júnior",
  overall: 96,
  position: "LWF",
  flag: "BR",
  tier: "S",
  archetype: "Explosivo diagonal",
  archetypeFeel:
    "Se siente como un extremo de primer paso violento: amenaza el intervalo lateral-central, gira corto y castiga cualquier defensa que tarde medio segundo en perfilarse.",
  verdict:
    "Úsalo abierto para fijar al lateral y atacar el half-space con doble toque o sprint corto. Rinde mejor con instrucciones que lo dejen recibir al pie, romper hacia dentro y finalizar antes del contacto físico.",
  basics: [
    ["Altura", "176 cm"],
    ["Peso", "73 kg"],
    ["Edad", "25"],
    ["Pie hábil", "Derecho"],
    ["Equipo", "Real Madrid"],
    ["Tipo de carta", "Epic Highlight"],
  ],
};

const statGroups: { title: string; stats: Stat[] }[] = [
  {
    title: "Attacking",
    stats: [
      { label: "Offensive Awareness", value: 88 },
      { label: "Ball Control", value: 93 },
      { label: "Dribbling", value: 96 },
      { label: "Tight Possession", value: 92 },
      { label: "Low Pass", value: 80 },
      { label: "Lofted Pass", value: 77 },
      { label: "Finishing", value: 86 },
      { label: "Heading", value: 63 },
      { label: "Place Kicking", value: 71 },
      { label: "Curl", value: 84 },
    ],
  },
  {
    title: "Defending",
    stats: [
      { label: "Defensive Awareness", value: 48 },
      { label: "Defensive Engagement", value: 55 },
      { label: "Tackling", value: 52 },
      { label: "Aggression", value: 64 },
      { label: "GK Awareness", value: 40 },
      { label: "GK Catching", value: 40 },
      { label: "GK Parrying", value: 40 },
      { label: "GK Reflexes", value: 40 },
      { label: "GK Reach", value: 40 },
    ],
  },
  {
    title: "Athleticism",
    stats: [
      { label: "Speed", value: 94 },
      { label: "Acceleration", value: 97 },
      { label: "Kicking Power", value: 82 },
      { label: "Jump", value: 72 },
      { label: "Physical", value: 68 },
      { label: "Balance", value: 91 },
      { label: "Stamina", value: 86 },
    ],
  },
];

const initialMediaPlan: TrainingPlan = {
  Shooting: 8,
  Passing: 5,
  Dribbling: 10,
  Dexterity: 12,
  "Lower Body Strength": 10,
  "Aerial Strength": 2,
  Defending: 0,
  GK1: 0,
  GK2: 0,
  GK3: 0,
};

const smartPlan: TrainingPlan = {
  Shooting: 9,
  Passing: 4,
  Dribbling: 12,
  Dexterity: 12,
  "Lower Body Strength": 11,
  "Aerial Strength": 1,
  Defending: 0,
  GK1: 0,
  GK2: 0,
  GK3: 0,
};

const ttlEngine = [
  {
    label: "Inercia de arranque",
    value: 96,
    feel: "Sale como si ya viniera acelerando; ideal para primer toque hacia dentro.",
  },
  {
    label: "Radio de giro",
    value: 94,
    feel: "Giro muy corto, perfecto para doble toque y cambios de carril en área chica.",
  },
  {
    label: "Longitud de zancada",
    value: 82,
    feel: "Zancada media-larga: gana metros rápido sin perder demasiado control.",
  },
  {
    label: "Estabilidad en duelo",
    value: 74,
    feel: "Aguanta el primer choque, pero conviene evitar centrales fuertes de frente.",
  },
];

const playerModel: PlayerModelMetric[] = [
  { label: "Arm Length", value: 62, level: "medium" },
  { label: "Shoulder Width", value: 58, level: "medium" },
  { label: "Neck Length", value: 46, level: "low" },
  { label: "Chest Measurement", value: 64, level: "medium" },
  { label: "Neck Size", value: 48, level: "low" },
  { label: "Shoulder Height", value: 70, level: "medium" },
  { label: "Leg Length", value: 84, level: "high" },
  { label: "Thigh Size", value: 72, level: "medium" },
  { label: "Waist Size", value: 55, level: "low" },
  { label: "Arm Size", value: 57, level: "medium" },
  { label: "Calf Size", value: 76, level: "high" },
];

const physics = [
  ["Leg Coverage Radius", "1.31 m"],
  ["Arm Coverage Radius", "0.76 m"],
  ["Jumping Height", "0.68 m"],
  ["Torso Collision", "Medium-Low"],
  ["Leg Length Based Height", "178 cm feel"],
];

const skills = {
  Skills: [
    "Double Touch",
    "Flip Flap",
    "Sole Control",
    "Marseille Turn",
    "Long-Range Curler",
    "First-time Shot",
    "Outside Curler",
  ],
  "Additional Skills": ["Through Passing", "One-touch Pass", "Super-sub", "Fighting Spirit"],
  "COM Skills": ["Incisive Run", "Mazing Run", "Trickster"],
};

function statColor(value: number) {
  if (value > 85) {
    return "bg-[#00F0B5] text-[#05070A]";
  }

  if (value >= 70) {
    return "bg-[#F7C948] text-[#05070A]";
  }

  return "bg-[#FF5A5F] text-white";
}

function levelColor(level: PlayerModelMetric["level"]) {
  if (level === "high") {
    return "border-[#00F0B5]/40 bg-[#00F0B5]/10 text-[#00F0B5]";
  }

  if (level === "medium") {
    return "border-[#F7C948]/40 bg-[#F7C948]/10 text-[#F7C948]";
  }

  return "border-[#FF5A5F]/40 bg-[#FF5A5F]/10 text-[#FF8A8E]";
}

function SectionCard({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <section className={`rounded-lg border border-white/10 bg-white/[0.04] ${className}`}>{children}</section>;
}

function SectionTitle({
  title,
  eyebrow,
}: Readonly<{
  title: string;
  eyebrow?: string;
}>) {
  return (
    <div className="border-b border-white/10 p-5">
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00F0B5]">{eyebrow}</p> : null}
      <h2 className="mt-1 text-xl font-black text-white">{title}</h2>
    </div>
  );
}

function StatRow({ stat }: Readonly<{ stat: Stat }>) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_48px] items-center gap-3">
      <div>
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="truncate text-xs font-semibold text-white/[0.72]">{stat.label}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className={`h-full rounded-full ${statColor(stat.value)}`} style={{ width: `${stat.value}%` }} />
        </div>
      </div>
      <span className={`rounded px-2 py-1 text-center text-xs font-black ${statColor(stat.value)}`}>{stat.value}</span>
    </div>
  );
}

function TrainingSlider({
  label,
  value,
  onChange,
  disabled = false,
}: Readonly<{
  label: TrainingKey;
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}>) {
  return (
    <label className="grid gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-white/[0.78]">{label}</span>
        <span className="rounded border border-white/10 bg-[#05070A] px-2 py-1 text-xs font-black text-[#00F0B5]">
          {value}
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="12"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-[#00F0B5] disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}

function EngineMetric({
  label,
  value,
  feel,
}: Readonly<{
  label: string;
  value: number;
  feel: string;
}>) {
  return (
    <div className="rounded border border-white/[0.08] bg-[#05070A]/70 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-sm font-black text-white">{label}</h3>
        <span className="text-lg font-black text-[#00F0B5]">{value}</span>
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#00F0B5]" style={{ width: `${value}%` }} />
      </div>
      <p className="text-xs leading-5 text-white/[0.62]">{feel}</p>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"Media" | "Smart" | "TTL Pro">("Media");
  const [mediaPlan, setMediaPlan] = useState<TrainingPlan>(initialMediaPlan);
  const [managerLevel, setManagerLevel] = useState(88);

  const usedPoints = useMemo(() => Object.values(mediaPlan).reduce((total, value) => total + value, 0), [mediaPlan]);
  const remainingPoints = maxTrainingPoints - usedPoints;

  const updateTraining = (key: TrainingKey, nextValue: number) => {
    setMediaPlan((current) => {
      const nextPlan = { ...current, [key]: nextValue };
      const nextTotal = Object.values(nextPlan).reduce((total, value) => total + value, 0);

      if (nextTotal > maxTrainingPoints) {
        return current;
      }

      return nextPlan;
    });
  };

  return (
    <main className="min-h-screen bg-[#05070A] px-4 py-5 font-sans text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-5">
        <header className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00F0B5]">The Tactic Lab Academy</p>
            <h1 className="mt-1 text-2xl font-black sm:text-3xl">TTL Player Lab</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-xs font-bold text-white/[0.68]">
            {["Database", "Meta Lab", "Build System", "Coach IA", "Academy"].map((item) => (
              <a key={item} href="#" className="rounded border border-white/10 px-3 py-2 transition hover:border-[#00F0B5] hover:text-[#00F0B5]">
                {item}
              </a>
            ))}
          </nav>
        </header>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-5">
            <SectionCard className="p-5">
              <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div className="rounded-lg border border-[#00F0B5]/25 bg-[#00F0B5]/10 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/[0.58]">{player.position}</p>
                      <p className="mt-1 text-6xl font-black leading-none text-[#00F0B5]">{player.overall}</p>
                    </div>
                    <span className="rounded border border-white/10 bg-[#05070A] px-3 py-2 text-sm font-black">{player.flag}</span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-black leading-tight">{player.name}</h2>
                    <div className="mt-3 inline-flex rounded-full bg-[#00F0B5] px-3 py-1 text-xs font-black text-[#05070A]">
                      Tier TTL {player.tier}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-lg border border-white/10 bg-[#05070A]/70 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00F0B5]">Arquetipo biomecánico TTL</p>
                    <h3 className="mt-2 text-2xl font-black">{player.archetype}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/[0.68]">{player.archetypeFeel}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {player.basics.map(([label, value]) => (
                      <div key={label} className="rounded border border-white/[0.08] bg-white/[0.03] p-3">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/[0.42]">{label}</p>
                        <p className="mt-1 text-sm font-black text-white">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-[#00F0B5]/25 bg-[#00F0B5]/10 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00F0B5]">Veredicto TTL</p>
                    <p className="mt-2 text-sm leading-6 text-white/[0.76]">{player.verdict}</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <section className="grid gap-5 xl:grid-cols-3">
              {statGroups.map((group) => (
                <SectionCard key={group.title}>
                  <SectionTitle title={group.title} />
                  <div className="grid gap-4 p-5">
                    {group.stats.map((stat) => (
                      <StatRow key={stat.label} stat={stat} />
                    ))}
                  </div>
                </SectionCard>
              ))}
            </section>

            <SectionCard>
              <SectionTitle title="Plan de entrenamiento" eyebrow="Level 32 Max / 62 pts" />
              <div className="p-5">
                <div className="mb-5 grid grid-cols-3 rounded-lg border border-white/10 bg-[#05070A]/80 p-1">
                  {(["Media", "Smart", "TTL Pro"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded px-3 py-2 text-xs font-black transition sm:text-sm ${
                        activeTab === tab ? "bg-[#00F0B5] text-[#05070A]" : "text-white/[0.64] hover:text-white"
                      }`}
                    >
                      {tab === "TTL Pro" ? "TTL Pro 🔒" : tab}
                    </button>
                  ))}
                </div>

                {activeTab === "Media" ? (
                  <div>
                    <div className="mb-5 flex flex-col gap-2 rounded border border-white/[0.08] bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-bold text-white/[0.72]">Puntos usados vs disponibles</p>
                      <p className={`text-lg font-black ${remainingPoints < 0 ? "text-[#FF5A5F]" : "text-[#00F0B5]"}`}>
                        {usedPoints}/{maxTrainingPoints} usados · {remainingPoints} libres
                      </p>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      {(Object.keys(mediaPlan) as TrainingKey[]).map((key) => (
                        <TrainingSlider key={key} label={key} value={mediaPlan[key]} onChange={(value) => updateTraining(key, value)} />
                      ))}
                    </div>
                  </div>
                ) : null}

                {activeTab === "Smart" ? (
                  <div>
                    <p className="mb-5 rounded border border-[#00F0B5]/20 bg-[#00F0B5]/10 p-4 text-sm leading-6 text-white/[0.74]">
                      Distribución optimizada fija para LWF explosivo: prioriza aceleración, regate y amenaza diagonal sin gastar en defensa ni portería.
                    </p>
                    <div className="grid gap-5 md:grid-cols-2">
                      {(Object.keys(smartPlan) as TrainingKey[]).map((key) => (
                        <TrainingSlider key={key} label={key} value={smartPlan[key]} disabled />
                      ))}
                    </div>
                  </div>
                ) : null}

                {activeTab === "TTL Pro" ? (
                  <div className="relative overflow-hidden rounded-lg border border-[#F7C948]/40 bg-[#F7C948]/10 p-8 text-center">
                    <div className="absolute inset-0 bg-[#F7C948]/10 backdrop-blur-[1px]" />
                    <div className="relative mx-auto max-w-xl">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F7C948]">TTL Pro bloqueado</p>
                      <h3 className="mt-3 text-3xl font-black text-white">Desbloquea builds biomecánicas avanzadas</h3>
                      <p className="mt-3 text-sm leading-6 text-white/[0.72]">O accede gratis con membresía del canal TTL</p>
                      <button className="mt-6 rounded-lg bg-[#F7C948] px-6 py-3 text-sm font-black text-[#05070A] transition hover:bg-white">
                        Desbloquear con Pro
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </SectionCard>
          </div>

          <aside className="grid gap-5 self-start lg:sticky lg:top-5">
            <SectionCard>
              <SectionTitle title="Motor TTL" />
              <div className="grid gap-3 p-5">
                {ttlEngine.map((metric) => (
                  <EngineMetric key={metric.label} {...metric} />
                ))}
              </div>
            </SectionCard>

            <SectionCard>
              <SectionTitle title="Manager" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-white/[0.72]">Nivel de manager</span>
                  <span className="text-2xl font-black text-[#00F0B5]">{managerLevel}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={managerLevel}
                  onChange={(event) => setManagerLevel(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer accent-[#00F0B5]"
                />
                <p className="mt-3 text-xs leading-5 text-white/[0.56]">
                  Ajusta el nivel del manager para simular boosts de afinidad y estabilidad táctica.
                </p>
              </div>
            </SectionCard>
          </aside>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
          <SectionCard>
            <SectionTitle title="Player Model" />
            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {playerModel.map((metric) => (
                <div key={metric.label} className={`rounded border p-3 ${levelColor(metric.level)}`}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.12em]">{metric.label}</span>
                    <span className="text-sm font-black">{metric.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-current" style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionTitle title="Physics calculada" />
            <div className="grid gap-3 p-5">
              {physics.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded border border-white/[0.08] bg-[#05070A]/70 px-4 py-3">
                  <span className="text-sm text-white/[0.68]">{label}</span>
                  <span className="text-sm font-black text-[#00F0B5]">{value}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </section>

        <SectionCard>
          <SectionTitle title="Habilidades" />
          <div className="grid gap-5 p-5 lg:grid-cols-3">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#00F0B5]">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="rounded border border-white/10 bg-[#05070A]/70 px-3 py-2 text-xs font-bold text-white/[0.78]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
