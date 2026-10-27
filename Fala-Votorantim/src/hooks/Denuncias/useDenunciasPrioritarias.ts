import { useMemo, useState } from "react";
import useDenuncias from "./useDenuncias";
import type { Denuncia, Status } from "../../Layout/FeedDenuncias/types";

type DenunciaComPrioridade = Denuncia & {
    prioritaria?: boolean;
    prioridade?: string | boolean;
    periculosidade?: string | boolean;
    nivelPericulosidade?: string;
};

type OrdemData = "recentes" | "antigas";

function verificarPrioridade(denuncia: DenunciaComPrioridade): boolean {
    const prioridade = String(denuncia.prioridade ?? "")
        .toLowerCase()
        .trim();
    const periculosidade = String(denuncia.periculosidade ?? "")
        .toLowerCase()
        .trim();
    const nivel = String(denuncia.nivelPericulosidade ?? "")
        .toLowerCase()
        .trim();
    const valoresPrioritarios = [
        "alta",
        "alto",
        "urgente",
        "critica",
        "crítica",
        "prioritaria",
        "prioritária",
        "muito alta",
    ];

    return (
        denuncia.prioritaria === true ||
        denuncia.prioridade === true ||
        denuncia.periculosidade === true ||
        valoresPrioritarios.includes(prioridade) ||
        valoresPrioritarios.includes(periculosidade) ||
        valoresPrioritarios.includes(nivel)
    );
}

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

function normalizarStatus(status: Status): string {
    const valor = status
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    if (valor.includes("pendente") || valor.includes("aguardando")) {
        return "pendente";
    }

    if (
        valor.includes("andamento") ||
        valor.includes("analise") ||
        valor.includes("encaminhad")
    ) {
        return "andamento";
    }

    return valor;
}

export default function useDenunciasPrioritarias() {
    const { denuncias, mensagemErro } = useDenuncias();
    const [busca, setBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [statusSelecionado, setStatusSelecionado] = useState("");
    const [ordemData, setOrdemData] = useState<OrdemData>("recentes");
    const prioritarias = useMemo(
        () =>
            (denuncias as DenunciaComPrioridade[]).filter(
                verificarPrioridade
            ),
        [denuncias]
    );
    const categorias = useMemo(
        () =>
            [
                ...new Set(
                    prioritarias.map((denuncia) => denuncia.categoria)
                ),
            ]
                .filter(Boolean)
                .sort(),
        [prioritarias]
    );
    const statusDisponiveis = useMemo(
        () => [
            ...new Set(prioritarias.map((denuncia) => denuncia.status)),
        ].filter(Boolean),
        [prioritarias]
    );
    const filtradas = useMemo(() => {
        const termo = busca.toLowerCase().trim();

        return prioritarias
            .filter((denuncia) => {
                const correspondeBusca =
                    !termo ||
                    denuncia.id.toLowerCase().includes(termo) ||
                    denuncia.titulo.toLowerCase().includes(termo) ||
                    denuncia.descricao.toLowerCase().includes(termo) ||
                    denuncia.endereco.toLowerCase().includes(termo);
                const correspondeCategoria =
                    !categoriaSelecionada ||
                    denuncia.categoria === categoriaSelecionada;
                const correspondeStatus =
                    !statusSelecionado ||
                    denuncia.status === statusSelecionado;

                return (
                    correspondeBusca &&
                    correspondeCategoria &&
                    correspondeStatus
                );
            })
            .sort((a, b) => {
                const diferenca = converterData(a.data) - converterData(b.data);
                return ordemData === "recentes" ? -diferenca : diferenca;
            });
    }, [
        prioritarias,
        busca,
        categoriaSelecionada,
        statusSelecionado,
        ordemData,
    ]);

    function limparFiltros() {
        setBusca("");
        setCategoriaSelecionada("");
        setStatusSelecionado("");
        setOrdemData("recentes");
    }

    return {
        prioritarias,
        filtradas,
        categorias,
        statusDisponiveis,
        mensagemErro,
        busca,
        setBusca,
        categoriaSelecionada,
        setCategoriaSelecionada,
        statusSelecionado,
        setStatusSelecionado,
        ordemData,
        setOrdemData,
        limparFiltros,
        normalizarStatus,
    };
}
