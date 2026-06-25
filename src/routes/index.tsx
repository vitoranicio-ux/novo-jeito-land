import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Um Novo Jeito de Lidar com a Ansiedade — Guia ACT por Mariana Anício",
      },
      {
        name: "description",
        content:
          "Guia digital baseado em ACT para desenvolver uma nova forma de se relacionar com a ansiedade. Criado por Mariana Anício, psicóloga.",
      },
      {
        property: "og:title",
        content: "Um Novo Jeito de Lidar com a Ansiedade",
      },
      {
        property: "og:description",
        content:
          "Você não precisa esperar a ansiedade desaparecer para começar a viver. Guia prático baseado em ACT.",
      },
    ],
  }),
  component: LandingPage,
});

/* ──────────────────────────────── Utilities ───────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = As as unknown as React.ElementType;
  return (
    <Tag
      ref={ref as never}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

function WaveDivider({ color = "#F2EFE8" }: { color?: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="block w-full h-12 sm:h-16"
      aria-hidden
    >
      <path
        d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z"
        fill={color}
      />
    </svg>
  );
}

function CTAButton({
  children,
  pulse = false,
  full = false,
  size = "md",
}: {
  children: React.ReactNode;
  pulse?: boolean;
  full?: boolean;
  size?: "md" | "lg";
}) {
  const padding =
    size === "lg" ? "px-12 py-5 text-[18px]" : "px-10 py-[18px] text-[17px]";
  return (
    <a
      href="#comprar"
      className={`group inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 ${padding} ${full ? "w-full" : ""}`}
      style={{
        backgroundColor: "#CC6A39",
        fontFamily: "Inter, sans-serif",
        animation: pulse ? "pulse-cta 2.5s infinite" : undefined,
      }}
    >
      {children}
    </a>
  );
}

/* ──────────────────────────────── Mockup ──────────────────────────────────── */

function BookMockup({ width = 260 }: { width?: number }) {
  return (
    <div
      className="relative"
      style={{
        width,
        aspectRatio: "3 / 4",
        background: "linear-gradient(145deg, #A8B5A2, #7B8C9B)",
        borderRadius: "8px 18px 18px 8px",
        boxShadow:
          "-6px 0 0 #8B9E84, 0 20px 60px rgba(107,67,37,0.25), 0 4px 12px rgba(107,67,37,0.15)",
        transform: "rotate(2deg)",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-between text-white px-6 py-8 text-center">
        <div style={{ fontFamily: "Inter", fontSize: 11, opacity: 0.75 }}>
          Mariana Anício
        </div>
        <div className="flex flex-col items-center gap-5">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path
              d="M10 45 C 20 25, 40 25, 50 45"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M15 38 C 25 22, 40 28, 50 18"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
          <h3
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 1.2,
            }}
          >
            Um Novo Jeito de Lidar com a Ansiedade
          </h3>
        </div>
        <div style={{ fontFamily: "Inter", fontSize: 10, opacity: 0.7 }}>
          Psicóloga ACT
        </div>
      </div>
      <div
        className="absolute -top-3 -right-4 px-3.5 py-1.5 text-white whitespace-nowrap"
        style={{
          backgroundColor: "#CC6A39",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: 12,
          borderRadius: 20,
          transform: "rotate(12deg)",
        }}
      >
        + 2 bônus incluídos
      </div>
    </div>
  );
}

/* ──────────────────────────────── Header ──────────────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "#F2EFE8" : "transparent",
        boxShadow: scrolled ? "0 1px 20px rgba(107,67,37,0.1)" : "none",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-5 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <a
          href="#top"
          className="text-center sm:text-left leading-tight"
          style={{ color: "#6B4325", fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}
        >
          <div style={{ fontSize: 20 }}>Mariana Anício</div>
          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 500 }}>Psicóloga ACT</div>
        </a>
        <a
          href="#comprar"
          className="px-6 py-2.5 text-white text-[15px] transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: "#CC6A39",
            borderRadius: 10,
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
          }}
        >
          Quero o guia →
        </a>
      </div>
    </header>
  );
}

/* ──────────────────────────────── Hero ────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-36 sm:pt-32 pb-20 sm:pb-28 px-5 sm:px-10"
      style={{ backgroundColor: "#F2EFE8" }}
    >
      <svg
        className="absolute -top-20 -right-20 w-[400px] h-[400px] pointer-events-none"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <path
          d="M200,40 C300,40 360,120 360,200 C360,300 280,360 200,360 C100,360 40,280 40,200 C40,120 120,40 200,40 Z"
          fill="#A8B5A2"
          opacity="0.10"
        />
      </svg>

      <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <Reveal>
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                color: "#6B4325",
                lineHeight: 1.1,
              }}
              className="text-[38px] sm:text-[52px] lg:text-[64px]"
            >
              Você não precisa
              <br /> esperar a ansiedade
              <br /> desaparecer para
              <br />
              <em style={{ color: "#CC6A39", fontStyle: "italic" }}>começar a viver.</em>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p
              className="mt-7 text-[16px] sm:text-[18px]"
              style={{ color: "#8B5E3C", lineHeight: 1.7, maxWidth: 560 }}
            >
              Um guia digital criado por uma psicóloga especializada em ACT para quem
              sofre com ansiedade, excesso de pensamentos e a necessidade constante de
              controlar tudo — e está pronto para uma forma diferente de lidar com isso.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 9",
                backgroundColor: "#6B4325",
                borderRadius: 16,
                maxWidth: 560,
              }}
            >
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="grid place-items-center"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    animation: "pulse-cta 2.5s infinite",
                  }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="#CC6A39">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p
              className="mt-3 text-[13px]"
              style={{ color: "#8B5E3C", fontFamily: "Inter, sans-serif" }}
            >
              ▶ Assista: Mariana apresenta o guia em 2 minutos
            </p>
          </Reveal>

          <Reveal delay={280} className="mt-8">
            <div className="w-full sm:w-auto inline-block">
              <CTAButton pulse>Quero começar agora — R$ 37,90</CTAButton>
            </div>
            <p
              className="mt-4 text-[13px]"
              style={{ color: "#8B5E3C", fontFamily: "Inter, sans-serif" }}
            >
              🔒 Acesso imediato · Garantia de 7 dias · PDF + bônus incluídos
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="hidden lg:flex justify-center">
          <BookMockup width={260} />
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Identificação ────────────────────────────── */

