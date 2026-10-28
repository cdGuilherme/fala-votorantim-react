import { useEffect, useState } from "react";

export default function useNavegacaoADM() {
    const [menuAberto, setMenuAberto] = useState(false);

    useEffect(() => {
        if (!menuAberto) return;

        function fecharComEscape(evento: KeyboardEvent) {
            if (evento.key === "Escape") setMenuAberto(false);
        }

        window.addEventListener("keydown", fecharComEscape);
        return () => window.removeEventListener("keydown", fecharComEscape);
    }, [menuAberto]);

    return {
        menuAberto,
        alternarMenu: () => setMenuAberto((aberto) => !aberto),
        fecharMenu: () => setMenuAberto(false),
    };
}
