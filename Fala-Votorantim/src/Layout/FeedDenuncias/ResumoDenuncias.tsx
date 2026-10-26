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
      titulo: "Total",
      valor: denuncias.length,
      cor: "border-gray-300",
      numero: "text-gray-400",
    },
    {
      titulo: "Pendentes",
      valor: denuncias.filter(
        (d) => d.status === "Pendente"
      ).length,
      cor: "border-yellow-400",
      numero: "text-yellow-500",
    },
    {
      titulo: "Em andamento",
      valor: denuncias.filter(
        (d) => d.status === "Em andamento"
      ).length,
      cor: "border-blue-500",
      numero: "text-blue-600",
    },
    {
      titulo: "Resolvidas",
      valor: denuncias.filter(
        (d) => d.status === "Resolvido"
      ).length,
      cor: "border-green-400",
      numero: "text-green-500",
    },
  ];

  return (
    <section
      aria-label="Resumo das denúncias"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {cards.map((card) => (
        <div
          key={card.titulo}
          className={`flex min-h-[88px] flex-col justify-between rounded-xl border-b-4 border-l-4 bg-white p-4 shadow-sm ${card.cor}`}
        >
          <span
            className={`text-2xl font-semibold ${card.numero}`}
          >
            {card.valor}
          </span>

          <span className="text-sm text-[#6A7282]">
            {card.titulo}
          </span>
        </div>
      ))}
    </section>
  );
}
