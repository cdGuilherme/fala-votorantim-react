// Exibir as denúncias filtradas ou a mensagem de lista vazia.

import type { Denuncia } from "./types";
import CardDenuncia from "./CardDenuncia";

type ListaDenunciasProps = {
  denuncias: Denuncia[];
};

export default function ListaDenuncias({
  denuncias,
}: ListaDenunciasProps) {
  return (
    <section
      aria-label="Lista de denúncias"
      className="flex flex-col gap-3 rounded-xl border border-[#A0AEC0] bg-white p-3 sm:p-4"
    >
      {denuncias.length > 0 ? (
        denuncias.map((denuncia) => (
          <CardDenuncia
            key={denuncia.id}
            denuncia={denuncia}
          />
        ))
      ) : (
        <div className="px-4 py-10 text-center">
          <p className="text-lg font-medium text-[#1E2939]">
            Nenhuma denúncia encontrada
          </p>

          <p className="mt-2 text-base text-[#6A7282]">
            Tente alterar os filtros da pesquisa.
          </p>
        </div>
      )}
    </section>
  );
}
