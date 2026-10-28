import { useCallback, useState } from "react";
import NavegacaoADM from "../NavegacaoADM";
import ResumoDenuncias from "../../../Layout/FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../../Layout/FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../../Layout/FeedDenuncias/ListaDenuncias";
import DetalheDenuncia from "../../../Layout/FeedDenuncias/DetalheDenuncia";
import useFeedDenuncias from "../../../hooks/Denuncias/useFeedDenuncias";

export default function FeedDenuncias() {
    const {
        denuncias,
        filtradas,
        mensagemErro,
        busca,
        setBusca,
        mostrarFiltros,
        setMostrarFiltros,
        categoriasSelecionadas,
        alternarCategoria,
        statusSelecionados,
        alternarStatus,
        dataInicial,
        setDataInicial,
        dataFinal,
        setDataFinal,
        ordemData,
        setOrdemData,
        limparFiltros,
        alterarStatus,
    } = useFeedDenuncias();

    // Guarda só o id para o painel sempre mostrar o status mais recente.
    const [idAberta, setIdAberta] = useState<string | null>(null);
    const denunciaAberta = denuncias.find((d) => d.id === idAberta);
    const fecharDetalhe = useCallback(() => setIdAberta(null), []);

    return (
        <div className="flex min-h-screen bg-[#F5F8FF]">
            <NavegacaoADM />

            <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-6 lg:ml-64 lg:px-10 lg:pt-8">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                    <header className="flex flex-col gap-2">
                        <span className="text-sm font-semibold uppercase tracking-widest text-[#1447E6]">
                            Painel administrativo
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-[#1E2939]">
                            Feed de Denúncias
                        </h1>
                        <p className="text-[#6A7282]">
                            Verifique as denúncias registradas em Votorantim, abra os detalhes e atualize o andamento de cada uma.
                        </p>
                    </header>

                    <ResumoDenuncias denuncias={denuncias} />

                    {mensagemErro && (
                        <p role="status" className="rounded-xl border border-[#FDE68A] bg-[#FEFCE8] p-3 text-sm text-[#A65F00]">
                            {mensagemErro}
                        </p>
                    )}

                    <FiltrosDenuncias
                        busca={busca}
                        onBuscaChange={setBusca}
                        mostrarFiltros={mostrarFiltros}
                        onToggleFiltros={() => setMostrarFiltros((atual) => !atual)}
                        categoriasSelecionadas={categoriasSelecionadas}
                        onAlternarCategoria={alternarCategoria}
                        statusSelecionados={statusSelecionados}
                        onAlternarStatus={alternarStatus}
                        onLimparFiltros={limparFiltros}
                        dataInicial={dataInicial}
                        onDataInicialChange={setDataInicial}
                        dataFinal={dataFinal}
                        onDataFinalChange={setDataFinal}
                        ordemData={ordemData}
                        onOrdemDataChange={setOrdemData}
                    />

                    <ListaDenuncias
                        denuncias={filtradas}
                        quantidadeInicial={6}
                        onAbrir={(denuncia) => setIdAberta(denuncia.id)}
                    />
                </div>
            </main>

            {denunciaAberta && (
                <DetalheDenuncia
                    key={denunciaAberta.id}
                    denuncia={denunciaAberta}
                    onFechar={fecharDetalhe}
                    onAlterarStatus={alterarStatus}
                />
            )}
        </div>
    );
}
