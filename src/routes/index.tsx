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
        "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-terracota text-brand-white type-cta tracking-wide shadow-[0_10px_30px_-10px_rgba(204,106,57,0.55)] transition-all duration-300 hover:bg-brand-terracota-hover hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(204,106,57,0.65)] active:translate-y-0 " +
        className
      }
    >
      {children}
    </a>
  );
}

function CTABlock({ text, button }: { text: string; button: string }) {
  return (
    <section className="px-5 sm:px-8 py-12 bg-white/40">
      <div className="max-w-4xl mx-auto text-center">
        <p className="type-body text-brand-brown leading-[1.75] mb-8">
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
        <a href="#top" className="font-display text-brand-brown text-lg sm:text-xl leading-tight whitespace-nowrap">
          Um Novo Jeito…
        </a>
        <a
          href="#pricing"
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-terracota text-brand-white type-cta transition-all duration-300 hover:bg-brand-terracota-hover hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(204,106,57,0.6)]"
        >
          Quero acessar o guia →
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="sm:hidden w-10 h-10 grid place-items-center rounded-full border border-brand-sage text-brand-brown"
        >
          <div className="space-y-1.5">
            <span className="block w-4 h-px bg-brand-brown" />
            <span className="block w-4 h-px bg-brand-brown" />
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
            <div className="rounded-2xl bg-brand-white backdrop-blur-md border border-brand-sage p-4 flex flex-col gap-3">
              {[
                ["O guia", "#produto"],
                ["Para quem é", "#para-quem"],
                ["Sobre Mariana", "#mariana"],
                ["Perguntas", "#faq"],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="text-brand-brown type-small">
                  {label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-brand-terracota text-brand-white type-cta hover:bg-brand-terracota-hover"
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
          className="font-display text-brand-sage mt-6 type-h1 leading-[1.1] font-semibold tracking-tight"
        >
          Você não precisa esperar a ansiedade desaparecer para voltar a viver.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 type-body text-brand-brown leading-[1.75] max-w-2xl mx-auto"
        >
          Para quem já tentou controlar a ansiedade de todas as formas, e está pronta para
          experimentar um caminho diferente.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <p className="text-brand-brown mb-3 font-display italic type-h3">
            Assista ao vídeo antes de continuar 👇
          </p>
          <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-brand-sage shadow-[0_30px_60px_-30px_rgba(107,67,37,0.35)] bg-brand-white backdrop-blur-sm">
            <div className="aspect-video w-full bg-brand-sage/30 grid place-items-center">
              {/* REPLACE WITH YOUTUBE URL */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-brand-white backdrop-blur grid place-items-center shadow-xl"
              >
                <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[18px] border-l-brand-terracota ml-1.5" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <CTA>Quero acessar o guia →</CTA>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 type-small text-brand-brown"
        >
          <li><span className="text-brand-green">✓</span> Acesso imediato</li>
          <li><span className="text-brand-green">✓</span> Funciona no celular</li>
          <li><span className="text-brand-green">✓</span> Garantia de 7 dias</li>
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
    { e: "⚠️", t: "Você vive preocupada com o que pode acontecer." },
    { e: "😮‍💨", t: "Parece difícil simplesmente relaxar." },
    { e: "🔄", t: "Quanto mais tenta controlar a ansiedade, pior ela parece ficar." },
    { e: "💭", t: "A ansiedade está ocupando espaço demais na sua vida." },
    { e: "🖤", t: "Você deixou de fazer coisas importantes por causa da ansiedade." },
  ];
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-5xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-brand-sage type-h2 leading-[1.1] font-semibold"
        >
          Você se reconhece em alguma dessas situações?
        </motion.h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl p-7 text-left bg-brand-card-warm border border-brand-card-warm-border transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{it.e}</div>
              <p className="type-card text-brand-brown leading-[1.7]">{it.t}</p>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeUp} className="mt-12 font-display italic text-brand-brown type-h3">
          Se você se identificou com algum desses pontos, saiba que não está sozinha, e que existe uma forma diferente de lidar com isso.
        </motion.p>
      </Reveal>
    </section>
  );
}

function Problema() {
  return (
    <section className="px-5 sm:px-8 py-24 sm:py-32 bg-brand-white">
      <Reveal className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-brand-sage type-h2 leading-[1.1] font-semibold"
        >
          O problema não é sentir ansiedade.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 font-display type-h3 text-brand-terracota italic">
          O problema é ficar presa na luta contra ela.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-8 type-body text-brand-brown leading-[1.75] max-w-2xl mx-auto">
          Quando tentamos empurrar pensamentos difíceis para longe, eles voltam com mais força.
          Quando lutamos contra uma emoção, ela se intensifica.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-6 type-body text-brand-brown leading-[1.75] max-w-2xl mx-auto italic">
          Na prática clínica e nas pesquisas sobre ansiedade, observamos um padrão: quanto mais
          lutamos contra determinadas emoções, mais espaço elas tendem a ocupar.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-14">
          <div className="relative mx-auto max-w-md">
            <div className="aspect-square rounded-full border border-dashed border-brand-sage grid place-items-center relative">
              <div className="absolute inset-8 rounded-full border border-dashed border-brand-sage/60" />
              <div className="text-center px-8">
                <p className="font-display text-brand-brown type-h3">Reconhece esse ciclo?</p>
                <p className="type-small text-brand-brown mt-2 leading-relaxed">
                  Pensamento → Resistência → Mais ansiedade → Mais controle → Esgotamento
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-10 font-display italic text-brand-brown type-h3">
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
    <section className="px-5 sm:px-8 py-24 sm:py-32 bg-brand-white">
      <Reveal className="max-w-4xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-brand-sage type-h2 leading-[1.1] font-semibold"
        >
          E se a ansiedade deixasse de comandar suas escolhas?
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 font-display italic text-brand-brown type-h3">
          Imagine conseguir:
        </motion.p>
        <motion.ul variants={fadeUp} className="mt-10 max-w-2xl mx-auto space-y-4 text-left">
          {items.map((t) => (
            <li key={t} className="flex gap-3 type-body text-brand-brown leading-[1.7]">
              <span className="text-brand-green shrink-0 mt-0.5">✓</span>
              {t}
            </li>
          ))}
        </motion.ul>
        <motion.p variants={fadeUp} className="mt-12 type-body text-brand-brown leading-[1.75] max-w-2xl mx-auto">
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
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-brand-sage type-h2 leading-[1.1] font-semibold">
            O que você recebe
          </h2>
          <p className="mt-6 type-body text-brand-brown leading-[1.75] max-w-2xl mx-auto">
            Você receberá um conjunto de materiais que se complementam para ajudar você a aplicar
            o conteúdo na prática.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              className="rounded-xl p-8 bg-brand-card-green border border-brand-sage transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(107,67,37,0.3)]"
            >
              <div className="text-4xl mb-5">{it.e}</div>
              <h3 className="font-display type-h3 text-brand-brown leading-tight">{it.title}</h3>
              <p className="mt-3 type-card text-brand-brown leading-[1.7]">{it.desc}</p>
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
    <section className="px-5 sm:px-8 py-24 sm:py-32 bg-brand-white">
      <Reveal className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-brand-sage type-h2 leading-[1.1] font-semibold">
            Pessoas que desenvolveram uma relação mais saudável com a ansiedade relatam:
          </h2>
          <p className="mt-5 type-body text-brand-brown leading-[1.75] max-w-2xl mx-auto">
            Cada pessoa vive a ansiedade de uma forma diferente. Estas são experiências reais de
            pessoas acompanhadas pela Mariana.
          </p>
        </motion.div>
        <div className="mt-14 columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="mb-6 break-inside-avoid rounded-r-xl rounded-l-none p-8 bg-brand-white border-l-4 border-l-brand-terracota transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-25px_rgba(107,67,37,0.3)]"
            >
              <div className="font-display text-brand-terracota text-5xl leading-none mb-2">“</div>
              <div className="space-y-4">
                {it.t.map((p, j) => (
                  <p key={j} className="type-quote text-brand-brown leading-[1.75]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-brand-sage">
                <p className="font-display type-name text-brand-terracota">{it.n}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={fadeUp}
          className="mt-10 type-small text-brand-brown leading-relaxed max-w-3xl mx-auto text-center"
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
    <section id="mariana" className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
        <motion.div variants={fadeUp} className="md:col-span-2 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-brand-sage/30 rounded-full blur-2xl" />
            <img
              src={sobreVoce.url}
              alt="Mariana Anício, psicóloga e criadora do guia"
              className="relative w-full max-w-[320px] rounded-2xl shadow-[0_24px_60px_-20px_rgba(107,67,37,0.35)]"
            />
          </div>
        </motion.div>
        <motion.div variants={fadeUp} className="md:col-span-3">
          <h2 className="font-display text-brand-sage type-h2 leading-[1.1] font-semibold">
            Quem criou este guia?
          </h2>
          <p className="mt-6 type-body text-brand-brown leading-[1.75]">
            Sou Mariana Anício, psicóloga e pós-graduada em Terapia de Aceitação e Compromisso (ACT).
          </p>
          <p className="mt-4 type-body text-brand-brown leading-[1.75]">
            Nos últimos cinco anos de prática clínica, acompanhando centenas de pessoas, percebi um
            padrão muito claro: a ansiedade deixou de ser apenas uma emoção e passou a ocupar o
            lugar de identidade. Talvez você mesma já tenha se pegado dizendo: “Eu sou
            ansiosa”. Foi justamente a partir dessa experiência que criei este guia.
          </p>
          <p className="mt-4 type-body text-brand-brown leading-[1.75]">
            Nele, vou te ajudar a transformar a forma como você se relaciona com a ansiedade. Você
            vai entender por que ela aparece, o que ela está tentando comunicar e como agir de
            maneira mais consciente quando ela surgir, sem precisar lutar contra ela nem ser
            controlada(o) por ela.
          </p>
          <p className="mt-4 type-body text-brand-brown leading-[1.75]">
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
    <section id="pricing" className="px-5 sm:px-8 py-24 sm:py-32 bg-brand-white">
      <Reveal className="max-w-2xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-brand-sage type-h2 leading-[1.1] font-semibold">
            Comece hoje, no seu ritmo.
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 rounded-xl bg-brand-white border border-brand-sage p-8 sm:p-10 shadow-[0_30px_70px_-30px_rgba(107,67,37,0.35)] md:flex md:items-start md:gap-10"
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
          <h3 className="font-display type-h3 text-brand-brown text-center">
            Um Novo Jeito de Lidar com a Ansiedade
          </h3>

          <p className="mt-6 text-center font-display type-h3 text-brand-brown">Hoje você recebe:</p>

          <ul className="mt-5 space-y-3">
            {features.map((f) => (
              <li key={f} className="flex gap-3 type-body text-brand-brown">
                <span className="text-brand-green shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center type-small text-brand-brown">Tudo isso por apenas</p>
          <div className="mt-2 flex items-end justify-center gap-3">
            <span className="type-body text-brand-sage line-through">R$ 87,00</span>
            <span className="font-display text-5xl sm:text-6xl text-brand-brown leading-none">
              R$ 47,90
            </span>
          </div>
          <p className="text-center type-small text-brand-brown mt-3 leading-relaxed">
            Pagamento único.<br />Acesso imediato.<br />Garantia de 7 dias.
          </p>

          <div className="mt-8 flex justify-center">
            <CTA className="w-full sm:w-auto">Quero acessar o guia →</CTA>
          </div>

          <p className="mt-5 text-center type-small text-brand-brown tracking-wide">
            🔒 Pagamento seguro
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-brand-sage bg-brand-card-green p-5 text-center">
            <p className="font-display text-brand-brown type-h3">Garantia incondicional de 7 dias.</p>
            <p className="type-small text-brand-brown mt-1">
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
    <section className="px-5 sm:px-8 py-24 sm:py-32">
      <Reveal className="max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold"
        >
          Garantia incondicional de 7 dias.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-[#5b5448] leading-[1.75]">
          Você tem sete dias completos para acessar todo o conteúdo. Se perceber que este material
          não faz sentido para você, basta solicitar o reembolso e devolvemos 100% do valor
          investido, sem burocracia, sem perguntas constrangedoras.
        </motion.p>
        <motion.p variants={fadeUp} className="mt-4 text-[#5b5448] leading-[1.75]">
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
    <section id="faq" className="px-5 sm:px-8 py-24 sm:py-32 bg-white/40">
      <Reveal className="max-w-3xl mx-auto">
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="font-display text-[#6B4325] text-3xl sm:text-5xl leading-[1.1] font-semibold">
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
    <section className="px-5 sm:px-8 py-24 sm:py-32 bg-[#6B4325] relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#C78162]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#A8B5A2]/15 blur-3xl" />
      <Reveal className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          className="font-display text-white text-3xl sm:text-5xl md:text-[60px] leading-[1.1] font-semibold"
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

function Index() {
  return (
    <main
      className="min-h-screen font-sans text-[#3f3a32] antialiased scroll-smooth"
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
    </main>
  );
}


