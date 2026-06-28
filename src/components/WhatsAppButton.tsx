import { useEffect, useState } from "react";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/55XXXXXXXXXXX"
      // Substituir XXXXXXXXXXX pelo número real com DDD e DDI 55. Exemplo: https://wa.me/5531999999999
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Entrar em contato pelo WhatsApp"
      className="fixed z-[999] bottom-7 right-7 w-14 h-14 rounded-full bg-[#CC6A39] flex items-center justify-center shadow-[0_4px_20px_rgba(204,106,57,0.4)] transition-all duration-200 ease-out hover:scale-[1.08] hover:shadow-[0_6px_28px_rgba(204,106,57,0.5)] group"
      style={{ opacity: visible ? 1 : 0, transitionProperty: "opacity, transform, box-shadow" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[26px] h-[26px] text-white"
      >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
        <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
        <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
      </svg>
      <span className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#6B4325] text-white font-sans font-medium text-[13px] rounded-lg px-3.5 py-2 whitespace-nowrap opacity-0 translate-x-2 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none">
        Falar no WhatsApp
      </span>
    </a>
  );
}
