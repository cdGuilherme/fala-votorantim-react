import { useState } from "react";

export default function useNavegacaoPublica() {
    const [menuAberto, setMenuAberto] = useState(false);

    return {
        menuAberto,
        alternarMenu: () => setMenuAberto((aberto) => !aberto),
        fecharMenu: () => setMenuAberto(false),
    };
}
