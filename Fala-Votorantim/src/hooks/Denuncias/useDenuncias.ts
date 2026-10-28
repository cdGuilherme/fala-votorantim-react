import { useMemo, useState } from "react";
import {
    denunciasIniciais,
    statusDisponiveis,
} from "../../Layout/FeedDenuncias/dadosDenuncias";
import { registrarNotificacao } from "./notificacoes";
import type { Denuncia, Status } from "../../Layout/FeedDenuncias/types";

const chaveDenuncias = "fala-votorantim-denuncias";
const chaveStatus = "fala-votorantim-status-denuncias";

type StatusAlterados = Record<string, Status>;

function carregarStatusAlterados(): StatusAlterados {
    try {
        const dados = localStorage.getItem(chaveStatus);
        const salvos: unknown = dados ? JSON.parse(dados) : {};
        if (typeof salvos !== "object" || salvos === null) return {};
        return Object.fromEntries(
            Object.entries(salvos).filter(([, status]) =>
                statusDisponiveis.includes(status as Status)
            )
        ) as StatusAlterados;
    } catch {
        return {};
    }
}

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
    const [statusAlterados, setStatusAlterados] = useState(
        carregarStatusAlterados
    );
    const denuncias = useMemo(
        () =>
            [...denunciasIniciais, ...denunciasSalvas].map((denuncia) =>
                statusAlterados[denuncia.id]
                    ? { ...denuncia, status: statusAlterados[denuncia.id] }
                    : denuncia
            ),
        [denunciasSalvas, statusAlterados]
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

    function alterarStatus(id: string, status: Status): boolean {
        const atualizados = { ...statusAlterados, [id]: status };

        try {
            localStorage.setItem(chaveStatus, JSON.stringify(atualizados));
            setStatusAlterados(atualizados);

            // Gera Notificação (caso de uso do PI): avisa o autor da denúncia.
            const denuncia = denuncias.find((item) => item.id === id);
            if (denuncia?.autorEmail && denuncia.status !== status) {
                registrarNotificacao({
                    email: denuncia.autorEmail,
                    denunciaId: id,
                    titulo: `Denúncia #${id} atualizada`,
                    mensagem: `O status de "${denuncia.titulo}" mudou de ${denuncia.status} para ${status}.`,
                });
            }
            setMensagemErro("");
            return true;
        } catch {
            setMensagemErro(
                "Não foi possível salvar o novo status. O armazenamento local pode estar indisponível."
            );
            return false;
        }
    }

    return {
        denuncias,
        denunciasSalvas,
        mensagemErro,
        adicionarDenuncia,
        alterarStatus,
    };
}
