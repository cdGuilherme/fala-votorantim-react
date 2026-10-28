import { useState } from "react";

type SessaoUsuario = {
    perfil: "administrador" | "usuario";
    email: string;
    nome?: string;
    secretaria?: string;
    demonstracao?: true;
};

function isSessao(valor: unknown): valor is SessaoUsuario {
    if (typeof valor !== "object" || valor === null) return false;
    const sessao = valor as Record<string, unknown>;

    return (
        (sessao.perfil === "administrador" || sessao.perfil === "usuario") &&
        typeof sessao.email === "string" &&
        (sessao.nome === undefined || typeof sessao.nome === "string") &&
        (sessao.secretaria === undefined ||
            typeof sessao.secretaria === "string")
    );
}

type EstadoSessao = {
    sessao: SessaoUsuario | null;
    mensagemErro: string;
};

function carregarSessao(): EstadoSessao {
    try {
        const dados = localStorage.getItem("fala-votorantim-sessao");
        if (!dados) return { sessao: null, mensagemErro: "" };

        const sessao: unknown = JSON.parse(dados);
        if (!isSessao(sessao)) {
            throw new Error("Os dados da sessão local possuem formato inválido.");
        }

        return { sessao, mensagemErro: "" };
    } catch {
        return {
            sessao: null,
            mensagemErro:
                "Não foi possível carregar os dados da sessão neste navegador.",
        };
    }
}

export default function useSessao() {
    const [estado] = useState(carregarSessao);
    return estado;
}
