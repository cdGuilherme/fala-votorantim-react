import { useState } from "react";

// Favoritas do usuário (caso de uso "Favoritar Denúncia"), guardadas por e-mail para não misturar contas no mesmo navegador.

function chaveInteracoes(email: string) {
    return `fala-votorantim-interacoes-${email}`;
}

function isListaIds(valor: unknown): valor is string[] {
    return Array.isArray(valor) && valor.every((id) => typeof id === "string");
}

function carregarFavoritas(email: string): string[] {
    try {
        const dados = localStorage.getItem(chaveInteracoes(email));
        if (!dados) return [];

        const registro: unknown = JSON.parse(dados);
        if (typeof registro !== "object" || registro === null) return [];

        // Versões anteriores tinham uma lista "salvas" separada; ela passa a contar como favorita.
        const { favoritas, salvas } = registro as Record<string, unknown>;
        return Array.from(
            new Set([
                ...(isListaIds(favoritas) ? favoritas : []),
                ...(isListaIds(salvas) ? salvas : []),
            ])
        );
    } catch {
        return [];
    }
}

export default function useInteracoesDenuncias(email = "visitante") {
    const [favoritas, setFavoritas] = useState(() => carregarFavoritas(email));

    function alternarFavorita(id: string) {
        const atualizadas = favoritas.includes(id)
            ? favoritas.filter((item) => item !== id)
            : [...favoritas, id];

        try {
            localStorage.setItem(
                chaveInteracoes(email),
                JSON.stringify({ favoritas: atualizadas })
            );
        } catch {
            // Sem armazenamento, a escolha vale só enquanto a página estiver aberta.
        }
        setFavoritas(atualizadas);
    }

    return { favoritas, alternarFavorita };
}
