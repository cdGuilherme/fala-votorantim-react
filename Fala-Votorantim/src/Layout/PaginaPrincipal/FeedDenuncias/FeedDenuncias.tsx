import NavegacaoPublica from "../../NavegacaoPublica";
import Footer from "../../../Components/Footer/Footer";
import ResumoDenuncias from "../../FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../FeedDenuncias/ListaDenuncias";
import useFeedDenuncias from "../../../hooks/Denuncias/useFeedDenuncias";

export default function Feed() {
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
        <div className="flex min-h-screen flex-col">
            <NavegacaoPublica />
            <main className="flex-1 bg-[#EFF6FF] px-4 py-8 sm:px-8 lg:px-[8vw]">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-[#1E2939]">
                            Feed de Denúncias
                        </h1>
                        <p className="pl-1 text-base text-[#6A7282]">
                            Acompanhe as denúncias registradas em Votorantim.
                        </p>
                    </header>

                    <ResumoDenuncias denuncias={denuncias} />

                    {mensagemErro && (
                        <p
                            role="status"
                            className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
                        >
                            {mensagemErro}
                        </p>
                    )}

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

                    <ListaDenuncias denuncias={filtradas} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
