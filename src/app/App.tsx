import { useState, useEffect } from "react";
import {
  Github, ExternalLink, Mail, Phone, MapPin, Linkedin,
  Globe, Database, Cpu, Shield, Code2, GraduationCap,
  Award, BookOpen, Crosshair, ChevronRight, Terminal,
  ArrowRight, Briefcase,
} from "lucide-react";

type Screen = "lobby" | "matchmaking" | "portfolio";
type Tab = "projetos" | "curriculo" | "formacoes" | "contato";

// ── DATA ──────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    codename: "ALPHA-01",
    name: "DevCommerce",
    desc: "Plataforma de e-commerce full-stack com gestão de estoque, dashboard administrativo e integração de pagamentos Stripe.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    status: "ATIVO",
    github: "#",
    live: "#",
  },
  {
    id: 6,
    codename: "FOXTROT-06",
    name: "MonitorX",
    desc: "Dashboard de monitoramento de infraestrutura com alertas automáticos, gráficos de métricas e histórico de incidentes.",
    tags: ["React", "Grafana", "Prometheus", "Docker"],
    status: "ATIVO",
    github: "#",
    live: "#",
  },
];

const SKILL_GROUPS = [
  {
    label: "FRONTEND",
    icon: Globe,
    items: [
      { name: "TypeScript", level: 20 },
    ],
  },
  {
    label: "BACKEND",
    icon: Database,
    items: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 35 },
      { name: "PostgreSQL / MySQL", level: 50 },
    ],
  },
  {
    label: "FERRAMENTAS",
    icon: Shield,
    items: [
      { name: "Git / GitHub", level: 60 },
      { name: "Figma", level: 45 },
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Soldado",
    company: "Exército Brasileiro",
    period: "2025",
    location: "Sapucaia do Sul, RS",
    desc: "Comprometimento com horário, organização, comunicação, trabalho em equipe",
    tags: ["Combatente de comunicações."],
  },
  
];

const EDUCATION = [
  {
    degree: "Internet das Coisas (IOT)",
    institution: "CFP SENAI Plínio Gilberto Kroeff",
    period: "2022 — 2024",
    desc: "programação de micro-controladores.",
    type: "TÉCNICO",
  },
  {
    degree: "Informática Fundamental Office e Mobile",
    institution: "SENAC",
    period: "60 HORAS",
    desc: "Word, Excel, comandos básicos do Windows.",
    type: "Curso",
  },
  {
    degree: "Montagem e Manutenção de Computadores, Redes e Notebook",
    institution: "Instituto Mix de Profissões",
    period: "63 HORAS",
    desc: "Hardware como foco principal.",
    type: "Curso",
  },
  {
    degree: "Desenvolvimento de Sistemas",
    institution: "SENAC",
    period: "2026 - 2027",
    desc: "Cursando.",
    type: "Técnico",
  },
];

const CERTIFICATIONS = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023", icon: Award },
  { name: "Professional Scrum Master I (PSM I)", issuer: "Scrum.org", year: "2022", icon: Award },
  { name: "Google Cloud Associate", issuer: "Google Cloud", year: "2023", icon: Award },
  { name: "Meta Frontend Developer Certificate", issuer: "Meta / Coursera", year: "2021", icon: BookOpen },
  { name: "Node.js Application Developer (JSNAD)", issuer: "OpenJS Foundation", year: "2022", icon: Award },
  { name: "Docker Certified Associate", issuer: "Docker Inc.", year: "2023", icon: Award },
];

const LOADING_MSGS = [
  "Inicializando protocolo...",
  "Verificando credenciais...",
  "Carregando missões...",
  "Sincronizando dados de combate...",
  "Analisando histórico de projetos...",
  "Estabelecendo conexão segura...",
  "Partida encontrada. Prepare-se.",
];