function Identificacao() {
  const items = [
    "Minha cabeça não para — especialmente quando finalmente deito para descansar.",
    "Fico antecipando problemas que podem nem acontecer, mas não consigo parar de pensar.",
    "Sinto que preciso controlar tudo para me sentir segura. Quando não consigo, a ansiedade piora.",
    "Já tentei respirar fundo, pensar positivo, me distrair — e a ansiedade continua lá.",
    "Vivo no futuro ou no passado. Raramente estou de verdade no momento presente.",
    "A sensação de alerta constante me cansa — mas eu não sei como desligar.",
  ];
  return (
    <>
      <WaveDivider color="#F2EFE8" />
      <section className="px-5 sm:px-10 py-20 sm:py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <h2
              className="text-[30px] sm:text-[48px] text-center"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 600,
                fontStyle: "italic",
                color: "#6B4325",
                lineHeight: 1.15,
              }}
            >
              Você se reconhece
              <br /> em algum desses?
            </h2>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-2 gap-5">
            {items.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="h-full"
                  style={{
                    backgroundColor: "#F2EFE8",
                    borderLeft: "3px solid #A8B5A2",
                    borderRadius: 12,
                    padding: "24px 28px",
                  }}
                >
                  <p
                    style={{
                      color: "#6B4325",
                      fontFamily: "Inter, sans-serif",
                      fontSize: 16,
                      lineHeight: 1.6,
                    }}
                  >
                    “{t}”
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p
              className="mt-14 text-center text-[20px] sm:text-[24px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontStyle: "italic",
                color: "#CC6A39",
                lineHeight: 1.4,
              }}
            >
              “Se pelo menos um desses ressoa com você,
              <br className="hidden sm:block" /> este guia foi feito para onde você está agora.”
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────── Ciclo da ansiedade ───────────────────────── */

