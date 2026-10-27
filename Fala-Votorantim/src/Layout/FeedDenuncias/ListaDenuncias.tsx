import type { Denuncia } from "./types";
import CardDenuncia from "./CardDenuncia";
import useListaDenuncias from "../../hooks/Denuncias/useListaDenuncias";

type ListaDenunciasProps = {
    denuncias: Denuncia[];
    quantidadeInicial?: number;
};

type ControlesPaginacaoProps = {
    paginaAtual: number;
    totalPaginas: number;
    quantidadePorPagina: string;
    onPaginaChange: (pagina: number) => void;
    onQuantidadeChange: (quantidade: string) => void;
    onQuantidadeBlur: () => void;
};

function ControlesPaginacao({
    paginaAtual,
    totalPaginas,
    quantidadePorPagina,
    onPaginaChange,
    onQuantidadeChange,
    onQuantidadeBlur,
}: ControlesPaginacaoProps) {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-3">
            <label className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                Itens por página:
                <input
                    type="number"
                    min={1}
                    step={1}
                    value={quantidadePorPagina}
                    onChange={(evento) =>
                        onQuantidadeChange(evento.target.value)
                    }
                    onBlur={onQuantidadeBlur}
                    className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center"
                />
            </label>

            <div className="flex w-full items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => onPaginaChange(paginaAtual - 1)}
                    disabled={paginaAtual <= 1}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Anterior
                </button>
                <span className="whitespace-nowrap text-sm text-gray-700">
                    Página {paginaAtual} de {totalPaginas}
                </span>
                <button
                    type="button"
                    onClick={() => onPaginaChange(paginaAtual + 1)}
                    disabled={paginaAtual >= totalPaginas}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}

export default function ListaDenuncias({
    denuncias,
    quantidadeInicial,
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
        <section
            aria-label="Lista de denúncias"
            className="flex flex-col gap-3 rounded-xl border border-[#A0AEC0] bg-white p-3 sm:p-4"
        >
            <div className="flex flex-col gap-3 border-b border-gray-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[#1E2939]">
                        Denúncias
                    </h2>
                    <p className="text-sm text-[#6A7282]" aria-live="polite">
                        {denuncias.length === 0
                            ? "Nenhuma denúncia encontrada"
                            : `Exibindo ${primeiraDenuncia}–${ultimaDenuncia} de ${denuncias.length} denúncias`}
                    </p>
                </div>
            </div>

            {totalPaginas > 0 && (
                <ControlesPaginacao
                    paginaAtual={paginaAtual}
                    totalPaginas={totalPaginas}
                    quantidadePorPagina={quantidadePorPagina}
                    onPaginaChange={alterarPagina}
                    onQuantidadeChange={alterarQuantidadePorPagina}
                    onQuantidadeBlur={normalizarQuantidadePorPagina}
                />
            )}

            {denuncias.length > 0 ? (
                <>
                    <div className="flex flex-col gap-3">
                        {denunciasPaginadas.map((denuncia) => (
                            <CardDenuncia
                                key={denuncia.id}
                                denuncia={denuncia}
                            />
                        ))}
                    </div>
                    {totalPaginas > 0 && (
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
