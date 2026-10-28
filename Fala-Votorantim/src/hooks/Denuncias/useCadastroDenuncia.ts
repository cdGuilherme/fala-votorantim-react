import { useState } from "react";
import type { ChangeEvent } from "react";
import useDenuncias from "./useDenuncias";
import useSessao from "../useSessao";
import type { Denuncia } from "../../Layout/FeedDenuncias/types";

export type CamposDenuncia = {
    cep: string;
    numero: string;
    rua: string;
    complemento: string;
    bairro: string;
    descricao: string;
    categoria: string;
    resultadoEsperado: string;
};

const camposVazios: CamposDenuncia = {
    cep: "",
    numero: "",
    rua: "",
    complemento: "",
    bairro: "",
    descricao: "",
    categoria: "",
    resultadoEsperado: "",
};

const limiteAnexoBytes = 2 * 1024 * 1024;

function lerArquivoComoDataUrl(arquivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            if (typeof leitor.result !== "string") {
                reject(new Error("Não foi possível ler o arquivo selecionado."));
                return;
            }
            resolve(leitor.result);
        };
        leitor.onerror = () =>
            reject(new Error("Não foi possível ler o arquivo selecionado."));
        leitor.readAsDataURL(arquivo);
    });
}

function dataAtualFormatada(): string {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");
    return `${dia}/${mes}/${ano}, ${hora}:${minuto}`;
}

export default function useCadastroDenuncia() {
    const {
        adicionarDenuncia,
        mensagemErro: erroArmazenamentoInicial,
    } = useDenuncias();
    const { sessao } = useSessao();
    const [campos, setCampos] = useState<CamposDenuncia>(camposVazios);
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [mensagem, setMensagem] = useState(erroArmazenamentoInicial);
    const [mensagemSucesso, setMensagemSucesso] = useState(false);
    const [chaveInputArquivo, setChaveInputArquivo] = useState(0);

    function atualizarCampo<K extends keyof CamposDenuncia>(
        campo: K,
        valor: CamposDenuncia[K]
    ) {
        setCampos((anteriores) => ({ ...anteriores, [campo]: valor }));
        setMensagem("");
        setMensagemSucesso(false);
    }

    function selecionarArquivo(evento: ChangeEvent<HTMLInputElement>) {
        const selecionado = evento.target.files?.[0] ?? null;
        if (!selecionado) {
            setArquivo(null);
            return;
        }

        if (!["image/jpeg", "image/png"].includes(selecionado.type)) {
            setArquivo(null);
            setMensagem("Selecione uma imagem JPEG ou PNG.");
            setMensagemSucesso(false);
            evento.target.value = "";
            return;
        }

        if (selecionado.size > limiteAnexoBytes) {
            setArquivo(null);
            setMensagem("A imagem deve ter no máximo 2 MB.");
            setMensagemSucesso(false);
            evento.target.value = "";
            return;
        }

        setArquivo(selecionado);
        setMensagem("");
        setMensagemSucesso(false);
    }

    function limparFormulario() {
        setCampos({ ...camposVazios });
        setArquivo(null);
        setChaveInputArquivo((chave) => chave + 1);
        setMensagem("");
        setMensagemSucesso(false);
    }

    async function cadastrarDenuncia() {
        const obrigatorios = [
            campos.cep,
            campos.numero,
            campos.rua,
            campos.bairro,
            campos.descricao,
            campos.categoria,
        ];

        if (obrigatorios.some((campo) => !campo.trim())) {
            setMensagem(
                "Preencha CEP, número, rua, bairro, descrição e categoria."
            );
            setMensagemSucesso(false);
            return;
        }

        try {
            const anexoDataUrl = arquivo
                ? await lerArquivoComoDataUrl(arquivo)
                : undefined;
            const endereco = [
                `${campos.rua.trim()}, ${campos.numero.trim()}`,
                campos.complemento.trim(),
                campos.bairro.trim(),
                `CEP ${campos.cep.trim()}`,
            ]
                .filter(Boolean)
                .join(" - ");
            const denuncia: Denuncia = {
                id: `DEN-${Date.now()}`,
                titulo: `Ocorrência: ${campos.categoria.trim()}`,
                categoria: campos.categoria.trim(),
                descricao: campos.descricao.trim(),
                endereco,
                data: dataAtualFormatada(),
                status: "Pendente",
                cep: campos.cep.trim(),
                numero: campos.numero.trim(),
                complemento: campos.complemento.trim(),
                bairro: campos.bairro.trim(),
                resultadoEsperado: campos.resultadoEsperado.trim(),
                ...(sessao ? { autorEmail: sessao.email } : {}),
                ...(arquivo
                    ? {
                          anexoNome: arquivo.name,
                          anexoDataUrl,
                      }
                    : {}),
            };

            if (!adicionarDenuncia(denuncia)) {
                setMensagemSucesso(false);
                setMensagem(
                    "Não foi possível salvar a denúncia. Verifique o espaço disponível no navegador."
                );
                return;
            }

            setCampos({ ...camposVazios });
            setArquivo(null);
            setChaveInputArquivo((chave) => chave + 1);
            setMensagem("Denúncia cadastrada e salva neste navegador.");
            setMensagemSucesso(true);
        } catch {
            setMensagem("Não foi possível processar o anexo selecionado.");
            setMensagemSucesso(false);
        }
    }

    return {
        campos,
        arquivo,
        mensagem,
        mensagemSucesso,
        chaveInputArquivo,
        atualizarCampo,
        selecionarArquivo,
        limparFormulario,
        cadastrarDenuncia,
    };
}