// ── GLOBAL STYLES ─────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      .font-display { font-family: 'Rajdhani', 'DM Sans', sans-serif; }
      .font-mono-valo { font-family: 'JetBrains Mono', monospace; }

      @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes matchFound {
        0% { opacity: 0; transform: scale(0.94); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes barFill {
        from { width: 0; }
      }
      @keyframes glitch {
        0%, 88%, 100% { clip-path: none; transform: none; }
        90% { clip-path: polygon(0 22%, 100% 22%, 100% 35%, 0 35%); transform: translateX(-4px); color: #FF4655; }
        92% { clip-path: polygon(0 58%, 100% 58%, 100% 70%, 0 70%); transform: translateX(4px); color: #6AEFFF; }
        94% { clip-path: none; transform: none; }
      }

      .fade-up { animation: fadeUp 0.55s ease both; }
      .fade-in { animation: fadeIn 0.4s ease both; }
      .glitch-anim { animation: glitch 7s infinite; }

      .card-clip {
        clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px));
      }
      .card-clip-sm {
        clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
      }
      .btn-clip {
        clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
      }

      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #0F1923; }
      ::-webkit-scrollbar-thumb { background: #FF4655; }
    `}</style>
  );
}

// ── APP ───────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("lobby");
  const [activeTab, setActiveTab] = useState<Tab>("projetos");
  const [matchProgress, setMatchProgress] = useState(0);

  useEffect(() => {
    if (screen !== "matchmaking") return;
    setMatchProgress(0);
    const timer = setInterval(() => {
      setMatchProgress((p) => {
        const next = p + Math.random() * 3.5 + 1.5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setScreen("portfolio"), 350);
          return 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [screen]);

  return (
    <>
      <GlobalStyles />
      {screen === "lobby" && <LobbyScreen onPlay={() => setScreen("matchmaking")} />}
      {screen === "matchmaking" && <MatchmakingScreen progress={Math.min(matchProgress, 100)} />}
      {screen === "portfolio" && <PortfolioScreen activeTab={activeTab} setActiveTab={setActiveTab} />}
    </>
  );
}

// ── LOBBY SCREEN ──────────────────────────────────────────────────
function LobbyScreen({ onPlay }: { onPlay: () => void }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#0F1923" }}
    >
      {/* diagonal bg lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 60px, rgba(255,70,85,0.025) 60px, rgba(255,70,85,0.025) 61px)",
        }}
      />
      {/* corner brackets */}
      {[
        "top-8 left-8 border-t-2 border-l-2",
        "top-8 right-8 border-t-2 border-r-2",
        "bottom-8 left-8 border-b-2 border-l-2",
        "bottom-8 right-8 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-12 h-12 hidden md:block ${cls}`}
          style={{ borderColor: "rgba(255,70,85,0.25)" }}
        />
      ))}
      {/* vertical accent lines */}
      <div className="absolute left-28 top-0 bottom-0 w-px hidden lg:block" style={{ background: "rgba(255,70,85,0.05)" }} />
      <div className="absolute right-28 top-0 bottom-0 w-px hidden lg:block" style={{ background: "rgba(255,70,85,0.05)" }} />

      {/* content — matches screenshot layout */}
      <div className="relative z-10 px-8 fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="mb-3">
          <span className="font-mono-valo text-xs tracking-[0.3em]" style={{ color: "rgba(255,70,85,0.6)" }}>
            // PORTIFÓLIO_NEXUS v2.0
          </span>
        </div>

        <h1
          className="font-display font-bold mb-3 glitch-anim relative"
          style={{
            fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
            color: "#ECE8E1",
            letterSpacing: "0.02em",
            lineHeight: 1.15,
          }}
        >
          Bem-vindo ao meu Portfolio<span style={{ color: "#FF4655" }}>Nexus</span>
        </h1>

        <p
          className="mb-10"
          style={{ color: "#6B7A8D", fontSize: "1rem", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif" }}
        >
          Desenvolvedor | Analisando Códigos e Táticas
        </p>

        <button
          onClick={onPlay}
          className="btn-clip font-display font-bold tracking-[0.15em] flex items-center gap-3 group transition-all duration-200"
          style={{
            background: "#FF4655",
            color: "#FFFFFF",
            padding: "14px 40px",
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#e03040")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#FF4655")}
        >
          ENCONTRAR PARTIDA
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* bottom status bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-8 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,70,85,0.1)" }}
      >
        <span className="font-mono-valo text-xs" style={{ color: "rgba(107,122,141,0.5)" }}>
          NEXUS // FULL-STACK DEV
        </span>
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#4ade80", animation: "pulse-dot 2s infinite" }}
          />
          <span className="font-mono-valo text-xs" style={{ color: "rgba(107,122,141,0.5)" }}>
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}

// ── MATCHMAKING SCREEN ────────────────────────────────────────────
function MatchmakingScreen({ progress }: { progress: number }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setMsgIndex((i) => Math.min(i + 1, LOADING_MSGS.length - 1)), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#0F1923" }}
    >
      {/* scan line */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(255,70,85,0.6), transparent)",
          animation: "scanline 2s linear infinite",
          pointerEvents: "none",
        }}
      />

      <div className="w-full max-w-md px-8" style={{ animation: "matchFound 0.45s ease both" }}>
        {/* header */}
        <div className="text-center mb-12">
          <p className="font-mono-valo text-xs tracking-[0.45em] mb-4" style={{ color: "#FF4655" }}>
            ◈ PARTIDA ENCONTRADA ◈
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "2.2rem", color: "#ECE8E1", letterSpacing: "0.06em" }}
          >
            CARREGANDO PERFIL
          </h2>
        </div>

        {/* agent slots */}
        <div className="flex justify-center gap-4 mb-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-11 h-11 card-clip flex items-center justify-center"
              style={{
                background: i === 2 ? "rgba(255,70,85,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 2 ? "#FF4655" : "rgba(255,255,255,0.08)"}`,
                animation: `pulse-dot ${0.8 + i * 0.15}s infinite`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <Crosshair
                className="w-4 h-4"
                style={{ color: i === 2 ? "#FF4655" : "rgba(255,255,255,0.2)" }}
              />
            </div>
          ))}
        </div>

        {/* progress bar */}
        <div className="mb-4">
          <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #FF4655, #ff7080)",
                boxShadow: "0 0 14px rgba(255,70,85,0.5)",
              }}
            />
          </div>
        </div>

        {/* status */}
        <div className="flex items-center justify-between">
          <p className="font-mono-valo text-xs" style={{ color: "#6B7A8D" }}>
            {LOADING_MSGS[msgIndex]}
          </p>
          <p className="font-display font-bold" style={{ color: "#FF4655", fontSize: "1.1rem" }}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}