function Ciclo() {
  const nodes = [
    "Pensamento preocupante",
    "Sensação de ameaça",
    "Ansiedade aumenta",
    "Tentativa de controle ou evitação",
    "Alívio momentâneo",
  ];
  return (
    <>
      <WaveDivider color="#FFFFFF" />
      <section className="px-5 sm:px-10 py-20 sm:py-24" style={{ backgroundColor: "#F2EFE8" }}>
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <h2
              className="text-[30px] sm:text-[48px] text-center"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                color: "#6B4325",
                lineHeight: 1.15,
              }}
            >
              Entenda por que a ansiedade
              <br /> parece nunca ter fim.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p
              className="mt-6 text-center text-[16px] sm:text-[18px] max-w-2xl mx-auto"
              style={{ color: "#8B5E3C", lineHeight: 1.7 }}
            >
              Muitas pessoas ficam presas em um ciclo que se retroalimenta sem perceber —
              e quanto mais tentam sair, mais fundo entram.
            </p>
          </Reveal>

          {/* Desktop: circular */}
          <Reveal delay={180}>
            <div className="hidden md:block mt-14">
              <div className="relative mx-auto" style={{ maxWidth: 560, aspectRatio: "1/1" }}>
                <svg viewBox="0 0 560 560" className="absolute inset-0 w-full h-full">
                  <circle
                    cx="280"
                    cy="280"
                    r="220"
                    fill="none"
                    stroke="#A8B5A2"
                    strokeWidth="1.5"
                  />
                  {/* Arrows between nodes (approx) */}
                  {[0, 1, 2, 3].map((i) => {
                    const a1 = (-90 + i * 72) * (Math.PI / 180);
                    const a2 = (-90 + (i + 1) * 72) * (Math.PI / 180);
                    const r = 220;
                    const x1 = 280 + r * Math.cos(a1);
                    const y1 = 280 + r * Math.sin(a1);
                    const x2 = 280 + r * Math.cos(a2);
                    const y2 = 280 + r * Math.sin(a2);
                    return (
                      <path
                        key={i}
                        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                        stroke="#A8B5A2"
                        strokeWidth="1.5"
                        fill="none"
                        markerEnd="url(#arrowSage)"
                      />
                    );
                  })}
                  {/* Dashed closing arrow */}
                  {(() => {
                    const a1 = (-90 + 4 * 72) * (Math.PI / 180);
                    const a2 = -90 * (Math.PI / 180);
                    const r = 220;
                    const x1 = 280 + r * Math.cos(a1);
                    const y1 = 280 + r * Math.sin(a1);
                    const x2 = 280 + r * Math.cos(a2);
                    const y2 = 280 + r * Math.sin(a2);
                    return (
                      <path
                        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                        stroke="#C78162"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 4"
                        markerEnd="url(#arrowClay)"
                      />
                    );
                  })()}
                  <defs>
                    <marker
                      id="arrowSage"
                      markerWidth="8"
                      markerHeight="8"
                      refX="6"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M0,0 L8,4 L0,8 Z" fill="#A8B5A2" />
                    </marker>
                    <marker
                      id="arrowClay"
                      markerWidth="8"
                      markerHeight="8"
                      refX="6"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M0,0 L8,4 L0,8 Z" fill="#C78162" />
                    </marker>
                  </defs>
                </svg>

                {/* Center */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center text-center text-white"
                  style={{
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    backgroundColor: "#6B4325",
                    fontFamily: "Cormorant Garamond, serif",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: 1.2,
                  }}
                >
                  <span>
                    Ciclo da
                    <br /> Ansiedade
                  </span>
                </div>

                {/* Nodes */}
                {nodes.map((n, i) => {
                  const angle = (-90 + i * 72) * (Math.PI / 180);
                  const r = 220;
                  const x = 50 + (Math.cos(angle) * r * 100) / 560;
                  const y = 50 + (Math.sin(angle) * r * 100) / 560;
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="whitespace-nowrap"
                        style={{
                          backgroundColor: "#FFFFFF",
                          border: "1.5px solid #C78162",
                          borderRadius: 24,
                          padding: "10px 18px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: 13,
                          color: "#6B4325",
                          boxShadow: "0 2px 12px rgba(107,67,37,0.10)",
                        }}
                      >
                        {n}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Mobile: linear */}
          <div className="md:hidden mt-10 flex flex-col items-center gap-3">
            {nodes.map((n, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #C78162",
                    borderRadius: 24,
                    padding: "10px 18px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#6B4325",
                    boxShadow: "0 2px 12px rgba(107,67,37,0.10)",
                    textAlign: "center",
                  }}
                >
                  {n}
                </div>
                {i < nodes.length - 1 && (
                  <svg width="14" height="20" viewBox="0 0 14 20">
                    <path d="M7 0v16 M2 12l5 6 5-6" stroke="#A8B5A2" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <Reveal delay={120}>
            <p
              className="mt-12 text-center text-[16px] sm:text-[17px] max-w-2xl mx-auto"
              style={{ color: "#8B5E3C", lineHeight: 1.7 }}
            >
              Quanto mais tentamos eliminar completamente a ansiedade, mais ela tende a
              permanecer presente.
              <br />
              <br />
              A saída não está em lutar contra ela — está em aprender uma nova forma de
              se relacionar com o que você sente.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────── O Problema ───────────────────────────────── */

function Problema() {
  return (
    <>
      <WaveDivider color="#F2EFE8" />
      <section className="px-5 sm:px-10 py-20 sm:py-28" style={{ backgroundColor: "#6B4325" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal>
            <h2
              className="text-[30px] sm:text-[48px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.15,
              }}
            >
              O problema não é a ansiedade.
              <br /> É a guerra que travamos
              <br /> contra ela.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div
              className="mt-8 space-y-6 text-[16px] sm:text-[17px] text-left sm:text-center"
              style={{ color: "#F2EFE8", lineHeight: 1.7, fontFamily: "Inter, sans-serif" }}
            >
              <p>
                A maioria das pessoas aprende uma única estratégia para lidar com pensamentos
                e emoções difíceis: combatê-los. Suprimir. Controlar. Tentar forçar a mente
                a parar.
              </p>
              <p>
                O paradoxo é que quanto mais você luta contra um pensamento ansioso, mais
                atenção e energia você dá a ele — e mais forte ele fica.
              </p>
              <p>Isso não é fraqueza. É como o sistema nervoso funciona.</p>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p
              className="mt-12 text-[20px] sm:text-[24px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontStyle: "italic",
                color: "#C78162",
                lineHeight: 1.4,
              }}
            >
              “Existe uma saída. Mas ela não passa por tentar controlar mais — passa por
              mudar a relação com o que você está sentindo.”
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────── Nova Perspectiva ─────────────────────────── */

function NovaPerspectiva() {
  return (
    <>
      <WaveDivider color="#6B4325" />
      <section className="px-5 sm:px-10 py-20 sm:py-24" style={{ backgroundColor: "#F2EFE8" }}>
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <h2
              className="text-center text-[30px] sm:text-[48px]"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                color: "#6B4325",
                lineHeight: 1.15,
              }}
            >
              Um novo jeito de se
              <br /> relacionar com a ansiedade.
            </h2>
          </Reveal>

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <Reveal>
              <div
                className="h-full"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(199,129,98,0.4)",
                  borderRadius: 16,
                  padding: 32,
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#8B5E3C",
                    letterSpacing: "0.12em",
                  }}
                >
                  A ABORDAGEM COMUM
                </p>
                <ul className="mt-5 space-y-3" style={{ color: "#8B5E3C", fontSize: 16 }}>
                  {[
                    "“Controle seus pensamentos”",
                    "“Não pense nisso”",
                    "“Force-se a se sentir melhor”",
                    "“Elimine a ansiedade”",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span style={{ color: "#C78162" }}>✕</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div
                className="h-full"
                style={{
                  backgroundColor: "rgba(168,181,162,0.15)",
                  border: "2px solid #A8B5A2",
                  borderRadius: 16,
                  padding: 32,
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#6B4325",
                    letterSpacing: "0.12em",
                  }}
                >
                  A ABORDAGEM ACT
                </p>
                <ul className="mt-5 space-y-3" style={{ color: "#6B4325", fontSize: 16 }}>
                  {[
                    "Observe pensamentos sem ser dominado por eles",
                    "Faça espaço para emoções sem amplificá-las",
                    "Aja em direção ao que importa — mesmo com desconforto",
                    "Desenvolva uma relação diferente com a ansiedade",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span style={{ color: "#A8B5A2" }}>✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <p
              className="mt-12 max-w-3xl mx-auto text-center text-[16px] sm:text-[17px]"
              style={{ color: "#8B5E3C", lineHeight: 1.7 }}
            >
              A ACT — Terapia de Aceitação e Compromisso — é uma abordagem da psicologia
              contemporânea com décadas de pesquisa e evidências clínicas. Não é autoajuda.
              É uma forma estruturada de desenvolver flexibilidade psicológica: a capacidade
              de agir de acordo com o que importa mesmo quando pensamentos e emoções
              difíceis estão presentes.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────── O Produto ────────────────────────────────── */

function Produto() {
  return (
    <section
      id="produto"
      className="px-5 sm:px-10 py-20 sm:py-24"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <h2
            className="text-[30px] sm:text-[48px] text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              color: "#6B4325",
              lineHeight: 1.15,
            }}
          >
            Um guia criado para quem
            <br /> quer algo que funcione
            <br /> de verdade.
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-[auto_1fr] gap-12 items-start">
          <Reveal>
            <div className="flex justify-center md:justify-start">
              <BookMockup width={300} />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p
                className="text-[22px] sm:text-[26px]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#CC6A39",
                }}
              >
                “Um Novo Jeito de Lidar com a Ansiedade”
              </p>
              <p className="mt-5" style={{ color: "#8B5E3C", lineHeight: 1.7 }}>
                Um guia digital baseado nos princípios da ACT — com linguagem acessível,
                exercícios práticos e uma estrutura que você consegue aplicar sozinho, no
                seu ritmo.
              </p>
              <p className="mt-4" style={{ color: "#8B5E3C", lineHeight: 1.7 }}>
                Não é um resumo de conceitos teóricos. É um material construído para quem
                está no meio da experiência e precisa de algo concreto para começar a se
                mover diferente.
              </p>

              <ul className="mt-7 space-y-2.5">
                {[
                  "Você sofre com ansiedade frequente ou pensamentos acelerados",
                  "Já tentou “controlar” e não funcionou",
                  "Quer ferramentas práticas — não só teoria",
                  "Está em terapia e quer complementar o processo",
                  "Não está em terapia e quer um ponto de partida sólido",
                  "Está pronto para uma relação diferente com o que sente",
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-3"
                    style={{ color: "#6B4325", fontSize: 16 }}
                  >
                    <span style={{ color: "#A8B5A2" }}>✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-7"
                style={{
                  backgroundColor: "#F2EFE8",
                  borderRadius: 8,
                  padding: 16,
                  color: "#8B5E3C",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                Este guia tem caráter psicoeducativo. Se você está em crise aguda, com
                pensamentos de automutilação ou vivendo uma emergência de saúde mental,
                por favor busque apoio profissional imediatamente.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Conteúdo ─────────────────────────────────── */

function Conteudo() {
  const chapters = [
    {
      n: "01",
      t: "Entendendo a ansiedade de verdade",
      d: "A diferença entre ansiedade funcional e disfuncional. Por que seu sistema de alarme está mal calibrado — não quebrado.",
    },
    {
      n: "02",
      t: "Por que lutar contra pensamentos piora tudo",
      d: "O paradoxo do controle e o efeito rebote dos pensamentos. O que a ciência diz sobre tentar suprimir o que sentimos.",
    },
    {
      n: "03",
      t: "Você não é seus pensamentos",
      d: "Desfusão cognitiva: como criar distância dos pensamentos automáticos sem lutar contra eles.",
    },
    {
      n: "04",
      t: "Fazendo espaço para as emoções",
      d: "Aceitação não é resignação. É parar de fugir para que as emoções parem de dominar você.",
    },
    {
      n: "05",
      t: "O que realmente importa para você",
      d: "Clareza de valores: como viver em direção ao que importa mesmo quando a ansiedade está presente.",
    },
    {
      n: "06",
      t: "Ferramentas para momentos difíceis",
      d: "Respiração 4-4-6, técnica 5-4-3-2-1 e um protocolo de 3 minutos para quando a ansiedade escala.",
    },
    {
      n: "07",
      t: "Construindo uma prática real",
      d: "Uma rotina diária de 5 minutos. Checklist semanal. Como continuar depois do guia.",
    },
  ];
  return (
    <section className="px-5 sm:px-10 py-20 sm:py-24" style={{ backgroundColor: "#F2EFE8" }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <h2
            className="text-[30px] sm:text-[48px] text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              color: "#6B4325",
              lineHeight: 1.15,
            }}
          >
            Sete capítulos.
            <br /> Uma forma diferente
            <br /> de se relacionar com a ansiedade.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 60}>
              <div
                className="h-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(168,181,162,0.4)",
                  borderRadius: 16,
                  padding: 28,
                  boxShadow: "0 4px 24px rgba(107,67,37,0.05)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 700,
                    fontSize: 40,
                    color: "rgba(168,181,162,0.6)",
                    lineHeight: 1,
                  }}
                >
                  {c.n}
                </div>
                <h3
                  className="mt-2"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "#6B4325",
                  }}
                >
                  {c.t}
                </h3>
                <p
                  className="mt-3"
                  style={{ color: "#8B5E3C", fontSize: 15, lineHeight: 1.65 }}
                >
                  {c.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── O que você recebe ────────────────────────── */

function Recebe() {
  return (
    <section className="px-5 sm:px-10 py-20 sm:py-28" style={{ backgroundColor: "#6B4325" }}>
      <div className="max-w-[820px] mx-auto">
        <Reveal>
          <h2
            className="text-[30px] sm:text-[48px] text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.15,
            }}
          >
            Tudo que está
            <br /> incluído no seu acesso.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-5">
          {/* Principal */}
          <Reveal>
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 16,
                padding: 32,
              }}
            >
              <span
                className="inline-block"
                style={{
                  backgroundColor: "#CC6A39",
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 12,
                  padding: "5px 14px",
                  borderRadius: 20,
                }}
              >
                PRODUTO PRINCIPAL
              </span>
              <h3
                className="mt-4"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 600,
                  fontSize: 26,
                  color: "#FFFFFF",
                }}
              >
                Um Novo Jeito de Lidar com a Ansiedade
              </h3>
              <p
                className="mt-2"
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.65,
                }}
              >
                Guia digital em PDF · 7 capítulos completos · Exercícios práticos ·
                Checklist semanal · Protocolo para crises · Download imediato
              </p>
            </div>
          </Reveal>

          {[
            {
              tag: "BÔNUS 01",
              bg: "#A8B5A2",
              fg: "#6B4325",
              title: "Checklist de Gatilhos da Ansiedade",
              desc: "Um guia rápido para identificar os padrões, situações e contextos que costumam ativar a sua ansiedade — e o que fazer quando isso acontece.",
              valor: "Valor: R$ 17,00",
            },
            {
              tag: "BÔNUS 02",
              bg: "#C78162",
              fg: "#FFFFFF",
              title: "Cartão de Emergência Emocional",
              desc: "PDF compacto para salvar no celular. O que fazer (e o que evitar) nos momentos difíceis — com exercício de respiração, técnica de ancoragem, frases de desfusão e lembretes importantes.",
              valor: "Valor: R$ 12,00",
            },
          ].map((b, i) => (
            <Reveal key={b.tag} delay={i * 80}>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: 28,
                }}
              >
                <span
                  className="inline-block"
                  style={{
                    backgroundColor: b.bg,
                    color: b.fg,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    padding: "5px 14px",
                    borderRadius: 20,
                  }}
                >
                  {b.tag}
                </span>
                <h3
                  className="mt-4"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 600,
                    fontSize: 24,
                    color: "#FFFFFF",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.65,
                  }}
                >
                  {b.desc}
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    textDecoration: "line-through",
                  }}
                >
                  {b.valor}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 text-center">
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              Valor total dos itens: R$ 66,90
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                fontSize: 56,
                color: "#CC6A39",
                lineHeight: 1.1,
              }}
            >
              Hoje por R$ 37,90
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              Acesso imediato após o pagamento
            </p>
            <div className="mt-8 inline-block">
              <CTAButton size="lg" pulse>
                Quero tudo isso por R$ 37,90 →
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Sobre Mariana ────────────────────────────── */

