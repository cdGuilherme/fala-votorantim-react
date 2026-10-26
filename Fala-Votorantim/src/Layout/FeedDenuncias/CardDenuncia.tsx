// Apresentar os dados, a categoria e o status de cada denúncia.

import type { Denuncia } from "./types";
import { estilosStatus } from "./dadosDenuncias";

type CardDenunciaProps = {
  denuncia: Denuncia;
};

export default function CardDenuncia({
  denuncia,
}: CardDenunciaProps) {
  const estiloCard =
    denuncia.status === "Em andamento"
      ? "border-blue-200 bg-blue-50"
      : denuncia.status === "Resolvido"
        ? "border-green-200 bg-green-50"
        : "border-yellow-200 bg-yellow-50";

  return (
    <article
      className={`flex flex-col gap-2 rounded-xl border-2 p-4 transition-shadow hover:shadow-sm sm:p-5 ${estiloCard}`}
    >
      {/* Código e status */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#C7CDD6] bg-white px-3 py-1.5 text-sm text-[#273449]">
          #{denuncia.id}
        </span>

        <span
          className={`rounded-full border px-3 py-1.5 text-sm ${estilosStatus[denuncia.status]}`}
        >
          {denuncia.status}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-xl font-medium leading-snug text-[#1E2939]">
        {denuncia.titulo}
      </h3>

      {/* Categoria */}
      <div>
        <span className="inline-block rounded-full border border-[#C7CDD6] bg-white px-3 py-1.5 text-sm text-[#273449]">
          {denuncia.categoria}
        </span>
      </div>

      {/* Descrição */}
      <p className="text-base leading-relaxed text-[#364152]">
        {denuncia.descricao}
      </p>

      {/* Local e data */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-[#6A7282]">
          {denuncia.endereco}
        </p>

        <p className="text-sm text-[#6A7282]">
          {denuncia.data}
        </p>
      </div>
    </article>
  );
}
