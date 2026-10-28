import { useState } from "react";

// Favoritos e salvos do usuário, guardados por e-mail para não misturar contas no mesmo navegador.

type Interacoes = {
    favoritas: string[];
    salvas: string[];
};

function chaveInteracoes(email: string) {
    return `fala-votorantim-interacoes-${email}`;
}

function isListaIds(valor: unknown): valor is string[] {
    return Array.isArray(valor) && valor.every((id) => typeof id === "string");
}

function carregarInteracoes(email: string): Interacoes {
    try {
        const dados = localStorage.getItem(chaveInteracoes(email));
        if (!dados) return { favoritas: [], salvas: [] };

        const salvas: unknown = JSON.parse(dados);
        const registro = salvas as Record<string, unknown>;
        if (
            typeof salvas !== "object" ||
            salvas === null ||
            !isListaIds(registro.favoritas) ||
            !isListaIds(registro.salvas)
        ) {
            return { favoritas: [], salvas: [] };
        }

        return { favoritas: registro.favoritas, salvas: registro.salvas };
    } catch {
        return { favoritas: [], salvas: [] };
    }
}

export default function useInteracoesDenuncias(email = "visitante") {
    const [interacoes, setInteracoes] = useState(() =>
        carregarInteracoes(email)
    );

    function alternar(lista: keyof Interacoes, id: string) {
        const atual = interacoes[lista];
        const atualizadas = {
            ...interacoes,
            [lista]: atual.includes(id)
                ? atual.filter((item) => item !== id)
                : [...atual, id],
        };

        try {
            localStorage.setItem(
                chaveInteracoes(email),
                JSON.stringify(atualizadas)
            );
        } catch {
            // Sem armazenamento, a escolha vale só enquanto a página estiver aberta.
        }
        setInteracoes(atualizadas);
    }

    return {
        favoritas: interacoes.favoritas,
        salvas: interacoes.salvas,
        alternarFavorita: (id: string) => alternar("favoritas", id),
        alternarSalva: (id: string) => alternar("salvas", id),
    };
}
