
import { useMemo, useState } from "react";

import MenuLateralADM from "../../../Components/Cards/menuLateral/MenuLateralADM";

import ResumoDenuncias from "../../../Layout/FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../../Layout/FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../../Layout/FeedDenuncias/ListaDenuncias";

import { denunciasIniciais } from "../../../Layout/FeedDenuncias/dadosDenuncias";

import type {
    Denuncia,
    Status,
} from "../../../Layout/FeedDenuncias/types";

export default function FeedDenuncias() {
    const [denuncias] = useState<Denuncia[]>(denunciasIniciais);

    const [busca, setBusca] = useState("");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    const [categoriasSelecionadas, setCategoriasSelecionadas] =
        useState<string[]>([]);

    const [statusSelecionados, setStatusSelecionados] =
        useState<Status[]>([]);

    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");

    const [ordemData, setOrdemData] =
        useState<"recentes" | "antigas">("recentes");

    const filtradas = useMemo(() => {
        const termo = busca.toLowerCase().trim();

        function converterData(data: string): number {
            const [dataParte, horaParte = "00:00"] = data.split(", ");
            const [dia, mes, ano] = dataParte.split("/").map(Number);
            const [hora, minuto] = horaParte.split(":").map(Number);

            return new Date(
                ano,
                mes - 1,
                dia,
                hora,
                minuto
            ).getTime();
        }

        const resultado = denuncias.filter((denuncia) => {
            const correspondeBusca =
                !termo ||
                denuncia.titulo.toLowerCase().includes(termo) ||
                denuncia.id.toLowerCase().includes(termo) ||
                denuncia.descricao.toLowerCase().includes(termo) ||
                denuncia.endereco.toLowerCase().includes(termo);

            const correspondeCategoria =
                categoriasSelecionadas.length === 0 ||
                categoriasSelecionadas.includes(denuncia.categoria);

            const correspondeStatus =
                statusSelecionados.length === 0 ||
                statusSelecionados.includes(denuncia.status);

            const partesData = denuncia.data.split(",")[0].split("/");

            const dataDenuncia =
                partesData.length === 3
                    ? `${partesData[2]}-${partesData[1]}-${partesData[0]}`
                    : "";

            const correspondeData =
                (!dataInicial ||
                    (dataDenuncia !== "" && dataDenuncia >= dataInicial)) &&
                (!dataFinal ||
                    (dataDenuncia !== "" && dataDenuncia <= dataFinal));

            return (
                correspondeBusca &&
                correspondeCategoria &&
                correspondeStatus &&
                correspondeData
            );
        });

        return resultado.sort((a, b) => {
            const diferenca =
                converterData(a.data) - converterData(b.data);

            return ordemData === "recentes" ? -diferenca : diferenca;
        });
    }, [
        denuncias,
        busca,
        categoriasSelecionadas,
        statusSelecionados,
        dataInicial,
        dataFinal,
        ordemData,
    ]);

    // set: limpa os filtros da pesquisa
    function limparFiltros() {
        setBusca("");
        setCategoriasSelecionadas([]);
        setStatusSelecionados([]);
        setDataInicial("");
        setDataFinal("");
        setOrdemData("recentes");
    }

    return (
        <div className="flex min-h-screen bg-[#EFF6FF]">
            <MenuLateralADM />

            <main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 md:pt-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

                    <header className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-[#1E2939] sm:text-3xl">
                            Feed de Denúncias
                        </h1>

                        <p className="text-sm text-[#6A7282] sm:text-base">
                            Gerencie e acompanhe as denúncias registradas em Votorantim.
                        </p>
                    </header>

                    <section>
                        <ResumoDenuncias denuncias={denuncias} />
                    </section>

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
                            onCategoriasChange={setCategoriasSelecionadas}
                            statusSelecionados={statusSelecionados}
                            onStatusChange={setStatusSelecionados}
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
