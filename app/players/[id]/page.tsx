"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Tone = "green" | "yellow" | "red";
type BodyLevel = "Low" | "Medium" | "High";

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

type TrainingMeta = {
  affected: string;
};

type EngineMetric = {
  label: string;
  value: number;
  sensation: string;
};

type BodyScanItem = {
  label: string;
  level: BodyLevel;
};

const availablePoints = 62;

const player = {
  name: "Vinícius Júnior",
  overall: 105,
  position: "LWF",
  country: "BR",
  team: "Real Madrid",
  cardType: "Epic / Showtime",
  strongFoot: "Derecha",
  height: "176 cm",
  weight: "73 kg",
  age: "25",
  ttlTier: "S",
  archetype: "Explosive Micro-Strider",
  feel:
    "Sensación en cancha: arranque corto, frecuencia de pasos altísima y cambio de dirección inmediato. Su amenaza aparece antes del contacto.",
  verdict:
    "Úsalo como amenaza diagonal desde la izquierda: recibir abierto, acelerar en el primer metro y atacar el half-space. No conviene convertirlo en tanque; su valor está en romper antes de que el defensor cargue la animación.",
};

const diagnosisCards = [
  ["Best Role", "Wide Diagonal Threat"],
  ["Best Zone", "Left half-space / wing"],
  ["Risk", "Low physical contact"],
  ["Usage Rule", "Receive, accelerate, attack diagonal"],
];

const statPanels: { title: string; stats: Stat[] }[] = [
  {
    title: "Técnica ofensiva",
    stats: [
      { label: "Offensive Awareness", value: 91 },
      { label: "Ball Control", value: 96 },
      { label: "Dribbling", value: 99 },
      { label: "Tight Possession", value: 95 },
      { label: "Low Pass", value: 82 },
      { label: "Lofted Pass", value: 78 },
      { label: "Finishing", value: 88 },
      { label: "Heading", value: 61 },
      { label: "Place Kicking", value: 72 },
      { label: "Curl", value: 86 },
    ],
  },
  {
    title: "Defensa y presión",
    stats: [
      { label: "Defensive Awareness", value: 48 },
      { label: "Defensive Engagement", value: 57 },
      { label: "Tackling", value: 51 },
      { label: "Aggression", value: 64 },
      { label: "Goalkeeping", value: 40 },
      { label: "Catching", value: 40 },
      { label: "Parrying", value: 40 },
      { label: "Reflexes", value: 40 },
      { label: "Reach", value: 40 },
    ],
  },
  {
    title: "Motor físico",
    stats: [
      { label: "Speed", value: 96 },
      { label: "Acceleration", value: 99 },
      { label: "Kicking Power", value: 84 },
      { label: "Jump", value: 72 },
      { label: "Physical Contact", value: 66 },
      { label: "Balance", value: 94 },
      { label: "Stamina", value: 88 },
    ],
  },
];

const trainingMeta: Record<TrainingKey, TrainingMeta> = {
  Shooting: { affected: "Finalización, efecto, potencia de tiro" },
  Passing: { affected: "Pase raso, pase bombeado, lectura de apoyo" },
  Dribbling: { affected: "Regate, control, conservación TTL" },
  Dexterity: { affected: "Aceleración, balance, radio de giro" },
  "Lower Body Strength": { affected: "Velocidad, potencia, salida diagonal" },
  "Aerial Strength": { affected: "Salto, cabeceo, duelo aéreo" },
  Defending: { affected: "Presión, entrada, compromiso" },
  GK1: { affected: "Portero base" },
  GK2: { affected: "Atajar, desviar" },
  GK3: { affected: "Reflejos, reach" },
};

const manualInitial: TrainingPlan = {
  Shooting: 6,
  Passing: 4,
  Dribbling: 10,
  Dexterity: 12,
  "Lower Body Strength": 8,
  "Aerial Strength": 0,
  Defending: 0,
  GK1: 0,
  GK2: 0,
  GK3: 0,
};

const smartBuild: TrainingPlan = {
  Shooting: 6,
  Passing: 4,
  Dribbling: 10,
  Dexterity: 12,
  "Lower Body Strength": 8,
  "Aerial Strength": 0,
  Defending: 0,
  GK1: 0,
  GK2: 0,
  GK3: 0,
};

