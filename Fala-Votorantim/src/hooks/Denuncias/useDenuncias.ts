import { useMemo, useState } from "react";
import { denunciasIniciais } from "../../Layout/FeedDenuncias/dadosDenuncias";
import type { Denuncia } from "../../Layout/FeedDenuncias/types";

const chaveDenuncias = "fala-votorantim-denuncias";

type EstadoInicial = {
    denuncias: Denuncia[];
    mensagemErro: string;
};

function isDenuncia(valor: unknown): valor is Denuncia {
    if (typeof valor !== "object" || valor === null) return false;

    const denuncia = valor as Record<string, unknown>;
    return (
        typeof denuncia.id === "string" &&
        typeof denuncia.titulo === "string" &&
        typeof denuncia.categoria === "string" &&
        typeof denuncia.descricao === "string" &&
        typeof denuncia.endereco === "string" &&
        typeof denuncia.data === "string" &&
        (denuncia.status === "Pendente" ||
            denuncia.status === "Em andamento" ||
            denuncia.status === "Resolvido")
    );
}

function carregarDenuncias(): EstadoInicial {
    try {
        const dados = localStorage.getItem(chaveDenuncias);
        if (!dados) return { denuncias: [], mensagemErro: "" };

        const salvas: unknown = JSON.parse(dados);
        if (!Array.isArray(salvas) || !salvas.every(isDenuncia)) {
            throw new Error("Os registros salvos possuem um formato inválido.");
        }

        return { denuncias: salvas, mensagemErro: "" };
    } catch {
        return {
            denuncias: [],
            mensagemErro:
                "Não foi possível carregar as denúncias salvas neste navegador.",
        };
    }
}

export default function useDenuncias() {
    const [estadoInicial] = useState(carregarDenuncias);
    const [denunciasSalvas, setDenunciasSalvas] = useState(
        estadoInicial.denuncias
    );
    const [mensagemErro, setMensagemErro] = useState(
        estadoInicial.mensagemErro
    );
    const denuncias = useMemo(
        () => [...denunciasIniciais, ...denunciasSalvas],
        [denunciasSalvas]
    );

    function adicionarDenuncia(novaDenuncia: Denuncia): boolean {
        const atualizadas = [...denunciasSalvas, novaDenuncia];

        try {
            localStorage.setItem(chaveDenuncias, JSON.stringify(atualizadas));
            setDenunciasSalvas(atualizadas);
            setMensagemErro("");
            return true;
        } catch {
            setMensagemErro(
                "Não foi possível salvar a denúncia. O armazenamento local pode estar cheio ou indisponível."
            );
            return false;
        }
    }

    return {
        denuncias,
        denunciasSalvas,
        mensagemErro,
        adicionarDenuncia,
    };
}