function Mariana() {
  return (
    <section className="px-5 sm:px-10 py-20 sm:py-24" style={{ backgroundColor: "#F2EFE8" }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <h2
            className="text-[30px] sm:text-[48px] text-center md:text-left"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              color: "#6B4325",
              lineHeight: 1.15,
            }}
          >
            Mariana Anício
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-[auto_1fr] gap-12 items-start">
          <Reveal>
            <div className="flex flex-col items-center gap-3">
              <div
                className="grid place-items-center"
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background: "linear-gradient(145deg, #A8B5A2, #7B8C9B)",
                  border: "4px solid #CC6A39",
                  boxShadow: "0 8px 40px rgba(107,67,37,0.2)",
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 700,
                  fontSize: 96,
                  color: "#F2EFE8",
                }}
              >
                M
              </div>
              <a
                href="https://instagram.com/marianaanicio_"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#CC6A39", fontSize: 14 }}
              >
                @marianaanicio_
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#7B8C9B",
                }}
              >
                Psicóloga · Especialista em ACT · CRP ___
              </p>
              <div
                className="mt-4"
                style={{ width: 48, height: 3, backgroundColor: "#CC6A39" }}
              />
              <div
                className="mt-6 space-y-5"
                style={{ color: "#8B5E3C", lineHeight: 1.7, fontSize: 16 }}
              >
                <p>
                  Trabalho com psicologia orientada por valores — ajudando pessoas a
                  construírem clareza sobre o que importa de verdade, e a encontrarem
                  leveza para viver isso.
                </p>
                <p>
                  Sou especializada em ACT (Terapia de Aceitação e Compromisso), uma
                  abordagem baseada em evidências que vai além do alívio de sintomas — e
                  trabalha a relação que a pessoa tem com sua própria experiência
                  interna.
                </p>
                <p>
                  Este guia é uma extensão do que faço na prática clínica. É material
                  criado com cuidado, para quem está no meio da experiência e precisa de
                  algo concreto para começar a se mover diferente.
                </p>
              </div>
              <p
                className="mt-8 text-[20px] sm:text-[22px]"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontStyle: "italic",
                  color: "#CC6A39",
                  lineHeight: 1.4,
                }}
              >
                “O que você vive hoje te aproxima de quem você quer ser?”
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Depoimentos ──────────────────────────────── */

