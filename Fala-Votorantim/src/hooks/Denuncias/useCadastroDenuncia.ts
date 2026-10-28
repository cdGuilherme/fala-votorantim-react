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
const limiteAnexos = 4;

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
    const [arquivos, setArquivos] = useState<File[]>([]);
    const arquivo = arquivos[0] ?? null;
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

    // Caso de uso "Anexar Fotos": uma ou mais fotos, cada uma com até 2 MB.
    function selecionarArquivo(evento: ChangeEvent<HTMLInputElement>) {
        const selecionados = Array.from(evento.target.files ?? []);
        const multiplo = evento.target.multiple;
        evento.target.value = "";
        if (selecionados.length === 0) {
            if (!multiplo) setArquivos([]);
            return;
        }

        if (selecionados.some((item) => !["image/jpeg", "image/png"].includes(item.type))) {
            setMensagem("Selecione apenas imagens JPEG ou PNG.");
            setMensagemSucesso(false);
            return;
        }

        if (selecionados.some((item) => item.size > limiteAnexoBytes)) {
            setMensagem("Cada imagem deve ter no máximo 2 MB.");
            setMensagemSucesso(false);
            return;
        }

        const proximos = multiplo ? [...arquivos, ...selecionados] : selecionados.slice(0, 1);
        if (proximos.length > limiteAnexos) {
            setMensagem(`Anexe no máximo ${limiteAnexos} fotos.`);
            setMensagemSucesso(false);
            return;
        }

        setArquivos(proximos);
        setMensagem("");
        setMensagemSucesso(false);
    }

    function removerArquivo(indice: number) {
        setArquivos((atuais) => atuais.filter((_, i) => i !== indice));
    }

    function limparFormulario() {
        setCampos({ ...camposVazios });
        setArquivos([]);
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
            const anexos = await Promise.all(
                arquivos.map(async (item) => ({
                    nome: item.name,
                    dataUrl: await lerArquivoComoDataUrl(item),
                }))
            );
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
                status: "Recebida",
                cep: campos.cep.trim(),
                numero: campos.numero.trim(),
                complemento: campos.complemento.trim(),
                bairro: campos.bairro.trim(),
                resultadoEsperado: campos.resultadoEsperado.trim(),
                ...(sessao ? { autorEmail: sessao.email } : {}),
                ...(anexos.length > 0
                    ? {
                          anexoNome: anexos[0].nome,
                          anexoDataUrl: anexos[0].dataUrl,
                          anexos,
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
            setArquivos([]);
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
        arquivos,
        mensagem,
        mensagemSucesso,
        chaveInputArquivo,
        atualizarCampo,
        selecionarArquivo,
        removerArquivo,
        limparFormulario,
        cadastrarDenuncia,
    };
}
