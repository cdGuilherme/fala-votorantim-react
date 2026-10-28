import { useMemo, useState, type FormEvent } from "react";

export type Perfil = "Administrador" | "Atendente" | "Visualizador";

export type Permissoes = {
    visualizarDenuncias: boolean;
    cadastrarDenuncias: boolean;
    editarDenuncias: boolean;
    excluirDenuncias: boolean;
    gerenciarUsuarios: boolean;
    visualizarRelatorios: boolean;
    gerenciarConfiguracoes: boolean;
};

export type Usuario = {
    id: number;
    nome: string;
    email: string;
    perfil: Perfil;
    ativo: boolean;
    permissoes: Permissoes;
};

const CHAVE_USUARIOS = "fala-votorantim-usuarios";

export const PERMISSOES_PADRAO: Record<Perfil, Permissoes> = {
    Administrador: {
        visualizarDenuncias: true,
        cadastrarDenuncias: true,
        editarDenuncias: true,
        excluirDenuncias: true,
        gerenciarUsuarios: true,
        visualizarRelatorios: true,
        gerenciarConfiguracoes: true,
    },
    Atendente: {
        visualizarDenuncias: true,
        cadastrarDenuncias: true,
        editarDenuncias: true,
        excluirDenuncias: false,
        gerenciarUsuarios: false,
        visualizarRelatorios: true,
        gerenciarConfiguracoes: false,
    },
    Visualizador: {
        visualizarDenuncias: true,
        cadastrarDenuncias: false,
        editarDenuncias: false,
        excluirDenuncias: false,
        gerenciarUsuarios: false,
        visualizarRelatorios: true,
        gerenciarConfiguracoes: false,
    },
};

const USUARIOS_INICIAIS: Usuario[] = [
    {
        id: 1,
        nome: "Administrador do sistema",
        email: "admin@falavotorantim.local",
        perfil: "Administrador",
        ativo: true,
        permissoes: { ...PERMISSOES_PADRAO.Administrador },
    },
    {
        id: 2,
        nome: "Atendente de demonstração",
        email: "atendimento@falavotorantim.local",
        perfil: "Atendente",
        ativo: true,
        permissoes: { ...PERMISSOES_PADRAO.Atendente },
    },
];

export const LISTA_PERMISSOES: {
    chave: keyof Permissoes;
    titulo: string;
    descricao: string;
}[] = [
    {
        chave: "visualizarDenuncias",
        titulo: "Visualizar denúncias",
        descricao: "Consultar os registros e seus detalhes.",
    },
    {
        chave: "cadastrarDenuncias",
        titulo: "Cadastrar denúncias",
        descricao: "Criar novos registros no sistema.",
    },
    {
        chave: "editarDenuncias",
        titulo: "Editar denúncias",
        descricao: "Alterar informações e atualizar registros.",
    },
    {
        chave: "excluirDenuncias",
        titulo: "Excluir denúncias",
        descricao: "Remover registros existentes.",
    },
    {
        chave: "gerenciarUsuarios",
        titulo: "Gerenciar usuários",
        descricao: "Cadastrar, editar e alterar o acesso de usuários.",
    },
    {
        chave: "visualizarRelatorios",
        titulo: "Visualizar relatórios",
        descricao: "Consultar relatórios e estatísticas.",
    },
    {
        chave: "gerenciarConfiguracoes",
        titulo: "Gerenciar configurações",
        descricao: "Alterar as configurações administrativas.",
    },
];

export const PERFIS: Perfil[] = [
    "Administrador",
    "Atendente",
    "Visualizador",
];

function carregarUsuarios(): Usuario[] {
    try {
        const dados = localStorage.getItem(CHAVE_USUARIOS);

        if (!dados) return USUARIOS_INICIAIS;

        const usuarios: unknown = JSON.parse(dados);

        if (!Array.isArray(usuarios)) return USUARIOS_INICIAIS;

        return usuarios;
    } catch {
        return USUARIOS_INICIAIS;
    }
}

function gerarId(usuarios: Usuario[]) {
    return usuarios.length > 0
        ? Math.max(...usuarios.map((usuario) => usuario.id)) + 1
        : 1;
}