function Depoimentos() {
  const cards = [
    {
      t: "Eu tentava controlar cada pensamento ansioso e ficava exausta. O guia me mostrou que a saída não era controlar mais — era parar de lutar. Parece simples, mas muda tudo.",
      n: "Ana L.",
      d: "Professora · São Paulo",
    },
    {
      t: "Já li vários materiais sobre ansiedade. Este foi o primeiro que não me pediu para “pensar positivo”. A abordagem é diferente — e faz sentido de verdade.",
      n: "Camila R.",
      d: "Designer · Belo Horizonte",
    },
    {
      t: "Estou em terapia e usei o guia como complemento. Me ajudou a praticar no dia a dia o que trabalhamos nas sessões. O cartão de emergência salvou algumas noites difíceis.",
      n: "Fernanda M.",
      d: "Professora · Curitiba",
    },
  ];
  return (
    <section className="px-5 sm:px-10 py-20 sm:py-24" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <h2
            className="text-[30px] sm:text-[42px] text-center max-w-3xl mx-auto"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: "#6B4325",
              lineHeight: 1.2,
            }}
          >
            Pessoas que desenvolveram uma relação mais saudável com a ansiedade relatam:
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 100}>
              <div
                className="h-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#F2EFE8",
                  border: "1px solid rgba(168,181,162,0.3)",
                  borderRadius: 20,
                  padding: 32,
                  boxShadow: "0 4px 20px rgba(107,67,37,0.05)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: 72,
                    color: "rgba(168,181,162,0.5)",
                    lineHeight: 0.6,
                  }}
                >
                  “
                </div>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "#6B4325",
                    lineHeight: 1.7,
                  }}
                >
                  {c.t}
                </p>
                <div
                  className="my-5"
                  style={{ height: 1, backgroundColor: "rgba(168,181,162,0.4)" }}
                />
                <div style={{ color: "#CC6A39", letterSpacing: 2 }}>★★★★★</div>
                <p
                  className="mt-2"
                  style={{ fontWeight: 600, fontSize: 14, color: "#6B4325" }}
                >
                  — {c.n}
                </p>
                <p style={{ fontSize: 13, color: "#8B5E3C" }}>{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p
          className="mt-8 text-center"
          style={{ fontSize: 12, color: "#8B5E3C", opacity: 0.7 }}
        >
          * Placeholders representativos. A Mariana substituirá pelos depoimentos reais.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────── FAQ ──────────────────────────────────────── */

function FAQ() {
  const items = [
    {
      q: "Preciso estar em terapia para usar este guia?",
      a: "Não. O guia foi criado para ser usado de forma independente, no seu ritmo. Se você já está em terapia, ele funciona como um excelente complemento entre sessões. Se não está, é um ponto de partida estruturado e seguro.",
    },
    {
      q: "Este guia funciona para ansiedade grave ou transtorno diagnosticado?",
      a: "Este material tem caráter psicoeducativo e foi criado para quem convive com ansiedade no dia a dia — pensamentos acelerados, preocupação excessiva, necessidade de controle. Para ansiedade grave ou transtornos clínicos, o acompanhamento profissional é essencial. O guia pode ser recurso complementar, mas não substitui tratamento.",
    },
    {
      q: "Como vou receber o material?",
      a: "Após a confirmação do pagamento, você recebe um e-mail com o link de acesso imediatamente. O guia e os dois bônus são arquivos PDF que você salva no celular, tablet ou computador e acessa a qualquer hora — sem precisar de internet depois do download.",
    },
    {
      q: "Tem garantia?",
      a: "Sim. Se em 7 dias você sentir que o material não trouxe nenhum valor, basta enviar um e-mail e devolvemos o valor integral. Sem burocracia, sem questionamentos.",
    },
    {
      q: "A abordagem ACT é científica? Funciona?",
      a: "Sim. A Terapia de Aceitação e Compromisso é uma das abordagens da terceira onda das terapias cognitivo-comportamentais, com décadas de pesquisa e ampla evidência clínica. É ensinada em universidades e praticada por psicólogos no mundo inteiro. O guia traz essa abordagem em linguagem acessível — sem jargões.",
    },
    {
      q: "É diferente de outros materiais sobre ansiedade que já vi?",
      a: "Provavelmente sim. A maioria dos conteúdos ensina a controlar a ansiedade — respirar fundo, pensar positivo, distrair a mente. Este guia parte de uma premissa diferente: a luta contra a ansiedade muitas vezes a intensifica. A ACT não busca eliminar o que você sente — busca mudar sua relação com isso. Essa diferença, na prática, muda tudo.",
    },
    {
      q: "Quanto tempo leva para ler e aplicar?",
      a: "O guia foi criado para ser lido com calma — um capítulo por vez. Em média, 2 a 4 horas de leitura no total. Os exercícios práticos levam 5 a 15 minutos cada. A rotina sugerida no último capítulo funciona com 5 minutos por dia.",
    },
    {
      q: "Posso compartilhar com alguém que está passando por isso?",
      a: "O guia é de uso pessoal. Se quiser presentear alguém, a forma mais cuidadosa é adquirir um acesso para essa pessoa — isso garante que ela tenha a experiência completa, com os bônus incluídos.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-5 sm:px-10 py-20 sm:py-24" style={{ backgroundColor: "#F2EFE8" }}>
      <div className="max-w-[820px] mx-auto">
        <Reveal>
          <h2
            className="text-[30px] sm:text-[48px] text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              color: "#6B4325",
              lineHeight: 1.15,
            }}
          >
            Antes de decidir —
            <br /> tire suas dúvidas.
          </h2>
        </Reveal>
        <div className="mt-12 rounded-2xl overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid rgba(168,181,162,0.3)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#6B4325",
                  }}
                >
                  <span>{it.q}</span>
                  <span
                    style={{
                      color: "#CC6A39",
                      fontSize: 22,
                      transition: "transform 0.3s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 500 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.35s ease",
                    paddingLeft: 24,
                    paddingRight: 24,
                    paddingBottom: isOpen ? 24 : 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 15,
                      color: "#8B5E3C",
                      lineHeight: 1.7,
                    }}
                  >
                    {it.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Oferta ───────────────────────────────────── */

function Oferta() {
  return (
    <section
      id="comprar"
      className="px-5 sm:px-10 py-20 sm:py-28"
      style={{ background: "linear-gradient(160deg, #F2EFE8 0%, #FFFFFF 100%)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <h2
            className="text-[30px] sm:text-[48px] text-center"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              color: "#6B4325",
              lineHeight: 1.15,
            }}
          >
            Tudo que você precisa
            <br /> para começar hoje.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="mt-14 mx-auto"
            style={{
              maxWidth: 560,
              backgroundColor: "#FFFFFF",
              border: "2px solid #A8B5A2",
              borderRadius: 24,
              padding: 40,
              boxShadow: "0 8px 60px rgba(107,67,37,0.12)",
            }}
          >
            <h3
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                fontSize: 28,
                color: "#6B4325",
                lineHeight: 1.2,
              }}
            >
              Um Novo Jeito de Lidar com a Ansiedade
            </h3>
            <p className="mt-1" style={{ fontSize: 14, color: "#8B5E3C" }}>
              Mariana Anício · Psicóloga ACT
            </p>
            <div
              className="my-6"
              style={{ height: 1, backgroundColor: "rgba(168,181,162,0.4)" }}
            />
            <ul className="space-y-3">
              {[
                "Guia principal — PDF · 7 capítulos completos",
                "Exercícios práticos de desfusão e aceitação",
                "Protocolo para momentos de crise",
                "Checklist semanal de prática",
                "Bônus 01: Checklist de Gatilhos da Ansiedade",
                "Bônus 02: Cartão de Emergência Emocional",
                "Download imediato + acesso vitalício",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-3"
                  style={{ color: "#6B4325", fontSize: 15, lineHeight: 1.55 }}
                >
                  <span style={{ color: "#CC6A39" }}>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div
              className="my-6"
              style={{ height: 1, backgroundColor: "rgba(168,181,162,0.4)" }}
            />
            <div className="text-center">
              <p style={{ fontSize: 14, color: "#8B5E3C", textDecoration: "line-through" }}>
                De R$ 66,90
              </p>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 700,
                  fontSize: 64,
                  color: "#CC6A39",
                  lineHeight: 1.05,
                }}
              >
                R$ 37,90
              </p>
              <p style={{ fontSize: 13, color: "#8B5E3C" }}>ou 2× de R$ 19,45</p>
            </div>
            <div className="mt-6">
              <CTAButton full pulse>
                Quero começar por R$ 37,90 →
              </CTAButton>
            </div>
            <p
              className="mt-4 text-center"
              style={{ fontSize: 13, color: "#8B5E3C" }}
            >
              🔒 Pagamento seguro · Acesso imediato · Garantia de 7 dias
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { i: "🔒", t: "Compra segura" },
                { i: "⬇️", t: "Acesso imediato" },
                { i: "↩️", t: "Garantia 7 dias" },
              ].map((s) => (
                <div key={s.t}>
                  <div style={{ fontSize: 22 }}>{s.i}</div>
                  <div style={{ fontSize: 13, color: "#8B5E3C", marginTop: 4 }}>
                    {s.t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── CTA Final ────────────────────────────────── */

function CTAFinal() {
  return (
    <section
      className="relative overflow-hidden px-5 sm:px-10 py-20 sm:py-28"
      style={{ backgroundColor: "#6B4325" }}
    >
      <svg
        className="absolute -top-20 -right-20 w-[420px] h-[420px] pointer-events-none"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <path
          d="M200,40 C300,40 360,120 360,200 C360,300 280,360 200,360 C100,360 40,280 40,200 C40,120 120,40 200,40 Z"
          fill="#C78162"
          opacity="0.08"
        />
      </svg>
      <div className="max-w-[820px] mx-auto text-center relative">
        <Reveal>
          <h2
            className="text-[36px] sm:text-[58px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.1,
            }}
          >
            Você não precisa esperar
            <br /> a ansiedade desaparecer
            <br /> para começar a viver.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p
            className="mt-6 text-[22px] sm:text-[26px]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: "#C78162",
              lineHeight: 1.35,
            }}
          >
            A mudança começa com uma relação diferente
            <br /> com o que você está sentindo.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p
            className="mt-8 text-[16px] sm:text-[17px]"
            style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}
          >
            Este guia é um ponto de partida. Não promete eliminar a ansiedade — promete dar
            a você ferramentas reais para parar de ser dominado por ela.
            <br />
            <br />
            Por R$ 37,90. Com garantia de 7 dias. Com acesso imediato.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 inline-block">
            <CTAButton size="lg" pulse>
              Quero começar — R$ 37,90 →
            </CTAButton>
          </div>
          <p
            className="mt-5"
            style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}
          >
            🔒 Acesso imediato · Garantia de 7 dias · Compra segura
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── Rodapé ───────────────────────────────────── */

