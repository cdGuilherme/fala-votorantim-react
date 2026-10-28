
import NavegacaoADM from "../NavegacaoADM";
import ResumoDenuncias from "../../../Layout/FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../../Layout/FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../../Layout/FeedDenuncias/ListaDenuncias";
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
    } = useFeedDenuncias();

    return (
        <div className="flex min-h-screen bg-[#EFF6FF]">
            <NavegacaoADM />

            <main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:pt-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

                    <header className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-[#1E2939] sm:text-3xl">
                            Feed de Denúncias
                        </h1>

                        <p className="text-sm text-[#155DFC] sm:text-base">
                            Gerenciar
                        </p>
                    </header>

                    <section>
                        <ResumoDenuncias denuncias={denuncias} />
                    </section>

                    {mensagemErro && (
                        <p role="status" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                            {mensagemErro}
                        </p>
                    )}

                    <section className="rounded-xl border border-[#D9E4F5] bg-white p-4 shadow-sm sm:p-6">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-[#1E2939]">
                                Pesquisar denúncias
                            </h2>

                            <p className="mt-1 text-sm text-[#6A7282]">
                                Localize denúncias e refine os resultados pelos filtros.
                            </p>
                        </div>

                        <FiltrosDenuncias
                            busca={busca}
                            onBuscaChange={setBusca}
                            mostrarFiltros={mostrarFiltros}
                            onToggleFiltros={() =>
                                setMostrarFiltros((atual) => !atual)
                            }
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
                    </section>

                    <section className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-xl font-bold text-[#1E2939]">
                                Denúncias registradas
                            </h2>

                            <p className="text-sm text-[#6A7282]">
                                {filtradas.length}{" "}
                                {filtradas.length === 1
                                    ? "denúncia encontrada"
                                    : "denúncias encontradas"}
                            </p>
                        </div>

                        <ListaDenuncias
                            denuncias={filtradas}
                            quantidadeInicial={4}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}
