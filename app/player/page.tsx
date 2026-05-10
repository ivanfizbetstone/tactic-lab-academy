"use client";

import { useMemo, useState } from "react";

type Stat = {
  label: string;
  value: number;
  boost?: number;
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
type Level = "high" | "medium" | "low";

type PlayerModelMetric = {
  label: string;
  value: number;
  level: Level;
};

const maxTrainingPoints = 62;

const player = {
  name: "Vinícius Júnior",
  subtitle: "Prolific Winger",
  overall: 96,
  position: "LWF",
  flag: "BR",
  tier: "S",
  archetype: "Explosivo diagonal",
  archetypeFeel:
    "Primer paso muy agresivo, giro corto y salida diagonal natural. Se siente letal cuando recibe abierto y ataca el intervalo lateral-central.",
  verdict:
    "Úsalo abierto para fijar al lateral y atacar el half-space con doble toque o sprint corto. Evita duelos frontales largos contra centrales físicos.",
  basics: [
    ["Altura", "176 cm"],
    ["Peso", "73 kg"],
    ["Edad", "25"],
    ["Foot", "Derecha"],
    ["Equipo", "Real Madrid"],
    ["Carta", "Epic Highlight"],
  ],
};

const positionMap = [
  { label: "EI", value: 96, active: true },
  { label: "DC", value: 90, active: false },
  { label: "ED", value: 93, active: true },
  { label: "II", value: 94, active: true },
  { label: "MP", value: 92, active: false },
  { label: "ID", value: 91, active: false },
  { label: "LI", value: 78, active: false },
  { label: "MC", value: 81, active: false },
  { label: "LD", value: 76, active: false },
];

const statGroups: { title: string; stats: Stat[] }[] = [
  {
    title: "AGRESOR",
    stats: [
      { label: "Actitud ofensiva", value: 88, boost: 2 },
      { label: "Control de balón", value: 93, boost: 3 },
      { label: "Regate", value: 96 },
      { label: "Conservación del balón", value: 92 },
      { label: "Pase raso", value: 80, boost: 1 },
      { label: "Pase bombeado", value: 77 },
      { label: "Finalización", value: 86 },
      { label: "Cabeceo", value: 63 },
      { label: "Balón parado", value: 71 },
      { label: "Efecto", value: 84 },
    ],
  },
  {
    title: "DEFENSA",
    stats: [
      { label: "Actitud defensiva", value: 48 },
      { label: "Compromiso defensivo", value: 55 },
      { label: "Entrada", value: 52 },
      { label: "Agresividad", value: 64 },
      { label: "Portero", value: 40 },
      { label: "Atajar (PT)", value: 40 },
      { label: "Desviar (PT)", value: 40 },
      { label: "Reflejos (PT)", value: 40 },
      { label: "Cobertura (PT)", value: 40 },
    ],
  },
  {
    title: "ATLETISMO",
    stats: [
      { label: "Velocidad", value: 94, boost: 1 },
      { label: "Aceleración", value: 97, boost: 2 },
      { label: "Potencia de tiro", value: 82 },
      { label: "Salto", value: 72 },
      { label: "Físico", value: 68 },
      { label: "Equilibrio", value: 91, boost: 1 },
      { label: "Resistencia", value: 86 },
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
  ["Inercia de arranque", 96, "Sale como si ya viniera acelerando."],
  ["Radio de giro", 94, "Recorta sin abrir demasiado la carrera."],
  ["Longitud de zancada", 82, "Gana metros rápido, pero conserva control."],
  ["Estabilidad en duelo", 74, "Aguanta contacto lateral, sufre choque frontal."],
] as const;

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
  ["Leg Coverage Radius", "170.9"],
  ["Arm Coverage Radius", "157.6"],
  ["Jumping Height", "251.3"],
  ["Torso Collision", "48.7"],
  ["Leg Length Based Height", "178"],
];

const skills = {
  Habilidades: [
    "Double Touch",
    "Flip Flap",
    "Sole Control",
    "Marseille Turn",
    "Long-Range Curler",
    "First-time Shot",
    "Outside Curler",
  ],
  "Habilidades adicionales": ["Through Passing", "One-touch Pass", "Super-sub", "Fighting Spirit"],
  "Habilidades COM": ["Incisive Run", "Mazing Run", "Trickster"],
};

const otherStats = [
  ["Uso de pie malo", "Casi nunca"],
  ["Precisión pie malo", "Medio"],
  ["Regularidad", "Constante"],
  ["Resist. a lesiones", "Medio"],
];

function valueTone(value: number) {
  if (value > 85) return "bg-[#00F0B5] text-[#05070A]";
  if (value >= 70) return "bg-[#F7C948] text-[#05070A]";
  return "bg-[#FF4D5E] text-white";
}

function labelTone(value: number) {
  if (value > 85) return "text-[#00F0B5]";
  if (value >= 70) return "text-[#F7C948]";
  return "text-[#FF6A76]";
}

function levelTone(level: Level) {
  if (level === "high") return "text-[#00F0B5]";
  if (level === "medium") return "text-[#F7C948]";
  return "text-[#FF6A76]";
}

function Panel({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <section className={`rounded-lg bg-[#11141D] ${className}`}>{children}</section>;
}

function PanelTitle({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h2 className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{children}</h2>;
}

function StatRow({ stat }: Readonly<{ stat: Stat }>) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_32px] items-center gap-2 rounded bg-[#171B25] px-2 py-1.5">
      <div className="flex min-w-0 items-center gap-2">
        {stat.boost ? <span className="rounded bg-[#1CFF33] px-1.5 text-[10px] font-black text-[#05070A]">+{stat.boost}</span> : null}
        <span className={`truncate text-sm font-black ${labelTone(stat.value)}`}>{stat.label}</span>
      </div>
      <span className={`rounded px-1.5 py-1 text-center text-sm font-black ${valueTone(stat.value)}`}>{stat.value}</span>
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
    <label className="grid gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-black uppercase tracking-[0.08em] text-slate-400">{label}</span>
        <span className="text-sm font-black text-white">{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max="12"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-[#147CFF] disabled:cursor-not-allowed disabled:opacity-60"
      />
    </label>
  );
}

function PlayerCard() {
  return (
    <div className="relative h-[254px] w-[180px] overflow-hidden rounded border-2 border-[#00F0B5] bg-[#141A2C] shadow-[0_0_34px_rgba(0,240,181,0.42)] sm:h-[310px] sm:w-[220px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,240,181,0.35),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(217,70,239,0.42),transparent_35%),linear-gradient(135deg,#0D1725,#20123D_45%,#111827)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#05070A] to-transparent" />
      <div className="absolute left-3 top-3">
        <p className="text-4xl font-black leading-none text-white sm:text-5xl">{player.overall}</p>
        <p className="mt-1 text-base font-black text-white sm:text-lg">{player.position}</p>
      </div>
      <div className="absolute right-3 top-3 rounded bg-[#00F0B5] px-2 py-1 text-xs font-black text-[#05070A]">TTL {player.tier}</div>
      <div className="absolute left-1/2 top-20 h-28 w-20 -translate-x-1/2 rounded-full bg-[#F43F5E]/80 blur-xl sm:top-24 sm:h-32 sm:w-24" />
      <div className="absolute left-1/2 top-14 h-36 w-24 -translate-x-1/2 rounded-[45%] bg-gradient-to-b from-[#EA1D4D] to-[#1F4DFF] shadow-2xl sm:top-16 sm:h-44 sm:w-28" />
      <div className="absolute left-10 top-20 h-16 w-4 rotate-12 rounded-full bg-[#9B5CF6] sm:left-12 sm:top-24 sm:h-20 sm:w-5" />
      <div className="absolute right-10 top-20 h-16 w-4 -rotate-12 rounded-full bg-[#9B5CF6] sm:right-12 sm:top-24 sm:h-20 sm:w-5" />
      <div className="absolute bottom-12 left-3 right-3 sm:bottom-14">
        <h2 className="text-xl font-black leading-none text-white sm:text-2xl">{player.name}</h2>
        <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[#00F0B5]">{player.subtitle}</p>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="rounded bg-[#05070A]/80 px-2 py-1 text-xs font-black text-white">{player.flag}</span>
        <span className="text-sm font-black text-[#00F0B5]">A</span>
      </div>
    </div>
  );
}

function PositionMap() {
  return (
    <Panel className="p-3">
      <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-[#0B0E15] p-2">
        {positionMap.map((position) => (
          <div
            key={position.label}
            className={`grid h-16 place-items-center rounded text-center ${
              position.active ? "bg-emerald-600/90 text-white" : "bg-[#1A1F2B] text-slate-500"
            }`}
          >
            <div>
              <p className="text-[10px] font-black">{position.label}</p>
              <p className="text-sm font-black">{position.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded bg-[#15294A] py-2 text-center text-xs font-black text-[#61A8FF]">{player.subtitle}</div>
    </Panel>
  );
}

export default function PlayerPage() {
  const [activeTab, setActiveTab] = useState<"Media" | "Smart" | "TTL Pro">("Media");
  const [mediaPlan, setMediaPlan] = useState<TrainingPlan>(initialMediaPlan);
  const [managerLevel, setManagerLevel] = useState(89);

  const usedPoints = useMemo(() => Object.values(mediaPlan).reduce((total, value) => total + value, 0), [mediaPlan]);

  const updateTraining = (key: TrainingKey, nextValue: number) => {
    setMediaPlan((current) => {
      const nextPlan = { ...current, [key]: nextValue };
      const nextTotal = Object.values(nextPlan).reduce((total, value) => total + value, 0);

      return nextTotal > maxTrainingPoints ? current : nextPlan;
    });
  };

  return (
    <main className="min-h-screen bg-[#05070A] font-sans text-white">
      <div className="border-b border-white/10 bg-[#0C0F17]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 lg:px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-black uppercase leading-none tracking-wide sm:text-4xl">{player.name}</h1>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[#00F0B5]">{player.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 rounded border border-[#00F0B5]/30 bg-[#00F0B5]/10 px-3 py-2">
              <span className="text-xs font-black uppercase text-[#00F0B5]">Tier TTL</span>
              <span className="text-lg font-black text-white">{player.tier}</span>
            </div>
          </div>
          <nav className="flex gap-5 overflow-x-auto text-xs font-black uppercase tracking-[0.12em] text-white/70">
            {["Comparar", "Mis compilaciones", "Meta Lab", "Build System", "Coach IA", "Academy"].map((item) => (
              <a key={item} href="#" className="shrink-0 py-1 transition hover:text-[#00F0B5]">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-5 px-4 py-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:px-6">
        <aside className="grid gap-4 self-start">
          <Panel className="p-4">
            <div className="grid grid-cols-[44px_180px_64px] gap-3 sm:grid-cols-[52px_220px_76px]">
              <div className="grid content-start gap-3">
                {["🇧🇷", "RM", "TTL", "LWF"].map((item) => (
                  <div key={item} className="grid h-12 place-items-center rounded-lg bg-[#171B25] text-sm font-black text-white">
                    {item}
                  </div>
                ))}
              </div>
              <PlayerCard />
              <div className="grid content-start gap-3">
                {player.basics.slice(0, 5).map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-[#171B25] p-3 text-center">
                    <p className="text-[10px] font-black text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_44px_44px_1fr] gap-2">
              {["Prolific Winger", "TTL", "DNA", "Agility +1"].map((item) => (
                <div key={item} className="rounded-lg bg-[#171B25] px-3 py-2 text-center text-xs font-black text-[#00F0B5]">
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                {(["Media", "Smart", "TTL Pro"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-3 py-1.5 text-xs font-black uppercase ${
                      activeTab === tab ? "bg-white text-[#05070A]" : "bg-[#171B25] text-[#00F0B5]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-500">Nivel máximo</span>
              <span className="rounded bg-[#171B25] px-3 py-1 font-black">32</span>
              <span className="font-bold text-slate-500">Puntos</span>
              <span className="font-black text-[#B4FF00]">
                {usedPoints} / {maxTrainingPoints}
              </span>
            </div>

            {activeTab === "TTL Pro" ? (
              <div className="relative overflow-hidden rounded-lg border border-[#F7C948]/40 bg-[#F7C948]/10 p-5 text-center">
                <div className="absolute inset-0 bg-[#F7C948]/10 backdrop-blur-[1px]" />
                <div className="relative">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F7C948]">TTL Pro bloqueado</p>
                  <h3 className="mt-2 text-lg font-black">Build biomecánica avanzada</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">O accede gratis con membresía del canal TTL</p>
                  <button className="mt-4 rounded bg-[#F7C948] px-4 py-2 text-xs font-black text-[#05070A]">Desbloquear con Pro</button>
                </div>
              </div>
            ) : (
              <div className="grid gap-3">
                {(Object.keys(activeTab === "Media" ? mediaPlan : smartPlan) as TrainingKey[]).map((key) => (
                  <TrainingSlider
                    key={key}
                    label={key}
                    value={activeTab === "Media" ? mediaPlan[key] : smartPlan[key]}
                    disabled={activeTab === "Smart"}
                    onChange={(value) => updateTraining(key, value)}
                  />
                ))}
              </div>
            )}
          </Panel>

          <Panel className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <PanelTitle>Entrenador</PanelTitle>
              <span className="text-xs font-black text-[#00F0B5]">LOCK</span>
            </div>
            <div className="mb-4 rounded-lg bg-[#171B25] px-4 py-4 text-sm font-bold text-slate-400">Seleccionar entrenador</div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase text-slate-500">Entrenador</span>
              <input
                type="range"
                min="0"
                max="100"
                value={managerLevel}
                onChange={(event) => setManagerLevel(Number(event.target.value))}
                className="h-2 min-w-0 flex-1 cursor-pointer accent-[#147CFF]"
              />
              <span className="w-8 text-right text-lg font-black">{managerLevel}</span>
            </div>
          </Panel>

          <Panel className="p-4">
            <h2 className="text-lg font-black uppercase text-[#B4FF00]">{player.subtitle}</h2>
            <div className="mt-3 flex gap-2">
              {["LWF", "SS", "CF"].map((item) => (
                <span key={item} className="rounded bg-[#00F0B5] px-2 py-1 text-xs font-black text-[#05070A]">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">{player.verdict}</p>
          </Panel>
        </aside>

        <div className="grid gap-5">
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
            <Panel className="p-4">
              <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
                <div>
                  <PanelTitle>Arquetipo biomecánico TTL</PanelTitle>
                  <h2 className="mt-2 text-2xl font-black text-[#00F0B5]">{player.archetype}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{player.archetypeFeel}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ttlEngine.map(([label, value, feel]) => (
                    <div key={label} className="rounded bg-[#171B25] p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400">{label}</span>
                        <span className="text-base font-black text-[#00F0B5]">{value}</span>
                      </div>
                      <div className="mb-2 h-2 overflow-hidden rounded bg-[#0B0E15]">
                        <div className="h-full rounded bg-[#00F0B5]" style={{ width: `${value}%` }} />
                      </div>
                      <p className="text-[11px] leading-4 text-slate-500">{feel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <PositionMap />
          </section>

          <Panel className="p-4">
            <div className="grid gap-5 xl:grid-cols-3">
              {statGroups.map((group) => (
                <div key={group.title}>
                  <PanelTitle>{group.title}</PanelTitle>
                  <div className="mt-3 grid gap-1.5">
                    {group.stats.map((stat) => (
                      <StatRow key={stat.label} stat={stat} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <section className="grid gap-5 xl:grid-cols-3">
            <Panel className="p-4">
              <PanelTitle>Habilidades</PanelTitle>
              <div className="mt-3 grid gap-1.5">
                {skills.Habilidades.map((skill) => (
                  <div key={skill} className="rounded bg-[#171B25] px-2 py-1.5 text-sm font-black">
                    {skill}
                  </div>
                ))}
              </div>
              <PanelTitle>
                <span className="mt-5 block">Habilidades adicionales</span>
              </PanelTitle>
              <div className="mt-3 rounded bg-[#171B25] px-2 py-2 text-sm font-bold text-slate-400">+ Add skill</div>
              <PanelTitle>
                <span className="mt-5 block">Habilidades COM</span>
              </PanelTitle>
              <div className="mt-3 rounded bg-[#171B25] px-2 py-1.5 text-sm font-black">{skills["Habilidades COM"][0]}</div>
            </Panel>

            <Panel className="p-4">
              <PanelTitle>Modelo de jugador</PanelTitle>
              <div className="mt-3 grid gap-1.5">
                {playerModel.map((metric) => (
                  <div key={metric.label} className="grid grid-cols-[minmax(0,1fr)_32px] items-center gap-2 rounded bg-[#171B25] px-2 py-1.5">
                    <span className={`truncate text-sm font-black ${levelTone(metric.level)}`}>{metric.label}</span>
                    <span className={`rounded px-1.5 py-1 text-center text-sm font-black ${valueTone(metric.value * 10)}`}>
                      {Math.round(metric.value / 10)}
                    </span>
                  </div>
                ))}
              </div>
              <PanelTitle>
                <span className="mt-5 block">Otras stats</span>
              </PanelTitle>
              <div className="mt-3 grid gap-1.5">
                {otherStats.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded bg-[#171B25] px-2 py-1.5 text-sm">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-black">{value}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="p-4">
              <PanelTitle>Física</PanelTitle>
              <div className="mt-4 grid gap-4">
                {physics.map(([label, value], index) => (
                  <div key={label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">{label}</span>
                      <span className="text-lg font-black">{value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded bg-[#0B0E15]">
                      <div
                        className="h-full rounded bg-gradient-to-r from-[#8A1CFF] via-[#FF2FC3] to-[#FF7A1A]"
                        style={{ width: `${58 + index * 8}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </section>
        </div>
      </div>
    </main>
  );
}
