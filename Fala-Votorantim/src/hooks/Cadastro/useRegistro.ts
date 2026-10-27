import { useState } from "react";
import useCadastroLogin from "./useCadastroLogin";

export type ModoRegistro = "login" | "cadastro";

export default function useRegistro() {
    const [modo, setModo] = useState<ModoRegistro>("login");
    const cadastroLogin = useCadastroLogin();

    function cadastrar() {
        if (cadastroLogin.cadastrar()) setModo("login");
    }

    function alterarModo(novoModo: ModoRegistro) {
        cadastroLogin.limparMensagem();
        setModo(novoModo);
    }

    return {
        modo,
        ehLogin: modo === "login",
        ...cadastroLogin,
        cadastrar,
        alterarModo,
    };
}