const engineMetrics: EngineMetric[] = [
  {
    label: "Inercia de arranque",
    value: 94,
    sensation: "Sale en corto sin cargar animaciones pesadas.",
  },
  {
    label: "Radio de giro",
    value: 91,
    sensation: "Puede cambiar de carril sin abrir demasiado la conducción.",
  },
  {
    label: "Longitud de zancada",
    value: 78,
    sensation: "Zancada suficiente para ganar metros sin perder microcontrol.",
  },
  {
    label: "Estabilidad en duelo",
    value: 72,
    sensation: "Resiste contacto lateral, pero evita choques frontales largos.",
  },
];

const bodyScan: BodyScanItem[] = [
  { label: "Arm Length", level: "Medium" },
  { label: "Shoulder Width", level: "Medium" },
  { label: "Neck Length", level: "Low" },
  { label: "Chest Measurement", level: "Medium" },
  { label: "Neck Size", level: "Low" },
  { label: "Shoulder Height", level: "Medium" },
  { label: "Leg Length", level: "High" },
  { label: "Thigh Size", level: "Medium" },
  { label: "Waist Size", level: "Low" },
  { label: "Arm Size", level: "Medium" },
  { label: "Calf Size", level: "High" },
];

const physicsCards = [
  ["Leg Coverage Radius", "1.71 m", "Cobertura útil para proteger balón en salida diagonal."],
  ["Arm Coverage Radius", "1.58 m", "Ayuda media para separar marca sin depender del choque."],
  ["Jumping Height", "0.68 m", "Aéreo funcional, no es su ventaja primaria."],
  ["Torso Collision", "48.7", "Contacto de torso bajo: mejor evitar centrales de frente."],
  ["Leg Length Based Height", "178 feel", "Sensación de alcance ligeramente superior a su altura real."],
];

const skills = {
  current: ["Doble Toque", "Tiro con rosca", "Exterior", "Amague y salida", "Primer toque", "Control orientado"],
  completeProfile: ["Pase al hueco", "Pase al primer toque", "Tiro lejano"],
  destructive: ["Doble Toque", "Tiro con rosca", "Amague y salida", "Exterior"],
  com: ["Incisive Run", "Mazing Run", "Trickster"],
};

function getTone(value: number): Tone {
  if (value >= 85) return "green";
  if (value >= 70) return "yellow";
  return "red";
}

function toneClasses(tone: Tone) {
  if (tone === "green") return "bg-[#00F0B5] text-[#05070A]";
  if (tone === "yellow") return "bg-[#F7C948] text-[#05070A]";
  return "bg-[#FF4D4D] text-white";
}

function toneText(tone: Tone) {
  if (tone === "green") return "text-[#00F0B5]";
  if (tone === "yellow") return "text-[#F7C948]";
  return "text-[#FF4D4D]";
}

function interpretation(value: number) {
  if (value >= 85) return "Elite";
  if (value >= 70) return "Useful";
  return "Weak";
}

function bodyTone(level: BodyLevel) {
  if (level === "High") return "border-[#00F0B5]/40 bg-[#00F0B5]/10 text-[#00F0B5]";
  if (level === "Medium") return "border-[#F7C948]/40 bg-[#F7C948]/10 text-[#F7C948]";
  return "border-[#FF4D4D]/40 bg-[#FF4D4D]/10 text-[#FF8A8A]";
}

function managerTier(value: number) {
  if (value >= 89) return "Boost óptimo";
  if (value >= 85) return "Boost competitivo";
  if (value >= 70) return "Boost parcial";
  return "Sin boost relevante";
}

function Pill({ children, tone = "green" }: Readonly<{ children: React.ReactNode; tone?: Tone }>) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.08em] ${toneClasses(tone)}`}>
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
}>) {
  return (
    <div className="mb-5 flex flex-col gap-2 border-b border-white/10 pb-4">
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00F0B5]">{eyebrow}</p> : null}
      <h2 className="text-2xl font-black uppercase tracking-wide text-white">{title}</h2>
      {description ? <p className="max-w-3xl text-sm leading-6 text-white/[0.62]">{description}</p> : null}
    </div>
  );
}

function InfoCard({
  label,
  value,
  tone = "green",
}: Readonly<{
  label: string;
  value: string;
  tone?: Tone;
}>) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/[0.38]">{label}</p>
      <p className={`mt-2 text-lg font-black leading-tight ${toneText(tone)}`}>{value}</p>
    </article>
  );
}

function StatBar({ stat }: Readonly<{ stat: Stat }>) {
  const tone = getTone(stat.value);

  return (
    <div className="rounded-lg border border-white/[0.06] bg-[#0B0F16]/80 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-bold text-white/[0.78]">{stat.label}</span>
        <span className={`rounded px-2 py-1 text-sm font-black ${toneClasses(tone)}`}>{stat.value}</span>
      </div>
      <div className="mb-2 h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${toneClasses(tone)}`} style={{ width: `${stat.value}%` }} />
      </div>
      <p className={`text-xs font-black uppercase tracking-[0.12em] ${toneText(tone)}`}>{interpretation(stat.value)}</p>
    </div>
  );
}

