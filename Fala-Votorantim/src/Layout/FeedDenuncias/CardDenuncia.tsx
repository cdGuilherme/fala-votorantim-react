// Apresentar os dados, a categoria e o status de cada denúncia.
// O feed do usuário passa as ações de favoritar/salvar; o feed do ADM passa onAbrir.

import type { Denuncia } from "./types";
import { corStatus, estilosStatus, imagemDenuncia } from "./dadosDenuncias";

export type AcoesCard = {
  favorita: boolean;
  salva: boolean;
  onFavoritar: () => void;
  onSalvar: () => void;
};

type CardDenunciaProps = {
  denuncia: Denuncia;
  acoes?: AcoesCard;
  onAbrir?: () => void;
};

function Icone({ d, cheio }: { d: string; cheio?: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill={cheio ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const iconeLocal = "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z";
const iconeData = "M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z";
const iconeEstrela = "m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z";
const iconeSalvar = "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z";

export default function CardDenuncia({
  denuncia,
  acoes,
  onAbrir,
}: CardDenunciaProps) {
  return (
    <article
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 pl-6 transition hover:border-[#BEDBFF] hover:shadow-lg hover:shadow-[#1447E6]/5 sm:p-6 sm:pl-7"
    >
      {/* Faixa lateral com a cor do status */}
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ backgroundColor: corStatus[denuncia.status] }}
        aria-hidden="true"
      />

      {/* Textos à esquerda, foto à direita */}
      <div className="flex gap-4 sm:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* Status, categoria e código */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${estilosStatus[denuncia.status]}`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: corStatus[denuncia.status] }}
              />
              {denuncia.status}
            </span>

            <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-[#364153]">
              {denuncia.categoria}
            </span>
          </div>

          {/* Título e descrição */}
          <h3 className="text-lg font-semibold leading-snug text-[#1E2939]">
            {denuncia.titulo}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-[#4A5565]">
            {denuncia.descricao}
          </p>
        </div>

        <div className="relative aspect-square w-[30%] shrink-0 self-start overflow-hidden rounded-xl bg-[#F3F4F6]">
          <img
            src={imagemDenuncia(denuncia)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="absolute left-2 top-2 rounded-full bg-[#1E2939]/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            #{denuncia.id}
          </span>
        </div>
      </div>

      {/* Local, data e ações */}
      <div className="mt-1 flex flex-col gap-3 border-t border-[#F3F4F6] pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 text-sm text-[#6A7282] sm:flex-row sm:gap-5">
          <span className="flex items-center gap-1.5">
            <Icone d={iconeLocal} />
            {denuncia.endereco}
          </span>
          <span className="flex items-center gap-1.5">
            <Icone d={iconeData} />
            {denuncia.data}
          </span>
        </div>

        {acoes && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={acoes.onFavoritar}
              aria-pressed={acoes.favorita}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                acoes.favorita
                  ? "border-[#FDE68A] bg-[#FEFCE8] text-[#A65F00]"
                  : "border-[#E5E7EB] text-[#4A5565] hover:bg-[#F9FAFB]"
              }`}
            >
              <Icone d={iconeEstrela} cheio={acoes.favorita} />
              {acoes.favorita ? "Favoritada" : "Favoritar"}
            </button>
            <button
              type="button"
              onClick={acoes.onSalvar}
              aria-pressed={acoes.salva}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
                acoes.salva
                  ? "border-[#BEDBFF] bg-[#EFF6FF] text-[#1447E6]"
                  : "border-[#E5E7EB] text-[#4A5565] hover:bg-[#F9FAFB]"
              }`}
            >
              <Icone d={iconeSalvar} cheio={acoes.salva} />
              {acoes.salva ? "Salva" : "Salvar"}
            </button>
          </div>
        )}

        {onAbrir && (
          <button
            type="button"
            onClick={onAbrir}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#1447E6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#193CB8]"
          >
            Ver e gerenciar
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </article>
  );
}