function Footer() {
  return (
    <footer
      className="px-5 sm:px-10 py-12 text-center"
      style={{ backgroundColor: "#4A2E17" }}
    >
      <div className="max-w-[820px] mx-auto space-y-4">
        <div
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontWeight: 600,
            fontSize: 20,
            color: "#F2EFE8",
          }}
        >
          Mariana Anício | Psicóloga ACT
        </div>
        <div style={{ fontSize: 13, color: "#C78162" }}>
          Política de Privacidade · Termos de Uso · @marianaanicio_
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
          © 2025 Mariana Anício · Todos os direitos reservados
        </div>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          Este material tem caráter psicoeducativo e não substitui o acompanhamento
          psicológico profissional. Se você está em sofrimento intenso, busque apoio
          especializado.
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── Page ─────────────────────────────────────── */

function LandingPage() {
  return (
    <main style={{ backgroundColor: "#F2EFE8" }}>
      <style>{`
        @keyframes pulse-cta {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204,106,57,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(204,106,57,0); }
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; color: #6B4325; }
      `}</style>
      <Header />
      <Hero />
      <Identificacao />
      <Ciclo />
      <Problema />
      <NovaPerspectiva />
      <Produto />
      <Conteudo />
      <Recebe />
      <Mariana />
      <Depoimentos />
      <FAQ />
      <Oferta />
      <CTAFinal />
      <Footer />
    </main>
  );
}