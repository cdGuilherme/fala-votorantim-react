// Exibir o total e a quantidade de denúncias em cada status.

import type { Denuncia, CardResumo } from "./types";
import { corStatus, statusDisponiveis } from "./dadosDenuncias";

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
      cor: "#1E2939",
      numero: "text-[#1E2939]",
    },
    ...statusDisponiveis.map((status) => ({
      titulo: status,
      valor: denuncias.filter((d) => d.status === status).length,
      cor: corStatus[status],
      numero: "text-[#1E2939]",
    })),
  ];

  return (
    <section
      aria-label="Resumo das denúncias"
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6"
    >
      {cards.map((card) => (
        <div
          key={card.titulo}
          className="flex flex-col gap-2 rounded-2xl border border-[#E5E7EB] bg-white p-4"
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