// ── PORTFOLIO SCREEN ──────────────────────────────────────────────
const TABS: { id: Tab; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: "projetos", label: "PROJETOS", Icon: Code2 },
  { id: "curriculo", label: "CURRÍCULO", Icon: Briefcase },
  { id: "formacoes", label: "FORMAÇÕES", Icon: GraduationCap },
  { id: "contato", label: "CONTATO", Icon: Mail },
];

function PortfolioScreen({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
}) {
  return (
    <div className="min-h-screen" style={{ background: "#0F1923" }}>
      {/* top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14"
        style={{
          background: "rgba(15,25,35,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,70,85,0.15)",
        }}
      >
        {/* agent tag */}
        <div className="flex items-center gap-3">
          <Crosshair className="w-4 h-4" style={{ color: "#FF4655" }} />
          <span
            className="font-display font-bold tracking-[0.15em]"
            style={{ color: "#ECE8E1", fontSize: "0.9rem" }}
          >
            NEXUS<span style={{ color: "#FF4655" }}>#DEV</span>
          </span>
          <span
            className="font-mono-valo text-xs px-2 py-0.5"
            style={{ color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}
          >
            ONLINE
          </span>
        </div>

        {/* desktop tabs */}
        <nav className="hidden md:flex items-center">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex items-center gap-2 px-5 py-4 font-display font-semibold tracking-[0.1em] transition-colors duration-200"
              style={{
                color: activeTab === id ? "#ECE8E1" : "#6B7A8D",
                fontSize: "0.8rem",
                background: activeTab === id ? "rgba(255,70,85,0.08)" : "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {activeTab === id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#FF4655" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* mobile tabs */}
        <nav className="flex md:hidden items-center gap-1">
          {TABS.map(({ id, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="p-2.5 transition-colors"
              style={{ color: activeTab === id ? "#FF4655" : "#6B7A8D", background: "none", border: "none", cursor: "pointer" }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </nav>
      </header>

      {/* content */}
      <main className="pt-14 min-h-screen">
        {activeTab === "projetos" && <ProjetosTab />}
        {activeTab === "curriculo" && <CurriculoTab />}
        {activeTab === "formacoes" && <FormacoesTab />}
        {activeTab === "contato" && <ContatoTab />}
      </main>
    </div>
  );
}

// ── PROJETOS TAB ──────────────────────────────────────────────────
function ProjetosTab() {
  const statusColor: Record<string, string> = {
    ATIVO: "#4ade80",
    CONCLUÍDO: "#6B7A8D",
    BETA: "#fbbf24",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <SectionHeader codename="MISSÕES" title="Projetos" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {PROJECTS.map((p, i) => (
          <div
            key={p.id}
            className="card-clip flex flex-col fade-up transition-all duration-200"
            style={{
              background: "#16222E",
              border: "1px solid rgba(255,70,85,0.14)",
              animationDelay: `${i * 0.07}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,70,85,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,70,85,0.14)")}
          >
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderBottom: "1px solid rgba(255,70,85,0.08)" }}
            >
              <span className="font-mono-valo text-xs" style={{ color: "rgba(255,70,85,0.65)" }}>
                {p.codename}
              </span>
              <span
                className="font-mono-valo text-xs px-2 py-0.5"
                style={{ color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}44` }}
              >
                {p.status}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3
                className="font-display font-bold mb-2"
                style={{ color: "#ECE8E1", fontSize: "1.2rem", letterSpacing: "0.04em" }}
              >
                {p.name}
              </h3>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "#6B7A8D" }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono-valo text-xs px-2 py-0.5"
                    style={{ color: "#6B7A8D", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center gap-4 pt-4"
                style={{ borderTop: "1px solid rgba(255,70,85,0.08)" }}
              >
                <a
                  href={p.github}
                  className="flex items-center gap-1.5 font-mono-valo text-xs transition-colors"
                  style={{ color: "#6B7A8D", textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#ECE8E1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6B7A8D")}
                >
                  <Github className="w-3.5 h-3.5" /> CÓDIGO
                </a>
                <a
                  href={p.live}
                  className="flex items-center gap-1.5 font-mono-valo text-xs ml-auto transition-opacity"
                  style={{ color: "#FF4655", textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                >
                  DEMO <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CURRÍCULO TAB ─────────────────────────────────────────────────
function CurriculoTab() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionHeader codename="CAPACIDADES" title="Currículo" />

      {/* skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-16">
        {SKILL_GROUPS.map((group, gi) => (
          <div
            key={group.label}
            className="card-clip p-6 fade-up"
            style={{
              background: "#16222E",
              border: "1px solid rgba(255,70,85,0.14)",
              animationDelay: `${gi * 0.08}s`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <group.icon className="w-4 h-4" style={{ color: "#FF4655" }} />
              <span className="font-mono-valo text-xs tracking-[0.2em]" style={{ color: "#FF4655" }}>
                {group.label}
              </span>
            </div>
            <div className="space-y-5">
              {group.items.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono-valo text-xs" style={{ color: "#6B7A8D" }}>
                      {skill.name}
                    </span>
                    <span className="font-mono-valo text-xs" style={{ color: "#FF4655" }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${skill.level}%`,
                        background: "linear-gradient(90deg, #FF4655, #ff7080)",
                        animation: `barFill 1s ${(i + gi * 4) * 0.1}s ease both`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* experience */}
      <SectionHeader codename="HISTÓRICO" title="Experiência" />
      <div className="mt-10 relative">
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: "rgba(255,70,85,0.18)" }}
        />
        <div className="space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className="pl-12 relative fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="absolute left-2.5 top-1.5 w-3 h-3"
                style={{
                  background: "#0F1923",
                  border: "2px solid #FF4655",
                  boxShadow: "0 0 10px rgba(255,70,85,0.4)",
                }}
              />
              <div
                className="card-clip p-6 transition-all duration-200"
                style={{ background: "#16222E", border: "1px solid rgba(255,70,85,0.14)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,70,85,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,70,85,0.14)")}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3
                      className="font-display font-bold"
                      style={{ color: "#ECE8E1", fontSize: "1.15rem", letterSpacing: "0.03em" }}
                    >
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono-valo text-xs" style={{ color: "#FF4655" }}>
                        {exp.company}
                      </span>
                      <span className="font-mono-valo text-xs" style={{ color: "#6B7A8D" }}>
                        — {exp.location}
                      </span>
                    </div>
                  </div>
                  <span
                    className="font-mono-valo text-xs px-3 py-1"
                    style={{
                      color: "#6B7A8D",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7A8D" }}>
                  {exp.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono-valo text-xs px-2 py-0.5"
                      style={{ color: "#FF4655", border: "1px solid rgba(255,70,85,0.22)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── FORMAÇÕES TAB ─────────────────────────────────────────────────
function FormacoesTab() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <SectionHeader codename="TREINAMENTO" title="Formações" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-16">
        {EDUCATION.map((edu, i) => (
          <div
            key={i}
            className="card-clip p-6 fade-up"
            style={{
              background: "#16222E",
              border: "1px solid rgba(255,70,85,0.14)",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ border: "1px solid rgba(255,70,85,0.35)", background: "rgba(255,70,85,0.07)" }}
              >
                <GraduationCap className="w-5 h-5" style={{ color: "#FF4655" }} />
              </div>
              <span
                className="font-mono-valo text-xs px-2 py-1"
                style={{ color: "#FF4655", border: "1px solid rgba(255,70,85,0.28)" }}
              >
                {edu.type}
              </span>
            </div>
            <h3
              className="font-display font-bold mb-1"
              style={{ color: "#ECE8E1", fontSize: "1.1rem", letterSpacing: "0.02em" }}
            >
              {edu.degree}
            </h3>
            <p className="font-mono-valo text-xs mb-1" style={{ color: "#FF4655" }}>
              {edu.institution}
            </p>
            <p className="font-mono-valo text-xs mb-4" style={{ color: "#6B7A8D" }}>
              {edu.period}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7A8D" }}>
              {edu.desc}
            </p>
          </div>
        ))}
      </div>

      <SectionHeader codename="CONQUISTAS" title="Certificações" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {CERTIFICATIONS.map((cert, i) => (
          <div
            key={i}
            className="card-clip-sm flex items-start gap-4 p-4 fade-up transition-all duration-200"
            style={{
              background: "#16222E",
              border: "1px solid rgba(255,70,85,0.1)",
              animationDelay: `${i * 0.07}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,70,85,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,70,85,0.1)")}
          >
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0"
              style={{ border: "1px solid rgba(255,70,85,0.28)", background: "rgba(255,70,85,0.07)" }}
            >
              <cert.icon className="w-4 h-4" style={{ color: "#FF4655" }} />
            </div>
            <div>
              <p
                className="font-display font-semibold text-sm mb-0.5"
                style={{ color: "#ECE8E1", letterSpacing: "0.02em" }}
              >
                {cert.name}
              </p>
              <p className="font-mono-valo text-xs" style={{ color: "#6B7A8D" }}>
                {cert.issuer}
              </p>
              <p className="font-mono-valo text-xs mt-1" style={{ color: "rgba(255,70,85,0.65)" }}>
                {cert.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CONTATO TAB ───────────────────────────────────────────────────
function ContatoTab() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <SectionHeader codename="TRANSMISSÃO" title="Contato" />
      
      {/* Lista de informações de contato */}
      <div className="space-y-3 mt-10">
        {[
          { icon: Mail, label: "EMAIL", val: "erick.f.rodrigues0@gmail.com" },
          { icon: MapPin, label: "LOCALIZAÇÃO", val: "Sapucaia do Sul, RS — Brasil" },
        ].map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-4 p-4 card-clip-sm"
            style={{ background: "#16222E", border: "1px solid rgba(255,70,85,0.12)" }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0"
              style={{ border: "1px solid rgba(255,70,85,0.28)" }}
            >
              <c.icon className="w-4 h-4" style={{ color: "#FF4655" }} />
            </div>
            <div>
              <p className="font-mono-valo text-xs mb-0.5" style={{ color: "rgba(255,70,85,0.75)" }}>
                {c.label}
              </p>
              <p className="text-sm" style={{ color: "#ECE8E1" }}>{c.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* NOVO CARD: Botão interativo para enviar E-mail */}
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=erick.f.rodrigues0@gmail.com"
        className="mt-6 flex items-center justify-between p-4 btn-clip transition-all duration-200 group cursor-pointer fade-up"
        style={{
          background: "#FF4655",
          textDecoration: "none",
          color: "#FFFFFF",
          border: "none",
          animationDelay: "0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#e03040")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#FF4655")}
      >
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5" />
          <span className="font-display font-bold tracking-[0.15em] text-sm md:text-base">
            INICIAR PROTOCOLO DE E-MAIL
          </span>
        </div>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>

      {/* Redes Sociais */}
      <div className="flex gap-3 mt-6">
        {[
          { icon: Github, label: "GitHub", href: "https://github.com/Erick-FSR" },
          { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/erickrodrigues06" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 font-mono-valo text-xs card-clip-sm transition-all duration-200"
            style={{
              color: "#6B7A8D",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#16222E",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FF4655";
              e.currentTarget.style.borderColor = "rgba(255,70,85,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B7A8D";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            <s.icon className="w-3.5 h-3.5" />
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ── SHARED ────────────────────────────────────────────────────────
function SectionHeader({ codename, title }: { codename: string; title: string }) {
  return (
    <div>
      <p className="font-mono-valo text-xs tracking-[0.3em] mb-2" style={{ color: "rgba(255,70,85,0.6)" }}>
        // {codename}
      </p>
      <h2
        className="font-display font-bold uppercase"
        style={{
          color: "#ECE8E1",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          letterSpacing: "0.06em",
        }}
      >
        {title}
      </h2>
      <div className="flex items-center gap-3 mt-3">
        <div className="h-px w-10" style={{ background: "#FF4655" }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#FF4655" }} />
        <div className="h-px w-24" style={{ background: "rgba(255,70,85,0.2)" }} />
      </div>
    </div>
  );
}
