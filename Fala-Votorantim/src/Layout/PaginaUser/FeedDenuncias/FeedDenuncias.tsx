import { useState } from "react";
import NavegacaoPublica from "../../NavegacaoPublica";
import Footer from "../../../Components/Footer/Footer";
import ResumoDenuncias from "../../FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../FeedDenuncias/ListaDenuncias";
import useFeedDenuncias from "../../../hooks/Denuncias/useFeedDenuncias";
import useInteracoesDenuncias from "../../../hooks/Denuncias/useInteracoesDenuncias";
import useSessao from "../../../hooks/useSessao";

type Aba = "todas" | "favoritas" | "salvas";

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
    const { sessao } = useSessao();
    const { favoritas, salvas, alternarFavorita, alternarSalva } =
        useInteracoesDenuncias(sessao?.email);
    const [aba, setAba] = useState<Aba>("todas");

    const abas: { id: Aba; label: string; total: number }[] = [
        { id: "todas", label: "Todas", total: filtradas.length },
        { id: "favoritas", label: "Favoritas", total: filtradas.filter((d) => favoritas.includes(d.id)).length },
        { id: "salvas", label: "Salvas", total: filtradas.filter((d) => salvas.includes(d.id)).length },
    ];

    const visiveis =
        aba === "favoritas"
            ? filtradas.filter((d) => favoritas.includes(d.id))
            : aba === "salvas"
              ? filtradas.filter((d) => salvas.includes(d.id))
              : filtradas;

    return (
        <div className="flex min-h-screen flex-col">
            <NavegacaoPublica />
            <main className="flex-1 bg-[#F5F8FF] px-4 py-10 sm:px-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                    <header className="flex flex-col gap-2">
                        <span className="text-sm font-semibold uppercase tracking-widest text-[#1447E6]">
                            Área do munícipe
                        </span>
                        <h1 className="text-3xl font-bold tracking-tight text-[#1E2939] md:text-4xl">
                            Feed de Denúncias
                        </h1>
                        <p className="text-[#6A7282]">
                            Acompanhe as denúncias da cidade, favorite as que importam para você e salve para ver depois.
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

                    <div role="tablist" aria-label="Filtrar lista" className="flex gap-1 self-start rounded-xl border border-[#E5E7EB] bg-white p-1">
                        {abas.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                role="tab"
                                aria-selected={aba === item.id}
                                onClick={() => setAba(item.id)}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                    aba === item.id
                                        ? "bg-[#1447E6] text-white"
                                        : "text-[#4A5565] hover:bg-[#F3F4F6]"
                                }`}
                            >
                                {item.label}
                                <span className={`rounded-full px-2 text-xs ${aba === item.id ? "bg-white/20" : "bg-[#F3F4F6]"}`}>
                                    {item.total}
                                </span>
                            </button>
                        ))}
                    </div>

                    <ListaDenuncias
                        denuncias={visiveis}
                        acoesPara={(denuncia) => ({
                            favorita: favoritas.includes(denuncia.id),
                            salva: salvas.includes(denuncia.id),
                            onFavoritar: () => alternarFavorita(denuncia.id),
                            onSalvar: () => alternarSalva(denuncia.id),
                        })}
                        mensagemVazia={
                            aba === "favoritas"
                                ? "Você ainda não favoritou nenhuma denúncia com esses filtros."
                                : aba === "salvas"
                                  ? "Você ainda não salvou nenhuma denúncia com esses filtros."
                                  : "Tente alterar os filtros da pesquisa."
                        }
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
