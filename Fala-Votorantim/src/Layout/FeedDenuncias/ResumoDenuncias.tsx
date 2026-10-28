// Exibir Total, Pendentes, Em andamento e Resolvidas.

import type { Denuncia, CardResumo } from "./types";

type ResumoDenunciasProps = {
  denuncias: Denuncia[];
};

export default function ResumoDenuncias({
  denuncias,
}: ResumoDenunciasProps) {
  const cards: CardResumo[] = [
    {
      titulo: "Total de denúncias",
      valor: denuncias.length,
      cor: "#99A1AF",
      numero: "text-[#1E2939]",
    },
    {
      titulo: "Pendentes",
      valor: denuncias.filter((d) => d.status === "Pendente").length,
      cor: "#F0B100",
      numero: "text-[#A65F00]",
    },
    {
      titulo: "Em andamento",
      valor: denuncias.filter((d) => d.status === "Em andamento").length,
      cor: "#1447E6",
      numero: "text-[#1447E6]",
    },
    {
      titulo: "Resolvidas",
      valor: denuncias.filter((d) => d.status === "Resolvido").length,
      cor: "#00A63E",
      numero: "text-[#0D542B]",
    },
  ];

  return (
    <section
      aria-label="Resumo das denúncias"
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {cards.map((card) => (
        <div
          key={card.titulo}
          className="flex flex-col gap-2 rounded-2xl border border-[#E5E7EB] bg-white p-5"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-[#6A7282]">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: card.cor }}
            />
            {card.titulo}
          </span>
          <span className={`text-3xl font-bold tracking-tight ${card.numero}`}>
            {card.valor}
          </span>
        </div>
      ))}
    </section>
  );
}
