import { useMemo, useState } from "react";
import useDenuncias from "./useDenuncias";

export type Periodo = "todos" | "7" | "30" | "90";

function interpretarStatus(status: string) {
    const valor = status
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    if (
        valor.includes("conclu") ||
        valor.includes("resolvid") ||
        valor.includes("finaliz")
    ) {
        return "Concluídas";
    }

    if (
        valor.includes("andamento") ||
        valor.includes("analise") ||
        valor.includes("encaminhad")
    ) {
        return "Em andamento";
    }

    return "Pendentes";
}

function interpretarData(data: string): Date | null {
    if (!data) return null;

    const brasileira = data.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (brasileira) {
        const [, dia, mes, ano] = brasileira;
        const resultado = new Date(Number(ano), Number(mes) - 1, Number(dia));
        return Number.isNaN(resultado.getTime()) ? null : resultado;
    }

    const iso = data.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) {
        const [, ano, mes, dia] = iso;
        const resultado = new Date(Number(ano), Number(mes) - 1, Number(dia));
        return Number.isNaN(resultado.getTime()) ? null : resultado;
    }

    const resultado = new Date(data);
    return Number.isNaN(resultado.getTime()) ? null : resultado;
}

export default function useRelatoriosADM() {
    const { denuncias, mensagemErro } = useDenuncias();
    const [periodo, setPeriodo] = useState<Periodo>("todos");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
    const [mensagemExportacao, setMensagemExportacao] = useState("");

    const categorias = useMemo(
        () => [
            "Todas",
            ...Array.from(
                new Set(denuncias.map((denuncia) => denuncia.categoria))
            ),
        ],
        [denuncias]
    );

    const denunciasFiltradas = useMemo(() => {
        const hoje = new Date();
        hoje.setHours(23, 59, 59, 999);
        const limite = new Date(hoje);

        if (periodo !== "todos") {
            limite.setDate(limite.getDate() - Number(periodo));
            limite.setHours(0, 0, 0, 0);
        }

        return denuncias.filter((denuncia) => {
            const categoriaCorreta =
                categoriaSelecionada === "Todas" ||
                denuncia.categoria === categoriaSelecionada;
            const dataDenuncia = interpretarData(denuncia.data);
            const dataCorreta =
                periodo === "todos" ||
                (dataDenuncia !== null &&
                    dataDenuncia >= limite &&
                    dataDenuncia <= hoje);
            return categoriaCorreta && dataCorreta;
        });
    }, [denuncias, periodo, categoriaSelecionada]);

    const total = denunciasFiltradas.length;
    const pendentes = denunciasFiltradas.filter(
        (denuncia) => interpretarStatus(denuncia.status) === "Pendentes"
    ).length;
    const andamento = denunciasFiltradas.filter(
        (denuncia) => interpretarStatus(denuncia.status) === "Em andamento"
    ).length;
    const concluidas = denunciasFiltradas.filter(
        (denuncia) => interpretarStatus(denuncia.status) === "Concluídas"
    ).length;
    const percentualConcluido =
        total > 0 ? Math.round((concluidas / total) * 100) : 0;

    const dadosCategorias = useMemo(() => {
        const agrupamento = new Map<string, number>();
        denunciasFiltradas.forEach((denuncia) => {
            const categoria = denuncia.categoria || "Sem categoria";
            agrupamento.set(
                categoria,
                (agrupamento.get(categoria) || 0) + 1
            );
        });
        return Array.from(agrupamento.entries())
            .map(([nome, quantidade]) => ({ nome, quantidade }))
            .sort((a, b) => b.quantidade - a.quantidade);
    }, [denunciasFiltradas]);

    const dadosStatus = [
        { nome: "Pendentes", quantidade: pendentes, cor: "bg-amber-500" },
        { nome: "Em andamento", quantidade: andamento, cor: "bg-blue-600" },
        { nome: "Concluídas", quantidade: concluidas, cor: "bg-emerald-600" },
    ];

    function exportarRelatorio() {
        const cabecalho = ["ID", "Título", "Categoria", "Status", "Data"];
        const linhas = denunciasFiltradas.map((denuncia) => [
            denuncia.id,
            denuncia.titulo,
            denuncia.categoria,
            denuncia.status,
            denuncia.data,
        ]);
        const csv = [cabecalho, ...linhas]
            .map((linha) =>
                linha
                    .map(
                        (valor) =>
                            `"${String(valor ?? "").replace(/"/g, '""')}"`
                    )
                    .join(";")
            )
            .join("\n");
        const arquivo = new Blob(["\uFEFF" + csv], {
            type: "text/csv;charset=utf-8;",
        });

        try {
            const url = URL.createObjectURL(arquivo);
            const link = document.createElement("a");
            link.href = url;
            link.download = "relatorio-fala-votorantim.csv";
            link.click();
            URL.revokeObjectURL(url);
            setMensagemExportacao("");
        } catch {
            setMensagemExportacao(
                "Não foi possível exportar o relatório neste navegador."
            );
        }
    }

    return {
        periodo,
        setPeriodo,
        categoriaSelecionada,
        setCategoriaSelecionada,
        categorias,
        denunciasFiltradas,
        total,
        pendentes,
        andamento,
        concluidas,
        percentualConcluido,
        dadosCategorias,
        dadosStatus,
        mensagemErro,
        mensagemExportacao,
        interpretarStatus,
        exportarRelatorio,
    };
}
