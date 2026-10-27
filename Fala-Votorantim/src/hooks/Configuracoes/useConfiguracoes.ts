import { useState } from "react";

export type ConfiguracoesSite = {
    nomeSistema: string;
    descricaoSistema: string;
    emailContato: string;
    notificacoesNovas: boolean;
    notificacoesPrioritarias: boolean;
    notificacoesStatus: boolean;
    confirmarAcoes: boolean;
    modoCompacto: boolean;
    nomeAdministrador: string;
    emailAdministrador: string;
};

const configuracoesPadrao: ConfiguracoesSite = {
    nomeSistema: "Fala Votorantim",
    descricaoSistema:
        "Plataforma para registro e acompanhamento de denúncias urbanas.",
    emailContato: "",
    notificacoesNovas: true,
    notificacoesPrioritarias: true,
    notificacoesStatus: true,
    confirmarAcoes: true,
    modoCompacto: false,
    nomeAdministrador: "",
    emailAdministrador: "",
};

const chaveConfiguracoes = "fala-votorantim-configuracoes";

type EstadoInicial = {
    configuracoes: ConfiguracoesSite;
    mensagem: string;
};

function carregarConfiguracoes(): EstadoInicial {
    try {
        const dados = localStorage.getItem(chaveConfiguracoes);

        if (!dados) {
            return { configuracoes: configuracoesPadrao, mensagem: "" };
        }

        const dadosSalvos: unknown = JSON.parse(dados);

        if (
            typeof dadosSalvos !== "object" ||
            dadosSalvos === null ||
            Array.isArray(dadosSalvos)
        ) {
            throw new Error("Os dados salvos possuem um formato inválido.");
        }

        const valores = dadosSalvos as Record<string, unknown>;
        const configuracoes: ConfiguracoesSite = {
            ...configuracoesPadrao,
            nomeSistema:
                typeof valores.nomeSistema === "string"
                    ? valores.nomeSistema
                    : configuracoesPadrao.nomeSistema,
            descricaoSistema:
                typeof valores.descricaoSistema === "string"
                    ? valores.descricaoSistema
                    : configuracoesPadrao.descricaoSistema,
            emailContato:
                typeof valores.emailContato === "string"
                    ? valores.emailContato
                    : configuracoesPadrao.emailContato,
            notificacoesNovas:
                typeof valores.notificacoesNovas === "boolean"
                    ? valores.notificacoesNovas
                    : configuracoesPadrao.notificacoesNovas,
            notificacoesPrioritarias:
                typeof valores.notificacoesPrioritarias === "boolean"
                    ? valores.notificacoesPrioritarias
                    : configuracoesPadrao.notificacoesPrioritarias,
            notificacoesStatus:
                typeof valores.notificacoesStatus === "boolean"
                    ? valores.notificacoesStatus
                    : configuracoesPadrao.notificacoesStatus,
            confirmarAcoes:
                typeof valores.confirmarAcoes === "boolean"
                    ? valores.confirmarAcoes
                    : configuracoesPadrao.confirmarAcoes,
            modoCompacto:
                typeof valores.modoCompacto === "boolean"
                    ? valores.modoCompacto
                    : configuracoesPadrao.modoCompacto,
            nomeAdministrador:
                typeof valores.nomeAdministrador === "string"
                    ? valores.nomeAdministrador
                    : configuracoesPadrao.nomeAdministrador,
            emailAdministrador:
                typeof valores.emailAdministrador === "string"
                    ? valores.emailAdministrador
                    : configuracoesPadrao.emailAdministrador,
        };

        return { configuracoes, mensagem: "" };
    } catch {
        return {
            configuracoes: configuracoesPadrao,
            mensagem:
                "Não foi possível carregar as configurações salvas. Os valores padrão estão sendo exibidos.",
        };
    }
}

export default function useConfiguracoes() {
    const [estadoInicial] = useState(carregarConfiguracoes);
    const [configuracoes, setConfiguracoes] = useState(
        estadoInicial.configuracoes
    );
    const [salvo, setSalvo] = useState(!estadoInicial.mensagem);
    const [mensagem, setMensagem] = useState(estadoInicial.mensagem);
    const [mensagemSucesso, setMensagemSucesso] = useState(false);

    function atualizarCampo<K extends keyof ConfiguracoesSite>(
        campo: K,
        valor: ConfiguracoesSite[K]
    ) {
        setConfiguracoes((anterior) => ({ ...anterior, [campo]: valor }));
        setSalvo(false);
        setMensagem("");
        setMensagemSucesso(false);
    }

    function salvarConfiguracoes() {
        try {
            localStorage.setItem(
                chaveConfiguracoes,
                JSON.stringify(configuracoes)
            );
            setSalvo(true);
            setMensagem("Configurações salvas com sucesso!");
            setMensagemSucesso(true);
        } catch {
            setSalvo(false);
            setMensagem(
                "Não foi possível salvar. Verifique se o armazenamento do navegador está disponível."
            );
            setMensagemSucesso(false);
        }
    }

    function restaurarPadrao() {
        if (
            !window.confirm(
                "Deseja restaurar as configurações padrão? As preferências atuais serão substituídas."
            )
        ) {
            return;
        }

        try {
            localStorage.removeItem(chaveConfiguracoes);
            setConfiguracoes({ ...configuracoesPadrao });
            setSalvo(true);
            setMensagem("Configurações padrão restauradas.");
            setMensagemSucesso(true);
        } catch {
            setSalvo(false);
            setMensagem("Não foi possível restaurar as configurações.");
            setMensagemSucesso(false);
        }
    }

    return {
        configuracoes,
        salvo,
        mensagem,
        mensagemSucesso,
        atualizarCampo,
        salvarConfiguracoes,
        restaurarPadrao,
    };
}
