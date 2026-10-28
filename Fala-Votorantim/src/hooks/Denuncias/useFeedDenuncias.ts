import { useMemo, useState } from "react";
import useDenuncias from "./useDenuncias";
import type { Status } from "../../Layout/FeedDenuncias/types";

type OrdemData = "recentes" | "antigas";

function converterData(data: string): number {
    const [dataParte, horaParte = "00:00"] = data.split(", ");
    const [dia, mes, ano] = dataParte.split("/").map(Number);
    const [hora, minuto] = horaParte.split(":").map(Number);
    const timestamp = new Date(
        ano,
        mes - 1,
        dia,
        hora,
        minuto
    ).getTime();

    return Number.isNaN(timestamp) ? 0 : timestamp;
}

export default function useFeedDenuncias() {
    const { denuncias, mensagemErro, alterarStatus } = useDenuncias();
    const [busca, setBusca] = useState("");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
        string[]
    >([]);
    const [statusSelecionados, setStatusSelecionados] = useState<Status[]>([]);
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [ordemData, setOrdemData] = useState<OrdemData>("recentes");

    const filtradas = useMemo(() => {
        const termo = busca.toLocaleLowerCase().trim();

        return denuncias
            .filter((denuncia) => {
                const correspondeBusca =
                    !termo ||
                    denuncia.titulo.toLocaleLowerCase().includes(termo) ||
                    denuncia.id.toLocaleLowerCase().includes(termo) ||
                    denuncia.descricao.toLocaleLowerCase().includes(termo) ||
                    denuncia.endereco.toLocaleLowerCase().includes(termo);

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
            })
            .sort((a, b) => {
                const diferenca = converterData(a.data) - converterData(b.data);
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

    function limparFiltros() {
        setBusca("");
        setCategoriasSelecionadas([]);
        setStatusSelecionados([]);
        setDataInicial("");
        setDataFinal("");
        setOrdemData("recentes");
    }

    function alternarCategoria(categoria: string, selecionada: boolean) {
        setCategoriasSelecionadas((anteriores) =>
            selecionada
                ? anteriores.includes(categoria)
                    ? anteriores
                    : [...anteriores, categoria]
                : anteriores.filter((item) => item !== categoria)
        );
    }

    function alternarStatus(status: Status, selecionado: boolean) {
        setStatusSelecionados((anteriores) =>
            selecionado
                ? anteriores.includes(status)
                    ? anteriores
                    : [...anteriores, status]
                : anteriores.filter((item) => item !== status)
        );
    }

    return {
        denuncias,
        filtradas,
        mensagemErro,
        busca,
        setBusca,
        mostrarFiltros,
        setMostrarFiltros,
        categoriasSelecionadas,
        setCategoriasSelecionadas,
        statusSelecionados,
        setStatusSelecionados,
        alternarCategoria,
        alternarStatus,
        dataInicial,
        setDataInicial,
        dataFinal,
        setDataFinal,
        ordemData,
        setOrdemData,
        limparFiltros,
        alterarStatus,
    };
}
