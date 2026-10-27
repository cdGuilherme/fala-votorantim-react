import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contasAdministrativasDemonstracao } from "../../LoginADM/contasDemonstracao";

type Usuario = {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
};

type Sessao = {
    perfil: "administrador" | "usuario";
    email: string;
    nome?: string;
    secretaria?: string;
    demonstracao?: true;
};

function isUsuario(valor: unknown): valor is Usuario {
    if (typeof valor !== "object" || valor === null) return false;

    const usuario = valor as Record<string, unknown>;
    return (
        typeof usuario.nome === "string" &&
        typeof usuario.email === "string" &&
        typeof usuario.telefone === "string" &&
        typeof usuario.senha === "string"
    );
}

function carregarUsuarios(): Usuario[] {
    const dados = localStorage.getItem("usuarios");
    if (!dados) return [];

    const usuarios: unknown = JSON.parse(dados);
    if (!Array.isArray(usuarios) || !usuarios.every(isUsuario)) {
        throw new Error("Os cadastros locais possuem um formato inválido.");
    }

    return usuarios;
}

export default function useCadastroLogin() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState(false);

    function definirMensagem(texto: string, sucesso = false) {
        setMensagem(texto);
        setMensagemSucesso(sucesso);
    }

    function limparMensagem() {
        setMensagem("");
        setMensagemSucesso(false);
    }

    function cadastrar(): boolean {
        limparMensagem();

        if (!nome.trim() || !email.trim() || !telefone.trim() || !senha) {
            definirMensagem("Preencha todos os campos para criar sua conta.");
            return false;
        }

        if (senha !== confSenha) {
            definirMensagem("As senhas não coincidem. Tente novamente.");
            return false;
        }

        if (senha.length < 6) {
            definirMensagem("A senha deve ter pelo menos 6 caracteres.");
            return false;
        }

        try {
            const usuarios = carregarUsuarios();
            const emailNormalizado = email.trim().toLocaleLowerCase();
            const emailJaCadastrado =
                usuarios.some(
                    (usuario) =>
                        usuario.email.trim().toLocaleLowerCase() ===
                        emailNormalizado
                ) ||
                contasAdministrativasDemonstracao.some(
                    (conta) =>
                        conta.email.toLocaleLowerCase() === emailNormalizado
                );

            if (emailJaCadastrado) {
                definirMensagem("Este e-mail já está cadastrado.");
                return false;
            }

            const novoUsuario: Usuario = {
                nome: nome.trim(),
                email: emailNormalizado,
                telefone: telefone.trim(),
                senha,
            };

            localStorage.setItem(
                "usuarios",
                JSON.stringify([...usuarios, novoUsuario])
            );
            definirMensagem(
                "Conta criada com sucesso. Faça login para continuar.",
                true
            );
            setNome("");
            setTelefone("");
            setSenha("");
            setConfSenha("");
            return true;
        } catch {
            definirMensagem(
                "Não foi possível acessar o armazenamento local. Verifique as configurações do navegador."
            );
            return false;
        }
    }

    function login() {
        limparMensagem();
        const emailNormalizado = email.trim().toLocaleLowerCase();

        if (!emailNormalizado || !senha) {
            definirMensagem("Informe seu e-mail e sua senha.");
            return;
        }

        try {
            const contaAdministrativa =
                contasAdministrativasDemonstracao.find(
                    (conta) =>
                        conta.email.toLocaleLowerCase() === emailNormalizado &&
                        conta.senha === senha
                );

            if (contaAdministrativa) {
                const sessao: Sessao = {
                    perfil: "administrador",
                    email: contaAdministrativa.email,
                    secretaria: contaAdministrativa.secretaria,
                    demonstracao: true,
                };
                localStorage.setItem(
                    "fala-votorantim-sessao",
                    JSON.stringify(sessao)
                );
                navigate("/adm/TelaInicial");
                return;
            }

            const usuario = carregarUsuarios().find(
                (item) =>
                    item.email.trim().toLocaleLowerCase() ===
                        emailNormalizado && item.senha === senha
            );

            if (!usuario) {
                definirMensagem("E-mail ou senha incorretos.");
                return;
            }

            const sessao: Sessao = {
                perfil: "usuario",
                email: usuario.email,
                nome: usuario.nome,
            };
            localStorage.setItem(
                "fala-votorantim-sessao",
                JSON.stringify(sessao)
            );
            navigate("/users/TelaInicial");
        } catch {
            definirMensagem(
                "Não foi possível validar o acesso no armazenamento local."
            );
        }
    }

    return {
        nome,
        email,
        telefone,
        senha,
        confSenha,
        mensagem,
        mensagemSucesso,
        setNome,
        setEmail,
        setSenha,
        setConfSenha,
        setTelefone,
        limparMensagem,
        cadastrar,
        login,
    };
}
