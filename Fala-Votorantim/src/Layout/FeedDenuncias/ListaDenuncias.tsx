import type { Denuncia } from "./types";
import CardDenuncia, { type AcoesCard } from "./CardDenuncia";
import useListaDenuncias from "../../hooks/Denuncias/useListaDenuncias";

type ListaDenunciasProps = {
    denuncias: Denuncia[];
    quantidadeInicial?: number;
    acoesPara?: (denuncia: Denuncia) => AcoesCard;
    onAbrir?: (denuncia: Denuncia) => void;
    mensagemVazia?: string;
};

type ControlesPaginacaoProps = {
    paginaAtual: number;
    totalPaginas: number;
    quantidadePorPagina: string;
    onPaginaChange: (pagina: number) => void;
    onQuantidadeChange: (quantidade: string) => void;
    onQuantidadeBlur: () => void;
};

const estiloBotaoPagina =
    "rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#364153] transition hover:border-[#BEDBFF] hover:text-[#1447E6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#E5E7EB] disabled:hover:text-[#364153]";

function ControlesPaginacao({
    paginaAtual,
    totalPaginas,
    quantidadePorPagina,
    onPaginaChange,
    onQuantidadeChange,
    onQuantidadeBlur,
}: ControlesPaginacaoProps) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 sm:flex-row">
            <label className="flex items-center gap-2 text-sm text-[#6A7282]">
                Itens por página
                <input
                    type="number"
                    min={1}
                    step={1}
                    value={quantidadePorPagina}
                    onChange={(evento) =>
                        onQuantidadeChange(evento.target.value)
                    }
                    onBlur={onQuantidadeBlur}
                    className="w-16 rounded-lg border border-[#E5E7EB] px-2 py-1.5 text-center text-[#1E2939] outline-none focus:border-[#1447E6] focus:ring-2 focus:ring-[#1447E6]/15"
                />
            </label>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => onPaginaChange(paginaAtual - 1)}
                    disabled={paginaAtual <= 1}
                    className={estiloBotaoPagina}
                >
                    ← Anterior
                </button>
                <span className="whitespace-nowrap text-sm text-[#4A5565]">
                    <strong className="text-[#1E2939]">{paginaAtual}</strong> de{" "}
                    {totalPaginas}
                </span>
                <button
                    type="button"
                    onClick={() => onPaginaChange(paginaAtual + 1)}
                    disabled={paginaAtual >= totalPaginas}
                    className={estiloBotaoPagina}
                >
                    Próxima →
                </button>
            </div>
        </div>
    );
}

export default function ListaDenuncias({
    denuncias,
    quantidadeInicial,
    acoesPara,
    onAbrir,
    mensagemVazia = "Tente alterar os filtros da pesquisa.",
}: ListaDenunciasProps) {
    const {
        paginaAtual,
        totalPaginas,
        quantidadePorPagina,
        denunciasPaginadas,
        primeiraDenuncia,
        ultimaDenuncia,
        alterarPagina,
        alterarQuantidadePorPagina,
        normalizarQuantidadePorPagina,
    } = useListaDenuncias(denuncias, quantidadeInicial);

    return (
        <section aria-label="Lista de denúncias" className="flex flex-col gap-4">
            <p className="text-sm text-[#6A7282]" aria-live="polite">
                {denuncias.length === 0
                    ? "Nenhuma denúncia encontrada"
                    : `Exibindo ${primeiraDenuncia}–${ultimaDenuncia} de ${denuncias.length} denúncias`}
            </p>

            {denuncias.length > 0 ? (
                <>
                    <div className="grid gap-4">
                        {denunciasPaginadas.map((denuncia) => (
                            <CardDenuncia
                                key={denuncia.id}
                                denuncia={denuncia}
                                acoes={acoesPara?.(denuncia)}
                                onAbrir={onAbrir && (() => onAbrir(denuncia))}
                            />
                        ))}
                    </div>
                    {totalPaginas > 1 && (
                        <ControlesPaginacao
                            paginaAtual={paginaAtual}
                            totalPaginas={totalPaginas}
                            quantidadePorPagina={quantidadePorPagina}
                            onPaginaChange={alterarPagina}
                            onQuantidadeChange={alterarQuantidadePorPagina}
                            onQuantidadeBlur={normalizarQuantidadePorPagina}
                        />
                    )}
                </>
            ) : (
                <div className="rounded-2xl border border-dashed border-[#D1D5DC] bg-white px-6 py-14 text-center">
                    <p className="text-lg font-semibold text-[#1E2939]">
                        Nenhuma denúncia encontrada
                    </p>
                    <p className="mt-2 text-sm text-[#6A7282]">{mensagemVazia}</p>
                </div>
            )}
        </section>
    );
}