function MetricBar({
  label,
  value,
  sentence,
}: Readonly<{
  label: string;
  value: number;
  sentence: string;
}>) {
  const tone = getTone(value);

  return (
    <article className="rounded-lg border border-white/10 bg-[#0B0F16]/85 p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.12em] text-white">{label}</h3>
          <p className="mt-1 text-xs leading-5 text-white/[0.54]">{sentence}</p>
        </div>
        <span className={`rounded px-2 py-1 text-lg font-black ${toneClasses(tone)}`}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${toneClasses(tone)}`} style={{ width: `${value}%` }} />
      </div>
    </article>
  );
}

function TrainingSlider({
  label,
  value,
  affected,
  disabled = false,
  onChange,
}: Readonly<{
  label: TrainingKey;
  value: number;
  affected: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
}>) {
  return (
    <label className="grid gap-2 rounded-lg border border-white/[0.06] bg-[#0B0F16]/80 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-black uppercase tracking-[0.08em] text-white">{label}</p>
          <p className="mt-1 text-xs leading-5 text-white/[0.48]">{affected}</p>
        </div>
        <span className="rounded bg-[#00F0B5] px-2.5 py-1 text-sm font-black text-[#05070A]">{value}</span>
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

function CockpitPanel({
  children,
  id,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}>) {
  return (
    <section
      id={id}
      className={`rounded-xl border border-white/10 bg-[#10141D]/85 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}

export default function PlayerDetailPage() {
  const [activeTab, setActiveTab] = useState<"Manual Build" | "Smart Build" | "TTL Pro">("Manual Build");
  const [manualBuild, setManualBuild] = useState<TrainingPlan>(manualInitial);
  const [managerValue, setManagerValue] = useState(89);

  const usedPoints = useMemo(() => Object.values(manualBuild).reduce((sum, value) => sum + value, 0), [manualBuild]);
  const remainingPoints = availablePoints - usedPoints;
  const isOverBudget = usedPoints > availablePoints;

  const updateManualBuild = (key: TrainingKey, nextValue: number) => {
    setManualBuild((current) => ({ ...current, [key]: nextValue }));
  };

  return (
    <main className="min-h-screen bg-[#05070A] bg-[linear-gradient(rgba(0,240,181,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,181,0.035)_1px,transparent_1px)] bg-[size:42px_42px] font-sans text-white">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#05070A]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 text-sm font-black uppercase tracking-[0.18em] text-white">
            THE TACTIC LAB ACADEMY
          </Link>
          <div className="flex min-w-0 flex-1 gap-5 overflow-x-auto text-xs font-black uppercase tracking-[0.12em] text-white/[0.58]">
            {["Overview", "Stats", "Training", "Motor TTL", "Body Scan", "Skills"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} className="shrink-0 py-2 transition hover:text-[#00F0B5]">
                {link}
              </a>
            ))}
          </div>
          <button className="shrink-0 rounded-full bg-[#00F0B5] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#05070A] transition hover:bg-white">
            Pro
          </button>
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section id="overview" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <CockpitPanel className="relative overflow-hidden">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#00F0B5]/10 blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div className="rounded-xl border border-[#00F0B5]/30 bg-[#00F0B5]/10 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/[0.5]">{player.position}</p>
                    <p className="mt-1 text-7xl font-black leading-none text-[#00F0B5]">{player.overall}</p>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-[#05070A] text-sm font-black">
                    {player.country}
                  </div>
                </div>
                <div className="mt-12">
                  <Pill>TTL Tier {player.ttlTier}</Pill>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-white/[0.46]">{player.cardType}</p>
                </div>
              </div>

              <div className="grid content-between gap-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#00F0B5]">Player Cockpit</p>
                  <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">{player.name}</h1>
                  <p className="mt-3 text-lg font-black uppercase text-white/[0.72]">{player.team}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Strong foot", player.strongFoot],
                    ["Height", player.height],
                    ["Weight", player.weight],
                    ["Age", player.age],
                    ["Archetype", player.archetype],
                    ["Card", player.cardType],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-white/[0.08] bg-[#05070A]/70 p-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/[0.38]">{label}</p>
                      <p className="mt-1 text-sm font-black text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3">
                  <div className="rounded-lg border border-[#00F0B5]/20 bg-[#00F0B5]/10 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#00F0B5]">Biomechanical archetype</p>
                    <p className="mt-2 text-xl font-black">{player.archetype}</p>
                    <p className="mt-2 text-sm leading-6 text-white/[0.68]">{player.feel}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-[#05070A]/70 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-white/[0.42]">TTL verdict</p>
                    <p className="mt-2 text-sm leading-6 text-white/[0.7]">{player.verdict}</p>
                  </div>
                </div>
              </div>
            </div>
          </CockpitPanel>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {diagnosisCards.map(([label, value], index) => (
              <InfoCard key={label} label={label} value={value} tone={index === 2 ? "yellow" : "green"} />
            ))}
          </div>
        </section>

        <section id="stats" className="grid gap-5 lg:grid-cols-3">
          {statPanels.map((panel) => (
            <CockpitPanel key={panel.title}>
              <SectionHeader title={panel.title} />
              <div className="grid gap-3">
                {panel.stats.map((stat) => (
                  <StatBar key={stat.label} stat={stat} />
                ))}
              </div>
            </CockpitPanel>
          ))}
        </section>

        <section id="training" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
          <CockpitPanel>
            <SectionHeader
              eyebrow="Build System"
              title="Training planner"
              description="Sliders interactivos para probar distribución de puntos antes de conectar la base real."
            />
            <div className="mb-5 grid grid-cols-3 rounded-xl border border-white/10 bg-[#05070A]/80 p-1">
              {(["Manual Build", "Smart Build", "TTL Pro"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-3 py-2 text-xs font-black uppercase tracking-[0.08em] transition ${
                    activeTab === tab ? "bg-[#00F0B5] text-[#05070A]" : "text-white/[0.6] hover:text-white"
                  }`}
                >
                  {tab === "TTL Pro" ? "TTL Pro 🔒" : tab}
                </button>
              ))}
            </div>

            {activeTab === "Manual Build" ? (
              <div>
                <div className="mb-5 grid gap-3 sm:grid-cols-3">
                  <InfoCard label="Used points" value={`${usedPoints} / ${availablePoints}`} tone={isOverBudget ? "red" : "green"} />
                  <InfoCard label="Remaining" value={`${remainingPoints}`} tone={remainingPoints < 0 ? "red" : "yellow"} />
                  <InfoCard label="Status" value={isOverBudget ? "Over budget" : "Valid build"} tone={isOverBudget ? "red" : "green"} />
                </div>
                {isOverBudget ? (
                  <p className="mb-5 rounded-lg border border-[#FF4D4D]/30 bg-[#FF4D4D]/10 p-3 text-sm font-bold text-[#FF8A8A]">
                    Esta build excede los 62 puntos disponibles. Baja una categoría para volver al rango legal.
                  </p>
                ) : null}
                <div className="grid gap-3 md:grid-cols-2">
                  {(Object.keys(manualBuild) as TrainingKey[]).map((key) => (
                    <TrainingSlider
                      key={key}
                      label={key}
                      value={manualBuild[key]}
                      affected={trainingMeta[key].affected}
                      onChange={(value) => updateManualBuild(key, value)}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === "Smart Build" ? (
              <div>
                <p className="mb-5 rounded-lg border border-[#00F0B5]/20 bg-[#00F0B5]/10 p-4 text-sm leading-6 text-white/[0.72]">
                  Build enfocada en preservar su ventaja real: aceleración, balance, regate y salida diagonal. No intenta convertirlo en tanque.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {(Object.keys(smartBuild) as TrainingKey[]).map((key) => (
                    <TrainingSlider key={key} label={key} value={smartBuild[key]} affected={trainingMeta[key].affected} disabled />
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === "TTL Pro" ? (
              <div className="relative overflow-hidden rounded-xl border border-[#F7C948]/40 bg-[#F7C948]/10 p-8 text-center">
                <div className="absolute inset-0 bg-[#F7C948]/10 backdrop-blur-[2px]" />
                <div className="relative mx-auto max-w-xl">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F7C948]">TTL Pro Build bloqueada</p>
                  <h3 className="mt-3 text-3xl font-black uppercase leading-tight">Accede a la build avanzada, skills recomendadas y ajustes por manager.</h3>
                  <button className="mt-6 rounded-lg bg-[#F7C948] px-6 py-3 text-sm font-black uppercase text-[#05070A] transition hover:bg-white">
                    Desbloquear con Pro
                  </button>
                  <p className="mt-4 text-sm text-white/[0.68]">O accede gratis con membresía del canal TTL</p>
                </div>
              </div>
            ) : null}
          </CockpitPanel>

          <CockpitPanel id="manager-lab" className="self-start">
            <SectionHeader eyebrow="Manager Lab" title="Proficiency boost" />
            <div className="rounded-xl border border-white/10 bg-[#05070A]/70 p-5">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/[0.42]">Manager value</p>
                  <p className="mt-1 text-5xl font-black text-[#00F0B5]">{managerValue}</p>
                </div>
                <Pill tone={managerValue >= 89 ? "green" : managerValue >= 70 ? "yellow" : "red"}>{managerTier(managerValue)}</Pill>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={managerValue}
                onChange={(event) => setManagerValue(Number(event.target.value))}
                className="h-2 w-full cursor-pointer accent-[#00F0B5]"
              />
              <p className="mt-4 text-sm leading-6 text-white/[0.64]">
                TTL interpreta este manager como {managerTier(managerValue).toLowerCase()}: cuanto más cerca de 90+, más estable se vuelve la
                ventaja de aceleración y balance.
              </p>
            </div>
          </CockpitPanel>
        </section>

        <section id="motor-ttl">
          <CockpitPanel>
            <SectionHeader
              eyebrow="Motor TTL"
              title="ENGINE ADVANTAGE"
              description="Lectura biomecánica de cómo se mueve el jugador antes de mirar solo números de carta."
            />
            <div className="grid gap-4 lg:grid-cols-4">
              {engineMetrics.map((metric) => (
                <MetricBar key={metric.label} label={metric.label} value={metric.value} sentence={metric.sensation} />
              ))}
            </div>
          </CockpitPanel>
        </section>

        <section id="body-scan" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <CockpitPanel>
            <SectionHeader eyebrow="Body Scan TTL" title="Player Model" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {bodyScan.map((item) => (
                <div key={item.label} className={`rounded-lg border p-4 ${bodyTone(item.level)}`}>
                  <p className="text-xs font-black uppercase tracking-[0.14em]">{item.label}</p>
                  <p className="mt-2 text-lg font-black">{item.level}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-[#00F0B5]/20 bg-[#00F0B5]/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00F0B5]">Biomechanical interpretation</p>
              <p className="mt-3 text-sm leading-6 text-white/[0.72]">
                Centro de gravedad bajo, buena frecuencia de pasos y salida lateral explosiva. Su ventaja nace del primer metro, no del choque.
              </p>
            </div>
          </CockpitPanel>

          <CockpitPanel>
            <SectionHeader eyebrow="Calculated Physics" title="Physics calculated" />
            <div className="grid gap-3">
              {physicsCards.map(([label, value, explanation]) => (
                <article key={label} className="rounded-lg border border-white/[0.08] bg-[#05070A]/70 p-4">
                  <div className="mb-2 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#00F0B5]">HUD metric</p>
                      <h3 className="mt-1 text-sm font-black uppercase text-white">{label}</h3>
                    </div>
                    <span className="text-xl font-black text-[#F7C948]">{value}</span>
                  </div>
                  <p className="text-xs leading-5 text-white/[0.58]">{explanation}</p>
                </article>
              ))}
            </div>
          </CockpitPanel>
        </section>

        <section id="skills">
          <CockpitPanel>
            <SectionHeader eyebrow="Skill Lab" title="Skills" />
            <div className="grid gap-5 lg:grid-cols-3">
              <div>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#00F0B5]">Skills actuales</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.current.map((skill) => (
                    <Pill key={skill}>{skill}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#F7C948]">Additional Skills recomendadas</h3>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-white/[0.42]">Completar perfil</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {skills.completeProfile.map((skill) => (
                    <Pill key={skill} tone="yellow">
                      {skill}
                    </Pill>
                  ))}
                </div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-white/[0.42]">Hacerlo más destructivo</p>
                <div className="flex flex-wrap gap-2">
                  {skills.destructive.map((skill) => (
                    <Pill key={skill}>{skill}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-white">COM Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.com.map((skill) => (
                    <Pill key={skill} tone="red">
                      {skill}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>
          </CockpitPanel>
        </section>
      </div>
    </main>
  );
}