export default function usePermissoesADM() {
    const [usuarios, setUsuarios] = useState<Usuario[]>(carregarUsuarios);
    const [busca, setBusca] = useState("");
    const [filtroPerfil, setFiltroPerfil] = useState("Todos");
    const [filtroSituacao, setFiltroSituacao] = useState("Todas");
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<number | null>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [perfil, setPerfil] = useState<Perfil>("Atendente");
    const [ativo, setAtivo] = useState(true);
    const [permissoes, setPermissoes] = useState<Permissoes>({
        ...PERMISSOES_PADRAO.Atendente,
    });
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    function atualizarUsuarios(atualizados: Usuario[]) {
        setUsuarios(atualizados);

        try {
            localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(atualizados));
            return true;
        } catch {
            return false;
        }
    }

    const usuariosFiltrados = useMemo(() => {
        const termo = busca.trim().toLowerCase();

        return usuarios.filter((usuario) => {
            const correspondeBusca =
                usuario.nome.toLowerCase().includes(termo) ||
                usuario.email.toLowerCase().includes(termo);
            const correspondePerfil =
                filtroPerfil === "Todos" || usuario.perfil === filtroPerfil;
            const correspondeSituacao =
                filtroSituacao === "Todas" ||
                (filtroSituacao === "Ativos" && usuario.ativo) ||
                (filtroSituacao === "Inativos" && !usuario.ativo);

            return (
                correspondeBusca &&
                correspondePerfil &&
                correspondeSituacao
            );
        });
    }, [usuarios, busca, filtroPerfil, filtroSituacao]);

    const ativos = usuarios.filter((usuario) => usuario.ativo).length;
    const inativos = usuarios.filter((usuario) => !usuario.ativo).length;
    const administradores = usuarios.filter(
        (usuario) => usuario.perfil === "Administrador"
    ).length;

    function abrirCadastro() {
        setUsuarioEditando(null);
        setNome("");
        setEmail("");
        setPerfil("Atendente");
        setAtivo(true);
        setPermissoes({ ...PERMISSOES_PADRAO.Atendente });
        setErro("");
        setMensagem("");
        setModalAberto(true);
    }

    function abrirEdicao(usuario: Usuario) {
        setUsuarioEditando(usuario.id);
        setNome(usuario.nome);
        setEmail(usuario.email);
        setPerfil(usuario.perfil);
        setAtivo(usuario.ativo);
        setPermissoes({ ...usuario.permissoes });
        setErro("");
        setMensagem("");
        setModalAberto(true);
    }

    function alterarPerfil(novoPerfil: Perfil) {
        setPerfil(novoPerfil);
        setPermissoes({ ...PERMISSOES_PADRAO[novoPerfil] });
    }

    function alterarPermissao(chave: keyof Permissoes, valor: boolean) {
        setPermissoes((anteriores) => ({
            ...anteriores,
            [chave]: valor,
        }));
    }

    function salvarUsuario(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        setErro("");
        setMensagem("");

        const nomeLimpo = nome.trim();
        const emailLimpo = email.trim().toLowerCase();

        if (nomeLimpo.length < 3) {
            setErro("Informe um nome com pelo menos 3 caracteres.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo)) {
            setErro("Informe um endereço de e-mail válido.");
            return;
        }

        const emailJaExiste = usuarios.some(
            (usuario) =>
                usuario.email.toLowerCase() === emailLimpo &&
                usuario.id !== usuarioEditando
        );

        if (emailJaExiste) {
            setErro("Já existe um usuário cadastrado com esse e-mail.");
            return;
        }

        if (perfil === "Administrador" && !permissoes.gerenciarUsuarios) {
            setErro(
                "Um administrador precisa ter a permissão de gerenciar usuários."
            );
            return;
        }

        const novoUsuario: Usuario = {
            id: usuarioEditando ?? gerarId(usuarios),
            nome: nomeLimpo,
            email: emailLimpo,
            perfil,
            ativo,
            permissoes: { ...permissoes },
        };

        if (usuarioEditando !== null) {
            const administradorAtivoRestante = usuarios.some(
                (usuario) =>
                    usuario.id !== usuarioEditando &&
                    usuario.ativo &&
                    usuario.perfil === "Administrador"
            );
            const usuarioAnterior = usuarios.find(
                (usuario) => usuario.id === usuarioEditando
            );

            if (
                usuarioAnterior?.ativo &&
                usuarioAnterior.perfil === "Administrador" &&
                (!ativo || perfil !== "Administrador") &&
                !administradorAtivoRestante
            ) {
                setErro(
                    "Mantenha pelo menos um administrador ativo no sistema."
                );
                return;
            }

            const atualizados = usuarios.map((usuario) =>
                usuario.id === usuarioEditando ? novoUsuario : usuario
            );
            setMensagem(
                atualizarUsuarios(atualizados)
                    ? "Usuário atualizado com sucesso!"
                    : "Não foi possível salvar os dados neste navegador."
            );
        } else {
            setMensagem(
                atualizarUsuarios([...usuarios, novoUsuario])
                    ? "Usuário cadastrado com sucesso!"
                    : "Não foi possível salvar os dados neste navegador."
            );
        }

        setModalAberto(false);
    }

    function alternarSituacao(usuario: Usuario) {
        if (usuario.ativo && usuario.perfil === "Administrador") {
            const outrosAdministradores = usuarios.filter(
                (item) =>
                    item.id !== usuario.id &&
                    item.ativo &&
                    item.perfil === "Administrador"
            );

            if (outrosAdministradores.length === 0) {
                setMensagem(
                    "Não é possível desativar o único administrador ativo."
                );
                return;
            }
        }

        const acao = usuario.ativo ? "desativar" : "ativar";

        if (
            !window.confirm(
                `Deseja realmente ${acao} o usuário "${usuario.nome}"?`
            )
        ) {
            return;
        }

        const atualizados = usuarios.map((item) =>
            item.id === usuario.id
                ? { ...item, ativo: !item.ativo }
                : item
        );
        setMensagem(
            atualizarUsuarios(atualizados)
                ? `Usuário ${usuario.ativo ? "desativado" : "ativado"} com sucesso!`
                : "Não foi possível salvar os dados neste navegador."
        );
    }

    return {
        usuarios,
        busca,
        setBusca,
        filtroPerfil,
        setFiltroPerfil,
        filtroSituacao,
        setFiltroSituacao,
        modalAberto,
        setModalAberto,
        usuarioEditando,
        nome,
        setNome,
        email,
        setEmail,
        perfil,
        ativo,
        setAtivo,
        permissoes,
        erro,
        mensagem,
        setMensagem,
        usuariosFiltrados,
        ativos,
        inativos,
        administradores,
        abrirCadastro,
        abrirEdicao,
        alterarPerfil,
        alterarPermissao,
        salvarUsuario,
        alternarSituacao,
    };
}
