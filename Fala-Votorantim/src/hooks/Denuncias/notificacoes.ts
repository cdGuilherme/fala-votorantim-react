import { useState } from "react";

// Notificações do munícipe (casos de uso "Gera Notificação" e "Visualizar Notificações" do PI).

const chaveNotificacoes = "fala-votorantim-notificacoes";

export type Notificacao = {
    id: string;
    email: string;
    denunciaId: string;
    titulo: string;
    mensagem: string;
    data: string;
    lida: boolean;
};

function isNotificacao(valor: unknown): valor is Notificacao {
    if (typeof valor !== "object" || valor === null) return false;
    const item = valor as Record<string, unknown>;
    return (
        typeof item.id === "string" &&
        typeof item.email === "string" &&
        typeof item.denunciaId === "string" &&
        typeof item.titulo === "string" &&
        typeof item.mensagem === "string" &&
        typeof item.data === "string" &&
        typeof item.lida === "boolean"
    );
}

function carregarTodas(): Notificacao[] {
    try {
        const dados: unknown = JSON.parse(
            localStorage.getItem(chaveNotificacoes) ?? "[]"
        );
        return Array.isArray(dados) ? dados.filter(isNotificacao) : [];
    } catch {
        return [];
    }
}

function salvarTodas(notificacoes: Notificacao[]) {
    try {
        localStorage.setItem(chaveNotificacoes, JSON.stringify(notificacoes));
    } catch {
        // Sem armazenamento, a notificação não é guardada.
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

export function registrarNotificacao(
    dados: Pick<Notificacao, "email" | "denunciaId" | "titulo" | "mensagem">
) {
    const nova: Notificacao = {
        ...dados,
        id: `NOT-${Date.now()}`,
        data: dataAtual(),
        lida: false,
    };
    salvarTodas([nova, ...carregarTodas()]);
}

export default function useNotificacoes(email?: string) {
    const [todas, setTodas] = useState(carregarTodas);
    const minhas = email ? todas.filter((n) => n.email === email) : [];

    function atualizar(alterar: (n: Notificacao) => Notificacao) {
        const atualizadas = todas.map((n) =>
            n.email === email ? alterar(n) : n
        );
        salvarTodas(atualizadas);
        setTodas(atualizadas);
    }

    return {
        notificacoes: minhas,
        naoLidas: minhas.filter((n) => !n.lida).length,
        marcarComoLida: (id: string) =>
            atualizar((n) => (n.id === id ? { ...n, lida: true } : n)),
        marcarTodasComoLidas: () => atualizar((n) => ({ ...n, lida: true })),
    };
}
