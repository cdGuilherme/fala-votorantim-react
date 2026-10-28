import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Casos de uso "Modificar conta", "Modificar senha" e "Desativar conta" do PI.

type Usuario = {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    desativada?: boolean;
};

type Resultado = { ok: boolean; mensagem: string };

const chaveUsuarios = "usuarios";
const chaveSessao = "fala-votorantim-sessao";

function carregarUsuarios(): Usuario[] {
    const dados: unknown = JSON.parse(localStorage.getItem(chaveUsuarios) ?? "[]");
    return Array.isArray(dados) ? (dados as Usuario[]) : [];
}

export default function useConta(email?: string) {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | undefined>(() => {
        try {
            return carregarUsuarios().find((u) => u.email === email);
        } catch {
            return undefined;
        }
    });

    function salvar(alterar: (u: Usuario) => Usuario): boolean {
        try {
            const usuarios = carregarUsuarios();
            const indice = usuarios.findIndex((u) => u.email === email);
            if (indice === -1) return false;
            usuarios[indice] = alterar(usuarios[indice]);
            localStorage.setItem(chaveUsuarios, JSON.stringify(usuarios));
            setUsuario(usuarios[indice]);
            return true;
        } catch {
            return false;
        }
    }

    function atualizarDados(nome: string, telefone: string): Resultado {
        if (!nome.trim() || !telefone.trim()) {
            return { ok: false, mensagem: "Preencha nome e telefone." };
        }
        const ok = salvar((u) => ({ ...u, nome: nome.trim(), telefone: telefone.trim() }));
        if (ok) {
            try {
                const sessao = JSON.parse(localStorage.getItem(chaveSessao) ?? "{}");
                localStorage.setItem(chaveSessao, JSON.stringify({ ...sessao, nome: nome.trim() }));
            } catch {
                // A sessão continua com o nome antigo até o próximo login.
            }
        }
        return ok
            ? { ok, mensagem: "Dados atualizados com sucesso." }
            : { ok, mensagem: "Não foi possível salvar seus dados." };
    }

    function alterarSenha(atual: string, nova: string, confirmacao: string): Resultado {
        if (!usuario || usuario.senha !== atual) {
            return { ok: false, mensagem: "A senha atual está incorreta." };
        }
        if (nova.length < 6) {
            return { ok: false, mensagem: "A nova senha deve ter pelo menos 6 caracteres." };
        }
        if (nova !== confirmacao) {
            return { ok: false, mensagem: "As novas senhas não coincidem." };
        }
        return salvar((u) => ({ ...u, senha: nova }))
            ? { ok: true, mensagem: "Senha alterada com sucesso." }
            : { ok: false, mensagem: "Não foi possível alterar a senha." };
    }

    function sair() {
        try {
            localStorage.removeItem(chaveSessao);
        } catch {
            // Mesmo sem acesso ao armazenamento, volta para a página de acesso.
        }
        navigate("/Registro");
    }

    function desativarConta(): Resultado {
        if (!salvar((u) => ({ ...u, desativada: true }))) {
            return { ok: false, mensagem: "Não foi possível desativar a conta." };
        }
        sair();
        return { ok: true, mensagem: "Conta desativada." };
    }

    return { usuario, atualizarDados, alterarSenha, desativarConta, sair };
}
