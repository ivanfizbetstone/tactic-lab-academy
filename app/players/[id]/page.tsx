"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

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

type EngineMetric = {
  label: string;
  value: number;
  note: string;
};

type BodyScanItem = {
  label: string;
  level: BodyLevel;
};

const totalPoints = 62;

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
  tier: "S",
  archetype: "Explosive Micro-Strider",
  verdict:
    "Amenaza diagonal desde izquierda: recibe abierto, gana el primer metro y rompe hacia el half-space. No lo conviertas en tanque; su ventaja vive en aceleración, balance y micro-regate.",
  feel:
    "Centro de gravedad bajo, frecuencia de pasos alta y salida lateral explosiva. Se siente ligero, filoso y difícil de fijar si no entra en choque frontal.",
};

const quickFacts = [
  ["Best Role", "Wide Diagonal Threat"],
  ["Best Zone", "Left half-space / wing"],
  ["Risk", "Low physical contact"],
  ["Usage Rule", "Receive, accelerate, attack diagonal"],
];

const statGroups: { title: string; stats: Stat[] }[] = [
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

const trainingHelp: Record<TrainingKey, string> = {
  Shooting: "Finalización / rosca / golpeo",
  Passing: "Pase raso / pase bombeado",
  Dribbling: "Regate / control / conservación",
  Dexterity: "Aceleración / balance / giro",
  "Lower Body Strength": "Velocidad / potencia / salida",
  "Aerial Strength": "Salto / cabeceo / duelo aéreo",
  Defending: "Presión / entrada / compromiso",
  GK1: "Portero base",
  GK2: "Atajar / desviar",
  GK3: "Reflejos / reach",
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

const positions = [
  ["LWF", "105", true],
  ["CF", "91", false],
  ["RWF", "101", true],
  ["SS", "99", true],
  ["AMF", "96", false],
  ["RMF", "93", false],
  ["LMF", "98", true],
  ["CMF", "84", false],
  ["RB", "74", false],
] as const;

const engineMetrics: EngineMetric[] = [
  { label: "Inercia de arranque", value: 94, note: "Sale en corto sin cargar animaciones pesadas." },
  { label: "Radio de giro", value: 91, note: "Cambia de carril sin abrir demasiado la conducción." },
  { label: "Longitud de zancada", value: 78, note: "Gana metros sin perder microcontrol." },
  { label: "Estabilidad en duelo", value: 72, note: "Contacto lateral útil; choque frontal limitado." },
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

const physics = [
  ["Leg Coverage Radius", "1.71 m", "Protección útil en salida diagonal."],
  ["Arm Coverage Radius", "1.58 m", "Separación media sin depender del choque."],
  ["Jumping Height", "0.68 m", "Aéreo funcional, no prioritario."],
  ["Torso Collision", "48.7", "Evita centrales de frente."],
  ["Leg Length Based Height", "178 feel", "Alcance algo superior a su talla."],
];

const skills = {
  current: ["Doble Toque", "Tiro con rosca", "Exterior", "Amague y salida", "Primer toque", "Control orientado"],
  complete: ["Pase al hueco", "Pase al primer toque", "Tiro lejano"],
  destructive: ["Doble Toque", "Tiro con rosca", "Exterior", "Amague y salida"],
  com: ["Incisive Run", "Mazing Run", "Trickster"],
};

function toneForValue(value: number): Tone {
  if (value >= 85) return "green";
  if (value >= 70) return "yellow";
  return "red";
}

function toneBg(tone: Tone) {
  if (tone === "green") return "bg-[#00F0B5] text-[#05070A]";
  if (tone === "yellow") return "bg-[#F7C948] text-[#05070A]";
  return "bg-[#FF4D4D] text-white";
}

function toneText(tone: Tone) {
  if (tone === "green") return "text-[#00F0B5]";
  if (tone === "yellow") return "text-[#F7C948]";
  return "text-[#FF4D4D]";
}

function tagForValue(value: number) {
  if (value >= 85) return "Elite";
  if (value >= 70) return "Useful";
  return "Weak";
}

function levelClass(level: BodyLevel) {
  if (level === "High") return "border-[#00F0B5]/30 bg-[#00F0B5]/10 text-[#00F0B5]";
  if (level === "Medium") return "border-[#F7C948]/30 bg-[#F7C948]/10 text-[#F7C948]";
  return "border-[#FF4D4D]/30 bg-[#FF4D4D]/10 text-[#FF8A8A]";
}

function managerTier(value: number) {
  if (value >= 89) return "Boost óptimo";
  if (value >= 85) return "Boost competitivo";
  if (value >= 70) return "Boost parcial";
  return "Sin boost relevante";
}

function Pill({ children, tone = "green" }: Readonly<{ children: ReactNode; tone?: Tone }>) {
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.08em] ${toneBg(tone)}`}>{children}</span>;
}

function Panel({ children, className = "", id }: Readonly<{ children: ReactNode; className?: string; id?: string }>) {
  return (
    <section id={id} className={`rounded-lg border border-white/10 bg-[#10141D]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ eyebrow, title }: Readonly<{ eyebrow?: string; title: string }>) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/10 pb-2">
      <div>
        {eyebrow ? <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00F0B5]">{eyebrow}</p> : null}
        <h2 className="text-sm font-black uppercase tracking-[0.14em] text-white">{title}</h2>
      </div>
    </div>
  );
}

function StatRow({ stat }: Readonly<{ stat: Stat }>) {
  const tone = toneForValue(stat.value);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_44px] items-center gap-2 rounded bg-[#171B25] px-2 py-1.5">
      <div className="min-w-0">
        <div className="mb-1 flex items-center gap-2">
          <span className={`truncate text-xs font-black ${toneText(tone)}`}>{stat.label}</span>
          <span className="hidden text-[10px] font-black uppercase text-white/30 sm:inline">{tagForValue(stat.value)}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded bg-[#070A10]">
          <div className={`h-full rounded ${toneBg(tone)}`} style={{ width: `${stat.value}%` }} />
        </div>
      </div>
      <span className={`rounded px-1.5 py-1 text-center text-xs font-black ${toneBg(tone)}`}>{stat.value}</span>
    </div>
  );
}

function MetricMini({ metric }: Readonly<{ metric: EngineMetric }>) {
  const tone = toneForValue(metric.value);

  return (
    <div className="rounded bg-[#171B25] p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-black uppercase text-white/70">{metric.label}</span>
        <span className={`rounded px-1.5 py-0.5 text-xs font-black ${toneBg(tone)}`}>{metric.value}</span>
      </div>
      <div className="mb-2 h-1.5 overflow-hidden rounded bg-[#070A10]">
        <div className={`h-full rounded ${toneBg(tone)}`} style={{ width: `${metric.value}%` }} />
      </div>
      <p className="text-[11px] leading-4 text-white/45">{metric.note}</p>
    </div>
  );
}

function TrainingSlider({
  label,
  value,
  helper,
  disabled = false,
  onChange,
}: Readonly<{
  label: TrainingKey;
  value: number;
  helper: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
}>) {
  return (
    <label className="grid gap-1.5 rounded bg-[#171B25] px-2.5 py-2">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-[11px] font-black uppercase text-white/70">{label}</span>
        <span className="text-sm font-black text-white">{value}</span>
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
      <p className="text-[10px] leading-4 text-white/35">{helper}</p>
    </label>
  );
}

function IdentityCard() {
  return (
    <Panel className="overflow-hidden p-3">
      <div className="rounded-lg border border-[#00F0B5]/30 bg-[#00F0B5]/10 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/45">{player.position}</p>
            <p className="text-6xl font-black leading-none text-[#00F0B5]">{player.overall}</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#05070A] text-xs font-black">{player.country}</div>
        </div>
        <h1 className="mt-6 text-3xl font-black uppercase leading-none">{player.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill>Tier {player.tier}</Pill>
          <Pill tone="yellow">{player.cardType}</Pill>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ["Team", player.team],
          ["Foot", player.strongFoot],
          ["Height", player.height],
          ["Weight", player.weight],
          ["Age", player.age],
          ["Archetype", player.archetype],
        ].map(([label, value]) => (
          <div key={label} className="rounded bg-[#171B25] p-2">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/30">{label}</p>
            <p className="mt-1 truncate text-xs font-black text-white">{value}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PositionGrid() {
  return (
    <Panel className="p-3">
      <SectionTitle eyebrow="Map" title="Position grid" />
      <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-[#070A10] p-2">
        {positions.map(([label, value, active]) => (
          <div key={label} className={`grid h-14 place-items-center rounded text-center ${active ? "bg-[#00F0B5] text-[#05070A]" : "bg-[#171B25] text-white/35"}`}>
            <div>
              <p className="text-[10px] font-black">{label}</p>
              <p className="text-sm font-black">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export default function PlayerCockpitV2Page() {
  const [activeTab, setActiveTab] = useState<"Manual Build" | "Smart Build" | "TTL Pro">("Manual Build");
  const [manualBuild, setManualBuild] = useState<TrainingPlan>(manualInitial);
  const [manager, setManager] = useState(89);

  const usedPoints = useMemo(() => Object.values(manualBuild).reduce((total, value) => total + value, 0), [manualBuild]);
  const remainingPoints = totalPoints - usedPoints;
  const overBudget = usedPoints > totalPoints;
  const shownBuild = activeTab === "Smart Build" ? smartBuild : manualBuild;

  const updateBuild = (key: TrainingKey, value: number) => {
    setManualBuild((current) => ({ ...current, [key]: value }));
  };

  return (
    <main className="min-h-screen bg-[#05070A] bg-[linear-gradient(rgba(0,240,181,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,181,0.026)_1px,transparent_1px)] bg-[size:34px_34px] font-sans text-white">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#05070A]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-4 py-2.5">
          <Link href="/" className="shrink-0 text-xs font-black uppercase tracking-[0.18em] text-white">
            THE TACTIC LAB ACADEMY
          </Link>
          <div className="flex min-w-0 flex-1 gap-5 overflow-x-auto text-[11px] font-black uppercase tracking-[0.1em] text-white/50">
            {["Overview", "Stats", "Training", "Motor TTL", "Body Scan", "Skills"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="shrink-0 py-2 hover:text-[#00F0B5]">
                {item}
              </a>
            ))}
          </div>
          <button className="shrink-0 rounded-full bg-[#00F0B5] px-4 py-2 text-xs font-black uppercase text-[#05070A]">Pro</button>
        </div>
      </nav>

      <div className="mx-auto grid max-w-[1500px] gap-4 px-4 py-4 lg:grid-cols-[25fr_50fr_25fr]">
        <aside className="grid gap-4 self-start lg:sticky lg:top-16">
          <IdentityCard />

          <Panel id="training" className="p-3">
            <SectionTitle eyebrow="Build System" title="Training planner" />
            <div className="mb-3 grid grid-cols-3 rounded-lg bg-[#070A10] p-1">
              {(["Manual Build", "Smart Build", "TTL Pro"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded px-2 py-1.5 text-[10px] font-black uppercase ${
                    activeTab === tab ? "bg-[#00F0B5] text-[#05070A]" : "text-white/45 hover:text-white"
                  }`}
                >
                  {tab === "TTL Pro" ? "TTL Pro 🔒" : tab.replace(" Build", "")}
                </button>
              ))}
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2">
              <div className="rounded bg-[#171B25] p-2">
                <p className="text-[10px] font-black uppercase text-white/30">Used</p>
                <p className={`text-lg font-black ${overBudget ? "text-[#FF4D4D]" : "text-[#00F0B5]"}`}>{usedPoints}</p>
              </div>
              <div className="rounded bg-[#171B25] p-2">
                <p className="text-[10px] font-black uppercase text-white/30">Remain</p>
                <p className={`text-lg font-black ${remainingPoints < 0 ? "text-[#FF4D4D]" : "text-[#F7C948]"}`}>{remainingPoints}</p>
              </div>
              <div className="rounded bg-[#171B25] p-2">
                <p className="text-[10px] font-black uppercase text-white/30">Limit</p>
                <p className="text-lg font-black">{totalPoints}</p>
              </div>
            </div>

            {activeTab === "TTL Pro" ? (
              <div className="relative overflow-hidden rounded-lg border border-[#F7C948]/40 bg-[#F7C948]/10 p-4 text-center">
                <div className="absolute inset-0 bg-[#F7C948]/10 backdrop-blur-[1px]" />
                <div className="relative">
                  <p className="text-xs font-black uppercase text-[#F7C948]">TTL Pro Build bloqueada</p>
                  <p className="mt-2 text-xs leading-5 text-white/70">Accede a la build avanzada, skills recomendadas y ajustes por manager.</p>
                  <button className="mt-3 rounded bg-[#F7C948] px-4 py-2 text-xs font-black text-[#05070A]">Desbloquear con Pro</button>
                  <p className="mt-2 text-[11px] text-white/45">O accede gratis con membresía del canal TTL</p>
                </div>
              </div>
            ) : (
              <div>
                {activeTab === "Smart Build" ? (
                  <p className="mb-3 rounded border border-[#00F0B5]/20 bg-[#00F0B5]/10 p-2 text-[11px] leading-4 text-white/60">
                    Build enfocada en preservar su ventaja real: aceleración, balance, regate y salida diagonal. No intenta convertirlo en tanque.
                  </p>
                ) : null}
                {overBudget ? <p className="mb-3 rounded bg-[#FF4D4D]/10 p-2 text-xs font-bold text-[#FF8A8A]">Build sobre 62 puntos.</p> : null}
                <div className="grid gap-2">
                  {(Object.keys(shownBuild) as TrainingKey[]).map((key) => (
                    <TrainingSlider
                      key={key}
                      label={key}
                      value={shownBuild[key]}
                      helper={trainingHelp[key]}
                      disabled={activeTab === "Smart Build"}
                      onChange={(value) => updateBuild(key, value)}
                    />
                  ))}
                </div>
              </div>
            )}
          </Panel>

          <Panel className="p-3">
            <SectionTitle eyebrow="Manager Lab" title="Manager slider" />
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-white/35">Current</p>
                <p className="text-4xl font-black text-[#00F0B5]">{manager}</p>
              </div>
              <Pill tone={manager >= 89 ? "green" : manager >= 70 ? "yellow" : "red"}>{managerTier(manager)}</Pill>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={manager}
              onChange={(event) => setManager(Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer accent-[#00F0B5]"
            />
            <p className="mt-2 text-[11px] leading-4 text-white/45">
              TTL: {managerTier(manager)} para sostener aceleración, balance y consistencia táctica.
            </p>
          </Panel>
        </aside>

        <section className="grid gap-4">
          <Panel id="overview" className="p-4">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00F0B5]">Player Cockpit v2</p>
                <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">{player.name}</h1>
                <p className="mt-3 text-sm font-black uppercase text-white/45">{player.team} · {player.cardType} · {player.archetype}</p>
                <div className="mt-4 rounded-lg border border-[#00F0B5]/20 bg-[#00F0B5]/10 p-3">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#00F0B5]">TTL verdict</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{player.verdict}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickFacts.map(([label, value], index) => (
                  <div key={label} className="rounded bg-[#171B25] p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/30">{label}</p>
                    <p className={`mt-1 text-sm font-black leading-tight ${index === 2 ? "text-[#F7C948]" : "text-[#00F0B5]"}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel id="stats" className="p-4">
            <SectionTitle eyebrow="Stats" title="Compact stat matrix" />
            <div className="grid gap-4 xl:grid-cols-3">
              {statGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-white/35">{group.title}</h3>
                  <div className="grid gap-1.5">
                    {group.stats.map((stat) => (
                      <StatRow key={stat.label} stat={stat} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel id="skills" className="p-4">
            <SectionTitle eyebrow="Skill Lab" title="Skills and recommendations" />
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-xs font-black uppercase text-[#00F0B5]">Skills actuales</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.current.map((skill) => <Pill key={skill}>{skill}</Pill>)}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-black uppercase text-[#F7C948]">Completar perfil</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.complete.map((skill) => <Pill key={skill} tone="yellow">{skill}</Pill>)}
                </div>
                <h3 className="mb-2 mt-4 text-xs font-black uppercase text-[#00F0B5]">Más destructivo</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.destructive.map((skill) => <Pill key={skill}>{skill}</Pill>)}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xs font-black uppercase text-[#FF4D4D]">COM Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.com.map((skill) => <Pill key={skill} tone="red">{skill}</Pill>)}
                </div>
              </div>
            </div>
          </Panel>
        </section>

        <aside className="grid gap-4 self-start lg:sticky lg:top-16">
          <PositionGrid />

          <Panel id="motor-ttl" className="p-3">
            <SectionTitle eyebrow="Motor TTL" title="Engine Advantage" />
            <div className="grid gap-2">
              {engineMetrics.map((metric) => <MetricMini key={metric.label} metric={metric} />)}
            </div>
          </Panel>

          <Panel id="body-scan" className="p-3">
            <SectionTitle eyebrow="Body Scan" title="Summary" />
            <div className="rounded border border-[#00F0B5]/20 bg-[#00F0B5]/10 p-3">
              <p className="text-xs leading-5 text-white/70">{player.feel}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {bodyScan.map((item) => (
                <div key={item.label} className={`rounded border px-2 py-1.5 ${levelClass(item.level)}`}>
                  <p className="truncate text-[10px] font-black uppercase">{item.label}</p>
                  <p className="text-xs font-black">{item.level}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-3">
            <SectionTitle eyebrow="Physics" title="Calculated" />
            <div className="grid gap-2">
              {physics.map(([label, value, note]) => (
                <div key={label} className="rounded bg-[#171B25] p-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[11px] font-black uppercase text-white/45">{label}</p>
                    <p className="text-sm font-black text-[#F7C948]">{value}</p>
                  </div>
                  <p className="mt-1 text-[11px] leading-4 text-white/35">{note}</p>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </div>
    </main>
  );
}
