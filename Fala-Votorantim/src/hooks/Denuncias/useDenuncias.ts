import { useMemo, useState } from "react";
import {
    denunciasIniciais,
    statusAntigos,
    statusDisponiveis,
} from "../../Layout/FeedDenuncias/dadosDenuncias";
import { registrarNotificacao } from "./notificacoes";
import type {
    Denuncia,
    EventoHistorico,
    Status,
} from "../../Layout/FeedDenuncias/types";

const chaveDenuncias = "fala-votorantim-denuncias";
const chaveStatus = "fala-votorantim-status-denuncias";
const chaveHistorico = "fala-votorantim-historico-denuncias";
const chaveSecretarias = "fala-votorantim-secretarias-denuncias";

type StatusAlterados = Record<string, Status>;
type Historicos = Record<string, EventoHistorico[]>;
type Secretarias = Record<string, string>;

// Aceita os status do PI e converte os antigos (Pendente, Em andamento, Resolvido).
function converterStatus(valor: unknown): Status | undefined {
    if (typeof valor !== "string") return undefined;
    if (statusDisponiveis.includes(valor as Status)) return valor as Status;
    return statusAntigos[valor];
}

function lerObjeto(chave: string): Record<string, unknown> {
    try {
        const salvos: unknown = JSON.parse(localStorage.getItem(chave) ?? "{}");
        return typeof salvos === "object" && salvos !== null && !Array.isArray(salvos)
            ? (salvos as Record<string, unknown>)
            : {};
    } catch {
        return {};
    }
}

function carregarStatusAlterados(): StatusAlterados {
    const convertidos: StatusAlterados = {};
    for (const [id, valor] of Object.entries(lerObjeto(chaveStatus))) {
        const status = converterStatus(valor);
        if (status) convertidos[id] = status;
    }
    return convertidos;
}

function carregarHistoricos(): Historicos {
    const historicos: Historicos = {};
    for (const [id, eventos] of Object.entries(lerObjeto(chaveHistorico))) {
        if (Array.isArray(eventos)) historicos[id] = eventos as EventoHistorico[];
    }
    return historicos;
}

function carregarSecretarias(): Secretarias {
    const secretarias: Secretarias = {};
    for (const [id, nome] of Object.entries(lerObjeto(chaveSecretarias))) {
        if (typeof nome === "string") secretarias[id] = nome;
    }
    return secretarias;
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
        converterStatus(denuncia.status) !== undefined
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

        return {
            denuncias: salvas.map((denuncia) => ({
                ...denuncia,
                status: converterStatus(denuncia.status) as Status,
            })),
            mensagemErro: "",
        };
    } catch {
        return {
            denuncias: [],
            mensagemErro:
                "Não foi possível carregar as denúncias salvas neste navegador.",
        };
    }
}

function dataAtual(): string {
    return new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
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
    const [historicos, setHistoricos] = useState(carregarHistoricos);
    const [secretarias, setSecretarias] = useState(carregarSecretarias);
    const denuncias = useMemo(
        () =>
            [...denunciasIniciais, ...denunciasSalvas].map((denuncia) => ({
                ...denuncia,
                status: statusAlterados[denuncia.id] ?? denuncia.status,
                secretaria: secretarias[denuncia.id] ?? denuncia.secretaria,
            })),
        [denunciasSalvas, statusAlterados, secretarias]
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

    // Registra o evento no histórico e, se houver autor, gera a notificação.
    function registrarEvento(
        denuncia: Denuncia,
        evento: Omit<EventoHistorico, "data">,
        notificacao?: string
    ) {
        const atualizados = {
            ...historicos,
            [denuncia.id]: [
                ...(historicos[denuncia.id] ?? []),
                { ...evento, data: dataAtual() },
            ],
        };
        localStorage.setItem(chaveHistorico, JSON.stringify(atualizados));
        setHistoricos(atualizados);

        if (notificacao && denuncia.autorEmail) {
            registrarNotificacao({
                email: denuncia.autorEmail,
                denunciaId: denuncia.id,
                titulo: `Denúncia #${denuncia.id} atualizada`,
                mensagem: notificacao,
            });
        }
    }

    function executar(acao: () => void, erro: string): boolean {
        try {
            acao();
            setMensagemErro("");
            return true;
        } catch {
            setMensagemErro(erro);
            return false;
        }
    }

    // Caso de uso "Alterar Status da Denúncia".
    function alterarStatus(id: string, status: Status, responsavel = "Prefeitura"): boolean {
        const denuncia = denuncias.find((item) => item.id === id);
        if (!denuncia || denuncia.status === status) return true;

        return executar(() => {
            const atualizados = { ...statusAlterados, [id]: status };
            localStorage.setItem(chaveStatus, JSON.stringify(atualizados));
            setStatusAlterados(atualizados);
            registrarEvento(
                denuncia,
                { tipo: "status", texto: `Status alterado de ${denuncia.status} para ${status}.`, responsavel },
                `O status de "${denuncia.titulo}" mudou de ${denuncia.status} para ${status}.`
            );
        }, "Não foi possível salvar o novo status. O armazenamento local pode estar indisponível.");
    }

    // Caso de uso "Responder Denúncias".
    function responderDenuncia(id: string, texto: string, responsavel = "Prefeitura"): boolean {
        const denuncia = denuncias.find((item) => item.id === id);
        if (!denuncia || !texto.trim()) return false;

        return executar(() => {
            registrarEvento(
                denuncia,
                { tipo: "resposta", texto: texto.trim(), responsavel },
                `A prefeitura respondeu "${denuncia.titulo}": ${texto.trim()}`
            );
        }, "Não foi possível salvar a resposta.");
    }

    // Caso de uso "Encaminhar para outra secretaria".
    function encaminharDenuncia(id: string, secretaria: string, responsavel = "Prefeitura"): boolean {
        const denuncia = denuncias.find((item) => item.id === id);
        if (!denuncia || !secretaria || denuncia.secretaria === secretaria) return false;

        return executar(() => {
            const atualizadas = { ...secretarias, [id]: secretaria };
            localStorage.setItem(chaveSecretarias, JSON.stringify(atualizadas));
            setSecretarias(atualizadas);
            registrarEvento(denuncia, {
                tipo: "encaminhamento",
                texto: `Encaminhada para ${secretaria}.`,
                responsavel,
            });
        }, "Não foi possível encaminhar a denúncia.");
    }

    return {
        denuncias,
        denunciasSalvas,
        mensagemErro,
        adicionarDenuncia,
        alterarStatus,
        responderDenuncia,
        encaminharDenuncia,
        historicoDe: (id: string) => historicos[id] ?? [],
    };
}
