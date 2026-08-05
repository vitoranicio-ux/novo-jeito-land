import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sobreVoce from "@/assets/Sobre_Você.jpg.asset.json";
import capaGuia from "@/assets/capa-guia.png.asset.json";

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


function CTA({ children, className = "", href = "#pricing" }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={
        "inline-flex w-full sm:w-auto min-h-[52px] items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#CC6A39] hover:bg-[#A84E22] text-white text-[18px] font-semibold tracking-wide shadow-[0_10px_30px_-10px_rgba(204,106,57,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(204,106,57,0.65)] active:translate-y-0 " +
        className
      }
    >
      {children}
    </a>
  );
}

function CTABlock({ text, button }: { text: string; button: string }) {
  return (
    <section className="px-5 sm:px-8 py-12 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[17px] text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75] mb-8">
          {text}
        </p>
        <CTA>{button}</CTA>
      </div>
    </section>
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
          ? "backdrop-blur-md bg-white/75 border-b border-[rgba(107,67,37,0.10)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#top" className="font-display text-[#2D5A3D] text-lg sm:text-xl leading-tight whitespace-nowrap">
          Um Novo Jeito…
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
          className="sm:hidden w-10 h-10 grid place-items-center rounded-full border border-[rgba(107,67,37,0.15)] text-[#2D5A3D]"
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
                <a key={href} href={href} onClick={() => setOpen(false)} className="text-[#2D5A3D] text-sm">
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

        <motion.h1
          variants={fadeUp}
          className="font-display text-[#2D5A3D] mt-6 text-[36px] leading-[1.15] sm:text-[44px] md:text-[52px] font-semibold tracking-tight"
        >
          Você não precisa esperar a ansiedade desaparecer para{" "}
          <strong className="font-bold text-[#2D5A3D]">voltar a viver</strong>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-[15px] sm:text-base text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75] max-w-2xl mx-auto"
        >
          Para quem já pesquisou, já respirou fundo, já tentou “pensar positivo” — e ainda assim
          sente que <em className="italic">a ansiedade sempre vence</em>.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <p className="text-sm text-[#2D5A3D]/80 mb-3 font-display italic text-lg">
            Assista ao vídeo antes de continuar 👇
          </p>
          <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[rgba(107,67,37,0.15)] shadow-[0_30px_60px_-30px_rgba(107,67,37,0.35)] bg-white backdrop-blur-sm">
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
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[16px] text-[#5C5C5C]"
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
      viewport={{ once: true, amount: 0, margin: "0px 0px -60px 0px" }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Identificacao() {
  const items = [
    {
      e: "🧠",
      t: "Você deita para dormir e, justamente quando tudo fica em silêncio, sua cabeça começa a revirar tudo o que aconteceu — e tudo o que pode acontecer amanhã.",
    },
    {
      e: "⚠️",
      t: "Você cria dezenas de cenários antes mesmo das coisas acontecerem — e quase sempre sofre por algo que nunca aconteceu.",
    },
    { e: "😮‍💨", t: "Até nos momentos em que deveria descansar, seu corpo continua em estado de alerta." },
    { e: "🔄", t: "Você tenta se acalmar, mas quanto mais tenta, mais parece que a ansiedade aumenta." },
    { e: "💭", t: "Você está numa conversa, mas parte da sua cabeça já está no próximo problema." },
    {
      e: "🖤",
      t: "Você já cancelou planos, recusou oportunidades ou ficou em silêncio quando queria falar — por causa da ansiedade.",
    },
  ];
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-28">
      <Reveal className="max-w-5xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold"
        >
          Você se reconhece em alguma dessas situações?
        </motion.h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl p-7 text-left bg-[#F2EFE8] border border-[#A8B5A2]/40 transition-transform duration-300 sm:hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{it.e}</div>
              <p className="text-[17px] text-[#5C5C5C] leading-[1.7]">{it.t}</p>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="mt-12 font-display italic text-[#2D5A3D] text-xl sm:text-2xl">
          Se você se identificou com algum desses pontos, saiba que não está sozinha. E que existe
          uma forma diferente — não de eliminar a ansiedade, mas de parar de ser governada por ela.
        </motion.p>
      </Reveal>
    </section>
  );
}

function CicloInfografico() {
  const steps = [
    {
      icon: "🧠",
      label: "1. PENSAMENTO",
      color: "#CC6A39",
      desc: "Você tem um pensamento difícil.",
      pos: "left-1/2 -translate-x-1/2 top-0",
    },
    {
      icon: "🛡️",
      label: "2. RESISTÊNCIA",
      color: "#6B4325",
      desc: "Você tenta controlar, evitar ou lutar contra.",
      pos: "right-0 top-1/2 -translate-y-1/2",
    },
    {
      icon: "🌀",
      label: "3. MAIS ANSIEDADE",
      color: "#6E8091",
      desc: "A emoção aumenta e se intensifica.",
      pos: "left-1/2 -translate-x-1/2 bottom-0",
    },
    {
      icon: "🪫",
      label: "4. ESGOTAMENTO",
      color: "#2D5A3D",
      desc: "Você se sente exausta, sobrecarregada e sem energia.",
      pos: "left-0 top-1/2 -translate-y-1/2",
    },
  ];
  const arcs = [
    { d: "M 318 92 A 175 175 0 0 1 428 202", color: "#CC6A39", id: "a1" },
    { d: "M 428 318 A 175 175 0 0 1 318 428", color: "#7BA05B", id: "a2" },
    { d: "M 202 428 A 175 175 0 0 1 92 318", color: "#6E8091", id: "a3" },
    { d: "M 92 202 A 175 175 0 0 1 202 92", color: "#2D5A3D", id: "a4" },
  ];
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square">
      <svg viewBox="0 0 520 520" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          {arcs.map((a) => (
            <marker
              key={a.id}
              id={`arrow-${a.id}`}
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3.5"
              orient="auto"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill={a.color} />
            </marker>
          ))}
        </defs>
        {arcs.map((a) => (
          <path
            key={a.id}
            d={a.d}
            fill="none"
            stroke={a.color}
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd={`url(#arrow-${a.id})`}
          />
        ))}
      </svg>

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square grid place-items-center text-center px-3 border-2 border-[#CC6A39]"
        style={{ borderRadius: "48% 52% 45% 55% / 55% 46% 54% 45%" }}
      >
        <p className="font-display italic text-[#6B4325] text-[15px] sm:text-[20px] leading-snug">
          Reconhece esse ciclo?
        </p>
      </div>

      {steps.map((s) => (
        <div key={s.label} className={`absolute ${s.pos} w-[42%] sm:w-[38%] text-center`}>
          <div className="text-xl sm:text-2xl">{s.icon}</div>
          <p
            className="mt-1 text-[11px] sm:text-[13px] font-semibold tracking-wide"
            style={{ color: s.color }}
          >
            {s.label}
          </p>
          <p className="mt-1 text-[11px] sm:text-[13px] text-[#5C5C5C] leading-snug">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Problema() {
  return (
    <section className="px-5 sm:px-8 py-16 bg-[#F8F7F4]">
      <Reveal className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold"
        >
          <strong className="font-bold">O problema não é sentir ansiedade. O problema é ficar presa na luta contra ela.</strong>
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-14">
          <CicloInfografico />
        </motion.div>

        <motion.p variants={fadeUp} className="mt-10 font-display italic text-[#2D5A3D] text-xl sm:text-2xl">
          Esse loop não termina com mais controle. Termina quando você muda de estratégia.
        </motion.p>
      </Reveal>
    </section>
  );
}

function CTAProblema() {
  return (
    <CTABlock
      text="O próximo passo é aprender uma nova forma de se relacionar com ela."
      button="Quero acessar o guia →"
    />
  );
}


function VisaoFuturo() {
  const items = [
    "Dormir sem passar horas revivendo tudo o que aconteceu no dia.",
    "Estar presente em uma conversa sem a mente antecipar tudo o que pode dar errado.",
    "Aceitar um convite sem desistir por medo ou preocupação.",
    "Trabalhar, estudar ou cuidar da sua família sem sentir que a ansiedade precise desaparecer antes.",
    "Perceber que a ansiedade apareceu, e ainda assim, continuar fazendo o que faz sentido para você.",
  ];
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-28 bg-white">
      <Reveal className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold"
        >
          E se a ansiedade deixasse de comandar suas escolhas?
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 font-display italic text-[#2D5A3D] text-xl sm:text-2xl">
          Imagine conseguir:
        </motion.p>
        <motion.ul variants={fadeUp} className="mt-10 max-w-2xl mx-auto space-y-4 text-left">
          {items.map((t) => (
            <li key={t} className="flex gap-3 text-[17px] text-[#5C5C5C] leading-[1.7]">
              <span className="text-[#A8B5A2] shrink-0 mt-0.5">✓</span>
              {t}
            </li>
          ))}
        </motion.ul>
        <motion.p variants={fadeUp} className="mt-12 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75] max-w-2xl mx-auto">
          É isso que significa desenvolver flexibilidade psicológica: não viver sem ansiedade, mas
          impedir que ela continue decidindo os rumos da sua vida.
        </motion.p>
      </Reveal>
    </section>
  );
}


function CTAProduto() {
  return (
    <CTABlock
      text="Se faz sentido para você, este pode ser o momento de dar o primeiro passo."
      button="Quero começar agora →"
    />
  );
}

function Receba() {
  const items = [
    {
      e: "📘",
      tag: "Produto principal",
      title: "O que vai te guiar: Um Novo Jeito de Lidar com a Ansiedade",
      desc: "O material completo, baseado em ACT, com explicações claras, exemplos do cotidiano e exercícios práticos.",
    },
    {
      e: "📋",
      tag: "Bônus 01",
      title: "Checklist de Gatilhos da Ansiedade",
      desc: "Uma ferramenta prática para identificar situações, pensamentos e contextos que costumam intensificar sua ansiedade, e o que fazer quando isso acontece.",
    },
    {
      e: "🚨",
      tag: "Bônus 02",
      title: "Cartão de Emergência Emocional",
      desc: "Um recurso para deixar no celular e consultar sempre que precisar, com exercícios rápidos de respiração, ancoragem, frases de desfusão e passos práticos para momentos difíceis.",
    },
  ];
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-28">
      <Reveal className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold">
            O que você recebe
          </h2>
          <p className="mt-6 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75] max-w-2xl mx-auto">
            Você receberá um conjunto de materiais que se complementam para ajudar você a aplicar
            o conteúdo na prática.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="rounded-xl p-7 sm:p-8 bg-[#EAF0EC] transition-all duration-300 sm:hover:-translate-y-1"
            >
              <div className="text-4xl mb-5">{it.e}</div>
              <h3 className="font-display text-[22px] sm:text-[24px] text-[#2D5A3D] leading-tight">{it.title}</h3>
              <p className="mt-3 text-[17px] text-[#5C5C5C] leading-[1.7]">{it.desc}</p>
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
      n: "Flávia",
      t: [
        "Era péssimo. Sentia meu coração acelerado, não conseguia parar de pensar nisso. Ficava nervosa por qualquer motivo e chorava algumas vezes.",
        "Hoje sou uma nova mulher, com certeza. Eu tenho tranquilidade e paz no meu coração. Eu consigo lidar com meus sentimentos de forma mais leve.",
      ],
    },
    {
      n: "Nome preservado a pedido",
      t: [
        "Perturbador. Pensamentos acelerados e muitas preocupações. Ainda tenho, mas acho que hoje lido melhor.",
        "Ela existe lá e eu posso coexistir com ela. Posso fazer meu trabalho e sentir ansiedade. Percebia que antes ela me limitava e impedia que eu fizesse outras coisas.",
        "Não dá para viver plenamente sem olhar para si. A ansiedade atrapalha muito em muitas coisas e, às vezes, é o que impede de alcançar objetivos, melhorar as relações etc.",
      ],
    },
    {
      n: "Isabella C.",
      t: [
        "Não dormia bem. Acordava muito à noite. Ficava dias ou semanas com sensações de angústia frequentemente. Quando tinha algo para acontecer, ficava estressada.",
        "Hoje tento conviver com a ansiedade da melhor forma, sabendo que ela não vai desaparecer, mas não vai mais me consumir igual antes. Uso muitas falas, técnicas e pensamentos aprendidos na terapia. Você não precisa passar por isso sozinha. Existem formas de viver melhor, sem tanta angústia, e muitas ferramentas para te ajudar.",
      ],
    },
    {
      n: "Thaís",
      t: [
        "O estresse que me gerava por conta do excesso de preocupações afetava meu sono, meu trabalho e minha relação com meu filho.",
        "Eu tento entender o que essa ansiedade está querendo me dizer, pois vejo ela como um sinal. E, a partir daí, pensar racionalmente no que eu posso fazer, no que está sob meu controle e em como posso resolver determinada situação.",
        "Ansiedade é um sinal de alerta para você olhar para algo que está te incomodando, te deixando insegura. E ela não pode ser negligenciada.",
      ],
    },
    {
      n: "M. C. S.",
      t: [
        "Nos relacionamentos em geral era mais tranquilo, mas, no meu namoro, a ansiedade me deixava insegura, porque tinha diversos pensamentos automáticos imaginando catástrofes que não condiziam com a realidade do momento. Além disso, perdia o sono por vários dias ou dormia a noite toda, mas acordava cansada. Ainda tinha a dificuldade para aceitar novos desafios, já que eu não reconhecia potencial em mim mesma.",
        "Creio que tenho conseguido racionalizar melhor meus momentos de ansiedade. Não deixo de sentir, mas consigo manejar melhor. Consigo identificar a causa e, assim, desemaranhar (muito chique, aprendi com a Mari rsrs) meus pensamentos. Então vejo de forma mais clara o que me angustia.",
      ],
    },
    {
      n: "Guilherme",
      t: [
        "Tinha muita ansiedade de desempenho. Sofria por medo de falhar ou passar vergonha. Isso me deixava mais inseguro e indeciso.",
        "Consegui trabalhar isso melhor. Hoje lido com mais leveza com meus erros e tenho menos medo deles.",
      ],
    },
    {
      n: "Nome preservado a pedido",
      t: [
        "Vivia pilhado durante todo o meu dia, me achando insuficiente, não merecedor. Era muito ruim, porque eu não conseguia sair desses pensamentos, mesmo que tentasse.",
        "Comecei a respeitar mais os meus sentimentos e a entender que pensamentos existem, mas são apenas pensamentos. E, assim, aprendi a administrar as situações que me causavam estresse, decidindo o que eu iria internalizar ou não.",
      ],
    },
  ];
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-28 bg-white">
      <Reveal className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold">
            Pessoas que desenvolveram uma relação mais saudável com a ansiedade relatam:
          </h2>
          <p className="mt-5 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75] max-w-2xl mx-auto">
            Cada pessoa vive a ansiedade de uma forma diferente. Estas são experiências reais de
            pessoas acompanhadas pela Mariana.
          </p>
        </motion.div>
        <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="mb-6 break-inside-avoid rounded-xl p-7 sm:p-8 bg-[#EAF0EC] transition-all duration-300 sm:hover:-translate-y-1"
            >
              <div className="font-display text-[#C78162] text-5xl leading-none mb-2">“</div>
              <div className="space-y-4">
                {it.t.map((p, j) => (
                  <p key={j} className="text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-[#A8B5A2]/50">
                <p className="font-display text-[#2D5A3D] text-[16px]">{it.n}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={fadeUp}
          className="mt-10 text-[14px] text-[#5C5C5C]/80 leading-relaxed max-w-3xl mx-auto text-center"
        >
          Os depoimentos acima foram compartilhados voluntariamente por pacientes que autorizaram
          sua utilização para fins institucionais. Cada processo terapêutico é único e os resultados
          variam de acordo com a história, o contexto e o envolvimento de cada pessoa.
        </motion.p>
      </Reveal>
    </section>
  );
}

function CTADepoimentos() {
  return (
    <CTABlock
      text="Você também pode começar hoje a construir uma relação mais leve com a ansiedade."
      button="Quero acessar o guia →"
    />
  );
}

function SobreMariana() {
  return (
    <section id="mariana" className="px-5 sm:px-8 py-16 sm:py-28">
      <Reveal className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
        <motion.div variants={fadeUp} className="md:col-span-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-[#A8B5A2]/30 rounded-full blur-2xl" />
            <img
              src={sobreVoce.url}
              alt="Mariana Anício, psicóloga e criadora do guia"
              className="relative w-full max-w-[320px] rounded-2xl shadow-[0_24px_60px_-20px_rgba(107,67,37,0.35)]"
            />
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="md:col-span-3">
          <h2 className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold">
            Quem criou este guia?
          </h2>
          <p className="mt-6 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">
            Sou Mariana Anício, psicóloga e pós-graduada em Terapia de Aceitação e Compromisso (ACT).
          </p>
          <p className="mt-4 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">
            Nos últimos cinco anos de prática clínica, acompanhando centenas de pessoas, percebi um
            padrão muito claro: a ansiedade deixou de ser apenas uma emoção e passou a ocupar o
            lugar de identidade. Talvez você mesma já tenha se pegado dizendo: “Eu sou
            ansiosa”. Foi justamente a partir dessa experiência que criei este guia.
          </p>
          <p className="mt-4 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">
            Nele, vou te ajudar a transformar a forma como você se relaciona com a ansiedade. Você
            vai entender por que ela aparece, o que ela está tentando comunicar e como agir de
            maneira mais consciente quando ela surgir, sem precisar lutar contra ela nem ser
            controlada(o) por ela.
          </p>
          <p className="mt-4 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">
            A ideia não é eliminar a ansiedade, mas fazer com que ela deixe de conduzir sua vida.
            Afinal, ela faz parte da experiência humana e não precisa ser um obstáculo para que
            você construa uma vida mais alinhada ao que realmente importa.
          </p>
        </motion.div>
      </Reveal>
    </section>
  );
}

function Pricing() {
  const features = [
    "Guia Principal - Um Novo Jeito de Lidar com a Ansiedade",
    "Bônus 1 - Checklist de Gatilhos da Ansiedade",
    "Bônus 2 - Cartão de Emergência Emocional",
  ];
  return (
    <section id="pricing" className="px-5 sm:px-8 py-16 sm:py-28 bg-white">
      <Reveal className="max-w-2xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold">
            Comece hoje, no seu ritmo.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 rounded-3xl bg-white/70 backdrop-blur-md border border-[rgba(107,67,37,0.15)] p-8 sm:p-10 shadow-[0_30px_70px_-30px_rgba(107,67,37,0.35)] md:flex md:items-start md:gap-10"
        >
          <div className="mx-auto md:mx-0 shrink-0 w-[180px] md:w-[220px] lg:w-[240px] mb-8 md:mb-0">
            <img
              src={capaGuia.url}
              alt="Capa do guia Um Novo Jeito de Lidar com a Ansiedade, de Mariana Anício"
              loading="lazy"
              className="w-full h-auto rounded-lg shadow-[0_25px_50px_-15px_rgba(107,67,37,0.45)]"
            />
          </div>

          <div className="min-w-0 flex-1">
          <h3 className="font-display text-[22px] sm:text-[24px] text-[#2D5A3D] text-center">
            Um Novo Jeito de Lidar com a Ansiedade
          </h3>

          <p className="mt-6 text-center font-display text-xl text-[#2D5A3D]">Hoje você recebe:</p>

          <ul className="mt-5 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3 text-[17px] text-[#5C5C5C]">
                <span className="text-[#A8B5A2] shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-[14px] text-[#5C5C5C]">Tudo isso por apenas</p>
          <div className="mt-2 flex items-end justify-center gap-3">
            <span className="text-[#7B8C9B] line-through">R$ 87,00</span>
            <span className="font-display text-5xl sm:text-6xl text-[#2D5A3D] leading-none">
              R$ 47,90
            </span>
          </div>
          <p className="text-center text-[14px] text-[#5C5C5C] mt-3 leading-relaxed">
            Pagamento único.<br />Acesso imediato.<br />Garantia de 7 dias.
          </p>

          <div className="mt-8 flex justify-center">
            <CTA className="w-full sm:w-auto text-base">Quero acessar o guia →</CTA>
          </div>

          <p className="mt-5 text-center text-[14px] text-[#5C5C5C] tracking-wide">
            🔒 Pagamento seguro
          </p>

          <div className="mt-6 rounded-2xl border border-dashed border-[#A8B5A2]/60 bg-[#A8B5A2]/10 p-5 text-center">
            <p className="font-display text-[#2D5A3D] text-lg">Garantia incondicional de 7 dias.</p>
            <p className="text-[14px] text-[#5C5C5C] mt-1">
              Se não fizer sentido pra você, devolvemos 100% do valor.
            </p>
          </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

function Garantia() {
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-28">
      <Reveal className="max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold"
        >
          Garantia incondicional de 7 dias.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">
          Você tem sete dias completos para acessar todo o conteúdo. Se perceber que este material
          não faz sentido para você, basta solicitar o reembolso e devolvemos 100% do valor
          investido, sem burocracia, sem perguntas constrangedoras.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">
          Queremos que sua decisão seja tranquila, porque escolher cuidar de si já é, por si só,
          um passo importante.
        </motion.p>
      </Reveal>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#A8B5A2]/50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left"
      >
        <span className="font-display text-[19px] sm:text-[24px] text-[#2D5A3D]">{q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-[rgba(107,67,37,0.2)] grid place-items-center transition-transform duration-300 ${
            open ? "rotate-45 bg-[#CC6A39] text-white border-transparent" : "text-[#2D5A3D]"
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
            <p className="pb-6 text-[17px] sm:text-[18px] text-[#5C5C5C] leading-[1.75]">{a}</p>
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
      a: "Não. Este guia tem caráter psicoeducativo e complementa, mas não substitui, o acompanhamento psicológico individual.",
    },
    { q: "Como recebo o material?", a: "O acesso é enviado imediatamente após a confirmação do pagamento, diretamente para o seu e-mail." },
    { q: "Funciona no celular?", a: "Sim. Todo o conteúdo foi desenvolvido para funcionar perfeitamente no celular, tablet ou computador." },
    { q: "Quanto tempo leva para ler?", a: "Você avança no seu próprio ritmo. O material pode ser revisitado quantas vezes desejar." },
    { q: "Preciso ter diagnóstico?", a: "Não. O guia foi pensado para qualquer pessoa que queira compreender e melhorar sua relação com a ansiedade." },
    { q: "O conteúdo é técnico?", a: "Não. Foi escrito em linguagem simples e acessível, mantendo o rigor científico." },
    { q: "E se eu não gostar?", a: "Você tem garantia incondicional de 7 dias. Basta entrar em contato e devolvemos 100% do valor — sem burocracia." },
    { q: "Como funciona a garantia?", a: "Entre em contato dentro do prazo de 7 dias e devolvemos integralmente o valor pago. Sem questionamentos." },
  ];
  return (
    <section id="faq" className="px-5 sm:px-8 py-16 sm:py-28 bg-white">
      <Reveal className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-[#2D5A3D] text-[28px] sm:text-[36px] leading-[1.2] font-semibold">
            Perguntas frequentes
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
    <section className="px-5 sm:px-8 py-16 sm:py-28 bg-[#6B4325] relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#C78162]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#A8B5A2]/15 blur-3xl" />
      <Reveal className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-white text-[28px] sm:text-[36px] leading-[1.2] font-semibold"
        >
          Você não precisa esperar a ansiedade desaparecer para voltar a viver.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-white/80 leading-[1.75] max-w-2xl mx-auto">
          A ansiedade talvez ainda apareça amanhã.<br />Na semana que vem também.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-white/80 leading-[1.75] max-w-2xl mx-auto">
          E isso não significa que ela precise continuar decidindo por você.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-white/90 leading-[1.75] max-w-2xl mx-auto font-display italic">
          Você pode continuar tentando vencer a ansiedade todos os dias.<br />
          Ou pode começar hoje a construir uma nova relação com ela.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-white/80 leading-[1.75] max-w-2xl mx-auto">
          A mudança começa quando você aprende uma nova forma de responder ao que sente, com mais
          consciência, mais flexibilidade e mais liberdade para agir na direção da vida que deseja
          construir.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-white/80 leading-[1.75] max-w-2xl mx-auto">
          Se este guia ajudar você a dar esse primeiro passo, ele já terá cumprido o seu propósito.
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
          <p className="mt-3 text-sm text-white/60">por Mariana Anício · Psicóloga ACT</p>
        </div>
        <div>
          <ul className="space-y-2 text-sm mb-4">
            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm leading-[1.7] text-white/70 mb-4">
            Este material possui caráter psicoeducativo e não substitui acompanhamento psicológico
            individual.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-white/50 flex flex-wrap justify-between gap-3">
        <span>© 2026 Mariana Anício. Todos os direitos reservados.</span>
        <span>Vamos construir uma vida guiada pelo que realmente importa?</span>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`sm:hidden fixed bottom-0 inset-x-0 z-50 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] bg-white border-t border-[#A8B5A2]/50 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#pricing"
        className="flex w-full min-h-[52px] items-center justify-center rounded-full bg-[#CC6A39] text-white text-[18px] font-semibold"
      >
        Quero acessar o guia →
      </a>
    </div>
  );
}

function Index() {
  return (
    <main
      className="min-h-screen font-sans text-[17px] sm:text-[18px] text-[#5C5C5C] antialiased scroll-smooth pb-[76px] sm:pb-0"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Nav />
      <Hero />
      <Identificacao />
      <Problema />
      <CTAProblema />
      <VisaoFuturo />
      <CTAProduto />
      <Receba />
      <Depoimentos />
      <CTADepoimentos />
      <SobreMariana />
      <Pricing />
      <Garantia />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}


