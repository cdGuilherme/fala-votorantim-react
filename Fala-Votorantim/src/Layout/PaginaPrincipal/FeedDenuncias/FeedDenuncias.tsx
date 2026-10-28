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
            <main className="flex-1 bg-[#F5F8FF] px-4 py-10 sm:px-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                    <header className="flex flex-col gap-2">
                        <span className="text-sm font-semibold uppercase tracking-widest text-[#1447E6]">
                            Transparência
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-[#1E2939] md:text-4xl">
                            Feed de Denúncias
                        </h1>
                        <p className="text-[#6A7282]">
                            Acompanhe as denúncias registradas em Votorantim e o andamento de cada uma.
                        </p>
                    </header>

                    <ResumoDenuncias denuncias={denuncias} />

                    {mensagemErro && (
                        <p
                            role="status"
                            className="rounded-xl border border-[#FDE68A] bg-[#FEFCE8] p-3 text-sm text-[#A65F00]"
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
