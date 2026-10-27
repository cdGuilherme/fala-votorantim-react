import { useMemo, useState } from "react";
import type { Denuncia } from "../../Layout/FeedDenuncias/types";

const itensPorPaginaPadrao = 10;

type EstadoPaginacao = {
    chaveLista: string;
    pagina: number;
    quantidade: string;
};

export default function useListaDenuncias(
    denuncias: Denuncia[],
    quantidadeInicial = itensPorPaginaPadrao
) {
    const chaveLista = denuncias.map((denuncia) => denuncia.id).join("|");
    const [estado, setEstado] = useState<EstadoPaginacao>(() => ({
        chaveLista,
        pagina: 1,
        quantidade: String(quantidadeInicial),
    }));
    const quantidadePorPagina = estado.quantidade;
    const paginaSolicitada = estado.chaveLista === chaveLista ? estado.pagina : 1;
    const valorQuantidade = Number(quantidadePorPagina);
    const itensPorPagina =
        Number.isInteger(valorQuantidade) && valorQuantidade > 0
            ? valorQuantidade
            : itensPorPaginaPadrao;
    const totalPaginas = Math.ceil(denuncias.length / itensPorPagina);
    const paginaAtual =
        totalPaginas > 0
            ? Math.min(Math.max(paginaSolicitada, 1), totalPaginas)
            : 1;
    const denunciasPaginadas = useMemo(() => {
        const inicio = (paginaAtual - 1) * itensPorPagina;
        return denuncias.slice(inicio, inicio + itensPorPagina);
    }, [denuncias, paginaAtual, itensPorPagina]);
    const primeiraDenuncia =
        denuncias.length === 0
            ? 0
            : (paginaAtual - 1) * itensPorPagina + 1;
    const ultimaDenuncia = Math.min(
        paginaAtual * itensPorPagina,
        denuncias.length
    );

    function alterarPagina(pagina: number) {
        setEstado((atual) => ({
            chaveLista,
            pagina: Math.max(1, pagina),
            quantidade: atual.quantidade,
        }));
    }

    function alterarQuantidadePorPagina(valor: string) {
        if (valor === "") {
            setEstado({
                chaveLista,
                pagina: 1,
                quantidade: "",
            });
            return;
        }

        const quantidade = Number(valor);
        if (Number.isInteger(quantidade) && quantidade >= 1) {
            const limite = Math.max(denuncias.length, 1);
            setEstado({
                chaveLista,
                pagina: 1,
                quantidade: String(Math.min(quantidade, limite)),
            });
        }
    }

    function normalizarQuantidadePorPagina() {
        if (itensPorPagina === Number(quantidadePorPagina)) return;
        setEstado({
            chaveLista,
            pagina: 1,
            quantidade: String(itensPorPaginaPadrao),
        });
    }

    return {
        paginaAtual,
        totalPaginas,
        quantidadePorPagina,
        denunciasPaginadas,
        primeiraDenuncia,
        ultimaDenuncia,
        alterarPagina,
        alterarQuantidadePorPagina,
        normalizarQuantidadePorPagina,
    };
}
