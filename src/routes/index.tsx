import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Um Novo Jeito de Lidar com a Ansiedade — Guia ACT por Mariana Psicóloga" },
      {
        name: "description",
        content:
          "Guia digital baseado em Terapia de Aceitação e Compromisso (ACT) para desenvolver uma relação mais saudável com pensamentos, emoções e preocupações do dia a dia.",
      },
      { property: "og:title", content: "Um Novo Jeito de Lidar com a Ansiedade" },
      {
        property: "og:description",
        content:
          "Você não precisa esperar a ansiedade desaparecer para voltar a viver sua vida. Um guia prático baseado em ACT.",
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};


function CTA({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#pricing"
      className={
        "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#CC6A39] text-white font-medium tracking-wide shadow-[0_10px_30px_-10px_rgba(204,106,57,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(204,106,57,0.65)] active:translate-y-0 " +
        className
      }
    >
      {children}
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[#F2EFE8]/75 border-b border-[rgba(107,67,37,0.10)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" className="font-display text-[#6B4325] text-lg sm:text-xl leading-tight max-w-[60%] truncate">
          Um Novo Jeito de Lidar com a Ansiedade
        </a>
        <a
          href="#pricing"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CC6A39] text-white text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(204,106,57,0.6)]"
        >
          Quero acessar o guia →
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="sm:hidden w-10 h-10 grid place-items-center rounded-full border border-[rgba(107,67,37,0.15)] text-[#6B4325]"
        >
          <div className="space-y-1.5">
            <span className="block w-4 h-px bg-[#6B4325]" />
            <span className="block w-4 h-px bg-[#6B4325]" />
          </div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="sm:hidden px-5 pb-5"
          >
            <div className="rounded-2xl bg-white/70 backdrop-blur-md border border-[rgba(107,67,37,0.15)] p-4 flex flex-col gap-3">
              {[
                ["O guia", "#produto"],
                ["Para quem é", "#para-quem"],
                ["Sobre Mariana", "#mariana"],
                ["Perguntas", "#faq"],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="text-[#6B4325] text-sm">
                  {label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#CC6A39] text-white text-sm font-medium"
              >
                Quero acessar o guia →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-28 sm:pt-32 pb-16 px-5 sm:px-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#A8B5A2]/25 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-[#C78162]/20 blur-3xl" />
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div variants={fadeUp}>
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-[13px] tracking-wide"
            style={{
              border: "1px solid #7B8C9B",
              background: "rgba(123,140,155,0.10)",
              color: "#7B8C9B",
            }}
          >
            Baseado em ACT • Psicologia baseada em evidências
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-[#6B4325] mt-6 text-[32px] leading-[1.1] sm:text-[52px] md:text-[64px] lg:text-[68px] font-semibold tracking-tight"
        >
          Você não precisa esperar a ansiedade desaparecer para voltar a viver sua vida.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-[15px] sm:text-base text-[#5b5448] leading-[1.75] max-w-2xl mx-auto"
        >
          Um guia prático baseado na Terapia de Aceitação e Compromisso (ACT) para ajudar você
          a desenvolver uma relação mais saudável com pensamentos, emoções e preocupações do dia a dia.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <p className="text-sm text-[#6B4325]/80 mb-3 font-display italic text-lg">
            Assista ao vídeo antes de continuar 👇
          </p>
          <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[rgba(107,67,37,0.15)] shadow-[0_30px_60px_-30px_rgba(107,67,37,0.35)] bg-white/40 backdrop-blur-sm">
            <div className="aspect-video w-full bg-gradient-to-br from-[#A8B5A2]/30 to-[#7B8C9B]/30 grid place-items-center">
              {/* REPLACE WITH YOUTUBE URL */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-white/80 backdrop-blur grid place-items-center shadow-xl"
              >
                <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[18px] border-l-[#CC6A39] ml-1.5" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <CTA>Quero acessar o guia →</CTA>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#5b5448]"
        >
          <li>✓ Acesso imediato</li>
          <li>✓ Funciona no celular</li>
          <li>✓ Garantia de 7 dias</li>
        </motion.ul>
      </motion.div>
    </section>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Identificacao() {
  const items = [
    { e: "🧠", t: "Sua mente parece nunca desacelerar." },
    { e: "⚠️", t: "Você vive preocupado com o que pode acontecer." },
    { e: "😮‍💨", t: "Parece difícil simplesmente relaxar." },
    { e: "🔄", t: "Quanto mais tenta controlar a ansiedade, pior ela parece ficar." },
    { e: "💭", t: "A ansiedade está ocupando espaço demais na sua vida." },
  ];
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-5xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#6B4325] text-3xl sm:text-5xl md:text-[56px] leading-[1.1] font-semibold"
        >
          Você se reconhece em alguma dessas situações?
        </motion.h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl p-7 text-left bg-white/55 backdrop-blur-sm border border-[rgba(107,67,37,0.15)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{it.e}</div>
              <p className="text-[#3f3a32] leading-[1.7]">{it.t}</p>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="mt-12 font-display italic text-[#6B4325] text-xl sm:text-2xl">
          Se você se identificou com algum desses pontos, saiba que não está sozinho.
        </motion.p>
      </Reveal>
    </section>
  );
}

function Problema() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32 bg-white/40">
      <Reveal className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#6B4325] text-3xl sm:text-5xl md:text-[56px] leading-[1.1] font-semibold"
        >
          O problema não é sentir ansiedade.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 font-display text-2xl sm:text-3xl text-[#C78162] italic">
          O problema é ficar preso na luta contra ela.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-8 text-[#5b5448] leading-[1.75] max-w-2xl mx-auto">
          Quando tentamos empurrar pensamentos difíceis para longe, eles voltam com mais força.
          Quando lutamos contra uma emoção, ela se intensifica. A ciência mostra: o sofrimento
          aumenta quando entramos em uma batalha interna que não escolhemos.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14">
          <div className="relative mx-auto max-w-md">
            <div className="aspect-square rounded-full border border-dashed border-[#C78162]/50 grid place-items-center relative">
              <div className="absolute inset-8 rounded-full border border-dashed border-[#7B8C9B]/40" />
              <div className="text-center px-8">
                <p className="font-display text-[#6B4325] text-xl">Ciclo da luta</p>
                <p className="text-xs text-[#5b5448] mt-2 leading-relaxed">
                  Pensamento → Resistência → Mais ansiedade → Mais controle → Esgotamento
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

function NovaPerspectiva() {
  const left = [
    "Controlar pensamentos",
    "Eliminar emoções difíceis",
    "Esperar se sentir melhor para agir",
    "Buscar segurança absoluta",
    "Evitar desconfortos",
  ];
  const right = [
    "Desenvolver flexibilidade psicológica",
    "Fazer espaço para emoções difíceis",
    "Observar pensamentos com mais distância",
    "Agir em direção ao que importa",
    "Construir uma vida alinhada aos seus valores",
  ];
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl md:text-[56px] leading-[1.1] font-semibold">
            Existe outro caminho.
          </h2>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <motion.div
            variants={fadeUp}
            className="rounded-3xl p-8 sm:p-10 bg-white/55 backdrop-blur-sm border border-[rgba(107,67,37,0.15)]"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#C78162]">O que a maioria tenta</p>
            <h3 className="font-display text-2xl sm:text-3xl text-[#6B4325] mt-2 mb-6">
              O caminho da luta
            </h3>
            <ul className="space-y-4">
              {left.map((t) => (
                <li key={t} className="flex gap-3 text-[#5b5448] leading-[1.7]">
                  <span className="text-[#C78162] shrink-0">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-3xl p-8 sm:p-10 bg-[#A8B5A2]/15 backdrop-blur-sm border border-[#A8B5A2]/40"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#7B8C9B]">O que você aprenderá</p>
            <h3 className="font-display text-2xl sm:text-3xl text-[#6B4325] mt-2 mb-6">
              O caminho da flexibilidade
            </h3>
            <ul className="space-y-4">
              {right.map((t) => (
                <li key={t} className="flex gap-3 text-[#3f3a32] leading-[1.7]">
                  <span className="text-[#7B8C9B] shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-16 max-w-3xl mx-auto text-center font-display italic text-xl sm:text-2xl text-[#6B4325] leading-snug"
        >
          A mudança não acontece quando a ansiedade desaparece. Ela acontece quando você aprende
          uma nova forma de se relacionar com ela.
        </motion.p>
      </Reveal>
    </section>
  );
}

function Produto() {
  const benefits = [
    "Compreender melhor como a ansiedade funciona",
    "Identificar padrões emocionais",
    "Desenvolver mais presença",
    "Aplicar exercícios práticos",
    "Construir uma relação mais saudável com pensamentos",
    "Agir mesmo quando a ansiedade aparece",
    "Desenvolver clareza emocional",
    "Reduzir a luta constante contra a ansiedade",
  ];
  return (
    <section id="produto" className="px-5 sm:px-8 py-24 sm:py-32 bg-white/40">
      <Reveal className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div variants={fadeUp} className="order-2 md:order-1">
          <SectionLabel>O guia</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
            Mais do que um guia. Uma nova forma de lidar com a ansiedade.
          </h2>
          <p className="mt-6 text-[#5b5448] leading-[1.75]">
            Um material cuidadosamente construído para acompanhar você passo a passo no
            desenvolvimento de uma relação mais saudável com pensamentos, emoções e preocupações,
            apoiado por conceitos centrais da Terapia de Aceitação e Compromisso.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3 text-[#3f3a32] text-[15px] leading-[1.6]">
                <span className="text-[#A8B5A2] shrink-0 mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-[#C78162]/15 rounded-full blur-3xl" />
            <div className="relative w-[260px] sm:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_40px_80px_-30px_rgba(107,67,37,0.45)] border border-[rgba(107,67,37,0.2)] bg-gradient-to-br from-[#6B4325] to-[#C78162] p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs tracking-[0.3em] uppercase text-white/70">Guia Prático</div>
                <div className="mt-1 text-xs text-white/60">Baseado em ACT</div>
              </div>
              <div>
                <h3 className="font-display text-white text-3xl sm:text-4xl leading-[1.05]">
                  Um Novo Jeito de Lidar com a Ansiedade
                </h3>
              </div>
              <div className="text-white/80 text-sm">
                <div className="h-px bg-white/30 mb-3" />
                Mariana Psicóloga
              </div>
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

function Receba() {
  const items = [
    {
      e: "📘",
      tag: "Produto principal",
      title: "Guia Principal",
      desc: "Um Novo Jeito de Lidar com a Ansiedade — material completo baseado em ACT.",
    },
    {
      e: "📋",
      tag: "Bônus 01",
      title: "Checklist de Gatilhos da Ansiedade",
      desc: "Ferramenta prática para identificar padrões, situações e contextos que costumam intensificar a ansiedade.",
    },
    {
      e: "🚨",
      tag: "Bônus 02",
      title: "Cartão de Emergência Emocional",
      desc: "PDF otimizado para celular: respiração, ancoragem, frases de desfusão e passos práticos para momentos difíceis.",
    },
  ];
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <SectionLabel>Conteúdo</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl md:text-[56px] leading-[1.1] font-semibold">
            O que você recebe
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="rounded-3xl p-8 bg-white/55 backdrop-blur-sm border border-[rgba(107,67,37,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(107,67,37,0.3)]"
            >
              <div className="text-4xl mb-5">{it.e}</div>
              <div className="text-[11px] tracking-[0.25em] uppercase text-[#7B8C9B] mb-2">{it.tag}</div>
              <h3 className="font-display text-2xl text-[#6B4325] leading-tight">{it.title}</h3>
              <p className="mt-3 text-[#5b5448] leading-[1.7] text-[15px]">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function ParaQuem() {
  const yes = [
    "Convive com ansiedade",
    "Pensa demais",
    "Sente excesso de preocupação",
    "Busca mais leveza emocional",
    "Deseja ferramentas práticas",
    "Quer desenvolver autoconhecimento",
  ];
  const no = [
    "Busca soluções milagrosas",
    "Quer eliminar emoções difíceis",
    "Não pretende aplicar o que aprender",
  ];
  return (
    <section id="para-quem" className="px-5 sm:px-8 py-24 sm:py-32 bg-white/40">
      <Reveal className="max-w-5xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <SectionLabel>Para quem é</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
            Este guia é para você se…
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-5 gap-6">
          <motion.div
            variants={fadeUp}
            className="md:col-span-3 rounded-3xl p-8 sm:p-10 bg-[#A8B5A2]/15 border border-[#A8B5A2]/40"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#7B8C9B] mb-5">Indicado para</p>
            <ul className="space-y-3.5">
              {yes.map((t) => (
                <li key={t} className="flex gap-3 text-[#3f3a32]">
                  <span className="text-[#7B8C9B] shrink-0">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="md:col-span-2 rounded-3xl p-8 sm:p-10 bg-white/55 border border-[rgba(107,67,37,0.15)]"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#C78162] mb-5">Não é para você se</p>
            <ul className="space-y-3.5">
              {no.map((t) => (
                <li key={t} className="flex gap-3 text-[#5b5448]">
                  <span className="text-[#C78162] shrink-0">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

function Objecoes() {
  const items = [
    {
      q: "Isso substitui terapia?",
      a: "Não. Este guia é um material psicoeducativo. Ele complementa, mas não substitui, o trabalho individual com um(a) psicólogo(a). Se você já faz terapia, pode ser um excelente apoio entre sessões.",
    },
    {
      q: "Preciso ter conhecimento prévio?",
      a: "Nenhum. A linguagem é acessível, sem jargões técnicos, com exemplos do cotidiano e exercícios passo a passo para quem está começando a entender a ansiedade.",
    },
    {
      q: "E se eu me identificar muito com os sintomas?",
      a: "Se identificar faz parte. O guia foi construído com acolhimento e ritmo. Caso sinta necessidade de um suporte mais próximo, recomendamos buscar acompanhamento psicológico individual em paralelo.",
    },
  ];
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <SectionLabel>Objeções honestas</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
            Talvez você esteja pensando…
          </h2>
        </motion.div>
        <div className="mt-12 space-y-5">
          {items.map((it) => (
            <motion.div
              key={it.q}
              variants={fadeUp}
              className="rounded-2xl p-7 bg-white/55 backdrop-blur-sm border border-[rgba(107,67,37,0.15)]"
            >
              <h3 className="font-display text-xl sm:text-2xl text-[#6B4325]">{it.q}</h3>
              <p className="mt-3 text-[#5b5448] leading-[1.75]">{it.a}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Depoimentos() {
  const items = [
    {
      n: "Luiza M.",
      r: "Professora",
      t: "Pela primeira vez entendi que não precisava ‘parar de sentir’ para voltar a viver. O guia me trouxe um respiro real.",
    },
    {
      n: "Rafael S.",
      r: "Engenheiro",
      t: "Os exercícios práticos me ajudaram a observar meus pensamentos com mais distância. Algo simples, mas que mudou meu dia a dia.",
    },
    {
      n: "Camila A.",
      r: "Designer",
      t: "Material acolhedor, sem promessas mágicas. Senti que estava sendo conduzida por alguém que entende de verdade do assunto.",
    },
  ];
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32 bg-white/40">
      <Reveal className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <SectionLabel>Depoimentos</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
            O que leitores estão dizendo
          </h2>
        </motion.div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.div
              key={it.n}
              variants={fadeUp}
              className="rounded-3xl p-8 bg-white/65 backdrop-blur-sm border border-[rgba(107,67,37,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-25px_rgba(107,67,37,0.3)]"
            >
              <div className="font-display text-[#C78162] text-5xl leading-none mb-2">“</div>
              <p className="text-[#3f3a32] leading-[1.75]">{it.t}</p>
              <div className="mt-6 pt-5 border-t border-[rgba(107,67,37,0.15)]">
                <p className="font-display text-[#6B4325] text-lg">{it.n}</p>
                <p className="text-xs text-[#7B8C9B] tracking-wide uppercase mt-1">{it.r}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function SobreMariana() {
  return (
    <section id="mariana" className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
        <motion.div variants={fadeUp} className="md:col-span-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-[#A8B5A2]/30 rounded-full blur-2xl" />
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-[rgba(107,67,37,0.2)] bg-gradient-to-br from-[#A8B5A2] to-[#7B8C9B] grid place-items-center">
              <span className="font-display text-white text-7xl">M</span>
            </div>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="md:col-span-3">
          <SectionLabel>Sobre a autora</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
            Quem criou este guia?
          </h2>
          <p className="mt-6 text-[#5b5448] leading-[1.75]">
            Mariana é psicóloga e atua com base na Terapia de Aceitação e Compromisso (ACT),
            abordagem reconhecida por ajudar pessoas a desenvolverem mais flexibilidade
            psicológica e construírem uma vida alinhada ao que realmente importa.
          </p>
          <p className="mt-4 text-[#5b5448] leading-[1.75]">
            Seu trabalho busca unir ciência, acolhimento e aplicabilidade prática.
          </p>
        </motion.div>
      </Reveal>
    </section>
  );
}

function Pricing() {
  const features = [
    "Guia Completo",
    "Checklist de Gatilhos da Ansiedade",
    "Cartão de Emergência Emocional",
    "Acesso Imediato",
  ];
  return (
    <section id="pricing" className="px-5 sm:px-8 py-24 sm:py-32 bg-white/40">
      <Reveal className="max-w-2xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <SectionLabel>Acesso ao guia</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
            Comece hoje, no seu ritmo.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 rounded-3xl bg-white/70 backdrop-blur-md border border-[rgba(107,67,37,0.15)] p-8 sm:p-10 shadow-[0_30px_70px_-30px_rgba(107,67,37,0.35)]"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#7B8C9B] text-center">Oferta atual</p>
          <h3 className="font-display text-2xl sm:text-3xl text-[#6B4325] text-center mt-2">
            Um Novo Jeito de Lidar com a Ansiedade
          </h3>

          <div className="mt-6 flex items-end justify-center gap-3">
            <span className="text-[#7B8C9B] line-through">R$ 67,90</span>
            <span className="font-display text-5xl sm:text-6xl text-[#6B4325] leading-none">
              R$ 37,90
            </span>
          </div>
          <p className="text-center text-xs text-[#5b5448] mt-2">à vista • acesso imediato</p>

          <ul className="mt-8 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3 text-[#3f3a32]">
                <span className="text-[#A8B5A2] shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <CTA className="w-full sm:w-auto text-base">Quero acessar o guia →</CTA>
          </div>

          <p className="mt-5 text-center text-xs text-[#7B8C9B] tracking-wide">
            🔒 Pagamento seguro
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-[#A8B5A2]/60 bg-[#A8B5A2]/10 p-5 text-center">
            <p className="font-display text-[#6B4325] text-lg">Garantia incondicional de 7 dias</p>
            <p className="text-xs text-[#5b5448] mt-1">
              Se não fizer sentido pra você, devolvemos 100% do valor.
            </p>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

function Garantia() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-3xl mx-auto text-center">
        <motion.div variants={fadeUp}>
          <SectionLabel>Garantia</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold"
        >
          Você não tem nada a perder.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-[#5b5448] leading-[1.75]">
          Você tem 7 dias completos para acessar o guia e os bônus. Se sentir que o material não é
          para você, é só nos enviar uma mensagem e devolvemos 100% do valor investido — sem
          burocracia, sem perguntas constrangedoras.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-[#5b5448] leading-[1.75]">
          Queremos que sua decisão seja tranquila — porque escolher cuidar de si já é, por si só,
          um passo importante.
        </motion.p>
      </Reveal>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[rgba(107,67,37,0.15)]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-display text-lg sm:text-xl text-[#6B4325]">{q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-[rgba(107,67,37,0.2)] grid place-items-center transition-transform duration-300 ${
            open ? "rotate-45 bg-[#CC6A39] text-white border-transparent" : "text-[#6B4325]"
          }`}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#5b5448] leading-[1.75]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: "Isso substitui terapia?",
      a: "Não. É um material psicoeducativo que complementa — mas não substitui — o trabalho com um(a) psicólogo(a).",
    },
    { q: "Como recebo o material?", a: "Após a compra, você recebe acesso imediato por e-mail para baixar todos os materiais em PDF." },
    { q: "Funciona no celular?", a: "Sim. O guia e o Cartão de Emergência Emocional foram otimizados para leitura no celular." },
    { q: "Quanto tempo leva para ler?", a: "Você pode ler no seu ritmo. Em média, leitores levam de 2 a 4 horas, mas o material foi pensado para ser consultado várias vezes." },
    { q: "Preciso ter diagnóstico?", a: "Não. O guia é voltado para qualquer pessoa que queira desenvolver uma relação mais saudável com a ansiedade." },
    { q: "O conteúdo é técnico?", a: "Não. A linguagem é acessível, com exemplos do cotidiano. Os conceitos da ACT são apresentados de forma simples e aplicável." },
    { q: "E se eu não gostar?", a: "Você tem 7 dias para solicitar reembolso integral, sem precisar justificar." },
    { q: "Como funciona a garantia?", a: "Basta enviar um e-mail dentro de 7 dias após a compra solicitando o reembolso. Devolvemos 100% do valor." },
  ];
  return (
    <section id="faq" className="px-5 sm:px-8 py-24 sm:py-32 bg-white/40">
      <Reveal className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <SectionLabel>Perguntas frequentes</SectionLabel>
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
            Talvez você ainda tenha dúvidas.
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-10">
          {items.map((it) => (
            <FAQItem key={it.q} q={it.q} a={it.a} />
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32 bg-[#6B4325] relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#C78162]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#A8B5A2]/15 blur-3xl" />
      <Reveal className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-white text-3xl sm:text-5xl md:text-[60px] leading-[1.1] font-semibold"
        >
          Você não precisa esperar a ansiedade desaparecer para começar a viver a vida que deseja.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-white/80 leading-[1.75] max-w-2xl mx-auto">
          Talvez a mudança não esteja em controlar mais. Talvez esteja em aprender uma nova forma
          de lidar com aquilo que sente.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <CTA>Quero acessar o guia →</CTA>
        </motion.div>
        <motion.ul
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80"
        >
          <li>✓ Acesso imediato</li>
          <li>✓ Garantia de 7 dias</li>
          <li>✓ Material digital</li>
        </motion.ul>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#6B4325] text-white/80 px-5 sm:px-8 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-white text-xl leading-tight">
            Um Novo Jeito de Lidar com a Ansiedade
          </p>
          <p className="mt-3 text-sm text-white/60">por Mariana Psicóloga</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-4">Institucional</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-white/50 mb-4">Aviso</p>
          <p className="text-sm leading-[1.7] text-white/70">
            Este material possui caráter psicoeducativo e não substitui acompanhamento psicológico
            individual.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-3">
        <span>© {new Date().getFullYear()} Mariana Psicóloga. Todos os direitos reservados.</span>
        <span>Feito com cuidado e base em evidências.</span>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main
      className="min-h-screen font-sans text-[#3f3a32] antialiased scroll-smooth"
      style={{ backgroundColor: "#F2EFE8" }}
    >
      <Nav />
      <Hero />
      <Identificacao />
      <Problema />
      <NovaPerspectiva />
      <Produto />
      <Receba />
      <ParaQuem />
      <Objecoes />
      <Depoimentos />
      <SobreMariana />
      <Pricing />
      <Garantia />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
