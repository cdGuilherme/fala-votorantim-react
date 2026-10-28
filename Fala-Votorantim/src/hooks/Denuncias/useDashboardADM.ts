import { useMemo } from "react";
import useDenuncias from "./useDenuncias";

type GrupoStatus = "pendente" | "andamento" | "concluida" | "outro";

function normalizar(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
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

function identificarStatus(status: string): GrupoStatus {
    const valor = normalizar(status);

    if (valor.includes("pendente") || valor.includes("aguardando") || valor.includes("recebid")) {
        return "pendente";
    }

    if (
        valor.includes("andamento") ||
        valor.includes("execu") ||
        valor.includes("analise") ||
        valor.includes("encaminhada") ||
        valor.includes("encaminhado")
    ) {
        return "andamento";
    }

    if (
        valor.includes("conclu") ||
        valor.includes("resolvid") ||
        valor.includes("indeferid") ||
        valor.includes("finaliz")
    ) {
        return "concluida";
    }

    return "outro";
}

function formatarData(data: string): string {
    const [dataParte, horaParte] = data.split(", ");
    return horaParte ? `${dataParte} às ${horaParte}` : dataParte;
}

export default function useDashboardADM() {
    const { denuncias, mensagemErro } = useDenuncias();
    const indicadores = useMemo(() => {
        const hoje = new Date().toLocaleDateString("pt-BR");
        const categorias = denuncias.reduce<Record<string, number>>(
            (acumulado, denuncia) => {
                const categoria = denuncia.categoria || "Sem categoria";
                acumulado[categoria] = (acumulado[categoria] || 0) + 1;
                return acumulado;
            },
            {}
        );
        const status = denuncias.reduce<Record<string, number>>(
            (acumulado, denuncia) => {
                const nomeStatus = denuncia.status || "Sem status";
                acumulado[nomeStatus] = (acumulado[nomeStatus] || 0) + 1;
                return acumulado;
            },
            {}
        );
        const recentes = [...denuncias]
            .sort((a, b) => converterData(b.data) - converterData(a.data))
            .slice(0, 5);

        return {
            total: denuncias.length,
            hoje: denuncias.filter(
                (denuncia) => denuncia.data.split(",")[0] === hoje
            ).length,
            pendentes: denuncias.filter(
                (denuncia) => identificarStatus(denuncia.status) === "pendente"
            ).length,
            andamento: denuncias.filter(
                (denuncia) =>
                    identificarStatus(denuncia.status) === "andamento"
            ).length,
            concluidas: denuncias.filter(
                (denuncia) =>
                    identificarStatus(denuncia.status) === "concluida"
            ).length,
            categorias: Object.entries(categorias).sort(
                (a, b) => b[1] - a[1]
            ),
            status: Object.entries(status).sort((a, b) => b[1] - a[1]),
            recentes,
        };
    }, [denuncias]);

    const maiorQuantidadeCategoria = Math.max(
        1,
        ...indicadores.categorias.map(([, quantidade]) => quantidade)
    );

    return {
        denuncias,
        indicadores,
        maiorQuantidadeCategoria,
        mensagemErro,
        identificarStatus,
        formatarData,
    };
}
